import CoreGraphics
import Foundation
import SpriteKit

import NitroAssets
import NitroCore

/// Swift port of `RoomPlane` (packages/nitro-renderer/src/room/object/visualization/room/RoomPlane.ts) -
/// renders one floor/wall/landscape polygon: resolves its material texture/color from the room
/// bundle, computes tiling offsets, and bakes a skewed, tiled, tinted, masked texture matching the
/// polygon's on-screen parallelogram shape.
///
/// The TS version does this by rendering a Pixi `TilingSprite` through a skewed `Matrix` into a
/// pooled `RenderTexture`. SpriteKit has no equivalent of an arbitrary-2D-affine render-to-texture
/// pass, so this port does the equivalent work directly with CoreGraphics: a bitmap context flipped
/// to y-down/top-left-origin (matching every other coordinate in this port), the same affine
/// transform math applied via `CGAffineTransform`/`concatenate`, manual tile-pattern drawing, a true
/// multiplicative tint via `CGBlendMode.multiply`, and mask cutouts via `CGBlendMode.destinationOut`
/// (Pixi's "inverse alpha mask" is exactly `destinationOut`). Because this bakes once into a texture
/// rather than tinting a live sprite, the tint here is *exact*, unlike the `colorBlendFactor`
/// approximation `FurnitureNode`/`AvatarNode` use for their live-updated sprites.
public final class RoomPlane {
    public static let horizontalAngleDefault: Double = 45
    public static let verticalAngleDefault: Double = 30

    /// Fixed reference cameras (independent of the live room camera) used purely to compute
    /// texture-tiling pixel ratios - see `update()`. Matches `RoomPlane.PLANE_GEOMETRY`.
    public static let planeGeometry: [Int: RoomGeometry] = [
        32: RoomGeometry(scale: .zoomedOut, direction: Vector3d(horizontalAngleDefault, verticalAngleDefault, 0), location: Vector3d(-10, 0, 0)),
        64: RoomGeometry(scale: .zoomedIn, direction: Vector3d(horizontalAngleDefault, verticalAngleDefault, 0), location: Vector3d(-10, 0, 0)),
    ]

    public static let typeUndefined = 0
    public static let typeWall = 1
    public static let typeFloor = 2
    public static let typeLandscape = 3

    private static var uniqueIdCounter = 1

    private static let whiteTexture: SKTexture = {
        var pixel: [UInt8] = [255, 255, 255, 255]
        let colorSpace = CGColorSpaceCreateDeviceRGB()
        let image: CGImage? = pixel.withUnsafeMutableBytes { raw in
            guard let ctx = CGContext(
                data: raw.baseAddress, width: 1, height: 1, bitsPerComponent: 8, bytesPerRow: 4,
                space: colorSpace, bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue
            ) else { return nil }

            return ctx.makeImage()
        }

        return image.map { SKTexture(cgImage: $0) } ?? SKTexture()
    }()

    private var disposed = false
    private let randomSeed: Int
    private let context: RoomPlaneRenderContext

    private let origin: Vector3d
    public let location: Vector3d
    public let leftSide: Vector3d
    public let rightSide: Vector3d

    public let normal: Vector3d
    private let secondaryNormals: [Vector3d]

    public let type: Int
    private var isVisible = false
    private var offsetX: Double = 0
    private var offsetY: Double = 0
    private var relativeDepthValue: Double = 0

    /// Geometric shading tint (top/side/bottom face shading) - set externally by the room
    /// orchestrator (`RoomPlaneRenderer`), matching TS `plane.color = RoomVisualization.FLOOR_COLOR`
    /// etc. Distinct from the material's own baked-in tint resolved by `getTextureAndColorForPlane`.
    public var color: UInt32 = 0xFFFFFF

    public var id: String = ""

    public let uniqueId: Int

    private var cornerA = Vector3d()
    private var cornerB = Vector3d()
    private var cornerC = Vector3d()
    private var cornerD = Vector3d()

    private let textureOffsetX: Double
    private let textureOffsetY: Double

    private var boundsWidth: Int = 0
    private var boundsHeight: Int = 0

    public var canBeVisible = true
    private var geometryUpdateId = -1
    public var extraDepth: Double = 0
    public var isHighlighter = false

    private let useMask: Bool
    private var bitmapMasks: [RoomPlaneBitmapMask] = []
    private var rectangleMasks: [RoomPlaneRectangleMask] = []
    private var maskChanged = false

    public private(set) var planeTexture: SKTexture?
    private var planeOffsetX: Double = 0
    private var planeOffsetY: Double = 0

    public init(
        origin: Vector3d, location: Vector3d, leftSide: Vector3d, rightSide: Vector3d,
        type: Int, usesMask: Bool, secondaryNormals: [Vector3d], randomSeed: Int,
        textureOffsetX: Double = 0, textureOffsetY: Double = 0,
        context: RoomPlaneRenderContext
    ) {
        self.randomSeed = randomSeed
        self.origin = Vector3d.from(origin)
        self.location = Vector3d.from(location)
        self.leftSide = Vector3d.from(leftSide)
        self.rightSide = Vector3d.from(rightSide)
        self.context = context

        let normal = Vector3d.crossProduct(leftSide, rightSide)

        if normal.length > 0 { normal.multiply(1 / normal.length) }

        self.normal = normal
        self.secondaryNormals = secondaryNormals.filter { $0.length > 0 }.map {
            let unit = Vector3d.from($0)

            unit.multiply(1 / unit.length)

            return unit
        }

        self.type = type
        self.textureOffsetX = textureOffsetX
        self.textureOffsetY = textureOffsetY
        self.useMask = usesMask

        RoomPlane.uniqueIdCounter += 1
        uniqueId = RoomPlane.uniqueIdCounter
    }

    public func dispose() {
        disposed = true
        planeTexture = nil
    }

    @discardableResult
    public func update(_ geometry: RoomGeometry) -> Bool {
        guard !disposed else { return false }

        let geometryChanged = geometryUpdateId != geometry.updateId

        if !geometryChanged || !canBeVisible {
            if !visible { return false }
        }

        if geometryChanged, let result = updateVisibilityAndCorners(geometry) { return result }

        guard geometryChanged || (canBeVisible && maskChanged) else { return false }

        guard let planeGeometry = RoomPlane.planeGeometry[Int(geometry.scale.rounded())] else {
            NitroLogger.warn("RoomPlane \(uniqueId) (type \(type)): no PLANE_GEOMETRY entry for scale \(geometry.scale) - skipping bake")

            return false
        }

        guard boundsWidth > 0, boundsHeight > 0 else {
            NitroLogger.warn("RoomPlane \(uniqueId) (type \(type)): degenerate bounds \(boundsWidth)x\(boundsHeight) - skipping bake")

            return false
        }

        var tileWidth = floor(leftSide.length)
        var tileHeight = floor(rightSide.length)

        let (texture, materialColor) = textureAndColor(planeId: id, planeType: type, planeGeometry: planeGeometry)
        let textureSize = texture.size()
        let textureWidth = Double(textureSize.width)
        let textureHeight = Double(textureSize.height)

        switch type {
            case RoomPlane.typeFloor:
                let origin = planeGeometry.getScreenPoint(Vector3d(0, 0, 0))
                let yEnd = planeGeometry.getScreenPoint(Vector3d(0, tileHeight, 0))
                let xEnd = planeGeometry.getScreenPoint(Vector3d(tileWidth, 0, 0))

                tileWidth = abs(Double(origin.x) - Double(xEnd.x)).rounded()
                tileHeight = abs(Double(origin.x) - Double(yEnd.x)).rounded()

                let unit = planeGeometry.getScreenPoint(Vector3d(1, 0, 0))
                let pixelsPerUnit = abs(Double(origin.x) - Double(unit.x))

                var x = textureOffsetX * pixelsPerUnit
                var y = textureOffsetY * pixelsPerUnit

                if x != 0 || y != 0 {
                    while x < 0 { x += textureWidth }
                    while y < 0 { y += textureHeight }
                }

                planeOffsetX = RoomPlane.positiveModulo(x, textureWidth)
                planeOffsetY = RoomPlane.positiveModulo(y, textureHeight)

            case RoomPlane.typeWall:
                let origin = planeGeometry.getScreenPoint(Vector3d(0, 0, 0))
                let yEnd = planeGeometry.getScreenPoint(Vector3d(0, 0, tileHeight))
                let xEnd = planeGeometry.getScreenPoint(Vector3d(0, tileWidth, 0))

                tileWidth = abs(Double(origin.x) - Double(xEnd.x)).rounded()
                tileHeight = abs(Double(origin.y) - Double(yEnd.y)).rounded()

                planeOffsetX = textureOffsetX * textureWidth
                planeOffsetY = textureOffsetY * textureHeight

            default: // landscape
                let origin = planeGeometry.getScreenPoint(Vector3d(0, 0, 0))
                let yEnd = planeGeometry.getScreenPoint(Vector3d(0, 0, 1))
                let xEnd = planeGeometry.getScreenPoint(Vector3d(0, 1, 0))

                let unitX = abs(Double(origin.x) - Double(xEnd.x))
                let unitY = abs(Double(origin.y) - Double(yEnd.y))

                tileWidth = (unitX * tileWidth).rounded()
                tileHeight = (unitY * tileHeight).rounded()

                planeOffsetX = (textureOffsetX * unitX).rounded(.towardZero)
                planeOffsetY = (textureOffsetY * unitY).rounded(.towardZero)
                // `_renderMaxX`/`_renderMaxY` in the TS source are computed but never consumed - dead code, omitted.
        }

        if tileWidth < 1 { tileWidth = 1 }
        if tileHeight < 1 { tileHeight = 1 }

        Randomizer.setSeed(randomSeed)

        guard let baked = bakeTexture(geometry: geometry, texture: texture, tint: materialColor, tileWidth: tileWidth, tileHeight: tileHeight) else {
            NitroLogger.warn("RoomPlane \(uniqueId) (type \(type)): bakeTexture returned nil (bounds \(boundsWidth)x\(boundsHeight))")

            return false
        }

        planeTexture = baked

        return true
    }

    private static func positiveModulo(_ value: Double, _ modulus: Double) -> Double {
        guard modulus > 0 else { return 0 }

        return ((value.truncatingRemainder(dividingBy: modulus)) + modulus).truncatingRemainder(dividingBy: modulus)
    }

    private func updateVisibilityAndCorners(_ geometry: RoomGeometry) -> Bool? {
        var cosAngle = Vector3d.cosAngle(geometry.directionAxis, normal)

        if cosAngle > -0.001 {
            if isVisible { isVisible = false; return true }

            return false
        }

        for secondaryNormal in secondaryNormals {
            cosAngle = Vector3d.cosAngle(geometry.directionAxis, secondaryNormal)

            if cosAngle > -0.001 {
                if isVisible { isVisible = false; return true }

                return false
            }
        }

        updateCorners(geometry)

        var depth = max(cornerA.z, cornerB.z, cornerC.z, cornerD.z) - geometry.getScreenPosition(origin).z

        switch type {
            case RoomPlane.typeFloor:
                depth -= (location.z + min(0, leftSide.z, rightSide.z)) * 8
            case RoomPlane.typeLandscape:
                depth += 0.02
            default: break
        }

        relativeDepthValue = depth
        isVisible = true
        geometryUpdateId = geometry.updateId

        return nil
    }

    private func textureAndColor(planeId: String, planeType: Int, planeGeometry: RoomGeometry) -> (texture: SKTexture, color: UInt32) {
        let planeData: AssetPlaneVisualizationData?

        switch planeType {
            case RoomPlane.typeFloor: planeData = context.visualizationData?.floorData
            case RoomPlane.typeWall: planeData = context.visualizationData?.wallData
            default: planeData = context.visualizationData?.landscapeData
        }

        var plane = planeData?.planes?.first { $0.id == planeId }

        if plane == nil { plane = planeData?.planes?.first { $0.id == "default" } }

        let visualizations = planeType == RoomPlane.typeLandscape ? plane?.animatedVisualization : plane?.visualizations
        let scale = Int(planeGeometry.scale.rounded())
        let visualization = visualizations?.first { $0.size == scale }

        let layer = visualization?.allLayers?.first
        let materialId = layer?.materialId
        let color = layer?.color ?? 0xFFFFFF

        let assetName = planeData?.textures?.first { $0.id == materialId }?.bitmaps?.first?.assetName ?? ""
        let texture = context.assetManager.getAsset(assetName)?.texture ?? RoomPlane.whiteTexture

        return (texture, color)
    }

    private func updateCorners(_ geometry: RoomGeometry) {
        cornerA = geometry.getScreenPosition(location)
        cornerB = geometry.getScreenPosition(Vector3d.sum(location, rightSide))
        cornerC = geometry.getScreenPosition(Vector3d.sum(Vector3d.sum(location, leftSide), rightSide))
        cornerD = geometry.getScreenPosition(Vector3d.sum(location, leftSide))

        let screenOrigin = geometry.getScreenPoint(origin)
        var offX = Double(screenOrigin.x).rounded()
        var offY = Double(screenOrigin.y).rounded()

        cornerA.x = cornerA.x.rounded(); cornerA.y = cornerA.y.rounded()
        cornerB.x = cornerB.x.rounded(); cornerB.y = cornerB.y.rounded()
        cornerC.x = cornerC.x.rounded(); cornerC.y = cornerC.y.rounded()
        cornerD.x = cornerD.x.rounded(); cornerD.y = cornerD.y.rounded()

        let minX = min(cornerA.x, cornerB.x, cornerC.x, cornerD.x)
        let maxX = max(cornerA.x, cornerB.x, cornerC.x, cornerD.x) - minX
        let minY = min(cornerA.y, cornerB.y, cornerC.y, cornerD.y)
        let maxY = max(cornerA.y, cornerB.y, cornerC.y, cornerD.y) - minY

        offX -= minX
        cornerA.x -= minX; cornerB.x -= minX; cornerC.x -= minX; cornerD.x -= minX

        offY -= minY
        cornerA.y -= minY; cornerB.y -= minY; cornerC.y -= minY; cornerD.y -= minY

        offsetX = offX
        offsetY = offY
        boundsWidth = Int(maxX)
        boundsHeight = Int(maxY)
    }

    private func matrixForDimensions(width: Double, height: Double) -> CGAffineTransform {
        var a = cornerD.x - cornerC.x
        var b = cornerD.y - cornerC.y
        var c = cornerB.x - cornerC.x
        var d = cornerB.y - cornerC.y

        if type == RoomPlane.typeWall || type == RoomPlane.typeLandscape {
            if abs(c - width) <= 1 { c = width }
            if abs(d - width) <= 1 { d = width }
            if abs(a - height) <= 1 { a = height }
            if abs(b - height) <= 1 { b = height }
        }

        let xScale = c / width
        let ySkew = d / width
        let xSkew = a / height
        let yScale = b / height

        return CGAffineTransform(a: CGFloat(xScale), b: CGFloat(ySkew), c: CGFloat(xSkew), d: CGFloat(yScale), tx: CGFloat(cornerC.x), ty: CGFloat(cornerC.y))
    }

    // MARK: - Masks

    public func resetBitmapMasks() {
        guard !disposed, useMask, !bitmapMasks.isEmpty else { return }

        maskChanged = true
        bitmapMasks = []
    }

    @discardableResult
    public func addBitmapMask(type maskType: String, leftSideLoc: Double, rightSideLoc: Double) -> Bool {
        guard useMask else { return false }

        if bitmapMasks.contains(where: { $0.type == maskType && $0.leftSideLoc == leftSideLoc && $0.rightSideLoc == rightSideLoc }) { return false }

        bitmapMasks.append(RoomPlaneBitmapMask(type: maskType, leftSideLoc: leftSideLoc, rightSideLoc: rightSideLoc))
        maskChanged = true

        return true
    }

    public func resetRectangleMasks() {
        guard useMask, !rectangleMasks.isEmpty else { return }

        maskChanged = true
        rectangleMasks = []
    }

    @discardableResult
    public func addRectangleMask(leftLocation: Double, rightLocation: Double, leftLength: Double, rightLength: Double) -> Bool {
        guard useMask else { return false }

        if rectangleMasks.contains(where: { $0.leftSideLoc == leftLocation && $0.rightSideLoc == rightLocation && $0.leftSideLength == leftLength && $0.rightSideLength == rightLength }) {
            return false
        }

        rectangleMasks.append(RoomPlaneRectangleMask(leftSideLoc: leftLocation, rightSideLoc: rightLocation, leftSideLength: leftLength, rightSideLength: rightLength))
        maskChanged = true

        return true
    }

    private func mergedMaskImage(geometry: RoomGeometry, tileWidth: Double, tileHeight: Double) -> CGImage? {
        guard useMask, !bitmapMasks.isEmpty || !rectangleMasks.isEmpty else { return nil }
        guard let maskManager = context.maskManager else { return nil }
        guard tileWidth > 0, tileHeight > 0 else { return nil }

        let normalPoint = geometry.getCoordinatePosition(normal)
        var entries: [MaskEntry] = []

        for mask in bitmapMasks {
            let posX = tileWidth - (tileWidth * mask.leftSideLoc / leftSide.length)
            let posY = tileHeight - (tileHeight * mask.rightSideLoc / rightSide.length)

            if let entry = maskManager.getMaskEntry(type: mask.type, scale: Int(geometry.scale.rounded()), normal: normalPoint, posX: posX, posY: posY) {
                entries.append(entry)
            }
        }

        for mask in rectangleMasks {
            let posX = tileWidth - (tileWidth * mask.leftSideLoc / leftSide.length)
            let posY = tileHeight - (tileHeight * mask.rightSideLoc / rightSide.length)
            let wd = tileWidth * mask.leftSideLength / leftSide.length
            let ht = tileHeight * mask.rightSideLength / rightSide.length

            entries.append(MaskEntry(
                texture: RoomPlane.whiteTexture,
                position: CGPoint(x: CGFloat((posX - wd).rounded(.towardZero)), y: CGFloat((posY - ht).rounded(.towardZero))),
                size: CGSize(width: CGFloat(wd.rounded(.towardZero)), height: CGFloat(ht.rounded(.towardZero))),
                scale: CGPoint(x: 1, y: 1)
            ))
        }

        guard !entries.isEmpty else { return nil }

        let width = max(1, Int(tileWidth.rounded()))
        let height = max(1, Int(tileHeight.rounded()))
        let colorSpace = CGColorSpaceCreateDeviceRGB()
        var buffer = [UInt8](repeating: 0, count: width * height * 4)

        return buffer.withUnsafeMutableBytes { rawBuffer -> CGImage? in
            guard let baseAddress = rawBuffer.baseAddress else { return nil }
            guard let ctx = CGContext(
                data: baseAddress, width: width, height: height, bitsPerComponent: 8, bytesPerRow: width * 4,
                space: colorSpace, bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue
            ) else { return nil }

            ctx.translateBy(x: 0, y: CGFloat(height))
            ctx.scaleBy(x: 1, y: -1)

            for entry in entries {
                let image = entry.texture.cgImage()

                let w = entry.size.map { Double($0.width) } ?? Double(image.width)
                let h = entry.size.map { Double($0.height) } ?? Double(image.height)
                let sx = Double(entry.scale.x)
                let sy = Double(entry.scale.y)
                // Sprite anchor (0,0): a negative scale mirrors the content in place, so the
                // translate origin shifts by the full width/height on the mirrored axis.
                let originX = Double(entry.position.x) + (sx < 0 ? w : 0)
                let originY = Double(entry.position.y) + (sy < 0 ? h : 0)

                ctx.saveGState()
                ctx.translateBy(x: CGFloat(originX), y: CGFloat(originY))
                ctx.scaleBy(x: CGFloat(sx), y: CGFloat(sy))
                ctx.draw(image, in: CGRect(x: 0, y: 0, width: CGFloat(w), height: CGFloat(h)))
                ctx.restoreGState()
            }

            return ctx.makeImage()
        }
    }

    // MARK: - Baking

    private func bakeTexture(geometry: RoomGeometry, texture: SKTexture, tint: UInt32, tileWidth: Double, tileHeight: Double) -> SKTexture? {
        guard boundsWidth > 0, boundsHeight > 0 else { return nil }
        let tileImage = texture.cgImage()

        let transform = matrixForDimensions(width: tileWidth, height: tileHeight)
        let maskImage = mergedMaskImage(geometry: geometry, tileWidth: tileWidth, tileHeight: tileHeight)

        let colorSpace = CGColorSpaceCreateDeviceRGB()
        var buffer = [UInt8](repeating: 0, count: boundsWidth * boundsHeight * 4)

        let outputImage: CGImage? = buffer.withUnsafeMutableBytes { rawBuffer -> CGImage? in
            guard let baseAddress = rawBuffer.baseAddress else { return nil }
            guard let ctx = CGContext(
                data: baseAddress, width: boundsWidth, height: boundsHeight, bitsPerComponent: 8, bytesPerRow: boundsWidth * 4,
                space: colorSpace, bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue
            ) else { return nil }

            // y-down/top-left origin, matching every corner/offset value computed above - see the
            // type doc comment for why this canonical translate+scale flip is safe to combine with
            // `draw(_:in:)` (already relied on the same way in `Spritesheet.rotatedCounterClockwise`).
            ctx.translateBy(x: 0, y: CGFloat(boundsHeight))
            ctx.scaleBy(x: 1, y: -1)

            ctx.saveGState()
            ctx.concatenate(transform)
            RoomPlane.drawTiledPattern(ctx: ctx, tileImage: tileImage, offsetX: self.planeOffsetX, offsetY: self.planeOffsetY, width: tileWidth, height: tileHeight)
            ctx.restoreGState()

            if tint != 0xFFFFFF {
                ctx.saveGState()
                ctx.setBlendMode(.multiply)
                ctx.setFillColor(
                    red: CGFloat((tint >> 16) & 0xFF) / 255, green: CGFloat((tint >> 8) & 0xFF) / 255,
                    blue: CGFloat(tint & 0xFF) / 255, alpha: 1
                )
                ctx.fill(CGRect(x: 0, y: 0, width: CGFloat(boundsWidth), height: CGFloat(boundsHeight)))
                ctx.restoreGState()
            }

            if let maskImage {
                ctx.saveGState()
                ctx.concatenate(transform)
                ctx.setBlendMode(.destinationOut)
                ctx.draw(maskImage, in: CGRect(x: 0, y: 0, width: CGFloat(tileWidth), height: CGFloat(tileHeight)))
                ctx.restoreGState()
            }

            return ctx.makeImage()
        }

        guard let outputImage else { return nil }

        return SKTexture(cgImage: outputImage)
    }

    private static func drawTiledPattern(ctx: CGContext, tileImage: CGImage, offsetX: Double, offsetY: Double, width: Double, height: Double) {
        let tileWidth = Double(tileImage.width)
        let tileHeight = Double(tileImage.height)

        guard tileWidth > 0, tileHeight > 0 else { return }

        ctx.clip(to: CGRect(x: 0, y: 0, width: CGFloat(width), height: CGFloat(height)))

        // Pixi's `TilingSprite.tilePosition` translates the *pattern's own origin* in the same
        // direction as ordinary sprite positioning - increasing `tilePosition.x` shifts the visible
        // tiled content to the right (verified against the actual pixi.js 8.x source,
        // `CanvasTilingSpritePipe`: `tilePosition` feeds `_tileTransform`, prepended into the same
        // `worldMatrix` used for the sprite's own group transform, no extra negation). So the first
        // tile drawn here must start at the representative of `offsetX` in `(-tileWidth, 0]`, i.e.
        // `positiveModulo(offsetX, tileWidth) - tileWidth` - not `-positiveModulo(offsetX, tileWidth)`,
        // which draws the pattern shifted the wrong way (mirrored phase relative to Pixi).
        let startX = positiveModulo(offsetX, tileWidth) - tileWidth
        let startY = positiveModulo(offsetY, tileHeight) - tileHeight

        var y = startY

        while y < height {
            var x = startX

            while x < width {
                ctx.draw(tileImage, in: CGRect(x: CGFloat(x), y: CGFloat(y), width: CGFloat(tileWidth), height: CGFloat(tileHeight)))
                x += tileWidth
            }

            y += tileHeight
        }
    }

    // MARK: - Public state

    public var visible: Bool { isVisible && canBeVisible }
    public var offset: CGPoint { CGPoint(x: CGFloat(offsetX), y: CGFloat(offsetY)) }
    public var relativeDepth: Double { relativeDepthValue + extraDepth }
    public var leftSideLength: Double { leftSide.length }
    public var rightSideLength: Double { rightSide.length }
}

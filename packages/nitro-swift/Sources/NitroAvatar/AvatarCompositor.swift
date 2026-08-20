import CoreGraphics
import Foundation
import SpriteKit

/// One resolved, positioned avatar sprite layer, in final avatar-canvas pixel space (origin at
/// the canvas's top-left, y grows downward - matches every other coordinate in this port until
/// the SpriteKit adapter layer flips it to SpriteKit's y-up convention).
public struct AvatarLayerDraw {
    public let bodyPartId: String
    public let partType: AvatarFigurePartType
    public let texture: SKTexture
    /// Center of the sprite (not top-left) - flipping around the center is what keeps a mirrored
    /// layer in the same footprint as its unmirrored counterpart, see `AvatarCompositor`'s doc comment.
    public let centerX: Double
    public let centerY: Double
    public let width: Double
    public let height: Double
    public let flipH: Bool
    public let color: UInt32
    /// Draw order, farthest-camera-first - assign ascending zPosition in this order so nearer
    /// layers paint on top (painter's algorithm), matching `AvatarImage.getImage`'s reverse iteration.
    public let zIndex: Int
}

/// Swift port of `AvatarImageCache.renderBodyPart`/`createUnionImage`
/// (packages/nitro-renderer/src/avatar/cache/AvatarImageCache.ts) plus the whole-avatar placement
/// step from `AvatarImage.getImage` (see the architecture notes gathered during this port, section 4.5/4.9).
///
/// The TS version flattens each body part into one baked `Container` (a Pixi render-texture-free
/// composite built from `Sprite.setFromMatrix` placements) and only *then* positions that composite
/// within the avatar canvas. This port skips the flattening: it computes each individual layer's
/// final avatar-canvas-space position directly (the matrix algebra was worked out by hand and
/// reduces to a plain rect union + offset, done below), and hands the whole flat, ordered list to
/// `NitroRendererKit.AvatarNode` to build as plain `SKSpriteNode`s. Same visual result, no need for
/// SpriteKit to support arbitrary 2D affine sprite transforms the way Pixi's `Matrix` does.
///
/// Not ported (see the package README): keyframe animation frame overrides (`AvatarAnimationFrame`),
/// per-frame animation dx/dy (`structure.getFrameBodyPartOffset` is always (0,0) here since no
/// animation layer data exists), and FX/gesture-injected layer items.
public final class AvatarCompositor {
    private let structure: AvatarStructure
    private let assets: AssetAliasCollection
    private let defaultActionCode = "std"

    public init(structure: AvatarStructure, assets: AssetAliasCollection) {
        self.structure = structure
        self.assets = assets
    }

    /// Composites a full avatar for one facing direction (0-7) into final, positioned, ordered layers.
    public func compose(
        figure: AvatarFigureContainer,
        direction: Int,
        action: ActionDefinition,
        scale: AvatarScaleType = .large,
        geometryType: AvatarGeometryType = .vertical,
        setType: AvatarSetType = .full
    ) -> [AvatarLayerDraw] {
        guard let canvas = structure.getCanvas(scale: scale, geometryType: geometryType) else { return [] }

        let bodyPartsNearestFirst = structure.getBodyParts(setType: setType, geometryType: geometryType, direction: direction)
        let canvasOffsetConst = scale == .large ? (canvas.height - 16) : (canvas.height - 8)

        var draws: [AvatarLayerDraw] = []
        var zIndex = 0

        // Farthest-camera body part first, so nearer body parts paint on top of it.
        for bodyPart in bodyPartsNearestFirst.reversed() {
            let containers = structure.getParts(setType: bodyPart, container: figure, activeAction: action, geometryType: geometryType, direction: direction)

            guard !containers.isEmpty else { continue }

            let layers = renderBodyPart(direction: direction, containers: containers, action: action, scale: scale)

            guard !layers.rows.isEmpty else { continue }

            let bodyPartOffset = placeBodyPart(layers: layers, direction: direction, action: action, scale: scale, canvasOffsetConst: canvasOffsetConst)
            let canvasOffsetX = Double(canvas.offset.x) + Double(canvas.regPoint.x)
            let canvasOffsetY = Double(canvas.offset.y) + Double(canvas.regPoint.y)

            for layer in layers.rows {
                draws.append(AvatarLayerDraw(
                    bodyPartId: bodyPart.rawValue, partType: layer.partType, texture: layer.texture,
                    centerX: bodyPartOffset.x + layer.centerX + canvasOffsetX,
                    centerY: bodyPartOffset.y + layer.centerY + canvasOffsetY,
                    width: layer.width, height: layer.height, flipH: layer.flipH, color: layer.color, zIndex: zIndex
                ))

                zIndex += 1
            }
        }

        return draws
    }

    // MARK: - Per-body-part union compositing

    private struct PositionedLayer {
        let partType: AvatarFigurePartType
        let texture: SKTexture
        /// Top-left position within the body part's own union bounding box (top-left origin, y-down).
        let x: Double
        let y: Double
        let width: Double
        let height: Double
        let flipH: Bool
        let color: UInt32

        var centerX: Double { x + width / 2 }
        var centerY: Double { y + height / 2 }
    }

    private struct BodyPartLayers {
        let rows: [PositionedLayer]
        /// Union bounding box of every layer's offset rect, in the same space `rows` positions are in.
        let bounds: CGRect
    }

    private func renderBodyPart(direction: Int, containers: [AvatarImagePartContainer], action: ActionDefinition, scale: AvatarScaleType) -> BodyPartLayers {
        let isFlipped = AvatarDirectionAngle.directionIsFlipped[((direction % 8) + 8) % 8]
        let assetPartDefinition = action.assetPartDefinition

        struct RawLayer {
            let partType: AvatarFigurePartType
            let texture: SKTexture
            let width: Double
            let height: Double
            /// Already includes the +65/+31 mirrored-recenter nudge when `dataFlipH` is set.
            let regPointX: Double
            let regPointY: Double
            let dataFlipH: Bool
            let color: UInt32
        }

        var rawLayers: [RawLayer] = []

        // Farthest-to-nearest within this body part, matching `for (i = containers.length - 1; i >= 0; i--)`.
        for container in containers.reversed() {
            if direction == 7, container.partType == .face || container.partType == .eyes { continue }

            let partId = container.partId
            var partType = container.partType
            var assetDirection = direction
            // Static pose only (see the type doc comment) - every container's frame list is [0].
            let frameNumber = container.getFrameIndex(0)
            var dataFlipH = false

            if isFlipped {
                let mirrorContentInPlace =
                    (assetPartDefinition == "wav" && [.leftHand, .leftSleeve, .leftCoatSleeve].contains(partType)) ||
                    (assetPartDefinition == "drk" && [.rightHand, .rightSleeve, .rightCoatSleeve].contains(partType)) ||
                    (assetPartDefinition == "blw" && partType == .rightHand) ||
                    (assetPartDefinition == "sig" && partType == .leftHand) ||
                    (assetPartDefinition == "respect" && partType == .leftHand) ||
                    partType == .rightHandItem || partType == .leftHandItem || partType == .chestPrint

                if mirrorContentInPlace {
                    dataFlipH = true
                } else {
                    switch direction {
                        case 4: assetDirection = 2
                        case 5: assetDirection = 1
                        case 6: assetDirection = 0
                        default: break
                    }

                    if let flipped = container.flippedPartType, flipped != partType { partType = flipped }
                }
            }

            var assetName = "\(scale.rawValue)_\(assetPartDefinition)_\(partType.rawValue)_\(partId)_\(assetDirection)_\(frameNumber)"
            var asset = assets.getAsset(assetName)

            if asset == nil {
                assetName = "\(scale.rawValue)_\(assetPartDefinition)_\(partType.rawValue)_\(partId)_\(assetDirection)_0"
                asset = assets.getAsset(assetName)
            }
            if asset == nil {
                assetName = "\(scale.rawValue)_\(defaultActionCode)_\(partType.rawValue)_\(partId)_\(assetDirection)_\(frameNumber)"
                asset = assets.getAsset(assetName)
            }
            if asset == nil {
                assetName = "\(scale.rawValue)_\(defaultActionCode)_\(partType.rawValue)_\(partId)_\(assetDirection)_0"
                asset = assets.getAsset(assetName)
            }

            guard let asset, let texture = asset.texture else { continue }

            let color: UInt32 = (container.isColorable && container.color != nil) ? container.color!.rgb : 0xFFFFFF

            let assetWidth = Double(asset.width)
            let assetHeight = Double(asset.height)

            var offsetX = -asset.x
            let offsetY = -asset.y

            if dataFlipH { offsetX += (scale == .large ? 65 : 31) }

            // `ImageData`'s constructor mutates regPoint.x when flipH is set: `-x + rect.width`.
            let regPointX = dataFlipH ? (-offsetX + assetWidth) : offsetX
            let regPointY = offsetY

            rawLayers.append(RawLayer(
                partType: partType, texture: texture, width: assetWidth, height: assetHeight,
                regPointX: regPointX, regPointY: regPointY, dataFlipH: dataFlipH, color: color
            ))
        }

        guard !rawLayers.isEmpty else { return BodyPartLayers(rows: [], bounds: .zero) }

        var bounds = AvatarCompositor.rect(x: -rawLayers[0].regPointX, y: -rawLayers[0].regPointY, width: rawLayers[0].width, height: rawLayers[0].height)

        for layer in rawLayers.dropFirst() {
            bounds = bounds.union(AvatarCompositor.rect(x: -layer.regPointX, y: -layer.regPointY, width: layer.width, height: layer.height))
        }

        var rows: [PositionedLayer] = []

        for layer in rawLayers {
            var x = -Double(bounds.minX) - layer.regPointX
            let y = -Double(bounds.minY) - layer.regPointY

            if isFlipped { x = Double(bounds.width) - (x + layer.width) }

            let finalFlipH = isFlipped != layer.dataFlipH

            rows.append(PositionedLayer(
                partType: layer.partType, texture: layer.texture, x: x, y: y,
                width: layer.width, height: layer.height, flipH: finalFlipH, color: layer.color
            ))
        }

        return BodyPartLayers(rows: rows, bounds: bounds)
    }

    /// Where this body part's union image (in its own top-left-origin local space) lands within
    /// the whole avatar canvas.
    private func placeBodyPart(layers: BodyPartLayers, direction: Int, action: ActionDefinition, scale: AvatarScaleType, canvasOffsetConst: Double) -> (x: Double, y: Double) {
        let isFlipped = AvatarDirectionAngle.directionIsFlipped[((direction % 8) + 8) % 8]
        let boundsWidth = Double(layers.bounds.width)

        // `point = (-bounds.x, -bounds.y)`, then (if isFlipped) `ImageData`'s constructor mutation
        // `regPoint.x = -x + containerWidth` is applied again for the union's own regPoint.
        let unionRegPointX = isFlipped ? (Double(layers.bounds.minX) + boundsWidth) : -Double(layers.bounds.minX)
        let unionRegPointY = -Double(layers.bounds.minY)

        var offsetX = -unionRegPointX
        let offsetY = canvasOffsetConst - unionRegPointY

        if isFlipped, action.assetPartDefinition != "lay" { offsetX += (scale == .large ? 67 : 31) }

        return (offsetX, offsetY)
    }

    private static func rect(x: Double, y: Double, width: Double, height: Double) -> CGRect {
        CGRect(x: CGFloat(x), y: CGFloat(y), width: CGFloat(width), height: CGFloat(height))
    }
}

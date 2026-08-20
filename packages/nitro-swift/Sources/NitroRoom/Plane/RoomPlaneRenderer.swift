import CoreGraphics
import Foundation
import SpriteKit

import NitroCore

/// One plane ready to be drawn by `NitroRendererKit`, mirroring what `RoomVisualization.updateSprite`
/// would have written onto a pooled `IRoomObjectSprite`.
public struct RoomPlaneDraw {
    public let uniqueId: Int
    public let type: Int
    public let texture: SKTexture
    public let offset: CGPoint
    public let color: UInt32
    public let relativeDepth: Double
}

/// A server-driven mask placement, matching one entry of `RoomMapMaskData.masks` (`IRoomMapMask`).
public struct RoomMaskPlacement {
    public let type: String
    public let category: String
    public let location: Vector3d

    public init(type: String, category: String, location: Vector3d) {
        self.type = type
        self.category = category
        self.location = location
    }

    /// `RoomPlaneBitmapMaskData.HOLE` - landscape planes only bitmap-mask (vs. simply toggling
    /// visibility) for mask categories matching this.
    public static let holeCategory = "hole"
}

/// Swift port of `RoomVisualization` (packages/nitro-renderer/src/room/object/visualization/room/RoomVisualization.ts),
/// minus the `RoomObjectSpriteVisualization`/`IRoomObjectSprite` pooling layer this port doesn't have
/// (same simplification as `FurnitureVisualization` - see its doc comment). Owns a room's plane list,
/// assigns the geometric face-shading colors, derives the deterministic per-plane random seed
/// sequence, and each frame updates every `RoomPlane` and returns the resulting draw list.
public final class RoomPlaneRenderer {
    private static let floorColor: UInt32 = 0xFFFFFF
    private static let floorColorLeft: UInt32 = 0xDDDDDD
    private static let floorColorRight: UInt32 = 0xBBBBBB
    private static let wallColorTop: UInt32 = 0xFFFFFF
    private static let wallColorSide: UInt32 = 0xCCCCCC
    private static let wallColorBottom: UInt32 = 0x999999
    private static let wallColorBorder: UInt32 = 0x999999
    private static let landscapeColorTop: UInt32 = 0xFFFFFF
    private static let landscapeColorSide: UInt32 = 0xCCCCCC
    private static let landscapeColorBottom: UInt32 = 0x999999
    private static let roomDepthOffset: Double = 1000

    private let context: RoomPlaneRenderContext
    private var planes: [RoomPlane] = []

    /// Matches `this.object.getLocation()` - the room object's own placement, used as the `origin`
    /// every plane measures its screen offset from. A room object sits at the room's origin.
    public var roomObjectLocation = Vector3d(0, 0, 0)

    public var floorType: String = "" { didSet { applyPlaneIds() } }
    public var wallType: String = "" { didSet { applyPlaneIds() } }
    public var landscapeType: String = "" { didSet { applyPlaneIds() } }

    public var floorVisible = true
    public var wallVisible = true
    public var landscapeVisible = true

    /// Raw `RoomBackgroundColor` model value (see `RoomPlaneRenderer.finalColor` for its unusual
    /// byte layout, replicated exactly from the TS bit-shift arithmetic rather than reinterpreted).
    public var backgroundColor: UInt32 = 0xFFFFFF
    public var colorizeBackgroundOnly = true

    public init(context: RoomPlaneRenderContext) {
        self.context = context
    }

    /// `initialRandomSeed` should be the room model's `RoomRandomSeed` value when available (this
    /// port has no server/message layer to source it from automatically); defaults to `Randomizer.defaultSeed`.
    public func setPlanes(_ planeData: [RoomPlaneData], initialRandomSeed: Int = Randomizer.defaultSeed) {
        planes.forEach { $0.dispose() }
        planes = []

        var landscapeOffsetX: Double = 0
        var randomSeed = initialRandomSeed

        for data in planeData {
            randomSeed = Int(Int32(truncatingIfNeeded: Int64(randomSeed) &* 7613 &+ 517))

            let crossNormal = Vector3d.crossProduct(data.leftSide, data.rightSide)
            let plane: RoomPlane

            switch data.type {
                case RoomPlaneData.planeFloor:
                    let lx = data.loc.x + data.leftSide.x + 0.5
                    let ry = data.loc.y + data.rightSide.y + 0.5
                    let textureOffsetX = lx.rounded(.towardZero) - lx
                    let textureOffsetY = ry.rounded(.towardZero) - ry

                    plane = RoomPlane(
                        origin: roomObjectLocation, location: data.loc, leftSide: data.leftSide, rightSide: data.rightSide,
                        type: RoomPlane.typeFloor, usesMask: true, secondaryNormals: data.secondaryNormals, randomSeed: randomSeed,
                        textureOffsetX: -textureOffsetX, textureOffsetY: -textureOffsetY, context: context
                    )
                    plane.color = crossNormal.z != 0
                        ? RoomPlaneRenderer.floorColor
                        : (crossNormal.x != 0 ? RoomPlaneRenderer.floorColorRight : RoomPlaneRenderer.floorColorLeft)

                case RoomPlaneData.planeWall:
                    plane = RoomPlane(
                        origin: roomObjectLocation, location: data.loc, leftSide: data.leftSide, rightSide: data.rightSide,
                        type: RoomPlane.typeWall, usesMask: true, secondaryNormals: data.secondaryNormals, randomSeed: randomSeed,
                        context: context
                    )
                    plane.color = (crossNormal.x == 0 && crossNormal.y == 0)
                        ? RoomPlaneRenderer.wallColorBorder
                        : (crossNormal.y > 0 ? RoomPlaneRenderer.wallColorTop : (crossNormal.y == 0 ? RoomPlaneRenderer.wallColorSide : RoomPlaneRenderer.wallColorBottom))

                default: // landscape
                    plane = RoomPlane(
                        origin: roomObjectLocation, location: data.loc, leftSide: data.leftSide, rightSide: data.rightSide,
                        type: RoomPlane.typeLandscape, usesMask: true, secondaryNormals: data.secondaryNormals, randomSeed: randomSeed,
                        textureOffsetX: landscapeOffsetX, textureOffsetY: 0, context: context
                    )
                    plane.color = crossNormal.y > 0
                        ? RoomPlaneRenderer.landscapeColorTop
                        : (crossNormal.y == 0 ? RoomPlaneRenderer.landscapeColorSide : RoomPlaneRenderer.landscapeColorBottom)

                    landscapeOffsetX += data.leftSide.length
            }

            for mask in data.masks {
                plane.addRectangleMask(leftLocation: mask.leftSideLoc, rightLocation: mask.rightSideLoc, leftLength: mask.leftSideLength, rightLength: mask.rightSideLength)
            }

            planes.append(plane)
        }

        applyPlaneIds()
    }

    private func applyPlaneIds() {
        for plane in planes {
            switch plane.type {
                case RoomPlane.typeFloor where !floorType.isEmpty: plane.id = floorType
                case RoomPlane.typeWall where !wallType.isEmpty: plane.id = wallType
                case RoomPlane.typeLandscape where !landscapeType.isEmpty: plane.id = landscapeType
                default: break
            }
        }
    }

    /// Mirrors `RoomVisualization.updatePlaneMasks`: reconciles server-sent mask placements against
    /// every wall/landscape plane's geometry (matched by which plane the mask location lies on),
    /// adding bitmap masks or toggling landscape visibility as appropriate.
    public func updateMasks(_ masks: [RoomMaskPlacement]) {
        for plane in planes { plane.resetBitmapMasks() }

        var visibleLandscapeIndices = Set<Int>()

        for mask in masks {
            for (index, plane) in planes.enumerated() {
                guard plane.type == RoomPlane.typeWall || plane.type == RoomPlane.typeLandscape else { continue }

                let diff = Vector3d.dif(mask.location, plane.location)
                let distance = abs(Vector3d.scalarProjection(diff, plane.normal))

                guard distance < 0.01 else { continue }

                let leftSideLoc = Vector3d.scalarProjection(diff, plane.leftSide)
                let rightSideLoc = Vector3d.scalarProjection(diff, plane.rightSide)

                if plane.type == RoomPlane.typeWall || (plane.type == RoomPlane.typeLandscape && mask.category == RoomMaskPlacement.holeCategory) {
                    plane.addBitmapMask(type: mask.type, leftSideLoc: leftSideLoc, rightSideLoc: rightSideLoc)
                } else if plane.type == RoomPlane.typeLandscape {
                    plane.canBeVisible = true
                    visibleLandscapeIndices.insert(index)
                }
            }
        }

        for (index, plane) in planes.enumerated() where plane.type == RoomPlane.typeLandscape {
            if !visibleLandscapeIndices.contains(index) { plane.canBeVisible = false }
        }
    }

    @discardableResult
    public func update(_ geometry: RoomGeometry) -> [RoomPlaneDraw] {
        var draws: [RoomPlaneDraw] = []

        for (index, plane) in planes.enumerated() {
            guard typeVisible(plane.type) else { continue }

            plane.update(geometry)

            guard plane.visible, let texture = plane.planeTexture else { continue }

            var depth = plane.relativeDepth + Double(index) / 1000
            depth += plane.type == RoomPlane.typeFloor ? (RoomPlaneRenderer.roomDepthOffset + 0.1) : (RoomPlaneRenderer.roomDepthOffset + 0.5)

            if plane.type != RoomPlane.typeFloor, plane.leftSideLength < 1 || plane.rightSideLength < 1 {
                depth += RoomPlaneRenderer.roomDepthOffset * 0.5
            }

            draws.append(RoomPlaneDraw(uniqueId: plane.uniqueId, type: plane.type, texture: texture, offset: plane.offset, color: finalColor(for: plane), relativeDepth: depth))
        }

        return draws
    }

    private func typeVisible(_ type: Int) -> Bool {
        switch type {
            case RoomPlane.typeFloor: return floorVisible
            case RoomPlane.typeWall: return wallVisible
            case RoomPlane.typeLandscape: return landscapeVisible
            default: return true
        }
    }

    /// Mirrors the per-byte multiply in `RoomVisualization.update` exactly (bit-for-bit, including
    /// its unconventional low-to-high byte order) rather than reinterpreting it as RGB, since
    /// `plane.color`'s shading constants are always R=G=B (0xffffff/0xdddddd/...), making the byte
    /// order unobservable there - only faithfully replicating the arithmetic guarantees the same
    /// result once a real (asymmetric) background color is involved.
    private func finalColor(for plane: RoomPlane) -> UInt32 {
        guard plane.type != RoomPlane.typeLandscape, colorizeBackgroundOnly else { return plane.color }

        let base = plane.color
        let redColor = backgroundColor & 0xFF
        let greenColor = (backgroundColor >> 8) & 0xFF
        let blueColor = (backgroundColor >> 16) & 0xFF

        let r = ((base & 0xFF) * redColor) / 0xFF
        let g = (((base >> 8) & 0xFF) * greenColor) / 0xFF
        let b = (((base >> 16) & 0xFF) * blueColor) / 0xFF
        let a = base >> 24

        return (a << 24) + (b << 16) + (g << 8) + r
    }
}

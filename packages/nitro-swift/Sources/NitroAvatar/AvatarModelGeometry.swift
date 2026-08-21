import CoreGraphics
import Foundation

import NitroCore

/// Swift port of `AvatarCanvas` (packages/nitro-renderer/src/avatar/structure/AvatarCanvas.ts).
public struct AvatarCanvasInfo {
    public let id: String
    public let width: Double
    public let height: Double
    public let offset: CGPoint
    public let regPoint: CGPoint
}

/// Swift port of `AvatarSet` (packages/nitro-renderer/src/avatar/geometry/AvatarSet.ts) - a named,
/// possibly-nested group of body-part ids (e.g. "full" contains "body" + "head").
private final class AvatarSetNode {
    let id: String
    private let isMainSelf: Bool
    private let children: [AvatarSetNode]
    let allBodyParts: [String]

    init(config: AvatarSetConfig) {
        id = config.id
        isMainSelf = config.main ?? false
        children = (config.avatarSets ?? []).map { AvatarSetNode(config: $0) }

        var all = (config.bodyParts ?? []).map(\.id)

        for child in children { all.append(contentsOf: child.allBodyParts) }

        allBodyParts = all
    }

    func find(_ setType: String) -> AvatarSetNode? {
        if setType == id { return self }

        for child in children { if let found = child.find(setType) { return found } }

        return nil
    }

    var isMain: Bool {
        if isMainSelf { return true }

        return children.contains { $0.isMain }
    }
}

/// Swift port of `AvatarModelGeometry` (packages/nitro-renderer/src/avatar/geometry/AvatarModelGeometry.ts).
/// Parses the embedded `HabboAvatarGeometry` config once and answers depth-sorted "which figure
/// part types / body parts are visible, in what order" queries.
///
/// Not ported: dynamic (animation-added) items (`addPart`/`getDynamicParts`/`removeDynamicItems`) -
/// these back the FX/`addData` layer-injection system (`AvatarStructure.getActiveBodyPartIds`'s
/// `isAnimation` branch), which needs the separate effects/`AnimationManager` system this port
/// hasn't ported yet (see the README) - `getParts` below only sorts each body part's *statically*
/// declared items, matching every non-effects action.
public final class AvatarModelGeometry {
    public let camera: Vector3d
    private let avatarSet: AvatarSetNode
    /// geometryType -> bodyPartId -> (own node, static items)
    private var bodyParts: [String: [String: (node: AvatarGeometryNode, items: [AvatarGeometryNode])]] = [:]
    /// geometryType -> figure part type -> owning body part id. Avatar-instance-independent (unlike
    /// the TS original's `getBodyPartOfItem`, which also falls back to per-avatar *dynamic* items -
    /// out of scope here, see above), since it's built once from each body part's statically
    /// declared `items`, mirroring `GeometryBodyPart.getPartIds(undefined)`.
    private var itemIdToBodyPart: [String: [String: String]] = [:]
    /// scale -> geometryType -> canvas
    private var canvases: [String: [String: AvatarCanvasInfo]] = [:]

    public init(config: AvatarGeometryConfig) {
        camera = Vector3d(config.camera.x, config.camera.y, config.camera.z)
        avatarSet = AvatarSetNode(config: config.avatarSets.first ?? AvatarSetConfig(id: "full", main: nil, bodyParts: nil, avatarSets: nil))

        for canvasSet in config.canvases {
            var geometryMap: [String: AvatarCanvasInfo] = [:]

            for geometry in canvasSet.geometries {
                let baseWidth: Double = canvasSet.scale == AvatarScaleType.large.rawValue ? 64 : 32
                let regX = (geometry.width - baseWidth) / 2

                geometryMap[geometry.id] = AvatarCanvasInfo(
                    id: geometry.id, width: geometry.width, height: geometry.height,
                    offset: CGPoint(x: CGFloat(geometry.dx), y: CGFloat(geometry.dy)),
                    regPoint: CGPoint(x: CGFloat(regX), y: 0)
                )
            }

            canvases[canvasSet.scale] = geometryMap
        }

        for type in config.types {
            var parts: [String: (node: AvatarGeometryNode, items: [AvatarGeometryNode])] = [:]
            var itemOwners: [String: String] = [:]

            for bodyPart in type.bodyParts {
                let location = Vector3d(bodyPart.x ?? 0, bodyPart.y ?? 0, bodyPart.z ?? 0)
                let node = AvatarGeometryNode(id: bodyPart.id, location: location, radius: bodyPart.radius ?? 0)
                let items = (bodyPart.items ?? []).map {
                    AvatarGeometryNode(id: $0.id, location: Vector3d($0.x, $0.y, $0.z), radius: $0.radius)
                }

                parts[bodyPart.id] = (node, items)

                for item in items { itemOwners[item.id] = bodyPart.id }
            }

            bodyParts[type.id] = parts
            itemIdToBodyPart[type.id] = itemOwners
        }
    }

    /// The body part a given figure part type (e.g. `"lh"`) belongs to, for the given geometry
    /// type - `nil` if that figure part type has no statically-declared owner (see the class doc
    /// comment for the dynamic-items caveat).
    public func getBodyPartOfItem(geometryType: AvatarGeometryType, itemId: AvatarFigurePartType) -> AvatarBodyPartType? {
        itemIdToBodyPart[geometryType.rawValue]?[itemId.rawValue].flatMap { AvatarBodyPartType(rawValue: $0) }
    }

    public func getBodyPartIds(inAvatarSet setType: AvatarSetType) -> [AvatarBodyPartType] {
        (avatarSet.find(setType.rawValue)?.allBodyParts ?? []).compactMap { AvatarBodyPartType(rawValue: $0) }
    }

    public func isMainAvatarSet(_ setType: AvatarSetType) -> Bool { avatarSet.find(setType.rawValue)?.isMain ?? false }

    public func getCanvas(scale: AvatarScaleType, geometryType: AvatarGeometryType) -> AvatarCanvasInfo? {
        canvases[scale.rawValue]?[geometryType.rawValue]
    }

    /// Which figure part types are declared for this body part, nearest-camera-first. `direction`
    /// here is the raw value passed straight to the Y-rotation matrix - see `sortAvatarNodesByDepth`'s
    /// doc comment for why this deliberately does *not* go through `AvatarDirectionAngle.directionToAngle`.
    public func getParts(geometryType: AvatarGeometryType, bodyPartId: AvatarBodyPartType, direction: Int) -> [AvatarFigurePartType] {
        guard let part = bodyParts[geometryType.rawValue]?[bodyPartId.rawValue] else { return [] }

        return sortAvatarNodesByDepth(part.items, angleDegrees: Double(direction), camera: camera).compactMap { AvatarFigurePartType(rawValue: $0) }
    }

    public func getBodyPart(geometryType: AvatarGeometryType, bodyPartId: AvatarBodyPartType) -> Bool {
        bodyParts[geometryType.rawValue]?[bodyPartId.rawValue] != nil
    }

    /// Body parts belonging to `setType`, nearest-camera-first, at the given 0-7 facing direction
    /// (converted to degrees via `AvatarDirectionAngle.directionToAngle`, unlike `getParts` above).
    public func getBodyPartsAtAngle(setType: AvatarSetType, direction: Int, geometryType: AvatarGeometryType) -> [AvatarBodyPartType] {
        guard let partsMap = bodyParts[geometryType.rawValue] else { return [] }

        let idsInSet = getBodyPartIds(inAvatarSet: setType)
        let nodes = idsInSet.compactMap { partsMap[$0.rawValue]?.node }
        let angleIndex = ((direction % 8) + 8) % 8
        let angle = Double(AvatarDirectionAngle.directionToAngle[angleIndex])

        return sortAvatarNodesByDepth(nodes, angleDegrees: angle, camera: camera).compactMap { AvatarBodyPartType(rawValue: $0) }
    }
}

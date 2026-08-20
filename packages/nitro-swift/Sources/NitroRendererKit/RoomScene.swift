import Foundation
import SpriteKit

import NitroAssets
import NitroAvatar
import NitroCore
import NitroRoom

/// Minimal SpriteKit room scene: owns the asset pipeline and room camera (`RoomGeometry`) and
/// places `RoomPlaneNode`/`FurnitureNode`/`AvatarNode`s at their projected screen position. See
/// the package README for current coverage.
open class RoomScene: SKScene {
    public let assetManager: AssetManager
    public let roomLayer = SKNode()
    public let objectLayer = SKNode()

    public private(set) var roomPlaneNode: RoomPlaneNode?
    private var roomPlaneRenderer: RoomPlaneRenderer?

    public let avatarAssets: AssetAliasCollection
    /// `nil` only if the bundled default avatar geometry/part-set resources failed to decode -
    /// shouldn't happen with the package as shipped. Real figure data (`figuredata.json`) still
    /// needs to be injected via `avatarStructure?.injectFigureData(...)` before avatars have any
    /// real clothing to draw - see `AvatarDefaults.makeStructure()`'s doc comment.
    public let avatarStructure: AvatarStructure?
    public let avatarCompositor: AvatarCompositor?

    /// Matches the live room camera constructed by `RoomSpriteCanvas.ts`: yaw -135, pitch 30,
    /// at tile (11,11,5), scale 64 (zoomed in).
    public let geometry: RoomGeometry

    /// Matches `RoomObjectSpriteVisualization.UPDATE_TIME_INCREASER` (41ms, ~24.4fps) - the classic
    /// Habbo furniture-animation tick rate, deliberately decoupled from the render frame rate.
    private static let animationUpdateInterval: TimeInterval = 0.041
    private var lastAnimationUpdateTime: TimeInterval = -1

    public override init(size: CGSize) {
        let manager = AssetManager()
        let aliasCollection = AssetAliasCollection(assetManager: manager)
        let structure = AvatarDefaults.makeStructure()

        assetManager = manager
        avatarAssets = aliasCollection
        avatarStructure = structure
        avatarCompositor = structure.map { AvatarCompositor(structure: $0, assets: aliasCollection) }
        geometry = RoomGeometry(
            scale: .zoomedIn,
            direction: Vector3d(-135, 30, 0),
            location: Vector3d(11, 11, 5),
            depth: Vector3d(-135, 0.5, 0)
        )

        super.init(size: size)

        addChild(roomLayer)
        addChild(objectLayer)
    }

    public required init?(coder aDecoder: NSCoder) { fatalError("init(coder:) has not been implemented") }

    /// Advances every placed animated furniture item's animation state machine, clamped to the
    /// classic ~24.4fps tick rate regardless of the actual render frame rate - mirrors
    /// `FurnitureVisualization.update`'s own `_lastUpdateTime` accumulator/catch-up-clamp logic
    /// (see `UPDATE_TIME_INCREASER` above), just hoisted up to the scene since this port has no
    /// per-object `update(geometry:time:...)` call chain to hang it off of.
    open override func update(_ currentTime: TimeInterval) {
        super.update(currentTime)

        if lastAnimationUpdateTime < 0 { lastAnimationUpdateTime = currentTime }

        guard currentTime >= lastAnimationUpdateTime + RoomScene.animationUpdateInterval else { return }

        lastAnimationUpdateTime += RoomScene.animationUpdateInterval

        if lastAnimationUpdateTime + RoomScene.animationUpdateInterval < currentTime {
            lastAnimationUpdateTime = currentTime - RoomScene.animationUpdateInterval
        }

        for case let node as FurnitureNode in objectLayer.children { node.tickAnimation() }
    }

    @discardableResult
    public func loadFurnitureBundle(data: Data) throws -> GraphicAssetCollection {
        try assetManager.loadNitroBundle(data: data)
    }

    /// Loads a room's `.nitro` bundle (its floor/wall/landscape material tables + bitmap masks)
    /// and a heightmap, and bakes the floor/wall planes. `heightmapRows` uses the classic Habbo
    /// heightmap string format - see `RoomHeightGrid`. Only a reduced-fidelity plane generator is
    /// available (`SimpleRoomPlaneParser`) - see its doc comment for what it doesn't handle.
    @discardableResult
    public func loadRoom(bundleData: Data, heightmapRows: [String], randomSeed: Int = Randomizer.defaultSeed) throws -> RoomPlaneNode {
        let collection = try assetManager.loadNitroBundle(data: bundleData)
        let context = RoomPlaneRenderContext.make(from: collection, assetManager: assetManager)
        let renderer = RoomPlaneRenderer(context: context)
        let parser = SimpleRoomPlaneParser()
        let grid = RoomHeightGrid(rows: heightmapRows)

        renderer.setPlanes(parser.parse(grid), initialRandomSeed: randomSeed)

        roomPlaneNode?.removeFromParent()

        let node = RoomPlaneNode(renderer: renderer)

        roomPlaneRenderer = renderer
        roomPlaneNode = node
        roomLayer.addChild(node)

        refreshRoomPlanes()

        return node
    }

    /// Re-bakes every plane for the current camera state - call after changing `geometry`
    /// (zoom/rotate) or after `loadRoom`.
    public func refreshRoomPlanes() {
        roomPlaneNode?.refresh(geometry: geometry)
    }

    /// Places one instance of an already-loaded furniture type at `tile` (room tile coordinates,
    /// z = stack height) facing `objectDirectionX` (0-315, step 45).
    @discardableResult
    public func placeFurniture(type: String, at tile: Vector3d, objectDirectionX: Double, selectedColorId: Int = 0) -> FurnitureNode? {
        guard let collection = assetManager.getCollection(type) else {
            NitroLogger.warn("RoomScene: no loaded collection for furniture type \(type)")

            return nil
        }

        guard let visualization = FurnitureVisualizationFactory.make(from: collection) else {
            NitroLogger.warn("RoomScene: failed to build visualization for furniture type \(type)")

            return nil
        }

        let node = FurnitureNode(visualization: visualization)

        node.position = geometry.getScreenPoint(tile)
        node.refresh(
            scale: Int(geometry.scale), cameraDirectionX: geometry.direction.x,
            objectDirectionX: objectDirectionX, selectedColorId: selectedColorId
        )

        objectLayer.addChild(node)

        return node
    }

    /// Places a standing avatar at `tile`, facing `direction` (0-7). Requires `avatarStructure` to
    /// have real figure data injected first (see `avatarStructure`'s doc comment) and the relevant
    /// avatar part `.nitro` bundles already loaded into `assetManager`/`avatarAssets`.
    @discardableResult
    public func placeAvatar(figure: AvatarFigureContainer, at tile: Vector3d, direction: Int) -> AvatarNode? {
        guard let compositor = avatarCompositor else {
            NitroLogger.warn("RoomScene: avatar structure failed to load from bundled defaults")

            return nil
        }

        guard let standAction = AvatarDefaults.standAction() else {
            NitroLogger.warn("RoomScene: no default Stand action available")

            return nil
        }

        avatarAssets.reset()

        let node = AvatarNode(compositor: compositor)

        node.position = geometry.getScreenPoint(tile)

        guard node.refresh(figure: figure, direction: direction, action: standAction) else { return nil }

        objectLayer.addChild(node)

        return node
    }
}

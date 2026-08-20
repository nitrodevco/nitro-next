import Foundation
import SpriteKit

import NitroAssets
import NitroCore
import NitroRoom

/// Minimal SpriteKit room scene: owns the asset pipeline and room camera (`RoomGeometry`) and
/// places `FurnitureNode`s at their projected screen position. This is intentionally small - the
/// floor/wall plane baking (`RoomPlane`) and the avatar pipeline are not wired in yet, see the
/// package README for current coverage.
open class RoomScene: SKScene {
    public let assetManager = AssetManager()
    public let objectLayer = SKNode()

    /// Matches the live room camera constructed by `RoomSpriteCanvas.ts`: yaw -135, pitch 30,
    /// at tile (11,11,5), scale 64 (zoomed in).
    public let geometry = RoomGeometry(
        scale: .zoomedIn,
        direction: Vector3d(-135, 30, 0),
        location: Vector3d(11, 11, 5),
        depth: Vector3d(-135, 0.5, 0)
    )

    public override init(size: CGSize) {
        super.init(size: size)

        addChild(objectLayer)
    }

    public required init?(coder aDecoder: NSCoder) { fatalError("init(coder:) has not been implemented") }

    @discardableResult
    public func loadFurnitureBundle(data: Data) throws -> GraphicAssetCollection {
        try assetManager.loadNitroBundle(data: data)
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
}

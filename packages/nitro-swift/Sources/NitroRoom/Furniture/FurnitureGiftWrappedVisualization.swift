import Foundation

import NitroAssets

/// Swift port of `FurnitureGiftWrappedVisualization` (packages/nitro-renderer/src/room/object/visualization/furniture/FurnitureGiftWrappedVisualization.ts) -
/// a wrapped-present furniture item whose packet/ribbon graphic is picked entirely from a single
/// packed number (`extras = packetType * 1000 + ribbonType`), with no animation involved. Composed
/// with a plain `FurnitureVisualization` the same way `FurnitureAnimatedVisualization` is (see its
/// doc comment) rather than subclassed from it, since gift-wrapped furniture has nothing to do
/// with the animation-frame state machine - it only needs the frame-number override hook.
///
/// `extras` is genuinely available without a networking layer: it's `RoomFurnitureData.extra`,
/// present at placement time - `RoomScene.placeFurniture(from:)` wires it in automatically for
/// gift-wrapped items (see `FurnitureVisualizationFactory`).
public final class FurnitureGiftWrappedVisualization: FurnitureVisualizing {
    private let visualization: FurnitureVisualization
    public var data: FurnitureVisualizationData { visualization.data }

    private(set) var packetType: Double = 0
    private(set) var ribbonType: Double = 0

    public init(data: FurnitureVisualizationData, collection: GraphicAssetCollection) {
        visualization = FurnitureVisualization(data: data, collection: collection)
    }

    /// Splits a packed `extras` value into its packet/ribbon components - matches
    /// `updatePresentWrap`'s `Math.floor(extras / 1000)` / `extras % 1000` exactly.
    public func setExtra(_ extras: Double) {
        packetType = (extras / 1000).rounded(.down)
        ribbonType = extras.truncatingRemainder(dividingBy: 1000)
    }

    public func resolveDirection(scale: Int, cameraDirectionX: Double, objectDirectionX: Double) -> Int {
        visualization.resolveDirection(scale: scale, cameraDirectionX: cameraDirectionX, objectDirectionX: objectDirectionX)
    }

    public func computeLayers(
        scale: Int,
        direction: Int,
        selectedColorId: Int = 0,
        alphaMultiplier: Double = 1,
        furnitureLift: Double = 0,
        lookThrough: Bool = false
    ) -> [FurnitureLayerDraw] {
        visualization.computeLayers(
            scale: scale, direction: direction, selectedColorId: selectedColorId,
            alphaMultiplier: alphaMultiplier, furnitureLift: furnitureLift, lookThrough: lookThrough,
            // Matches `getFrameNumber`: layers 0/1 ("a"/"b") show the packet graphic, every other
            // layer (including the shadow) shows the ribbon graphic.
            layerOverride: { layerId in
                FurnitureLayerOverride(frameNumber: layerId <= 1 ? self.packetType : self.ribbonType)
            },
            alphaOverride: nil
        )
    }
}

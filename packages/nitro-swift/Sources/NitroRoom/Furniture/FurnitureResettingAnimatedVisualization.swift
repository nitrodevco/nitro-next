import Foundation

import NitroAssets

/// Swift port of `FurnitureResettingAnimatedVisualization` (packages/nitro-renderer/src/room/object/visualization/furniture/FurnitureResettingAnimatedVisualization.ts) -
/// identical to `FurnitureAnimatedVisualization` except it always resets to a transition-from
/// animation when re-entering its current state (`usesAnimationResetting() => true` in TS).
public final class FurnitureResettingAnimatedVisualization: FurnitureAnimatedVisualization {
    public override init(data: FurnitureVisualizationData, collection: GraphicAssetCollection) {
        super.init(data: data, collection: collection)

        usesAnimationResetting = true
    }
}

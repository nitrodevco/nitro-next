import Foundation

import NitroAssets

/// Swift port of `FurnitureQueueTileVisualization` (packages/nitro-renderer/src/room/object/visualization/furniture/FurnitureQueueTileVisualization.ts) -
/// a "step here" queue-tile marker that, when told to roll once (`setAnimation(2)`), plays a short
/// timed animation and then queues a return to the normal idle animation once
/// `ANIMATION_DURATION` ticks have elapsed. Fully self-contained animation sequencing, no
/// server-message dependency.
public final class FurnitureQueueTileVisualization: FurnitureAnimatedVisualization {
    private static let animationIdRoll = 3
    private static let animationIdRollOnce = 2
    private static let animationIdNormal = 1
    private static let animationDuration = 15

    private var stateQueue: [Int] = []
    private var animationCounter = -1

    public override func setAnimation(_ animationId: Int) {
        if animationId == FurnitureQueueTileVisualization.animationIdRollOnce {
            stateQueue = [FurnitureQueueTileVisualization.animationIdNormal]
            animationCounter = FurnitureQueueTileVisualization.animationDuration
        }

        super.setAnimation(animationId)
    }

    public override func tick(scale: Int) -> Int {
        if animationCounter > 0 { animationCounter -= 1 }

        if animationCounter == 0, !stateQueue.isEmpty {
            super.setAnimation(stateQueue.removeFirst())
        }

        return super.tick(scale: scale)
    }

    public override init(data: FurnitureVisualizationData, collection: GraphicAssetCollection) {
        super.init(data: data, collection: collection)

        usesAnimationResetting = true
    }
}

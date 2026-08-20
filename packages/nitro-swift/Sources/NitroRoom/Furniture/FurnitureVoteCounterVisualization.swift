import Foundation

/// Swift port of `FurnitureVoteCounterVisualization` (packages/nitro-renderer/src/room/object/visualization/furniture/FurnitureVoteCounterVisualization.ts) -
/// a three-digit vote-count display. The count itself (`model[.furnitureVoteCounterCount]`) is
/// server-pushed state in the original; populate it on `model` from whatever the host app's own
/// vote-tracking source is - see `FurnitureAnimatedVisualization`'s doc comment.
public final class FurnitureVoteCounterVisualization: FurnitureAnimatedVisualization {
    private static let onesSprite = "ones_sprite"
    private static let tensSprite = "tens_sprite"
    private static let hundredsSprite = "hundreds_sprite"
    private static let hideCounterScore = -1

    public override func getFrameNumber(scale: Int, layerId: Int) -> Double {
        let result: Int = model.getValue(.furnitureVoteCounterCount) ?? 0
        let tag = data.getLayerTag(scale, direction, layerId)

        switch tag {
            case FurnitureVoteCounterVisualization.onesSprite: return Double(result % 10)
            case FurnitureVoteCounterVisualization.tensSprite: return Double((result / 10) % 10)
            case FurnitureVoteCounterVisualization.hundredsSprite: return Double((result / 100) % 10)
            default: return super.getFrameNumber(scale: scale, layerId: layerId)
        }
    }

    public override func getLayerAlpha(scale: Int, direction: Int, layerId: Int, defaultAlpha: Double) -> Double {
        let result: Int = model.getValue(.furnitureVoteCounterCount) ?? 0

        if result == FurnitureVoteCounterVisualization.hideCounterScore {
            switch data.getLayerTag(scale, direction, layerId) {
                case FurnitureVoteCounterVisualization.onesSprite,
                     FurnitureVoteCounterVisualization.tensSprite,
                     FurnitureVoteCounterVisualization.hundredsSprite:
                    return 0
                default: break
            }
        }

        return super.getLayerAlpha(scale: scale, direction: direction, layerId: layerId, defaultAlpha: defaultAlpha)
    }
}

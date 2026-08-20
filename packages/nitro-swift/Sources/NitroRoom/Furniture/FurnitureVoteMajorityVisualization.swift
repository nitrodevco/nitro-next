import Foundation

/// Swift port of `FurnitureVoteMajorityVisualization` (packages/nitro-renderer/src/room/object/visualization/furniture/FurnitureVoteMajorityVisualization.ts) -
/// a three-digit vote-result display that additionally hides its digits while the result is
/// pending (`currentState` in `{-1, 1}`) or explicitly marked hidden. The result value itself is
/// server-pushed state in the original - populate `model[.furnitureVoteMajorityResult]` from the
/// host app's own source, see `FurnitureAnimatedVisualization`'s doc comment.
public final class FurnitureVoteMajorityVisualization: FurnitureAnimatedVisualization {
    private static let onesSprite = "ones_sprite"
    private static let tensSprite = "tens_sprite"
    private static let hundredsSprite = "hundreds_sprite"
    private static let hideResultsStates = [-1, 1]
    private static let hideResultsValue = -1

    public override func getFrameNumber(scale: Int, layerId: Int) -> Double {
        let result: Int = model.getValue(.furnitureVoteMajorityResult) ?? 0
        let tag = data.getLayerTag(scale, direction, layerId)

        switch tag {
            case FurnitureVoteMajorityVisualization.onesSprite: return Double(result % 10)
            case FurnitureVoteMajorityVisualization.tensSprite: return Double((result / 10) % 10)
            case FurnitureVoteMajorityVisualization.hundredsSprite: return Double((result / 100) % 10)
            default: return super.getFrameNumber(scale: scale, layerId: layerId)
        }
    }

    public override func getLayerAlpha(scale: Int, direction: Int, layerId: Int, defaultAlpha: Double) -> Double {
        let result: Int = model.getValue(.furnitureVoteMajorityResult) ?? 0

        if FurnitureVoteMajorityVisualization.hideResultsStates.contains(currentState)
            || result == FurnitureVoteMajorityVisualization.hideResultsValue {
            switch data.getLayerTag(scale, direction, layerId) {
                case FurnitureVoteMajorityVisualization.onesSprite,
                     FurnitureVoteMajorityVisualization.tensSprite,
                     FurnitureVoteMajorityVisualization.hundredsSprite:
                    return 0
                default: break
            }
        }

        return super.getLayerAlpha(scale: scale, direction: direction, layerId: layerId, defaultAlpha: defaultAlpha)
    }
}

import Foundation

/// Swift port of `AnimationSizeData` (packages/nitro-renderer/src/room/object/visualization/data/AnimationSizeData.ts) -
/// extends `SizeData` with the `animations` table for one declared furniture size. Not `final` -
/// mirrors the original's `class AnimationSizeData extends SizeData` shape, which the TS source
/// itself further subclasses (`PetSizeData`); pet visualization is out of scope for this port (see
/// the README), but the class is left open for that same reason `SizeData` was.
public class AnimationSizeData: SizeData {
    private var animations: [Int: AnimationData] = [:]
    private var animationIds: [Int] = []

    public override init(layerCount: Int, angle: Double) {
        super.init(layerCount: layerCount, angle: angle)
    }

    @discardableResult
    public func defineAnimations(_ animationList: [AssetVisualAnimation]) -> Bool {
        for animation in animationList {
            var animationId = animation.id

            if let transitionTo = animation.transitionTo {
                animationId = AnimationData.getTransitionToAnimationId(transitionTo)
            }

            if let transitionFrom = animation.transitionFrom {
                animationId = AnimationData.getTransitionFromAnimationId(transitionFrom)
            }

            let isTransition = animation.transitionTo != nil || animation.transitionFrom != nil

            let animationData = createAnimationData()

            guard animationData.initialize(animation) else {
                animationData.dispose()

                return false
            }

            if let immediateChangeFrom = animation.immediateChangeFrom {
                var changeIds: [Int] = []

                for change in immediateChangeFrom.split(separator: ",") {
                    if let changeId = Int(change.trimmingCharacters(in: .whitespaces)), !changeIds.contains(changeId) {
                        changeIds.append(changeId)
                    }
                }

                animationData.setImmediateChanges(changeIds)
            }

            animations[animationId] = animationData

            if !isTransition { animationIds.append(animationId) }
        }

        return true
    }

    func createAnimationData() -> AnimationData { AnimationData() }

    public func hasAnimation(_ animationId: Int) -> Bool { animations[animationId] != nil }

    public func getAnimationCount() -> Int { animationIds.count }

    public func getAnimationId(_ animationId: Int) -> Int {
        let total = getAnimationCount()

        guard animationId >= 0, total > 0 else { return 0 }

        return animationIds[animationId % total]
    }

    public func isImmediateChange(_ animationId: Int, _ state: Int) -> Bool {
        animations[animationId]?.isImmediateChange(state) ?? false
    }

    public func getStartFrame(_ animationId: Int, _ direction: Int) -> Double {
        animations[animationId]?.getStartFrame(direction) ?? 0
    }

    public func getFrame(_ animationId: Int, _ direction: Int, _ layerId: Int, _ frameCount: Double) -> AnimationFrame? {
        animations[animationId]?.getFrame(direction, layerId, frameCount)
    }

    public func getFrameFromSequence(
        _ animationId: Int, _ direction: Int, _ layerId: Int, _ sequenceId: Int, _ offset: Int, _ frameCount: Double
    ) -> AnimationFrame? {
        animations[animationId]?.getFrameFromSequence(direction, layerId, sequenceId, offset, frameCount)
    }
}

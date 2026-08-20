import Foundation

/// Swift port of `FurnitureSoundBlockVisualization` (packages/nitro-renderer/src/room/object/visualization/furniture/FurnitureSoundBlockVisualization.ts) -
/// scales the animation playback speed by `model[.furnitureSoundblockRelativeAnimationSpeed]`
/// (a fractional multiplier, server-pushed in the original) using a running fractional
/// accumulator, so a non-integer speed still averages out correctly over time instead of losing
/// its fractional remainder every tick.
///
/// One deliberate difference from the TS original: there, `frameIncrease` (and `AnimationFrame.remainingFrameRepeats`)
/// are plain, possibly-fractional `number`s, so a speed like `0.5` genuinely gives every *frame* a
/// half-length remaining-repeats countdown. This port's `AnimationFrame.remainingFrameRepeats` and
/// `FurnitureAnimatedVisualization.frameIncrease` are `Int` (see their doc comments - true almost
/// everywhere else, since ordinary furniture always uses `frameIncrease = 1`), so here the
/// accumulator is truncated to a whole frame-count per tick before being applied, carrying the
/// fractional remainder forward to the next tick instead. The *average* advance rate over many
/// ticks still converges to the requested speed; what's lost is sub-frame precision within a
/// single tick, which isn't visually distinguishable at animation frame rates.
public final class FurnitureSoundBlockVisualization: FurnitureAnimatedVisualization {
    private var internalFrameIncreaseCounter: Double = 0

    public override func updateAnimations(_ scale: Int) -> Int {
        let speed: Double = model.getValue(.furnitureSoundblockRelativeAnimationSpeed) ?? 1
        internalFrameIncreaseCounter += speed

        frameIncrease = Int(internalFrameIncreaseCounter)
        internalFrameIncreaseCounter -= Double(frameIncrease)

        return super.updateAnimations(scale)
    }
}

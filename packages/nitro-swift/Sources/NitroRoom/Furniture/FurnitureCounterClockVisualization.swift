import Foundation

/// Swift port of `FurnitureCounterClockVisualization` (packages/nitro-renderer/src/room/object/visualization/furniture/FurnitureCounterClockVisualization.ts) -
/// a four-digit "seconds:minutes" clock face built from four separately-tagged layers, each
/// showing one digit-wheel frame computed from `currentState` (the raw elapsed-seconds value the
/// server would normally push via `setState`). Self-contained once given that value - no animation
/// table lookups involved for the digit layers, unlike ordinary animated furniture.
public final class FurnitureCounterClockVisualization: FurnitureAnimatedVisualization {
    private static let secondsSprite = "seconds_sprite"
    private static let tenSecondsSprite = "ten_seconds_sprite"
    private static let minutesSprite = "minutes_sprite"
    private static let tenMinutesSprite = "ten_minutes_sprite"

    public override func getFrameNumber(scale: Int, layerId: Int) -> Double {
        let tag = data.getLayerTag(scale, direction, layerId)
        let animation = currentState

        switch tag {
            case FurnitureCounterClockVisualization.secondsSprite: return Double((animation % 60) % 10)
            case FurnitureCounterClockVisualization.tenSecondsSprite: return Double((animation % 60) / 10)
            case FurnitureCounterClockVisualization.minutesSprite: return Double((animation / 60) % 10)
            case FurnitureCounterClockVisualization.tenMinutesSprite: return Double((animation / 60 / 10) % 10)
            default: return super.getFrameNumber(scale: scale, layerId: layerId)
        }
    }

    /// The clock face itself never plays an "animation" in the state-machine sense - every frame
    /// comes straight from `getFrameNumber` above - so this pins the animation id to 0 rather than
    /// whatever `setState` last recorded.
    public override var animationId: Int { 0 }
}

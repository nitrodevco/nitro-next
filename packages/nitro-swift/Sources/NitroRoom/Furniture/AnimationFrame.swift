import Foundation

/// Swift port of `AnimationFrame` (packages/nitro-renderer/src/room/object/visualization/data/AnimationFrame.ts) -
/// one resolved keyframe for one furniture layer. A plain reference-type value here (no pooling -
/// see `GraphicAsset`'s doc comment for the general "drop the JS-GC-motivated pooling" rationale
/// used throughout this port); `remainingFrameRepeats` is still mutated in place by
/// `FurnitureAnimatedVisualization` the same way the TS version relies on shared-reference mutation.
public final class AnimationFrame {
    public static let frameRepeatForever = -1
    public static let sequenceNotDefined = -1

    private let rawId: Int
    public let x: Double
    public let y: Double
    public let repeats: Int
    public let frameRepeats: Int
    public let isLastFrame: Bool
    public let activeSequence: Int
    public let activeSequenceOffset: Int

    private var _remainingFrameRepeats: Int

    public static func allocate(
        id: Int, x: Double, y: Double, repeats: Int, frameRepeats: Int, isLastFrame: Bool,
        activeSequence: Int = -1, sequenceOffset: Int = 0
    ) -> AnimationFrame {
        AnimationFrame(
            id: id, x: x, y: y, repeats: max(repeats, 1), frameRepeats: frameRepeats < 0 ? AnimationFrame.frameRepeatForever : frameRepeats,
            isLastFrame: isLastFrame, activeSequence: activeSequence >= 0 ? activeSequence : -1, sequenceOffset: activeSequence >= 0 ? sequenceOffset : 0
        )
    }

    private init(id: Int, x: Double, y: Double, repeats: Int, frameRepeats: Int, isLastFrame: Bool, activeSequence: Int, sequenceOffset: Int) {
        rawId = id
        self.x = x
        self.y = y
        self.repeats = repeats
        self.frameRepeats = frameRepeats
        _remainingFrameRepeats = frameRepeats
        self.isLastFrame = isLastFrame
        self.activeSequence = activeSequence
        activeSequenceOffset = sequenceOffset
    }

    /// A negative source id means "pick a pseudo-random frame number scaled by `-id`" - matches
    /// the TS getter exactly, magic number and all.
    public var id: Double {
        rawId >= 0 ? Double(rawId) : Double(-rawId) * Double.random(in: 0..<1)
    }

    public var remainingFrameRepeats: Int {
        get { frameRepeats < 0 ? AnimationFrame.frameRepeatForever : _remainingFrameRepeats }
        set {
            var value = max(newValue, 0)

            if frameRepeats > 0, value > frameRepeats { value = frameRepeats }

            _remainingFrameRepeats = value
        }
    }

    /// No-op under ARC; kept for call-site parity with ports of `.recycle()` calls.
    public func recycle() {}
}

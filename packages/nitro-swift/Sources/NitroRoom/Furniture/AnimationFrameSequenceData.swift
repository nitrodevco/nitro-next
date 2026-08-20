import Foundation

/// Swift port of `AnimationFrameSequenceData` (packages/nitro-renderer/src/room/object/visualization/data/AnimationFrameSequenceData.ts) -
/// a run-length-collapsed sequence of keyframes: identical consecutive frames (same id, no
/// directional offsets, same x/y, zero random range) collapse into one stored `AnimationFrameData`
/// with an incremented `repeats` count rather than being stored individually.
public final class AnimationFrameSequenceData {
    private var frames: [AnimationFrameData] = []
    private var frameIndexes: [Int] = []
    private var frameRepeats: [Int] = []
    public let isRandom: Bool
    private let loopCount: Int

    public init(loopCount: Int, isRandom: Bool) {
        self.isRandom = isRandom
        self.loopCount = loopCount < 1 ? 1 : loopCount
    }

    public var frameCount: Int { frameIndexes.count * loopCount }

    public func dispose() { frames.removeAll() }

    /// Precomputes, for every stored (post-collapse) frame slot walking backwards, how many more
    /// consecutive slots (including itself) share the same underlying frame - this is what
    /// `getRepeats` later hands back as the *effective* repeat count for a frame reached via
    /// `getFrameIndex`.
    public func initialize() {
        var frameIndex = frameIndexes.count - 1
        var realIndex = -1
        var nextIndex = 1

        while frameIndex >= 0 {
            if frameIndexes[frameIndex] == realIndex {
                nextIndex += 1
            } else {
                realIndex = frameIndexes[frameIndex]
                nextIndex = 1
            }

            frameRepeats[frameIndex] = nextIndex

            frameIndex -= 1
        }
    }

    public func addFrame(id: Int, x: Double, y: Double, randomX: Double, randomY: Double, directionalOffset: DirectionalOffsetData?) {
        var repeats = 1

        if let last = frames.last,
            last.id == id, !last.hasDirectionalOffsets(),
            last.x == x, last.y == y,
            last.randomX == randomX, randomX == 0,
            last.randomY == randomY, randomY == 0 {
            repeats += last.repeats

            frames.removeLast()
        }

        let frame: AnimationFrameData = directionalOffset != nil
            ? AnimationFrameDirectionalData(id: id, x: x, y: y, randomX: randomX, randomY: randomY, offsets: directionalOffset, repeats: repeats)
            : AnimationFrameData(id: id, x: x, y: y, randomX: randomX, randomY: randomY, repeats: repeats)

        frames.append(frame)
        frameIndexes.append(frames.count - 1)
        frameRepeats.append(1)
    }

    public func getFrame(_ frameCount: Int) -> AnimationFrameData? {
        guard !frames.isEmpty, frameCount >= 0, frameCount < self.frameCount else { return nil }

        return frames[frameIndexes[frameCount % frameIndexes.count]]
    }

    public func getFrameIndex(_ frameCount: Int) -> Int {
        guard frameCount >= 0, frameCount < self.frameCount else { return -1 }

        if isRandom {
            var random = Int((Double.random(in: 0..<1) * Double(frameIndexes.count)).rounded())

            if random == frameIndexes.count { random -= 1 }

            return random
        }

        return frameCount
    }

    public func getRepeats(_ frameCount: Int) -> Int {
        guard frameCount >= 0, frameCount < self.frameCount else { return 0 }

        return frameRepeats[frameCount % frameRepeats.count]
    }
}

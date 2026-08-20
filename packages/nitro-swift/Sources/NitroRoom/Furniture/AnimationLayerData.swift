import Foundation

/// Swift port of `AnimationLayerData` (packages/nitro-renderer/src/room/object/visualization/data/AnimationLayerData.ts) -
/// one furniture layer's full animation: one or more `AnimationFrameSequenceData` groups, resolved
/// to a single `AnimationFrame` for a given elapsed frame count. `frameCount` parameters here are
/// `Double` (not `Int`) because the elapsed-frame value that flows in from `AnimationStateData.frameCounter`
/// can be fractional - `AnimationData.getStartFrame` seeds it from `Double.random(in: 0..<1) * frameCount`
/// for animations declared with `randomStart`, matching the original's untyped JS `number`.
public final class AnimationLayerData {
    private var frameSequences: [AnimationFrameSequenceData] = []
    private var _frameCount: Int = -1
    private let loopCount: Int
    private let frameRepeat: Int
    private let isRandom: Bool

    public init(loopCount: Int, frameRepeat: Int, isRandom: Bool) {
        self.loopCount = loopCount < 0 ? 0 : loopCount
        self.frameRepeat = frameRepeat < 1 ? 1 : frameRepeat
        self.isRandom = isRandom
    }

    public var frameCount: Int {
        if _frameCount < 0 { calculateLength() }

        return _frameCount
    }

    public func dispose() {
        for sequence in frameSequences { sequence.dispose() }

        frameSequences.removeAll()
    }

    @discardableResult
    public func addFrameSequence(loopCount: Int, isRandom: Bool) -> AnimationFrameSequenceData {
        let sequence = AnimationFrameSequenceData(loopCount: loopCount, isRandom: isRandom)

        frameSequences.append(sequence)

        return sequence
    }

    public func calculateLength() {
        _frameCount = 0

        for sequence in frameSequences { _frameCount += sequence.frameCount }
    }

    /// `loopCount` (constructor arg, clamped to >= 0) decides what happens once the sequence has
    /// played through: `0` means loop forever (the elapsed frame count just wraps via `%
    /// frameCount`, the natural effect of `doesRepeat` never triggering below); a positive value
    /// plays that many times through, then holds on the last frame forever (`doesRepeat = true`,
    /// which pins the resolved `AnimationFrame`'s `frameRepeats` to `AnimationFrame.frameRepeatForever`).
    public func getFrame(_ direction: Int, _ rawFrameCount: Double) -> AnimationFrame? {
        guard frameCount >= 1 else { return nil }

        var frameCount = rawFrameCount / Double(frameRepeat)

        if !isRandom {
            let count = (frameCount / Double(self.frameCount)).rounded(.down)

            frameCount = frameCount.truncatingRemainder(dividingBy: Double(self.frameCount)).rounded(.down)

            var doesRepeat = false

            if (loopCount > 0 && count >= Double(loopCount)) || (loopCount <= 0 && self.frameCount == 1) {
                frameCount = Double(self.frameCount - 1)
                doesRepeat = true
            }

            var sequenceFrameCount = 0
            var sequenceId = 0
            var sequence: AnimationFrameSequenceData?

            // Mirrors the original's loop precisely, including its fallthrough quirk: if no
            // sequence's cumulative range ever exceeds `frameCount`, the loop runs to completion
            // and `sequence`/`sequenceId` are left at the *last* sequence / one-past-its-index
            // rather than `nil` - this is a real trait of the TS source (a `let`-scoped loop
            // variable that survives past the loop), not a bug to "fix" here.
            while sequenceId < frameSequences.count {
                let candidate = frameSequences[sequenceId]
                sequence = candidate

                if frameCount < Double(sequenceFrameCount + candidate.frameCount) { break }

                sequenceFrameCount += candidate.frameCount
                sequenceId += 1
            }

            guard let resolvedSequence = sequence else { return nil }

            return getFrameFromSpecificSequence(
                direction, resolvedSequence, sequenceId, Int(frameCount) - sequenceFrameCount, doesRepeat
            )
        }

        let sequenceId = Int(Double(frameSequences.count) * Double.random(in: 0..<1))

        guard sequenceId >= 0, sequenceId < frameSequences.count else { return nil }

        let sequence = frameSequences[sequenceId]

        guard sequence.frameCount >= 1 else { return nil }

        return getFrameFromSpecificSequence(direction, sequence, sequenceId, 0, false)
    }

    public func getFrameFromSequence(_ direction: Int, _ sequenceId: Int, _ offset: Int, _ frameCount: Double) -> AnimationFrame? {
        guard sequenceId >= 0, sequenceId < frameSequences.count else { return nil }

        let sequence = frameSequences[sequenceId]

        if offset >= sequence.frameCount { return getFrame(direction, frameCount) }

        return getFrameFromSpecificSequence(direction, sequence, sequenceId, offset, false)
    }

    private func getFrameFromSpecificSequence(
        _ direction: Int, _ sequence: AnimationFrameSequenceData, _ sequenceId: Int, _ offset: Int, _ doesRepeat: Bool
    ) -> AnimationFrame? {
        let frameIndex = sequence.getFrameIndex(offset)

        guard let frame = sequence.getFrame(frameIndex) else { return nil }

        var x = frame.getX(direction)
        var y = frame.getY(direction)
        let randomX = frame.randomX
        let randomY = frame.randomY
        var repeats = frame.repeats
        var isLastFrame = false

        if randomX != 0 { x = (x + randomX * Double.random(in: 0..<1)).rounded(.towardZero) }
        if randomY != 0 { y = (y + randomY * Double.random(in: 0..<1)).rounded(.towardZero) }

        if repeats > 1 { repeats = sequence.getRepeats(frameIndex) }

        var frameRepeatsValue = frameRepeat * repeats

        if doesRepeat { frameRepeatsValue = AnimationFrame.frameRepeatForever }

        if !isRandom, !sequence.isRandom, sequenceId == frameSequences.count - 1, offset == sequence.frameCount - 1 {
            isLastFrame = true
        }

        return AnimationFrame.allocate(
            id: frame.id, x: x, y: y, repeats: repeats, frameRepeats: frameRepeatsValue, isLastFrame: isLastFrame,
            activeSequence: sequenceId, sequenceOffset: offset
        )
    }
}

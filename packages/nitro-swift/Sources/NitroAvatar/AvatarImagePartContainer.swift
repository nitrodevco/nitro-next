import Foundation

/// One entry of an `AvatarImagePartContainer`'s frame list - either a plain frame-index count (the
/// non-animated/"empty frames" fallback, `[0]` or `[0, 1, ..., frameCount-1]`) or a real
/// `AvatarAnimationFrame` keyframe override. Mirrors the TS `_frames` array's `(AvatarAnimationFrame | number)[]`
/// union type.
public enum AvatarFrameEntry {
    case index(Int)
    case keyframe(AvatarAnimationFrame)
}

/// Swift port of `AvatarImagePartContainer` (packages/nitro-renderer/src/avatar/AvatarImagePartContainer.ts) -
/// one drawable figure layer (e.g. one specific hair-set layer) resolved for a body part.
public final class AvatarImagePartContainer {
    public let bodyPartId: String
    public let partType: AvatarFigurePartType
    public let flippedPartType: AvatarFigurePartType?
    public let partId: Int
    public let color: PartColor?
    public let frames: [AvatarFrameEntry]
    public let action: ActionDefinition
    public var isColorable: Bool
    public let paletteMapId: Int
    public let isBlendable: Bool

    public init(
        bodyPartId: String, partType: AvatarFigurePartType, partId: Int, color: PartColor?,
        frames: [AvatarFrameEntry], action: ActionDefinition, isColorable: Bool, paletteMapId: Int,
        flippedPartType: AvatarFigurePartType? = nil, isBlendable: Bool = false
    ) {
        self.bodyPartId = bodyPartId
        self.partType = partType
        self.partId = partId
        self.color = color
        self.frames = frames
        self.action = action
        self.paletteMapId = paletteMapId
        self.flippedPartType = flippedPartType
        self.isBlendable = isBlendable
        self.isColorable = partType == .eyes ? false : isColorable
    }

    /// For a `.keyframe` entry, the *stored keyframe's* `number` - for a plain `.index` entry, the
    /// *array index itself*, not the stored int value. That second half is a real quirk of the
    /// original: `getFrameIndex` computes `frameNumber = frame % this._frames.length` and only
    /// returns the stored element when it's an `AvatarAnimationFrame`; otherwise it returns
    /// `frameNumber` (the index) regardless of what's in the array at that position. In practice
    /// this only matters for the `[0]`/`[0..<frameCount]` synthetic fallback arrays, where the
    /// stored values equal their indices anyway, so it's unobservable - documented for whoever next
    /// reads this expecting `frames[i]` semantics.
    public func getFrameIndex(_ frame: Int) -> Int {
        guard !frames.isEmpty else { return 0 }

        let index = frame % frames.count

        if case .keyframe(let keyframe) = frames[index] { return keyframe.number }

        return index
    }

    /// The keyframe override for this position, if any - `nil` for a plain `.index` entry (the
    /// non-animated/fallback case), matching the original returning `undefined` whenever the stored
    /// element isn't an `AvatarAnimationFrame` instance.
    public func getFrameDefinition(_ frame: Int) -> AvatarAnimationFrame? {
        guard !frames.isEmpty else { return nil }

        let index = frame % frames.count

        if case .keyframe(let keyframe) = frames[index] { return keyframe }

        return nil
    }
}

import Foundation

/// Swift port of `AvatarImagePartContainer` (packages/nitro-renderer/src/avatar/AvatarImagePartContainer.ts) -
/// one drawable figure layer (e.g. one specific hair-set layer) resolved for a body part.
///
/// The TS `_frames` array can hold either plain frame-index numbers or `AvatarAnimationFrame`
/// keyframe-animation entries; since keyframe animation playback isn't ported yet (see the avatar
/// section of the package README), this only supports the plain-index case - `getFrameDefinition`
/// always returns `nil`, matching what happens for every static/non-animated pose in the original.
public final class AvatarImagePartContainer {
    public let bodyPartId: String
    public let partType: AvatarFigurePartType
    public let flippedPartType: AvatarFigurePartType?
    public let partId: Int
    public let color: PartColor?
    public let frames: [Int]
    public let action: ActionDefinition
    public var isColorable: Bool
    public let paletteMapId: Int
    public let isBlendable: Bool

    public init(
        bodyPartId: String, partType: AvatarFigurePartType, partId: Int, color: PartColor?,
        frames: [Int], action: ActionDefinition, isColorable: Bool, paletteMapId: Int,
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

    public func getFrameIndex(_ frame: Int) -> Int {
        guard !frames.isEmpty else { return 0 }

        return frames[frame % frames.count]
    }

    /// Always `nil` (a real keyframe-animation frame override, once ported, would carry a sprite
    /// frame number and an optional pose-code override) - see the type doc comment.
    public func getFrameDefinition(_ frame: Int) -> (number: Int, assetPartDefinition: String?)? { nil }
}

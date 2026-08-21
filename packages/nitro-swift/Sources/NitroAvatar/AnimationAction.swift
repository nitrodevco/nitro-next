import Foundation

// Mirrors packages/nitro-api/src/asset/avatar/animations/*.ts

public struct AvatarAnimationFrameConfig: Decodable {
    public let number: Int
    public let assetPartDefinition: String?
    public let repeats: Int?
}

public struct AvatarAnimationPartConfig: Decodable {
    public let setType: AvatarFigurePartType
    public let frames: [AvatarAnimationFrameConfig]
}

public struct AvatarBodyPartOffsetConfig: Decodable {
    public let id: AvatarBodyPartType
    public let dx: Double?
    public let dy: Double?
}

public struct AvatarDirectionOffsetConfig: Decodable {
    public let id: Int
    public let bodyParts: [AvatarBodyPartOffsetConfig]?
}

public struct AvatarFrameOffsetDataConfig: Decodable {
    public let id: Int
    public let directions: [AvatarDirectionOffsetConfig]?
    public let repeats: Int?
}

public struct AvatarAnimationOffsetsConfig: Decodable {
    public let frames: [AvatarFrameOffsetDataConfig]
}

/// Mirrors `IAssetAvatarAnimation` - one entry of `HabboAvatarAnimations.json`
/// (packages/nitro-renderer/src/avatar/data/HabboAvatarAnimations.ts, extracted verbatim - see
/// `AvatarDefaults`'s doc comment). Keyed by `id` (an `AvatarActionType` value like `"Wave"`, not
/// an `AvatarActionStateType` like `"wave"` - `AvatarAnimationData.getAction` looks these up by
/// `ActionDefinition.id`, not `.state`).
public struct AvatarAnimationConfig: Decodable {
    public let id: String
    public let parts: [AvatarAnimationPartConfig]?
    public let offsets: AvatarAnimationOffsetsConfig?
}

/// Swift port of `AvatarAnimationFrame` (packages/nitro-renderer/src/avatar/structure/animation/AvatarAnimationFrame.ts) -
/// one keyframe override: which sprite-sheet frame number to show, and optionally which pose code
/// (`assetPartDefinition`, e.g. `"std"`/`"wav"`) to draw it with instead of the active action's own.
public final class AvatarAnimationFrame {
    public let number: Int
    public let assetPartDefinition: String

    public init(_ config: AvatarAnimationFrameConfig) {
        number = config.number
        assetPartDefinition = config.assetPartDefinition ?? ""
    }
}

/// Swift port of `AnimationActionPart` (.../structure/animation/AnimationActionPart.ts) - one figure
/// part type's keyframe sequence for one named animation (e.g. the "legs" part of "Move"/walk).
/// `repeats > 1` duplicates the *same* `AvatarAnimationFrame` instance consecutively (matches the
/// original pushing `this._frames[this._frames.length - 1]` back onto itself), not a fresh copy.
public final class AnimationActionPart {
    public private(set) var frames: [AvatarAnimationFrame] = []

    public init(_ config: AvatarAnimationPartConfig) {
        for frameConfig in config.frames {
            let frame = AvatarAnimationFrame(frameConfig)

            frames.append(frame)

            let repeats = frameConfig.repeats ?? 0

            if repeats > 1 { for _ in 0..<(repeats - 1) { frames.append(frame) } }
        }
    }
}

/// Swift port of `AnimationAction` (.../structure/animation/AnimationAction.ts) - one full named
/// animation (e.g. "Move"/walk, "Wave"): a keyframe sequence per figure part type, plus a separate
/// per-frame/direction/body-part pixel offset table (`offsets`) used for effects like the walk
/// cycle's up/down bob. The two tables use *different* keying schemes matched to their JSON shape -
/// `parts` by figure part type (`bd`/`lg`/...), `offsets` by frame id -> direction id -> body part.
public final class AnimationAction {
    public static let defaultOffset: (dx: Double, dy: Double) = (0, 0)

    public let id: String
    private var actionParts: [AvatarFigurePartType: AnimationActionPart] = [:]
    /// frame id -> direction id -> body part -> (dx, dy)
    private var bodyPartOffsets: [Int: [Int: [AvatarBodyPartType: (dx: Double, dy: Double)]]] = [:]
    public private(set) var frameCount = 0
    /// Run-length-expanded (via each offset frame's own `repeats`) list of offset-frame ids, walked
    /// by `getFrameBodyPartOffset` the same way `AnimationFrameSequenceData.getFrame` walks its own
    /// repeat-expanded index list for furniture (see that type's doc comment for the general pattern).
    private var frameIndexes: [Int] = []

    public init(_ config: AvatarAnimationConfig) {
        id = config.id

        for part in config.parts ?? [] {
            let newPart = AnimationActionPart(part)

            actionParts[part.setType] = newPart
            frameCount = max(frameCount, newPart.frames.count)
        }

        for frame in config.offsets?.frames ?? [] {
            let frameId = frame.id

            frameCount = max(frameCount, frameId)

            var directions: [Int: [AvatarBodyPartType: (dx: Double, dy: Double)]] = [:]

            for direction in frame.directions ?? [] {
                var offsets: [AvatarBodyPartType: (dx: Double, dy: Double)] = [:]

                for bodyPart in direction.bodyParts ?? [] {
                    offsets[bodyPart.id] = (bodyPart.dx ?? 0, bodyPart.dy ?? 0)
                }

                directions[direction.id] = offsets
            }

            bodyPartOffsets[frameId] = directions
            frameIndexes.append(frameId)

            if let repeats = frame.repeats, repeats > 1 {
                for _ in 0..<(repeats - 1) { frameIndexes.append(frameId) }
            }
        }
    }

    public func getPart(_ type: AvatarFigurePartType) -> AnimationActionPart? { actionParts[type] }

    /// `direction` here is the TS source's confusingly-named `frameId` parameter (it's actually a
    /// direction id, matched against the inner map built from `offsets.frames[].directions[].id`);
    /// `frameCount` is the elapsed animation tick, used only to pick which stored offset-frame
    /// (via the repeat-expanded `frameIndexes`) applies right now.
    public func getFrameBodyPartOffset(direction: Int, frameCount: Int, bodyPartId: AvatarBodyPartType) -> (dx: Double, dy: Double) {
        guard !frameIndexes.isEmpty, frameCount >= 0 else { return AnimationAction.defaultOffset }

        let frameNumber = frameIndexes[frameCount % frameIndexes.count]

        return bodyPartOffsets[frameNumber]?[direction]?[bodyPartId] ?? AnimationAction.defaultOffset
    }
}

/// Swift port of `AvatarAnimationData` (packages/nitro-renderer/src/avatar/structure/AvatarAnimationData.ts) -
/// the name -> `AnimationAction` catalog, parsed from `HabboAvatarAnimations.json`.
public final class AvatarAnimationData {
    private var actions: [String: AnimationAction] = [:]

    public init() {}

    @discardableResult
    public func parse(_ data: [AvatarAnimationConfig]) -> Bool {
        for animation in data { actions[animation.id] = AnimationAction(animation) }

        return true
    }

    public func getAction(_ definition: ActionDefinition) -> AnimationAction? { actions[definition.id] }

    public func getFrameCount(_ definition: ActionDefinition) -> Int { actions[definition.id]?.frameCount ?? 0 }
}

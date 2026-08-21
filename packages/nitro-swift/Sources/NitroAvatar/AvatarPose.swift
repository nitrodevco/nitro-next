import Foundation

/// Swift port of the non-rendering half of `AvatarImage` (packages/nitro-renderer/src/avatar/AvatarImage.ts) -
/// owns the caller's requested action list, resolves it against `AvatarStructure` into one winning
/// `ActiveActionData` per body part, and tracks the animation frame counter. The Pixi-specific half
/// (`AvatarImageCache`'s render-texture caching, `AvatarImage.getImage`) has no equivalent here -
/// `AvatarCompositor` recomputes every call instead, matching the rest of this port (see its doc
/// comment).
///
/// **Action combination**: mirrors `AvatarImageCache.setAction`'s real (not "sorted by precedence")
/// behavior exactly - see `AvatarActionManager.sortActions`'s doc comment for the bug this
/// replicates. For each of the caller's actions, in the order they were appended, every body part
/// that action claims (`AvatarStructure.getActiveBodyPartIds`) has its winning action *overwritten*
/// to that action. So the last-appended action to claim a given body part wins it outright - there
/// is no per-body-part blending of two simultaneous actions. Append lower-priority actions
/// (posture) before higher-priority ones (gestures) if you want the intuitive "gesture overlays the
/// stance" result.
///
/// **API shape**: `appendAction` takes a plain `AvatarActionStateType` string + numeric parameter
/// directly (mirroring the original's private `addActionData`), rather than the original's public
/// `appendAction`'s awkward `(category, ..._args)` two-tier dispatch (`Posture`/`Gesture` categories
/// that resolve to a *different* inner state, vs. "direct" categories that don't) - that shape
/// exists to paper over untyped variadic JS args, not to express anything this port needs to
/// preserve. `CarryObject`/`UseObject` (which look up a parameter by item state string) and the
/// Posture-Lay "auto face 2 or 4" direction nudge aren't ported - both need data/behavior this
/// scope doesn't otherwise touch; a caller wanting the Lay direction nudge can just set it directly.
public final class AvatarPose {
    private let structure: AvatarStructure
    private var rawActions: [ActiveActionData] = []
    private var sortedActions: [ActiveActionData] = []
    private let defaultAction: ActiveActionData

    public private(set) var mainAction: ActiveActionData
    /// Winning `ActiveActionData` per body part - see the class doc comment. Recomputed by
    /// `endActionAppends()`.
    public private(set) var resolvedBodyPartActions: [AvatarBodyPartType: ActiveActionData] = [:]
    public private(set) var frameCounter = 0
    public private(set) var animationFrameCount = 0

    public init(structure: AvatarStructure) {
        self.structure = structure

        defaultAction = ActiveActionData(type: "std")
        defaultAction.definition = structure.getActionDefinition("Default")
        mainAction = defaultAction
    }

    /// Convenience for the common case: a pose with just the default ("Stand") posture active,
    /// equivalent to what `AvatarNode`'s single-`ActionDefinition` API used before per-body-part
    /// action resolution existed. Append more actions and call `endActionAppends()` again to layer
    /// on gestures/other postures.
    public static func standing(structure: AvatarStructure) -> AvatarPose {
        let pose = AvatarPose(structure: structure)

        if let stand = structure.getActionDefinition("Default") { pose.appendAction(stand.state) }

        pose.endActionAppends()

        return pose
    }

    public func initActionAppends() {
        rawActions.removeAll()
    }

    /// Queues one requested action (mirrors the original's private `addActionData`) - a no-op if
    /// this exact `(type, parameter)` pair is already queued. Call `endActionAppends()` once done
    /// appending for this frame to actually resolve the list.
    public func appendAction(_ type: String, parameter: Int = -1) {
        guard !rawActions.contains(where: { $0.type == type && $0.actionParameter == parameter }) else { return }

        rawActions.append(ActiveActionData(type: type, actionParameter: parameter, startFrame: frameCounter))
    }

    /// Resolves the queued actions: filters/validates them against the action catalog
    /// (`AvatarStructure.sortActions`), picks the winning `mainAction` (the *last* queued action
    /// whose definition is `isMain`, falling back to the default posture), and recomputes
    /// `resolvedBodyPartActions`.
    public func endActionAppends() {
        sortedActions = structure.sortActions(rawActions)
        animationFrameCount = structure.maxFrames(sortedActions)

        mainAction = defaultAction

        for action in sortedActions where action.definition?.isMain == true { mainAction = action }

        var resolved: [AvatarBodyPartType: ActiveActionData] = [:]

        for action in sortedActions {
            for bodyPart in structure.getActiveBodyPartIds(action) { resolved[bodyPart] = action }
        }

        resolvedBodyPartActions = resolved
    }

    public func updateAnimationByFrames(_ frames: Int = 1) { frameCounter += frames }

    public func resetAnimationFrameCounter() { frameCounter = 0 }
}

import Foundation

/// Swift port of `AvatarActionManager` (packages/nitro-renderer/src/avatar/actions/AvatarActionManager.ts) -
/// the action catalog (`state` -> `ActionDefinition`) plus per-action canvas offsets, and the
/// action-list filter/combination step (`sortActions`) that turns a caller's raw wishlist of
/// simultaneous actions (stand + wave + carry-item, say) into the validated, prevention-filtered
/// list `AvatarPose`/`AvatarStructure.getActiveBodyPartIds` actually walk.
public final class AvatarActionManager {
    private var actions: [String: ActionDefinition] = [:]
    private var cachedDefaultAction: ActionDefinition?

    public init() {}

    /// Additive - safe to call more than once with different catalogs, the same way
    /// `AvatarStructure.injectFigureData` layers real figuredata on top of the bundled default.
    /// `HabboAvatarActionsDefault.json` only bundles "Stand"; a host app with a real per-hotel
    /// actions catalog (Walk/Sit/Wave/...) should call this again with that data to unlock the
    /// other 9 keyframe animations bundled in `HabboAvatarAnimations.json`.
    public func updateActions(_ data: AvatarActionDataConfig) {
        for action in data.actions {
            let definition = ActionDefinition(action)

            actions[definition.state] = definition
        }

        parseActionOffsets(data.actionOffsets)
    }

    private func parseActionOffsets(_ offsets: [ActionOffsetConfig]) {
        for offset in offsets {
            guard let action = actions[offset.action] else { continue }

            for canvasOffset in offset.offsets {
                guard let size = AvatarScaleType(rawValue: canvasOffset.size) else { continue }

                action.setOffsets(size: size, direction: canvasOffset.direction, offset: (canvasOffset.x, canvasOffset.y, canvasOffset.z))
            }
        }
    }

    public func getActionDefinition(_ id: String) -> ActionDefinition? {
        actions.values.first { $0.id == id }
    }

    public func getActionDefinitionWithState(_ state: String) -> ActionDefinition? { actions[state] }

    public func getDefaultAction() -> ActionDefinition? {
        if let cachedDefaultAction { return cachedDefaultAction }

        guard let found = actions.values.first(where: { $0.isDefault }) else { return nil }

        cachedDefaultAction = found

        return found
    }

    /// The last matching active action's offsets win (`getOffsets` always returns a real-or-default
    /// triple, so it's never "empty" the way an unset value would be) - matches
    /// `AvatarActionManager.getCanvasOffsets`'s overwrite-in-a-loop exactly. `nil` only when none of
    /// `actions` resolve to a known action definition at all.
    public func getCanvasOffsets(_ activeActions: [ActiveActionData], size: AvatarScaleType, direction: Int) -> (Double, Double, Double)? {
        var result: (Double, Double, Double)?

        for activeAction in activeActions {
            guard let action = actions[activeAction.type] else { continue }

            result = action.getOffsets(size: size, direction: direction)
        }

        return result
    }

    /// Filters `rawActions` down to the ones not mutually prevented, resolves each survivor's
    /// `ActionDefinition`, and - faithfully - does **not** actually sort them by precedence: the
    /// original passes `void this.sortByPrecedence` to `Array.prototype.sort`, and `void` always
    /// evaluates to `undefined`, so it calls `.sort(undefined)` (the default comparator) instead of
    /// `.sort(this.sortByPrecedence.bind(this))` - almost certainly a bug, but real behavior. Since
    /// none of the sortable elements have a distinguishing `toString()`, the default comparator
    /// treats every pair as equal and JS's stable sort leaves the original (filtered) order intact.
    /// The practical upshot: **whatever order the caller appended actions in is the order that
    /// determines which action wins a shared body part** (see `AvatarPose.resolveBodyPartActions`),
    /// not each action's declared `precedence`. Callers should append higher-priority actions last.
    public func sortActions(_ rawActions: [ActiveActionData]) -> [ActiveActionData] {
        let filtered = filterActions(rawActions)
        var validated: [ActiveActionData] = []

        for action in filtered {
            guard let definition = actions[action.type] else { continue }

            action.definition = definition
            validated.append(action)
        }

        return validated
    }

    private func filterActions(_ actions: [ActiveActionData]) -> [ActiveActionData] {
        var preventions: [String] = []

        for action in actions {
            guard let localAction = self.actions[action.type] else { continue }

            preventions.append(contentsOf: localAction.getPrevents(action.actionParameter))
        }

        return actions.filter { action in
            let actionType = action.type == "fx" ? "\(action.type).\(action.actionParameter)" : action.type

            return !preventions.contains(actionType)
        }
    }
}

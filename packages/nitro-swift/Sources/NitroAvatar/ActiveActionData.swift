import Foundation

/// Swift port of `ActiveActionData` (packages/nitro-renderer/src/avatar/actions/ActiveActionData.ts) -
/// one requested action instance (e.g. "wave with parameter 1") before/after being resolved against
/// the action catalog. `definition` starts `nil` and is filled in by `AvatarActionManager.sortActions`.
public final class ActiveActionData {
    public let type: String
    public var actionParameter: Int
    public var definition: ActionDefinition?
    public let startFrame: Int
    public var overridingAction: String = ""

    public init(type: String, actionParameter: Int = 1, startFrame: Int = 0) {
        self.type = type
        self.actionParameter = actionParameter
        self.startFrame = startFrame
    }

    public var id: String {
        guard let definition else { return "" }

        return "\(definition.id)_\(actionParameter)"
    }
}

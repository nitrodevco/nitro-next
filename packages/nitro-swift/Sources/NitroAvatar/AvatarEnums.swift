/// Mirrors `AvatarBodyPartType` (packages/nitro-api/src/avatar/enum/AvatarBodyPartType.ts).
public enum AvatarBodyPartType: String, Sendable, CaseIterable {
    case top = "top"
    case bottom = "bottom"
    case behind = "behind"
    case torso = "torso"
    case leftItem = "leftitem"
    case rightItem = "rightitem"
    case leftArm = "leftarm"
    case rightArm = "rightarm"
    case head = "head"
}

/// Mirrors `AvatarGeometryType`. Note `horizontal`'s value is `"hotizontal"` - a typo in the
/// original TS source that must be preserved verbatim since it's the literal wire string.
public enum AvatarGeometryType: String, Sendable {
    case vertical = "vertical"
    case sitting = "sitting"
    case horizontal = "hotizontal"
    case swim = "swim"
    case snowwarsHorizontal = "swhorizontal"
}

/// Mirrors `AvatarSetType`.
public enum AvatarSetType: String, Sendable {
    case full = "full"
    case head = "head"
    case body = "body"
}

/// Mirrors `AvatarScaleType`.
public enum AvatarScaleType: String, Sendable {
    case large = "h"
    case small = "sh"
}

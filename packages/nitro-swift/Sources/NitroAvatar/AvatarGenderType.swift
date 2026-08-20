/// Mirrors `AvatarGenderType` (packages/nitro-api/src/avatar/enum/AvatarGenderType.ts).
public enum AvatarGenderType: String, Sendable {
    case male = "M"
    case female = "F"
    case unisex = "U"

    public var numericValue: Int { self == .female ? 1 : 0 }

    public static func from(numericValue: Int) -> AvatarGenderType { numericValue == 1 ? .female : .male }
}

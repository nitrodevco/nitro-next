import Foundation

// Mirrors packages/nitro-api/src/asset/avatar/partsets/*.ts

public struct PartSetItemConfig: Decodable {
    public let setType: String
    public let flippedSetType: String?
    public let removeSetType: String?
    public let swim: String?
}

public struct ActivePartConfig: Decodable {
    public let setType: String
}

public struct ActivePartSetGroupConfig: Decodable {
    public let id: String
    public let activeParts: [ActivePartConfig]
}

public struct AvatarPartSetsConfig: Decodable {
    public let partSet: [PartSetItemConfig]
    public let activePartSets: [ActivePartSetGroupConfig]
}

/// Swift port of `PartDefinition` (packages/nitro-renderer/src/avatar/structure/parts/PartDefinition.ts).
public final class PartDefinition {
    public let setType: String
    public var flippedSetType: AvatarFigurePartType?
    public let removeSetType: AvatarFigurePartType?
    public var appendToFigure: Bool = false
    public var staticId: Int = -1

    public init(setType: String, flippedSetType: AvatarFigurePartType? = nil, removeSetType: AvatarFigurePartType? = nil) {
        self.setType = setType
        self.flippedSetType = flippedSetType
        self.removeSetType = removeSetType
    }

    public func hasStaticId() -> Bool { staticId >= 0 }
}

/// Swift port of `ActivePartSet` (.../structure/parts/ActivePartSet.ts) - which figure part types
/// participate in a named action group (e.g. "walk" activates legs/arms/shoes).
public final class ActivePartSet {
    public let parts: [AvatarFigurePartType]

    public init(config: ActivePartSetGroupConfig) {
        parts = config.activeParts.compactMap { AvatarFigurePartType(rawValue: $0.setType) }
    }
}

/// Swift port of `PartSetsData` (.../structure/PartSetsData.ts).
public final class PartSetsData {
    private var parts: [String: PartDefinition] = [:]
    private var activePartSets: [AvatarPartSetType: ActivePartSet] = [:]

    public init() {}

    @discardableResult
    public func parse(_ data: AvatarPartSetsConfig) -> Bool {
        for part in data.partSet {
            parts[part.setType] = PartDefinition(
                setType: part.setType,
                flippedSetType: part.flippedSetType.flatMap { AvatarFigurePartType(rawValue: $0) },
                removeSetType: part.removeSetType.flatMap { AvatarFigurePartType(rawValue: $0) }
            )
        }

        for group in data.activePartSets {
            guard let type = AvatarPartSetType(rawValue: group.id) else { continue }

            activePartSets[type] = ActivePartSet(config: group)
        }

        return true
    }

    public func getActiveParts(_ activePartSet: AvatarPartSetType?) -> [AvatarFigurePartType] {
        guard let activePartSet else { return [] }

        return activePartSets[activePartSet]?.parts ?? []
    }

    public func getPartDefinition(_ part: AvatarFigurePartType) -> PartDefinition? { parts[part.rawValue] }

    @discardableResult
    public func addPartDefinition(setType: String) -> PartDefinition {
        if let existing = parts[setType] { return existing }

        let definition = PartDefinition(setType: setType)

        parts[setType] = definition

        return definition
    }
}

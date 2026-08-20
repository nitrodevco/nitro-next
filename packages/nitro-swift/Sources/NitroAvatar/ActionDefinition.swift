import Foundation

// Mirrors packages/nitro-api/src/asset/avatar/actions/*.ts

public struct ActionParamConfig: Decodable {
    public let id: String
    public let value: String
}

public struct ActionTypeConfig: Decodable {
    public let id: Int
    public let animated: Bool?
    public let preventHeadTurn: Bool?
    public let prevents: [String]?
}

public struct ActionConfig: Decodable {
    public let id: String
    public let state: String
    public let precedence: Int
    public let main: Bool?
    public let isDefault: Bool?
    public let animation: Bool?
    public let startFromFrameZero: Bool?
    public let preventHeadTurn: Bool?
    public let geometryType: String
    public let activePartSet: String?
    public let assetPartDefinition: String
    public let prevents: [String]?
    public let lay: String?
    public let params: [ActionParamConfig]?
    public let types: [ActionTypeConfig]?
}

public struct ActionOffsetConfigEntry: Decodable {
    public let size: String
    public let direction: Int
    public let x: Double
    public let y: Double
    public let z: Double
}

public struct ActionOffsetConfig: Decodable {
    public let action: String
    public let offsets: [ActionOffsetConfigEntry]
}

public struct AvatarActionDataConfig: Decodable {
    public let actions: [ActionConfig]
    public let actionOffsets: [ActionOffsetConfig]
}

/// Swift port of `ActionType` (packages/nitro-renderer/src/avatar/actions/ActionType.ts).
public final class ActionType {
    public let id: Int
    public let isAnimated: Bool
    public let preventHeadTurn: Bool
    public let prevents: [String]

    public init(_ config: ActionTypeConfig) {
        id = config.id
        isAnimated = config.animated ?? false
        preventHeadTurn = config.preventHeadTurn ?? false
        prevents = config.prevents ?? []
    }
}

/// Swift port of `ActionDefinition` (packages/nitro-renderer/src/avatar/actions/ActionDefinition.ts).
public final class ActionDefinition {
    public let id: String
    public let state: String
    public let precedence: Int
    public let activePartSet: AvatarPartSetType?
    public let assetPartDefinition: String
    public let lay: String?
    public let geometryType: AvatarGeometryType
    public let isMain: Bool
    public let isDefault: Bool
    public let isAnimation: Bool
    public let startFromFrameZero: Bool
    public let prevents: [String]
    public let preventHeadTurn: Bool
    private var types: [Int: ActionType] = [:]
    private var params: [String: String] = [:]
    private var defaultParameterValue: String = ""
    /// scale rawValue -> direction (0-7) -> (x, y, z)
    private var canvasOffsets: [String: [Int: (Double, Double, Double)]] = [:]

    public init(_ config: ActionConfig) {
        id = config.id
        state = config.state
        precedence = config.precedence
        activePartSet = config.activePartSet.flatMap { AvatarPartSetType(rawValue: $0) }
        assetPartDefinition = config.assetPartDefinition
        lay = config.lay
        geometryType = AvatarGeometryType(rawValue: config.geometryType) ?? .vertical
        isMain = config.main ?? false
        isDefault = config.isDefault ?? false
        isAnimation = config.animation ?? false
        startFromFrameZero = config.startFromFrameZero ?? false
        prevents = config.prevents ?? []
        preventHeadTurn = config.preventHeadTurn ?? false

        for param in config.params ?? [] {
            if param.id == "default" { defaultParameterValue = param.value } else { params[param.id] = param.value }
        }

        for type in config.types ?? [] { types[type.id] = ActionType(type) }
    }

    public func setOffsets(size: AvatarScaleType, direction: Int, offset: (Double, Double, Double)) {
        canvasOffsets[size.rawValue, default: [:]][direction] = offset
    }

    public func getOffsets(size: AvatarScaleType, direction: Int) -> (Double, Double, Double) {
        canvasOffsets[size.rawValue]?[direction] ?? (0, 0, 0)
    }

    public func getType(_ id: Int) -> ActionType? { types[id] }

    public func getParameterValue(_ id: String) -> String { params[id] ?? defaultParameterValue }

    public func getPrevents(_ typeId: Int) -> [String] { prevents + (types[typeId]?.prevents ?? []) }
}

/// Loads the client's built-in default action table (`HabboAvatarActionsDefault.ts`), bundled as
/// a JSON resource. Only "Stand" is populated here in practice - the full action catalog
/// (Walk/Sit/Wave/...) is normally fetched per-hotel like figuredata, and isn't wired up yet
/// (see the avatar section of the package README).
public enum HabboAvatarActionsDefault {
    public static func load() -> AvatarActionDataConfig? {
        guard let url = Bundle.module.url(forResource: "HabboAvatarActionsDefault", withExtension: "json", subdirectory: "Resources") else { return nil }

        return try? JSONDecoder().decode(AvatarActionDataConfig.self, from: Data(contentsOf: url))
    }
}

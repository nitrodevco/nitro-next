import Foundation

/// Mirrors `IAsset` (packages/nitro-api/src/asset/IAsset.ts).
public struct AssetDefinition: Decodable {
    public let name: String
    public let source: String?
    public let x: Double?
    public let y: Double?
    public let flipH: Bool?
    public let flipV: Bool?
    public let usesPalette: Bool?
}

/// Mirrors `IAssetAlias` (packages/nitro-api/src/asset/IAssetAlias.ts).
public struct AssetAliasDefinition: Decodable {
    public let name: String?
    public let link: String?
    public let flipH: Bool?
    public let flipV: Bool?
}

/// Mirrors `IAssetPalette` (packages/nitro-api/src/asset/IAssetPalette.ts).
public struct AssetPaletteDefinition: Decodable {
    public let id: Int
    public let source: String?
    public let master: Bool?
    public let tags: [String]?
    public let breed: Int?
    public let colorTag: Int?
    public let color1: String?
    public let color2: String?
    /// Array of `[r, g, b]` triples, one per index (0-255), matching `IAssetPalette.rgb`.
    public let rgb: [[Int]]?
}

/// The subset of `IAssetData` (packages/nitro-api/src/asset/IAssetData.ts) that the
/// generic asset pipeline (`GraphicAssetCollection`) understands. The remaining fields
/// (`logic`, `visualizations`, `animations`, `roomVisualization`) are decoded on demand
/// by NitroAvatar/NitroRoom from the same merged bundle JSON (see `GraphicAssetCollection.rawJSON`).
public struct AssetDataCore: Decodable {
    public let type: String
    public let visualizationType: String?
    public let logicType: String?
    public let assets: [AssetDefinition]?
    public let aliases: [AssetAliasDefinition]?
    public let palettes: [AssetPaletteDefinition]?

    private enum CodingKeys: String, CodingKey {
        case type, visualizationType, logicType, assets, aliases, palettes
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        // The TS side seeds `assetData = { type: '' }` before merging, so a missing
        // `type` key should never fail decoding - it just defaults to empty.
        type = (try? container.decode(String.self, forKey: .type)) ?? ""
        visualizationType = try? container.decode(String.self, forKey: .visualizationType)
        logicType = try? container.decode(String.self, forKey: .logicType)
        assets = try? container.decode([AssetDefinition].self, forKey: .assets)
        aliases = try? container.decode([AssetAliasDefinition].self, forKey: .aliases)
        palettes = try? container.decode([AssetPaletteDefinition].self, forKey: .palettes)
    }

    public init(
        type: String,
        visualizationType: String? = nil,
        logicType: String? = nil,
        assets: [AssetDefinition]? = nil,
        aliases: [AssetAliasDefinition]? = nil,
        palettes: [AssetPaletteDefinition]? = nil
    ) {
        self.type = type
        self.visualizationType = visualizationType
        self.logicType = logicType
        self.assets = assets
        self.aliases = aliases
        self.palettes = palettes
    }
}

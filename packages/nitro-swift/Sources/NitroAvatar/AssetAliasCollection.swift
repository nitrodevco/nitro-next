import Foundation
import SpriteKit

import NitroAssets

/// Swift port of `AssetAlias` (packages/nitro-renderer/src/avatar/alias/AssetAlias.ts).
public struct AssetAlias {
    public let name: String
    public let link: String
    public let flipH: Bool
    public let flipV: Bool

    public init(_ data: AssetAliasDefinition) {
        name = data.name ?? ""
        link = data.link ?? ""
        flipH = data.flipH ?? false
        flipV = data.flipV ?? false
    }
}

/// Swift port of `AssetAliasCollection` (packages/nitro-renderer/src/avatar/alias/AssetAliasCollection.ts).
/// Avatar asset lookups go through this instead of `AssetManager.getAsset` directly, so a bundle's
/// `aliases` (`IAssetData.aliases`, e.g. one figure part reusing another's texture) get resolved.
public final class AssetAliasCollection {
    private var aliases: [String: AssetAlias] = [:]
    private let assetManager: AssetManager

    public init(assetManager: AssetManager) {
        self.assetManager = assetManager
    }

    /// Rebuilds the alias table from every currently-loaded collection. Call again after loading
    /// more `.nitro` bundles.
    public func reset() {
        aliases.removeAll()

        for collection in assetManager.collections.values {
            for aliasData in collection.data.aliases ?? [] {
                let alias = AssetAlias(aliasData)

                aliases[alias.name] = alias
            }
        }
    }

    public func hasAlias(_ name: String) -> Bool { aliases[name] != nil }

    public func getAssetName(_ name: String) -> String {
        var assetName = name
        var levels = 5

        while hasAlias(assetName), levels >= 0 {
            guard let alias = aliases[assetName], !alias.link.isEmpty else { break }

            assetName = alias.link
            levels -= 1
        }

        return assetName
    }

    public func getAsset(_ name: String) -> GraphicAsset? {
        assetManager.getAsset(getAssetName(name))
    }
}

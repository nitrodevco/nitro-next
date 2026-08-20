import CoreGraphics
import Foundation
import ImageIO
import SpriteKit

import NitroCore

/// Swift port of `AssetManager` (packages/nitro-renderer/src/assets/AssetManager.ts).
public final class AssetManager {
    private var _textures: [String: SKTexture] = [:]
    private var _collections: [String: GraphicAssetCollection] = [:]

    public init() {}

    public func getTexture(_ name: String) -> SKTexture? { _textures[name] }

    public func setTexture(_ name: String, _ texture: SKTexture?) {
        guard !name.isEmpty, let texture else { return }

        _textures[name] = texture
    }

    public func getAsset(_ name: String) -> GraphicAsset? {
        guard !name.isEmpty else { return nil }

        for collection in _collections.values {
            if let asset = collection.getAsset(name) { return asset }
        }

        NitroLogger.warn("AssetManager: Asset not found: \(name)")

        return nil
    }

    @discardableResult
    public func addAsset(toCollection collectionName: String, assetName: String, texture: SKTexture) -> GraphicAsset? {
        getCollection(collectionName)?.addAsset(name: assetName, texture: texture, x: 0, y: 0, replace: true)
    }

    public func getCollection(_ name: String) -> GraphicAssetCollection? { _collections[name] }

    @discardableResult
    public func createCollection(data: AssetDataCore, rawJSON: [String: Any], spritesheet: NitroSpritesheet?) -> GraphicAssetCollection {
        let collection = GraphicAssetCollection(
            data: data, rawJSON: rawJSON,
            libraryTextures: spritesheet?.textures ?? [:],
            textureSheet: spritesheet?.sheetTexture
        )

        for (name, texture) in collection.textures { setTexture(name, texture) }

        _collections[collection.name] = collection

        return collection
    }

    public var collections: [String: GraphicAssetCollection] { _collections }

    // MARK: - Downloading

    public func downloadAssets(urls: [String]) async -> Bool {
        guard !urls.isEmpty else { return true }

        let results = await withTaskGroup(of: Bool.self) { group -> [Bool] in
            for url in urls { group.addTask { await self.downloadAsset(url) } }

            var collected: [Bool] = []

            for await result in group { collected.append(result) }

            return collected
        }

        return results.allSatisfy { $0 }
    }

    @discardableResult
    public func downloadAsset(_ urlString: String) async -> Bool {
        do {
            guard !urlString.isEmpty else { throw NitroAssetError.invalidURL(urlString) }
            guard let url = URL(string: urlString) else { throw NitroAssetError.invalidURL(urlString) }

            let ext = url.pathExtension.lowercased()
            let (data, response) = try await URLSession.shared.data(from: url)

            guard let http = response as? HTTPURLResponse, http.statusCode == 200 else {
                throw NitroAssetError.invalidResponse(urlString)
            }

            switch ext {
                case "nitro":
                    let bundle = try NitroBundle.from(zipData: data)

                    try processNitroBundle(bundle)

                case "gif":
                    let frames = try GIFDecoder.decode(data: data)

                    if let first = frames.first { setTexture(urlString, first.texture) }

                case "png":
                    guard
                        let provider = CGDataProvider(data: data as CFData),
                        let image = CGImage(pngDataProviderSource: provider, decode: nil, shouldInterpolate: true, intent: .defaultIntent)
                    else { throw NitroAssetError.decodeFailed(urlString) }

                    setTexture(urlString, SKTexture(cgImage: image))

                default:
                    throw NitroAssetError.invalidExtension(ext)
            }

            return true
        } catch {
            NitroLogger.error(error)

            return false
        }
    }

    /// Convenience entry point for bundles already available locally (app bundle resource,
    /// downloaded/cached file, etc.) - the network path in `downloadAsset` funnels into this too.
    @discardableResult
    public func loadNitroBundle(data: Data) throws -> GraphicAssetCollection {
        let bundle = try NitroBundle.from(zipData: data)

        return try processNitroBundle(bundle)
    }

    @discardableResult
    private func processNitroBundle(_ bundle: NitroBundle) throws -> GraphicAssetCollection {
        var mergedJSON: [String: Any] = [:]

        for entry in bundle.jsonEntries {
            for (key, value) in entry.object { mergedJSON[key] = value }
        }

        var spritesheet: NitroSpritesheet? = nil

        for entry in bundle.spritesheetEntries {
            guard
                let meta = entry.object["meta"] as? [String: Any],
                let imageName = meta["image"] as? String,
                let sheetImage = bundle.images[imageName]
            else { continue }

            let jsonData = try JSONSerialization.data(withJSONObject: entry.object)
            let sheetData = try JSONDecoder().decode(SpritesheetData.self, from: jsonData)

            spritesheet = NitroSpritesheet.parse(sheetData, sheetImage: sheetImage)

            // The TS side also registers the full, uncut sheet texture under the bundle's own name.
            setTexture(entry.name, SKTexture(cgImage: sheetImage))
        }

        let coreJSON = try JSONSerialization.data(withJSONObject: mergedJSON)
        let coreData = try JSONDecoder().decode(AssetDataCore.self, from: coreJSON)

        return createCollection(data: coreData, rawJSON: mergedJSON, spritesheet: spritesheet)
    }
}

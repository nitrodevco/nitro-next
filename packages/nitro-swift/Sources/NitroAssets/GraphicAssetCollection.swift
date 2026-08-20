import Foundation
import SpriteKit

/// Swift port of `GraphicAssetCollection` (packages/nitro-renderer/src/assets/GraphicAssetCollection.ts).
/// One instance per loaded `.nitro` bundle (a furniture item, an avatar part library, etc.).
public final class GraphicAssetCollection {
    private static let paletteAssetDisposeThreshold = 10

    public private(set) var referenceCount: Int = 0

    /// `data.type` - also the key this collection is registered under in `AssetManager.collections`.
    public let name: String
    public let data: AssetDataCore
    /// The full merged bundle JSON (all non-spritesheet manifest files, shallow-merged), kept so
    /// NitroAvatar/NitroRoom can decode the richer fields (`logic`, `visualizations`,
    /// `roomVisualization`, `animations`, ...) this layer doesn't need to know about.
    public let rawJSON: [String: Any]
    public let textureSheet: SKTexture?

    private var _textures: [String: SKTexture] = [:]
    private var _assets: [String: GraphicAsset] = [:]
    private var _palettes: [Int: GraphicAssetPalette] = [:]
    private var paletteAssetNames: [String] = []

    public init(data: AssetDataCore, rawJSON: [String: Any], libraryTextures: [String: SKTexture], textureSheet: SKTexture? = nil) {
        self.data = data
        self.name = data.type
        self.rawJSON = rawJSON
        self.textureSheet = textureSheet

        addLibraryAssets(libraryTextures)
        define(data)
    }

    public static func removeFileExtension(_ name: String) -> String {
        guard let idx = name.lastIndex(of: ".") else { return name }

        return String(name[name.startIndex..<idx])
    }

    public func dispose() {
        _palettes.removeAll()
        disposePaletteAssets(disposeAll: true)
        paletteAssetNames.removeAll()

        for asset in _assets.values { asset.recycle() }

        _assets.removeAll()
    }

    public func define(_ data: AssetDataCore) {
        if let assets = data.assets { defineAssets(assets) }
        if let palettes = data.palettes { definePalettes(palettes) }
    }

    public func getAssetWithPalette(_ name: String, paletteId: Int) -> GraphicAsset? {
        let saveName = "\(name)@\(paletteId)"

        if let existing = getAsset(saveName) { return existing }

        guard let asset = getAsset(name), let texture = asset.texture, asset.usesPalette else { return nil }
        guard let palette = getPalette(paletteId) else { return asset }

        let recolored = palette.applyPalette(texture)

        paletteAssetNames.append(saveName)

        return addAsset(name: saveName, texture: recolored, x: asset.x, y: asset.y, flipH: asset.flipH, flipV: asset.flipV)
    }

    public func getPaletteColors(_ paletteId: Int) -> (primary: UInt32, secondary: UInt32) {
        guard let palette = getPalette(paletteId) else { return (0, 0) }

        return (palette.primaryColor, palette.secondaryColor)
    }

    @discardableResult
    public func addAsset(
        name: String,
        texture: SKTexture,
        x: Double = 0,
        y: Double = 0,
        flipH: Bool = false,
        flipV: Bool = false,
        usesPalette: Bool = false,
        replace: Bool = false
    ) -> GraphicAsset? {
        if _assets[name] != nil {
            if !replace { return nil }

            disposeAsset(name)
        }

        let asset = GraphicAsset(name: name, source: name, texture: texture, x: x, y: y, flipH: flipH, flipV: flipV, usesPalette: usesPalette)

        _assets[name] = asset

        return asset
    }

    public func disposeAsset(_ name: String) {
        guard let asset = _assets.removeValue(forKey: name) else { return }

        asset.recycle()
    }

    public func getAsset(_ name: String) -> GraphicAsset? { _assets[name] }
    public func getTexture(_ name: String) -> SKTexture? { _textures[name] }
    public func getPalette(_ paletteId: Int) -> GraphicAssetPalette? { _palettes[paletteId] }

    public func addReference() { referenceCount += 1 }

    public func removeReference() {
        referenceCount -= 1

        if referenceCount <= 0 {
            referenceCount = 0

            disposePaletteAssets(disposeAll: false)
        }
    }

    public var textures: [String: SKTexture] { _textures }
    public var assets: [String: GraphicAsset] { _assets }
    public var palettes: [Int: GraphicAssetPalette] { _palettes }

    private func defineAssets(_ list: [AssetDefinition]) {
        for asset in list {
            let source = asset.source ?? asset.name
            let x = -(asset.x ?? 0)
            let y = -(asset.y ?? 0)

            guard let texture = getTexture(source) else { continue }

            _assets[asset.name] = GraphicAsset(
                name: asset.name, source: source, texture: texture, x: x, y: y,
                flipH: asset.flipH ?? false, flipV: asset.flipV ?? false, usesPalette: asset.usesPalette ?? false
            )
        }
    }

    private func definePalettes(_ list: [AssetPaletteDefinition]) {
        for palette in list {
            if _palettes[palette.id] != nil { continue }

            var colorOne: UInt32 = 0xFFFFFF
            var colorTwo: UInt32 = 0xFFFFFF

            if let color = palette.color1, !color.isEmpty, let value = UInt32(color, radix: 16) { colorOne = value }
            if let color = palette.color2, !color.isEmpty, let value = UInt32(color, radix: 16) { colorTwo = value }

            if let rgb = palette.rgb { _palettes[palette.id] = GraphicAssetPalette(rgb: rgb, primaryColor: colorOne, secondaryColor: colorTwo) }
        }
    }

    private func addLibraryAssets(_ textures: [String: SKTexture]) {
        for (name, texture) in textures {
            _textures[GraphicAssetCollection.removeFileExtension(name)] = texture
        }
    }

    private func disposePaletteAssets(disposeAll: Bool = true) {
        guard disposeAll || paletteAssetNames.count > GraphicAssetCollection.paletteAssetDisposeThreshold else { return }

        for name in paletteAssetNames { disposeAsset(name) }

        paletteAssetNames.removeAll()
    }
}

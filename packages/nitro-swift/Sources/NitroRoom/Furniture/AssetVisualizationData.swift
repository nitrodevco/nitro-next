import Foundation

/// Mirrors `IAssetVisualizationLayer` (packages/nitro-api/src/asset/visualization/IAssetVisualizationLayer.ts).
public struct AssetVisualizationLayer: Decodable {
    public let id: Int
    public let x: Double?
    public let y: Double?
    public let z: Double?
    public let alpha: Double?
    public let ink: String?
    public let tag: String?
    public let ignoreMouse: Bool?
}

/// Mirrors `IAssetVisualizationDirection`.
public struct AssetVisualizationDirection: Decodable {
    public let id: Int
    public let layers: [AssetVisualizationLayer]?
}

/// Mirrors `IAssetColorLayer`.
public struct AssetColorLayer: Decodable {
    public let id: Int
    public let color: UInt32?
}

/// Mirrors `IAssetColor`.
public struct AssetColor: Decodable {
    public let id: Int
    public let layers: [AssetColorLayer]?
}

/// Mirrors the subset of `IAssetVisualizationData` (packages/nitro-api/src/asset/visualization/IAssetVisualizationData.ts)
/// consumed by static furniture layer resolution. Animation/posture/gesture fields are decoded
/// separately by the (forthcoming) animated-furniture support.
public struct AssetVisualizationData: Decodable {
    public let size: Int?
    public let layerCount: Int?
    public let angle: Double?
    public let layers: [AssetVisualizationLayer]?
    public let colors: [AssetColor]?
    public let directions: [AssetVisualizationDirection]?
}

import Foundation

// Mirrors packages/nitro-api/src/asset/room-visualization/*.ts - the "room" .nitro bundle's
// `roomVisualization` manifest section (floor/wall/landscape material tables + bitmap masks).

public struct AssetPlaneTextureBitmap: Decodable {
    public let assetName: String?
    public let normalMinX: Double?
    public let normalMaxX: Double?
    public let normalMinY: Double?
    public let normalMaxY: Double?
}

public struct AssetPlaneTexture: Decodable {
    public let id: String?
    public let bitmaps: [AssetPlaneTextureBitmap]?
}

/// Covers both `IAssetPlaneVisualizationLayer` (static floor/wall layers) and the shape-incompatible
/// `IAssetPlaneVisualizationAnimatedLayer` (landscape "items" layers) - decoding is permissive the
/// same way the TS source's blind `as IAssetPlaneVisualizationLayer` cast is: an animated layer JSON
/// object just leaves every field here `nil`, exactly mirroring the `undefined` fields JS would see.
public struct AssetPlaneVisualizationLayer: Decodable {
    public let materialId: String?
    public let color: UInt32?
    public let offset: Double?
    public let align: String?
}

public struct AssetPlaneVisualization: Decodable {
    public let size: Int?
    public let horizontalAngle: Double?
    public let verticalAngle: Double?
    public let allLayers: [AssetPlaneVisualizationLayer]?
}

public struct AssetPlane: Decodable {
    public let id: String?
    public let visualizations: [AssetPlaneVisualization]?
    public let animatedVisualization: [AssetPlaneVisualization]?
}

public struct AssetPlaneVisualizationData: Decodable {
    public let planes: [AssetPlane]?
    public let textures: [AssetPlaneTexture]?
}

public struct AssetPlaneMaskVisualization: Decodable {
    public let size: Int
    public let bitmaps: [AssetPlaneTextureBitmap]?
}

public struct AssetPlaneMask: Decodable {
    public let id: String?
    public let visualizations: [AssetPlaneMaskVisualization]?
}

public struct AssetPlaneMaskData: Decodable {
    public let masks: [AssetPlaneMask]?
}

/// Mirrors `IAssetRoomVisualizationData` - the top-level shape of `IAssetData.roomVisualization`.
public struct AssetRoomVisualizationData: Decodable {
    public let floorData: AssetPlaneVisualizationData?
    public let wallData: AssetPlaneVisualizationData?
    public let landscapeData: AssetPlaneVisualizationData?
    public let maskData: AssetPlaneMaskData?
}

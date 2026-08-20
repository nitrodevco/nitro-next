import Foundation

import NitroAssets
import NitroCore

/// Shared context every `RoomPlane` in a room needs to resolve its material texture/color:
/// the room bundle's decoded `roomVisualization` manifest (floor/wall/landscape material tables)
/// plus the `AssetManager` for global asset-name lookups (`GetAssetManager().getAsset(...)` in TS).
/// Built once per room by `RoomPlaneRenderer` instead of re-decoding JSON per plane per frame.
public final class RoomPlaneRenderContext {
    public let visualizationData: AssetRoomVisualizationData?
    public let assetManager: AssetManager
    public let maskManager: PlaneMaskManager?

    public init(visualizationData: AssetRoomVisualizationData?, assetManager: AssetManager, maskManager: PlaneMaskManager?) {
        self.visualizationData = visualizationData
        self.assetManager = assetManager
        self.maskManager = maskManager
    }

    /// Builds a context from a loaded "room" `.nitro` bundle's `GraphicAssetCollection`: decodes
    /// `roomVisualization` out of its merged raw JSON (mirroring `FurnitureVisualizationFactory`),
    /// and initializes a `PlaneMaskManager` from `roomVisualization.maskData` if present (matching
    /// `RoomVisualizationData.initialize`/`setGraphicAssetCollection`).
    public static func make(from collection: GraphicAssetCollection, assetManager: AssetManager) -> RoomPlaneRenderContext {
        guard let raw = collection.rawJSON["roomVisualization"] else {
            return RoomPlaneRenderContext(visualizationData: nil, assetManager: assetManager, maskManager: nil)
        }

        do {
            let jsonData = try JSONSerialization.data(withJSONObject: raw)
            let visualizationData = try JSONDecoder().decode(AssetRoomVisualizationData.self, from: jsonData)

            var maskManager: PlaneMaskManager?

            if let maskData = visualizationData.maskData {
                let manager = PlaneMaskManager()

                manager.initialize(maskData)
                manager.initializeAssetCollection(collection)
                maskManager = manager
            }

            return RoomPlaneRenderContext(visualizationData: visualizationData, assetManager: assetManager, maskManager: maskManager)
        } catch {
            NitroLogger.error(error)

            return RoomPlaneRenderContext(visualizationData: nil, assetManager: assetManager, maskManager: nil)
        }
    }
}

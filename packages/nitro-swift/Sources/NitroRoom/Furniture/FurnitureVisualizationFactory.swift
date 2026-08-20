import Foundation

import NitroAssets
import NitroCore

/// Builds a `FurnitureVisualizing` (either a `FurnitureVisualization` or, when the furniture's
/// asset data declares an `animations` table, a `FurnitureAnimatedVisualization`) from a loaded
/// `.nitro` bundle's `GraphicAssetCollection`, decoding the `visualizations` array out of its
/// merged raw JSON (`IAssetData.visualizations`, which `NitroAssets.AssetDataCore` deliberately
/// doesn't parse - see its doc comment).
///
/// The real client picks the visualization *class* per furniture type from server-supplied
/// furniture metadata (`logic`/`visualization` fields normally fetched alongside furnidata) via
/// `RoomObjectVisualizationFactory`, which this port has no equivalent of (no networking layer -
/// see the README). Detecting animation from the parsed asset data itself is a reasonable stand-in:
/// it's what actually determines whether there's any animation data to play.
public enum FurnitureVisualizationFactory {
    public static func make(from collection: GraphicAssetCollection) -> FurnitureVisualizing? {
        guard let furnitureData = makeData(from: collection) else { return nil }

        return furnitureData.isAnimated
            ? FurnitureAnimatedVisualization(data: furnitureData, collection: collection)
            : FurnitureVisualization(data: furnitureData, collection: collection)
    }

    private static func makeData(from collection: GraphicAssetCollection) -> FurnitureVisualizationData? {
        guard let raw = collection.rawJSON["visualizations"] else { return nil }

        do {
            let jsonData = try JSONSerialization.data(withJSONObject: raw)
            let visualizations = try JSONDecoder().decode([AssetVisualizationData].self, from: jsonData)

            let furnitureData = FurnitureVisualizationData()

            guard furnitureData.initialize(type: collection.name, visualizations: visualizations) else { return nil }

            return furnitureData
        } catch {
            NitroLogger.error(error)

            return nil
        }
    }
}

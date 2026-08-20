import Foundation

import NitroAssets
import NitroCore

/// Builds a `FurnitureVisualization` from a loaded `.nitro` bundle's `GraphicAssetCollection`,
/// decoding the `visualizations` array out of its merged raw JSON (`IAssetData.visualizations`,
/// which `NitroAssets.AssetDataCore` deliberately doesn't parse - see its doc comment).
public enum FurnitureVisualizationFactory {
    public static func make(from collection: GraphicAssetCollection) -> FurnitureVisualization? {
        guard let raw = collection.rawJSON["visualizations"] else { return nil }

        do {
            let jsonData = try JSONSerialization.data(withJSONObject: raw)
            let visualizations = try JSONDecoder().decode([AssetVisualizationData].self, from: jsonData)

            let furnitureData = FurnitureVisualizationData()

            guard furnitureData.initialize(type: collection.name, visualizations: visualizations) else { return nil }

            return FurnitureVisualization(data: furnitureData, collection: collection)
        } catch {
            NitroLogger.error(error)

            return nil
        }
    }
}

import Foundation

import NitroAssets
import NitroCore

/// Builds a `FurnitureVisualizing` from a loaded `.nitro` bundle's `GraphicAssetCollection`,
/// decoding the `visualizations` array out of its merged raw JSON (`IAssetData.visualizations`,
/// which `NitroAssets.AssetDataCore` deliberately doesn't parse - see its doc comment).
///
/// Which concrete type gets built is picked from `collection.data.visualizationType` - the typed
/// Swift field for the asset manifest's own `visualizationType` string (`IAssetData.visualizationType`,
/// parsed by `AssetDataCore`), the same signal `RoomObjectVisualizationFactory.getVisualizationType`
/// switches on in the original. This is genuinely present in the `.nitro` bundle itself, not
/// server-supplied furnidata, so no networking layer is needed to read it (an earlier version of
/// this doc comment claimed otherwise - that was a mistake, corrected once `IAssetData.visualizationType`
/// was actually checked). Types this port has a dedicated Swift class for are dispatched explicitly;
/// everything else falls back to animation-table detection (`FurnitureVisualizationData.isAnimated`),
/// which still renders correctly for the out-of-scope variants (particle systems, external
/// image/video, badges, guild customization, mannequins - see the README) using their base
/// static/animated rendering, just without their specific sprite customizations.
public enum FurnitureVisualizationFactory {
    public static func make(from collection: GraphicAssetCollection) -> FurnitureVisualizing? {
        guard let furnitureData = makeData(from: collection) else { return nil }

        switch collection.data.visualizationType {
            case RoomObjectVisualizationType.furnitureResettingAnimated:
                return FurnitureResettingAnimatedVisualization(data: furnitureData, collection: collection)
            case RoomObjectVisualizationType.furnitureCounterClock:
                return FurnitureCounterClockVisualization(data: furnitureData, collection: collection)
            case RoomObjectVisualizationType.furnitureVoteCounter:
                return FurnitureVoteCounterVisualization(data: furnitureData, collection: collection)
            case RoomObjectVisualizationType.furnitureVoteMajority:
                return FurnitureVoteMajorityVisualization(data: furnitureData, collection: collection)
            case RoomObjectVisualizationType.furnitureSoundblock:
                return FurnitureSoundBlockVisualization(data: furnitureData, collection: collection)
            case RoomObjectVisualizationType.furnitureQueueTile:
                return FurnitureQueueTileVisualization(data: furnitureData, collection: collection)
            case RoomObjectVisualizationType.furnitureGiftWrapped:
                return FurnitureGiftWrappedVisualization(data: furnitureData, collection: collection)
            case RoomObjectVisualizationType.furnitureAnimated:
                return FurnitureAnimatedVisualization(data: furnitureData, collection: collection)
            case RoomObjectVisualizationType.furnitureStatic,
                 RoomObjectVisualizationType.furnitureCuboid,
                 RoomObjectVisualizationType.furnitureStickie,
                 RoomObjectVisualizationType.furnitureBuilderPlaceholder:
                // `FurnitureCuboidVisualization`/`FurnitureStickieVisualization` are empty
                // subclasses in the original (identical to the base) - nothing to port.
                return FurnitureVisualization(data: furnitureData, collection: collection)
            default:
                return furnitureData.isAnimated
                    ? FurnitureAnimatedVisualization(data: furnitureData, collection: collection)
                    : FurnitureVisualization(data: furnitureData, collection: collection)
        }
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

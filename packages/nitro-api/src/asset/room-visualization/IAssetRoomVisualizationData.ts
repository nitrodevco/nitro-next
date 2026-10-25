import { IAssetPlaneMaskData } from './IAssetPlaneMaskData';
import { IAssetPlaneVisualizationData } from './IAssetPlaneVisualizationData';

export interface IAssetRoomVisualizationData {
    floorData?: IAssetPlaneVisualizationData;
    wallData?: IAssetPlaneVisualizationData;
    landscapeData?: IAssetPlaneVisualizationData;
    wallAdData?: IAssetPlaneVisualizationData;
    maskData?: IAssetPlaneMaskData;
}

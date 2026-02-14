import type { IAssetPlaneMaskData } from './IAssetPlaneMaskData';
import type { IAssetPlaneVisualizationData } from './IAssetPlaneVisualizationData';

export interface IAssetRoomVisualizationData {
    floorData?: IAssetPlaneVisualizationData;
    wallData?: IAssetPlaneVisualizationData;
    landscapeData?: IAssetPlaneVisualizationData;
    maskData?: IAssetPlaneMaskData;
}

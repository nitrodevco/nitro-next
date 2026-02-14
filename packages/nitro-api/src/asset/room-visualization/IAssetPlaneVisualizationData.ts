import type { IAssetPlane } from './IAssetPlane';
import type { IAssetPlaneMaterial } from './IAssetPlaneMaterial';
import type { IAssetPlaneTexture } from './IAssetPlaneTexture';

export interface IAssetPlaneVisualizationData {
    planes?: IAssetPlane[];
    materials?: IAssetPlaneMaterial[];
    textures?: IAssetPlaneTexture[];
}

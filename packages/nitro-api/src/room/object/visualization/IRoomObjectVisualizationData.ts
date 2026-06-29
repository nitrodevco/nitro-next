import type { IAssetData } from '#api/asset';

export interface IObjectVisualizationData {
    initialize(asset: IAssetData | undefined): boolean;
    dispose(): void;
}

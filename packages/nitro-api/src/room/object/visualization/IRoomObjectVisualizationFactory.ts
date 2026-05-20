import type { IAssetData } from '#api/asset';

import type { IRoomObjectGraphicVisualization } from './IRoomObjectGraphicVisualization';
import type { IObjectVisualizationData } from './IRoomObjectVisualizationData';

export interface IRoomObjectVisualizationFactory {
    getVisualization(type: string): IRoomObjectGraphicVisualization | undefined;
    getVisualizationData(type: string, visualization: string, asset: IAssetData): IObjectVisualizationData | undefined;
}

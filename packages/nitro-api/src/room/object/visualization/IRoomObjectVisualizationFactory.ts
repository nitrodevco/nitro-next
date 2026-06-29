import type { IAssetData } from '#api/asset';

import type { IRoomObjectGraphicVisualization } from './IRoomObjectGraphicVisualization';
import type { IObjectVisualizationData } from './IRoomObjectVisualizationData';

export interface IRoomObjectVisualizationFactory {
    getVisualization(type: string | undefined): IRoomObjectGraphicVisualization | undefined;
    getVisualizationData(type: string, visualization: string | undefined, asset: IAssetData | undefined): IObjectVisualizationData | undefined;
}

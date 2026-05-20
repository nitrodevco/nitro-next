import type { IGraphicAssetCollection } from '#api/asset';

import type { IRoomObjectVisualization } from './IRoomObjectVisualization';

export interface IRoomObjectGraphicVisualization extends IRoomObjectVisualization {
    asset: IGraphicAssetCollection;
}

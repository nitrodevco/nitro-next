import { IGraphicAssetCollection } from '#api/asset';

import { IRoomObjectVisualization } from './IRoomObjectVisualization';

export interface IRoomObjectGraphicVisualization extends IRoomObjectVisualization {
    asset: IGraphicAssetCollection | undefined;
}

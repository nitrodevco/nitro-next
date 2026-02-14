import type { IGraphicAssetCollection } from '../../../asset';
import type { IRoomObjectVisualization } from './IRoomObjectVisualization';

export interface IRoomObjectGraphicVisualization extends IRoomObjectVisualization {
    asset: IGraphicAssetCollection;
}

import { IAssetData } from '#api/asset';

import { IRoomObjectGraphicVisualization } from './IRoomObjectGraphicVisualization';
import { IObjectVisualizationData } from './IRoomObjectVisualizationData';

export interface IRoomObjectVisualizationFactory {
    getVisualization(type: string | undefined): IRoomObjectGraphicVisualization | undefined;
    getVisualizationData(type: string, visualization: string | undefined, asset: IAssetData | undefined): IObjectVisualizationData | undefined;
    /** Forgets the data kept for `type`, so the next object of it reads its asset again. */
    removeVisualizationData(type: string): void;
}

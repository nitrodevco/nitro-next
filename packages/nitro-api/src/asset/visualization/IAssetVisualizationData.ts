import type { IAssetVisualAnimation } from './animation';
import type { IAssetColor } from './color';
import type { IAssetGesture } from './gestures';
import type { IAssetVisualizationDirection } from './IAssetVisualizationDirection';
import type { IAssetVisualizationLayer } from './IAssetVisualizationLayer';
import type { IAssetPosture } from './postures/IAssetPosture';

export interface IAssetVisualizationData {
    size?: number;
    layerCount?: number;
    angle?: number;
    layers?: { [index: string]: IAssetVisualizationLayer };
    colors?: { [index: string]: IAssetColor };
    directions?: { [index: string]: IAssetVisualizationDirection };
    animations?: { [index: string]: IAssetVisualAnimation };
    defaultPosture?: string;
    postures?: { defaultPosture?: string; postures?: IAssetPosture[] };
    gestures?: IAssetGesture[];
}

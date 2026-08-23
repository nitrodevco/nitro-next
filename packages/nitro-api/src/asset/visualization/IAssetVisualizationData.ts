import { IAssetVisualAnimation } from './animation/IAssetVisualAnimation';
import { IAssetColor } from './color/IAssetColor';
import { IAssetGesture } from './gestures/IAssetGesture';
import { IAssetVisualizationDirection } from './IAssetVisualizationDirection';
import { IAssetVisualizationLayer } from './IAssetVisualizationLayer';
import { IAssetPosture } from './postures/IAssetPosture';

export interface IAssetVisualizationData {
    size?: number;
    layerCount?: number;
    angle?: number;
    layers?: IAssetVisualizationLayer[];
    colors?: IAssetColor[];
    directions?: IAssetVisualizationDirection[];
    animations?: IAssetVisualAnimation[];
    defaultPosture?: string;
    postures?: { defaultPosture?: string; postures?: IAssetPosture[] };
    gestures?: IAssetGesture[];
}

import type { IAssetPlaneVisualizationAnimatedLayer } from './IAssetPlaneVisualizationAnimatedLayer';
import type { IAssetPlaneVisualizationLayer } from './IAssetPlaneVisualizationLayer';

export interface IAssetPlaneVisualization {
    size?: number;
    horizontalAngle?: number;
    verticalAngle?: number;
    layers?: (IAssetPlaneVisualizationLayer | IAssetPlaneVisualizationAnimatedLayer)[];
}

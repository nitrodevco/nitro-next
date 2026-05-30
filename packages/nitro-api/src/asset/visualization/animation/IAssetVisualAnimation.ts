import type { IAssetVisualAnimationLayer } from './IAssetVisualAnimationLayer';

export interface IAssetVisualAnimation {
    id: number;
    transitionTo?: number;
    transitionFrom?: number;
    immediateChangeFrom?: string;
    randomStart?: boolean;
    layers?: IAssetVisualAnimationLayer[];
}

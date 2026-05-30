import type { IAssetVisualAnimationSequence } from './IAssetVisualAnimationSequence';

export interface IAssetVisualAnimationLayer {
    id: number;
    loopCount?: number;
    frameRepeat?: number;
    random?: number;
    frameSequences?: IAssetVisualAnimationSequence[];
}

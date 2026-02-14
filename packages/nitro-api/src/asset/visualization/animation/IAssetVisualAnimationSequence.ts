import type { IAssetVisualAnimationSequenceFrame } from './IAssetVisualAnimationSequenceFrame';

export interface IAssetVisualAnimationSequence {
    loopCount?: number;
    random?: number;
    frames?: { [index: string]: IAssetVisualAnimationSequenceFrame };
}

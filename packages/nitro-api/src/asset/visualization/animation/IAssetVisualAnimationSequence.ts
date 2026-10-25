import { IAssetVisualAnimationSequenceFrame } from './IAssetVisualAnimationSequenceFrame';

export interface IAssetVisualAnimationSequence {
    loopCount?: number;
    random?: number;
    frames?: IAssetVisualAnimationSequenceFrame[];
}

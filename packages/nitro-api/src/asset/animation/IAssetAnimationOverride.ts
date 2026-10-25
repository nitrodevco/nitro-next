import { AvatarActionStateType } from '#api/avatar/enum';

import { IAssetAnimationFrame } from './IAssetAnimationFrame';

export interface IAssetAnimationOverride {
    name: string;
    override?: AvatarActionStateType;
    frames?: IAssetAnimationFrame[];
}

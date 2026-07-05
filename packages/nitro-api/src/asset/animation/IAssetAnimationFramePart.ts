import { AvatarActionType, AvatarBodyPartType } from '#api/avatar';
import type { IAssetAnimationFramePartItem } from './IAssetAnimationFramePartItem';

export interface IAssetAnimationFramePart {
    id: AvatarBodyPartType | string;
    frame?: number;
    base?: string;
    action?: AvatarActionType;
    dx?: number;
    dy?: number;
    dz?: number;
    dd?: number;
    items?: IAssetAnimationFramePartItem[];
}

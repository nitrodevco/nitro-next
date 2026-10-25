import { AvatarActionStateType } from '#api/avatar/enum';

export interface IAssetAvatarActionType {
    id: number;
    animated?: boolean;
    preventHeadTurn?: boolean;
    prevents?: (AvatarActionStateType | string)[];
}

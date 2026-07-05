import { AvatarFigurePartType } from "#api/avatar/enum";

export interface IAssetAvatarPartSetItem {
    setType: AvatarFigurePartType;
    flippedSetType?: AvatarFigurePartType;
    removeSetType?: AvatarFigurePartType;
    swim?: string;
}
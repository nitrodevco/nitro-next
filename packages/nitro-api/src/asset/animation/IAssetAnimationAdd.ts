import { AvatarBodyPartType, AvatarFigurePartType } from "#api/avatar";

export interface IAssetAnimationAdd {
    id: AvatarFigurePartType | string;
    align?: AvatarBodyPartType;
    blend?: string;
    ink?: number;
    base?: string;
}

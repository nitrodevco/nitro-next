import { AvatarFigurePartType } from "#api/avatar/enum";

export interface IAssetAvatarBodyPartItem {
    id: AvatarFigurePartType;
    x: number;
    y: number;
    z: number;
    radius: number;
    nx: number;
    ny: number;
    nz: number;
    double: boolean;
}
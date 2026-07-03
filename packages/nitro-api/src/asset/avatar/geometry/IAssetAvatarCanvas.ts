import { AvatarScaleType } from "#api/avatar/index";
import { IAssetAvatarGeometry } from "./IAssetAvatarGeometry";

export interface IAssetAvatarCanvas {
    scale: AvatarScaleType;
    geometries: IAssetAvatarGeometry[];
}
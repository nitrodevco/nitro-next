import { AvatarScaleType } from "#api/avatar/enum";

export interface IAssetAvatarActionOffsetConfig {
    size: AvatarScaleType;
    direction: number;
    x: number;
    y: number;
    z: number;
}
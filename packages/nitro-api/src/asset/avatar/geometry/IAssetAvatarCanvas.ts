import { IAssetAvatarGeometry } from "./IAssetAvatarGeometry";

export interface IAssetAvatarCanvas {
    scale: string; // e.g., 'h', 'sh'
    geometries: IAssetAvatarGeometry[];
}
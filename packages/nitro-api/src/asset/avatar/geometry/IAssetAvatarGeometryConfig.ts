import { IAssetAvatarCamera } from "./IAssetAvatarCamera";
import { IAssetAvatarCanvas } from "./IAssetAvatarCanvas";
import { IAssetAvatarSetGroup } from "./IAssetAvatarSetGroup";
import { IAssetAvatarType } from "./IAssetAvatarType";

export interface IAssetAvatarGeometryConfig {
    direction: number;
    camera: IAssetAvatarCamera;
    canvases: IAssetAvatarCanvas[];
    avatarSets: IAssetAvatarSetGroup[];
    types: IAssetAvatarType[];
}
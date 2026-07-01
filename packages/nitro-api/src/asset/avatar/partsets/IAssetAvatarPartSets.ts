import { IAssetAvatarActivePartSet } from "./IAssetAvatarActivePartSet";
import { IAssetAvatarPartSetItem } from "./IAssetAvatarPartSetItem";

export interface IAssetAvatarPartSets {
    partSet: IAssetAvatarPartSetItem[];
    activePartSets: IAssetAvatarActivePartSet[];
}
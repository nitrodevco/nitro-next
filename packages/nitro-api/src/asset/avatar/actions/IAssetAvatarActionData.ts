import { IAssetAvatarAction } from "./IAssetAvatarAction";
import { IAssetAvatarActionOffset } from "./IAssetAvatarActionOffset";

export interface IAssetAvatarActionData {
    actions: IAssetAvatarAction[];
    actionOffsets: IAssetAvatarActionOffset[];
}
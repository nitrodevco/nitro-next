import { IAssetAvatarDirectionOffset } from "./IAssetAvatarDirectionOffset";

export interface IAssetAvatarFrameOffsetData {
    id: number;
    directions: IAssetAvatarDirectionOffset[];
    repeats?: number;
}
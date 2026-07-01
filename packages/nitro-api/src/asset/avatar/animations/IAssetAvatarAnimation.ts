import { IAssetAvatarAnimationOffsets } from "./IAssetAvatarAnimationOffsets";
import { IAssetAvatarAnimationPart } from "./IAssetAvatarAnimationPart";

export interface IAssetAvatarAnimation {
    id: string;
    parts: IAssetAvatarAnimationPart[];
    offsets?: IAssetAvatarAnimationOffsets;
}
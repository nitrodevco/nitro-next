import { AvatarBodyPartType } from "#api/avatar/enum";
import { IAssetAvatarBodyPartItem } from "./IAssetAvatarBodyPartItem";

export interface IAssetAvatarBodyPart {
    id: AvatarBodyPartType;
    x?: number;
    y?: number;
    z?: number;
    radius?: number;
    items?: IAssetAvatarBodyPartItem[];
}
import { IAssetAvatarBodyPartItem } from "./IAssetAvatarBodyPartItem";

export interface IAssetAvatarBodyPart {
    id: string;
    x?: number;
    y?: number;
    z?: number;
    radius?: number;
    items?: IAssetAvatarBodyPartItem[];
}
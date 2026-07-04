import { AvatarSetType } from "#api/avatar/enum";
import { IAssetAvatarSet } from "./IAssetAvatarSet";

export interface IAssetAvatarSetGroup {
    id: AvatarSetType;
    avatarSets: IAssetAvatarSet[];
}
import { AvatarSetType } from "#api/avatar";
import { IAssetAvatarBodyPartRef } from "./IAssetAvatarBodyPartRef";

export interface IAssetAvatarSet {
    id: AvatarSetType;
    main?: boolean;
    bodyParts?: IAssetAvatarBodyPartRef[];
    avatarSets?: IAssetAvatarSet[]; // Nested avatar sets
}
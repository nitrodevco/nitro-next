import { IAssetAvatarBodyPartRef } from "./IAssetAvatarBodyPartRef";

export interface IAssetAvatarSet {
    id: string;
    main?: boolean;
    bodyParts?: IAssetAvatarBodyPartRef[];
    avatarSets?: IAssetAvatarSet[]; // Nested avatar sets
}
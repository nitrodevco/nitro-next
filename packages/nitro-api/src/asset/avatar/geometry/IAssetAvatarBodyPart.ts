import { AvatarBodyPartType } from '#api/avatar/enum';

import { IAssetAvatarBodyPartItem } from './IAssetAvatarBodyPartItem';

export interface IAssetAvatarBodyPart {
    id: AvatarBodyPartType;
    x?: number;
    y?: number;
    z?: number;
    radius?: number;
    /** Draw this body part before the named one when they sit at the same distance (the pet body parts share the arm geometry). */
    orderBefore?: AvatarBodyPartType;
    /** Draw this body part right after the named one, whatever the distance sort says. */
    orderAfter?: AvatarBodyPartType;
    items?: IAssetAvatarBodyPartItem[];
}

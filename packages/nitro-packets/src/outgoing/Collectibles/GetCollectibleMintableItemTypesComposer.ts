// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/**
 * Flash `GetCollectibleMintableItemTypesMessageComposer`: which furni types may be minted.
 */
export type GetCollectibleMintableItemTypesComposerType = object;

export class GetCollectibleMintableItemTypesComposer implements IOutgoingPacket<GetCollectibleMintableItemTypesComposerType> {
    public constructor(private params: GetCollectibleMintableItemTypesComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [];
    }
}

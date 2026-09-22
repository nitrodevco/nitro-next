// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/**
 * Flash `GetCollectibleMintingEnabledMessageComposer`: whether minting is open.
 */
export type GetCollectibleMintingEnabledComposerType = object;

export class GetCollectibleMintingEnabledComposer implements IOutgoingPacket<GetCollectibleMintingEnabledComposerType> {
    public constructor(private params: GetCollectibleMintingEnabledComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [];
    }
}

// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/**
 * Flash `NftCollectiblesClaimRewardItemMessageComposer`: claim a set's completion reward for a wallet.
 */
export type NftCollectiblesClaimRewardItemComposerType = {
    collectionId: string;
    walletAddress: string;
};

export class NftCollectiblesClaimRewardItemComposer implements IOutgoingPacket<NftCollectiblesClaimRewardItemComposerType> {
    public constructor(private params: NftCollectiblesClaimRewardItemComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.collectionId,
            this.params.walletAddress,
        ];
    }
}

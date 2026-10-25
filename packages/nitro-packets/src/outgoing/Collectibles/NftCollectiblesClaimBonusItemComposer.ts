// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/**
 * Flash `NftCollectiblesClaimBonusItemMessageComposer`: claim a set's bonus item for a wallet.
 */
export type NftCollectiblesClaimBonusItemComposerType = {
    collectionId: string;
    walletAddress: string;
};

export class NftCollectiblesClaimBonusItemComposer implements IOutgoingPacket<NftCollectiblesClaimBonusItemComposerType> {
    public constructor(private params: NftCollectiblesClaimBonusItemComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.collectionId,
            this.params.walletAddress,
        ];
    }
}

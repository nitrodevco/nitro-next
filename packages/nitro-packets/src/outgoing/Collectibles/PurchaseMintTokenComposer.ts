// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/**
 * Flash `PurchaseMintTokenMessageComposer` (`HabboCatalog.purchaseMintTokens`): buy a mint token pack
 * with silver for a wallet.
 */
export type PurchaseMintTokenComposerType = {
    offerId: number;
    walletAddress: string;
};

export class PurchaseMintTokenComposer implements IOutgoingPacket<PurchaseMintTokenComposerType> {
    public constructor(private params: PurchaseMintTokenComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.offerId,
            this.params.walletAddress,
        ];
    }
}

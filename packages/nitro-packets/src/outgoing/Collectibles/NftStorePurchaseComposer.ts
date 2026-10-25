// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/**
 * Flash `NftStorePurchaseMessageComposer` (`HabboCatalog.purchaseNftOffer`): buy a collectibles shop
 * offer into a wallet.
 */
export type NftStorePurchaseComposerType = {
    productCode: string;
    walletAddress: string;
};

export class NftStorePurchaseComposer implements IOutgoingPacket<NftStorePurchaseComposerType> {
    public constructor(private params: NftStorePurchaseComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.productCode,
            this.params.walletAddress,
        ];
    }
}

// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/**
 * Flash `NftTransferAssetsMessageComposer`: move everything in the Collector wallet to another wallet.
 */
export type NftTransferAssetsComposerType = {
    walletAddress: string;
};

export class NftTransferAssetsComposer implements IOutgoingPacket<NftTransferAssetsComposerType> {
    public constructor(private params: NftTransferAssetsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.walletAddress,
        ];
    }
}

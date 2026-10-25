// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/**
 * Flash `MintItemMessageComposer`: mint one inventory furni into a wallet.
 */
export type MintItemComposerType = {
    itemId: number;
    walletAddress: string;
};

export class MintItemComposer implements IOutgoingPacket<MintItemComposerType> {
    public constructor(private params: MintItemComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.itemId,
            this.params.walletAddress,
        ];
    }
}

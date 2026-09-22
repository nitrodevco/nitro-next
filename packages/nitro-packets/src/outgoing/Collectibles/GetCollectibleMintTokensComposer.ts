// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/**
 * Flash `GetCollectibleMintTokensMessageComposer`: the mint token balance of a wallet.
 */
export type GetCollectibleMintTokensComposerType = {
    walletAddress: string;
};

export class GetCollectibleMintTokensComposer implements IOutgoingPacket<GetCollectibleMintTokensComposerType> {
    public constructor(private params: GetCollectibleMintTokensComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.walletAddress,
        ];
    }
}

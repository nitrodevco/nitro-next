// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/**
 * Flash `GetCollectorScoreMessageComposer`: the collector score and level of a wallet.
 */
export type GetCollectorScoreComposerType = {
    walletAddress: string;
};

export class GetCollectorScoreComposer implements IOutgoingPacket<GetCollectorScoreComposerType> {
    public constructor(private params: GetCollectorScoreComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.walletAddress,
        ];
    }
}

// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/**
 * Flash `GetNftClaimsMessageComposer`: the reward claims of a wallet.
 */
export type GetNftClaimsComposerType = {
    walletAddress: string;
};

export class GetNftClaimsComposer implements IOutgoingPacket<GetNftClaimsComposerType> {
    public constructor(private params: GetNftClaimsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.walletAddress,
        ];
    }
}

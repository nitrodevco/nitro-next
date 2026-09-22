// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper, ParseArray } from '@nitrodevco/nitro-api';

import { INftClaim, NftClaimParser } from '../Data/NftClaimParser';

/**
 * Flash `NftClaimsMessageEvent`: the reward claims of one wallet (`RewardClaimsTab.onNftClaimsMessage`).
 */
export type NftClaimsMessageType = {
    nftClaims: INftClaim[];
};

export class NftClaimsMessage implements IIncomingPacket<NftClaimsMessageType> {
    public parse(wrapper: IMessageDataWrapper): NftClaimsMessageType {
        return { nftClaims: ParseArray(wrapper, NftClaimParser) };
    }
}

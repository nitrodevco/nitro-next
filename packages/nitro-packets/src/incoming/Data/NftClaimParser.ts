// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IMessageDataWrapper, ReadLong } from '@nitrodevco/nitro-api';

import { ClaimItemParser, IClaimItem } from './ClaimItemParser';

/**
 * Flash `parser/collectibles/NftClaim`: a reward a wallet may claim - how many of how many were
 * claimed, the validity window and bookkeeping times (milliseconds), the collection and product it
 * came from, the wallet it is for, and the item it gives.
 */
export interface INftClaim {
    claimId: string;
    status: number;
    claimedAmount: number;
    claimLimit: number;
    validFrom: number;
    validTo: number;
    createdAt: number;
    updatedAt: number;
    collection: string;
    productCode: string;
    wallet: string;
    claimItem: IClaimItem;
}

export const NftClaimParser = (wrapper: IMessageDataWrapper): INftClaim => ({
    claimId: wrapper.readString(),
    status: wrapper.readInt(),
    claimedAmount: wrapper.readInt(),
    claimLimit: wrapper.readInt(),
    validFrom: ReadLong(wrapper),
    validTo: ReadLong(wrapper),
    createdAt: ReadLong(wrapper),
    updatedAt: ReadLong(wrapper),
    collection: wrapper.readString(),
    productCode: wrapper.readString(),
    wallet: wrapper.readString(),
    claimItem: ClaimItemParser(wrapper),
});

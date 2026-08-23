import type { IMessageDataWrapper } from '@nitrodevco/nitro-api';

export interface ICollectibleItemClaim {
    claimId: string;
    claimedAmount: number;
    claimLimit: number;
    status: number;
}

export const CollectibleItemClaimParser = (wrapper: IMessageDataWrapper): ICollectibleItemClaim => {
    const data: ICollectibleItemClaim = {
        claimId: '',
        claimedAmount: 0,
        claimLimit: 0,
        status: 0,
    };

    data.claimId = wrapper.readString();
    data.claimedAmount = wrapper.readInt();
    data.claimLimit = wrapper.readInt();
    data.status = wrapper.readShort();

    return data;
};

import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

export interface IDailyTaskReward {
    productItemTypeId: number;
    rewardTypeId: string;
    extraParams: string;
    amount: number;
}

export const DailyTaskRewardParser = (wrapper: IMessageDataWrapper): IDailyTaskReward => {
    const data: IDailyTaskReward = {
        productItemTypeId: 0,
        rewardTypeId: '',
        extraParams: '',
        amount: 0,
    };

    data.productItemTypeId = wrapper.readShort();
    data.rewardTypeId = wrapper.readString();
    data.extraParams = wrapper.readString();
    data.amount = wrapper.readInt();

    return data;
};

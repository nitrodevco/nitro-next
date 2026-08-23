import type { IMessageDataWrapper } from '@nitrodevco/nitro-api';

export interface ITalentTrackRewardProduct {
    productCode: string;
    vipDays: number;
}

export const TalentTrackRewardProductParser = (wrapper: IMessageDataWrapper): ITalentTrackRewardProduct => {
    const data: ITalentTrackRewardProduct = {
        productCode: '',
        vipDays: 0,
    };

    data.productCode = wrapper.readString();
    data.vipDays = wrapper.readInt();

    return data;
};

import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IIncomeRewardStatusData } from './IIncomeRewardStatusData';

export const IncomeRewardStatusDataParser = (wrapper: IMessageDataWrapper): IIncomeRewardStatusData => {
    return { rewardCategory: wrapper.readByte(), rewardType: wrapper.readByte(), amount: wrapper.readInt(), productCode: wrapper.readString() };
};

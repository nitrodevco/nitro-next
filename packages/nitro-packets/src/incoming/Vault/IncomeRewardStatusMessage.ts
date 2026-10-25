import { IIncomingPacket, IMessageDataWrapper, ParseArray } from '@nitrodevco/nitro-api';

import { IIncomeRewardStatusData } from './Data/IIncomeRewardStatusData';
import { IncomeRewardStatusDataParser } from './Data/IncomeRewardStatusDataParser';

export type IncomeRewardStatusMessageType = {
    data: IIncomeRewardStatusData[];
};

export class IncomeRewardStatusMessage implements IIncomingPacket<IncomeRewardStatusMessageType> {
    public parse(wrapper: IMessageDataWrapper): IncomeRewardStatusMessageType {
        const data = ParseArray(wrapper, IncomeRewardStatusDataParser);
        return { data };
    }
}

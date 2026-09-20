// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IMessageDataWrapper, ParseArray, ParseInts } from '@nitrodevco/nitro-api';

import { ChestItemTypeParser } from '../../Chests/Data/ChestItemTypeParser';
import { IWiredTransactionDetails } from './IWiredTransactionDetails';
import { IWiredTransactionFurniAmount } from './IWiredTransactionFurniAmount';
import { WiredTransactionInfoParser } from './WiredTransactionInfoParser';

const readFurniAmount = (wrapper: IMessageDataWrapper): IWiredTransactionFurniAmount => {
    const itemType = ChestItemTypeParser(wrapper);
    const amount = wrapper.readInt();

    return { itemType, amount };
};

/** Flash `WiredTransactionDetails`. */
export const WiredTransactionDetailsParser = (wrapper: IMessageDataWrapper): IWiredTransactionDetails => {
    const transactionInfo = WiredTransactionInfoParser(wrapper);
    const chestIds = ParseInts(wrapper);
    const depositedFurnis = ParseArray(wrapper, readFurniAmount);
    const withdrawnFurnis = ParseArray(wrapper, readFurniAmount);
    const isIncompleteData = wrapper.readBoolean();

    return { transactionInfo, chestIds, depositedFurnis, withdrawnFurnis, isIncompleteData };
};

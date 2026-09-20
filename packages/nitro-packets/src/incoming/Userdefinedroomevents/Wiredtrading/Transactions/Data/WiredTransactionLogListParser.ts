// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IMessageDataWrapper, ParseArray, ReadLong } from '@nitrodevco/nitro-api';

import { IWiredTransactionLogList } from './IWiredTransactionLogList';
import { WiredTransactionInfoParser } from './WiredTransactionInfoParser';
import { WiredTransactionLogListType } from './WiredTransactionLogListType';

/** Flash `WiredTransactionLogList`. */
export const WiredTransactionLogListParser = (wrapper: IMessageDataWrapper): IWiredTransactionLogList => {
    const logListType: WiredTransactionLogListType = wrapper.readInt();
    const logListId = ReadLong(wrapper);
    const totalLogs = wrapper.readInt();
    const currentPage = wrapper.readInt();
    const amount = wrapper.readInt();
    const logs = ParseArray(wrapper, WiredTransactionInfoParser);

    return { logListType, logListId, totalLogs, currentPage, amount, logs };
};

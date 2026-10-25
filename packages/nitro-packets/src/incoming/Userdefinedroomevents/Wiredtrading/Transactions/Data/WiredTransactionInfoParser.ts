// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IMessageDataWrapper, ReadLong } from '@nitrodevco/nitro-api';

import { IWiredTransactionInfo } from './IWiredTransactionInfo';

/** Flash `WiredTransactionInfo`. */
export const WiredTransactionInfoParser = (wrapper: IMessageDataWrapper): IWiredTransactionInfo => {
    return {
        transactionId: ReadLong(wrapper),
        flatId: wrapper.readInt(),
        transactionType: wrapper.readInt(),
        transactionDefinitionInfo: wrapper.readString(),
        userId: wrapper.readInt(),
        userName: wrapper.readString(),
        timestamp: ReadLong(wrapper),
        readableTimestamp: wrapper.readString(),
        chestCount: wrapper.readInt(),
        withdrawFurniCount: wrapper.readInt(),
        depositFurniCount: wrapper.readInt(),
        withdrawCoinsCount: wrapper.readInt(),
        depositCoinsCount: wrapper.readInt(),
    };
};

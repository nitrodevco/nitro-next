// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IWiredTransactionLogList } from './Data/IWiredTransactionLogList';
import { WiredTransactionLogListParser } from './Data/WiredTransactionLogListParser';

export type WiredTransactionLogListMessageType = {
    logs: IWiredTransactionLogList;
};

/** The answer to `WiredTransactionGetChestLogsComposer` and `WiredTransactionGetRoomLogsComposer`. Flash parser `_-G2P._-U2n`. */
export class WiredTransactionLogListMessage implements IIncomingPacket<WiredTransactionLogListMessageType> {
    public parse(wrapper: IMessageDataWrapper): WiredTransactionLogListMessageType {
        const logs = WiredTransactionLogListParser(wrapper);

        return { logs };
    }
}

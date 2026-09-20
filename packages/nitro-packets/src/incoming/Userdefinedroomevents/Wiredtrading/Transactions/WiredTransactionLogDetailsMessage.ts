// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IWiredTransactionDetails } from './Data/IWiredTransactionDetails';
import { WiredTransactionDetailsParser } from './Data/WiredTransactionDetailsParser';

export type WiredTransactionLogDetailsMessageType = {
    details: IWiredTransactionDetails;
};

/** The answer to `WiredTransactionGetLogDetailsComposer`. Flash parser `_-G2P._-MZ`. */
export class WiredTransactionLogDetailsMessage implements IIncomingPacket<WiredTransactionLogDetailsMessageType> {
    public parse(wrapper: IMessageDataWrapper): WiredTransactionLogDetailsMessageType {
        const details = WiredTransactionDetailsParser(wrapper);

        return { details };
    }
}

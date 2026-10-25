// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket, WriteLong } from '@nitrodevco/nitro-api';

export type WiredTransactionGetLogDetailsComposerType = {
    /** `IWiredTransactionInfo.transactionId`. */
    transactionId: number;
};

/**
 * Flash `_-X2r.WiredTransactionGetLogDetailsMessageComposer`, sent when a log line is clicked;
 * answered by `WiredTransactionLogDetailsMessage`. Flash pushes `new Long(transactionId)`, which
 * goes out as two ints.
 */
export class WiredTransactionGetLogDetailsComposer implements IOutgoingPacket<WiredTransactionGetLogDetailsComposerType> {
    public constructor(private params: WiredTransactionGetLogDetailsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            ...WriteLong(this.params.transactionId),
        ];
    }
}

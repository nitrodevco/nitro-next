// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/**
 * `CurrentTimingCodeMessageParser`: the answer to `GetCurrentTimingCodeComposer` - the schedule
 * that was asked about, echoed back so the asker can tell its own answer apart, and the code that
 * schedule has reached now (empty before its first entry).
 */
export type CurrentTimingCodeMessageType = {
    schedulingStr: string;
    code: string;
};

export class CurrentTimingCodeMessage implements IIncomingPacket<CurrentTimingCodeMessageType> {
    public parse(wrapper: IMessageDataWrapper): CurrentTimingCodeMessageType {
        return {
            schedulingStr: wrapper.readString(),
            code: wrapper.readString(),
        };
    }
}

// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/** `SecondsUntilMessageParser`: the answer to `GetSecondsUntilMessageComposer`, keyed by the time string asked about. */
export type SecondsUntilMessageType = {
    timeStr: string;
    secondsUntil: number;
};

export class SecondsUntilMessage implements IIncomingPacket<SecondsUntilMessageType> {
    public parse(wrapper: IMessageDataWrapper): SecondsUntilMessageType {
        return {
            timeStr: wrapper.readString(),
            secondsUntil: wrapper.readInt(),
        };
    }
}

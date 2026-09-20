// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket } from '@nitrodevco/nitro-api';

export type WiredTradeCompletedMessageType = object;

/** The wired trade went through. Flash parser `wiredtrading.trade._-V1P` reads nothing. */
export class WiredTradeCompletedMessage implements IIncomingPacket<WiredTradeCompletedMessageType> {
    public parse(): WiredTradeCompletedMessageType {
        return {};
    }
}

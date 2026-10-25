// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket } from '@nitrodevco/nitro-api';

/** The packet carries no fields: its arrival is the whole message. */
export type MiniMailNewMessageType = object;

export class MiniMailNewMessage implements IIncomingPacket<MiniMailNewMessageType> {
    public parse(): MiniMailNewMessageType {
        return {};
    }
}

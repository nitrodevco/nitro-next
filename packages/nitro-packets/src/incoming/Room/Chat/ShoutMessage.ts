import type { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ShoutMessageType = {
    // no fields
};

export class ShoutMessage implements IIncomingPacket<ShoutMessageType> {
    public parse(wrapper: IMessageDataWrapper): ShoutMessageType {
        const packet: ShoutMessageType = {};

        return packet;
    }
}

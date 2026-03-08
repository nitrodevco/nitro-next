import type { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type WhisperMessageType = {
    // no fields
};

export class WhisperMessage implements IIncomingPacket<WhisperMessageType> {
    public parse(wrapper: IMessageDataWrapper): WhisperMessageType {
        const packet: WhisperMessageType = {};

        return packet;
    }
}

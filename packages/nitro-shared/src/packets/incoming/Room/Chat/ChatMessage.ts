import type { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ChatMessageType = {
    // no fields
};

export class ChatMessage implements IIncomingPacket<ChatMessageType> {
    public parse(wrapper: IMessageDataWrapper): ChatMessageType {
        const packet: ChatMessageType = {};

        return packet;
    }
}

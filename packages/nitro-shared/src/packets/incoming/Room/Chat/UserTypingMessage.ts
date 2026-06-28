import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type UserTypingMessageType = {
    objectId: number;
    isTyping: boolean;
};

export class UserTypingMessage implements IIncomingPacket<UserTypingMessageType> {
    public parse(wrapper: IMessageDataWrapper): UserTypingMessageType {
        const packet: UserTypingMessageType = {
            objectId: wrapper.readInt(),
            isTyping: !!wrapper.readInt()
        };

        return packet;
    }
}

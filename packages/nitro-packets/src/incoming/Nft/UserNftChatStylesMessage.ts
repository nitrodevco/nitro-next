import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type UserNftChatStylesMessageType = object;

export class UserNftChatStylesMessage implements IIncomingPacket<UserNftChatStylesMessageType> {
    public parse(wrapper: IMessageDataWrapper): UserNftChatStylesMessageType {
        const packet: UserNftChatStylesMessageType = {
        };

        return packet;
    }
}

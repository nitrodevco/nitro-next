import { IIncomingPacket, IMessageDataWrapper, ParseInts } from '@nitrodevco/nitro-api';

export type UserNftChatStylesMessageType = {
    chatStyleIds: number[];
};

export class UserNftChatStylesMessage implements IIncomingPacket<UserNftChatStylesMessageType> {
    public parse(wrapper: IMessageDataWrapper): UserNftChatStylesMessageType {
        const chatStyleIds = ParseInts(wrapper);
        return { chatStyleIds };
    }
}

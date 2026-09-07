import { IIncomingPacket, IMessageDataWrapper, ParseInts } from '@nitrodevco/nitro-api';

export type UserPurchasableChatStylesMessageType = {
    chatStyleIds: number[];
};

export class UserPurchasableChatStylesMessage implements IIncomingPacket<UserPurchasableChatStylesMessageType> {
    public parse(wrapper: IMessageDataWrapper): UserPurchasableChatStylesMessageType {
        const chatStyleIds = ParseInts(wrapper);
        return { chatStyleIds };
    }
}

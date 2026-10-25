import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type UserPurchasableChatStyleChangedMessageType = {
    added: boolean;
    styleId: number;
};

export class UserPurchasableChatStyleChangedMessage implements IIncomingPacket<UserPurchasableChatStyleChangedMessageType> {
    public parse(wrapper: IMessageDataWrapper): UserPurchasableChatStyleChangedMessageType {
        const added = wrapper.readBoolean();
        const styleId = wrapper.readInt();
        return { added, styleId };
    }
}

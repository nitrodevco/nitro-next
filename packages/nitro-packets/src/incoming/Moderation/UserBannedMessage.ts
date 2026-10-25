import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type UserBannedMessageType = {
    message: string;
};

export class UserBannedMessage implements IIncomingPacket<UserBannedMessageType> {
    public parse(wrapper: IMessageDataWrapper): UserBannedMessageType {
        const message = wrapper.readString();
        return { message };
    }
}

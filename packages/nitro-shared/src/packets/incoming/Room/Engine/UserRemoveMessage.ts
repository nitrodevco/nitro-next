import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type UserRemoveMessageType = {
    objectId: number;
};

export class UserRemoveMessage implements IIncomingPacket<UserRemoveMessageType> {
    public parse(wrapper: IMessageDataWrapper): UserRemoveMessageType {
        const packet: UserRemoveMessageType = {
            objectId: parseInt(wrapper.readString()),
        };

        return packet;
    }
}

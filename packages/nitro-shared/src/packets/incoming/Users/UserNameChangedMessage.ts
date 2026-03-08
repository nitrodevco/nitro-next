import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type UserNameChangedMessageType = {
    webId: number;
    id: number;
    newName: string;
};

export class UserNameChangedMessage implements IIncomingPacket<UserNameChangedMessageType> {
    public parse(wrapper: IMessageDataWrapper): UserNameChangedMessageType {
        const packet: UserNameChangedMessageType = {
            webId: wrapper.readInt(),
            id: wrapper.readInt(),
            newName: wrapper.readString(),
        };

        return packet;
    }
}

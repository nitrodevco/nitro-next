import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { FriendNotificationCodeType } from './Data/FriendNotificationCodeType';

export type FriendNotificationMessageType = {
    playerId: number;
    typeCode: FriendNotificationCodeType;
    message: string;
};

export class FriendNotificationMessage implements IIncomingPacket<FriendNotificationMessageType> {
    public parse(wrapper: IMessageDataWrapper): FriendNotificationMessageType {
        const packet: FriendNotificationMessageType = {
            playerId: parseInt(wrapper.readString()),
            typeCode: wrapper.readInt(),
            message: wrapper.readString(),
        };

        return packet;
    }
}

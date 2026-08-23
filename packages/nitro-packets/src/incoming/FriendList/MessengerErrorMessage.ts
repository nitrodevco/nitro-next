import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { FriendListErrorCodeType } from './Data/FriendListErrorCodeType';

export type MessengerErrorMessageType = {
    clientMessageId: number;
    errorCode: FriendListErrorCodeType;
};

export class MessengerErrorMessage implements IIncomingPacket<MessengerErrorMessageType> {
    public parse(wrapper: IMessageDataWrapper): MessengerErrorMessageType {
        const packet: MessengerErrorMessageType = {
            clientMessageId: wrapper.readInt(),
            errorCode: wrapper.readInt(),
        };

        return packet;
    }
}

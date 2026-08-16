import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';
import { IFriendAcceptFailure } from './Data/IFriendAcceptFailure';

export type AcceptFriendResultMessageType = {
    failures: IFriendAcceptFailure[];
};

export class AcceptFriendResultMessage implements IIncomingPacket<AcceptFriendResultMessageType> {
    public parse(wrapper: IMessageDataWrapper): AcceptFriendResultMessageType {
        const packet: AcceptFriendResultMessageType = {
            failures: []
        };

        let count = wrapper.readInt();

        while (count > 0) {
            packet.failures.push({ playerId: wrapper.readInt(), errorCode: wrapper.readInt() });

            count--;
        }

        return packet;
    }
}

import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type NoOwnedRoomsAlertMessageType = object;

export class NoOwnedRoomsAlertMessage implements IIncomingPacket<NoOwnedRoomsAlertMessageType> {
    public parse(wrapper: IMessageDataWrapper): NoOwnedRoomsAlertMessageType {
        const packet: NoOwnedRoomsAlertMessageType = {
        };

        return packet;
    }
}

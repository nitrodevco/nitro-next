import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type RoomMessageNotificationMessageType = {
    roomId: number;
    roomName: string;
    messageCount: number;
};

export class RoomMessageNotificationMessage implements IIncomingPacket<RoomMessageNotificationMessageType> {
    public parse(wrapper: IMessageDataWrapper): RoomMessageNotificationMessageType {
        const packet: RoomMessageNotificationMessageType = {
            roomId: wrapper.readInt(),
            roomName: wrapper.readString(),
            messageCount: wrapper.readInt(),
        };

        return packet;
    }
}

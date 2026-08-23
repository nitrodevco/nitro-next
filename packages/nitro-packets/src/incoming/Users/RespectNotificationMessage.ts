import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type RespectNotificationMessageType = {
    userId: number;
    respectTotal: number;
};

export class RespectNotificationMessage implements IIncomingPacket<RespectNotificationMessageType> {
    public parse(wrapper: IMessageDataWrapper): RespectNotificationMessageType {
        const packet: RespectNotificationMessageType = {
            userId: wrapper.readInt(),
            respectTotal: wrapper.readInt(),
        };

        return packet;
    }
}

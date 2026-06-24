import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type OneWayDoorStatusMessageType = {
    furniId: number;
    status: number;
};

export class OneWayDoorStatusMessage implements IIncomingPacket<OneWayDoorStatusMessageType> {
    public parse(wrapper: IMessageDataWrapper): OneWayDoorStatusMessageType {
        const packet: OneWayDoorStatusMessageType = {
            furniId: wrapper.readInt(),
            status: wrapper.readInt(),
        };

        return packet;
    }
}

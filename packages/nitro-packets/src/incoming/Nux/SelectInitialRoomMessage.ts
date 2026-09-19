import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type SelectInitialRoomMessageType = {
    status: number;
    roomId: number;
};

export class SelectInitialRoomMessage implements IIncomingPacket<SelectInitialRoomMessageType> {
    public parse(wrapper: IMessageDataWrapper): SelectInitialRoomMessageType {
        const status = wrapper.readShort();
        const roomId = wrapper.readInt();
        return { status, roomId };
    }
}

import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ModeratorRoomInfoEventMessageType = object;

export class ModeratorRoomInfoEventMessage implements IIncomingPacket<ModeratorRoomInfoEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): ModeratorRoomInfoEventMessageType {
        const packet: ModeratorRoomInfoEventMessageType = {
        };

        return packet;
    }
}

import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type RoomChatlogEventMessageType = object;

export class RoomChatlogEventMessage implements IIncomingPacket<RoomChatlogEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): RoomChatlogEventMessageType {
        const packet: RoomChatlogEventMessageType = {
        };

        return packet;
    }
}

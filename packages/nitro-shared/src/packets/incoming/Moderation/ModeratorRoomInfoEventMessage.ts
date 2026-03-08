import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ModeratorRoomInfoEventMessageType = {
  // no fields

};

export class ModeratorRoomInfoEventMessage implements IIncomingPacket<ModeratorRoomInfoEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): ModeratorRoomInfoEventMessageType
  {

    const packet: ModeratorRoomInfoEventMessageType = {
    };

    return packet;
  }
}

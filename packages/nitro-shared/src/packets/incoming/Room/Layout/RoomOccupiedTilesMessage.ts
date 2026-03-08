import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type RoomOccupiedTilesMessageType = {
  // no fields

};

export class RoomOccupiedTilesMessage implements IIncomingPacket<RoomOccupiedTilesMessageType>
{
  public parse(wrapper: IMessageDataWrapper): RoomOccupiedTilesMessageType
  {

    const packet: RoomOccupiedTilesMessageType = {
    };

    return packet;
  }
}

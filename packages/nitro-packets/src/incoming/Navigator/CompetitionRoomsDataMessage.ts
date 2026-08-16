import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(RoomData: CompetitionRoomDataSnapshot): Unknown type 'CompetitionRoomDataSnapshot'. Add override mapping.

export type CompetitionRoomsDataMessageType = {
  roomData: any;
};

export class CompetitionRoomsDataMessage implements IIncomingPacket<CompetitionRoomsDataMessageType>
{
  public parse(wrapper: IMessageDataWrapper): CompetitionRoomsDataMessageType
  {

    const packet: CompetitionRoomsDataMessageType = {
      roomData: undefined as any, // Unknown type 'CompetitionRoomDataSnapshot'. Add override mapping.
    };

    return packet;
  }
}

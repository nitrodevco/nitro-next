import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type RoomDimmerPresetsMessageType = {
  // no fields

};

export class RoomDimmerPresetsMessage implements IIncomingPacket<RoomDimmerPresetsMessageType>
{
  public parse(wrapper: IMessageDataWrapper): RoomDimmerPresetsMessageType
  {

    const packet: RoomDimmerPresetsMessageType = {
    };

    return packet;
  }
}

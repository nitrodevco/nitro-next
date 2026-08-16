import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type RoomRatingMessageType = {
  rating: number;
  canRate: boolean;
};

export class RoomRatingMessage implements IIncomingPacket<RoomRatingMessageType>
{
  public parse(wrapper: IMessageDataWrapper): RoomRatingMessageType
  {

    const packet: RoomRatingMessageType = {
      rating: wrapper.readInt(),
      canRate: wrapper.readBoolean(),
    };

    return packet;
  }
}

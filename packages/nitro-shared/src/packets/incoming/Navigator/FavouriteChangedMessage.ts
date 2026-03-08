import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type FavouriteChangedMessageType = {
  roomId: number;
  added: boolean;
};

export class FavouriteChangedMessage implements IIncomingPacket<FavouriteChangedMessageType>
{
  public parse(wrapper: IMessageDataWrapper): FavouriteChangedMessageType
  {

    const packet: FavouriteChangedMessageType = {
      roomId: wrapper.readInt(),
      added: wrapper.readBoolean(),
    };

    return packet;
  }
}

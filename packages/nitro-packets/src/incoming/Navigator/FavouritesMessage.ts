import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type FavouritesMessageType = {
  limit: number;
  favoriteRoomIds: number[];
};

export class FavouritesMessage implements IIncomingPacket<FavouritesMessageType>
{
  public parse(wrapper: IMessageDataWrapper): FavouritesMessageType
  {
    const packet: FavouritesMessageType = {
      limit: wrapper.readInt(),
      favoriteRoomIds: [],
    };

    let count = wrapper.readInt();

    while (count > 0) {
        packet.favoriteRoomIds.push(wrapper.readInt());
        count--;
    }

    return packet;
  }
}

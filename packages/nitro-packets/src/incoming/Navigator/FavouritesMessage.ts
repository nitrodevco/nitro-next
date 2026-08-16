import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(FavoriteRoomIds: ImmutableArray<int>): Unknown type 'ImmutableArray<int>'. Add override mapping.

export type FavouritesMessageType = {
  limit: number;
  favoriteRoomIds: any;
};

export class FavouritesMessage implements IIncomingPacket<FavouritesMessageType>
{
  public parse(wrapper: IMessageDataWrapper): FavouritesMessageType
  {

    const packet: FavouritesMessageType = {
      limit: wrapper.readInt(),
      favoriteRoomIds: undefined as any, // Unknown type 'ImmutableArray<int>'. Add override mapping.
    };

    return packet;
  }
}

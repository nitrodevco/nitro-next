import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(ItemId: RoomObjectId): Unknown type 'RoomObjectId'. Add override mapping.

export type RequestSpamWallPostItMessageType = {
  itemId: any;
  location: string;
};

export class RequestSpamWallPostItMessage implements IIncomingPacket<RequestSpamWallPostItMessageType>
{
  public parse(wrapper: IMessageDataWrapper): RequestSpamWallPostItMessageType
  {

    const packet: RequestSpamWallPostItMessageType = {
      itemId: undefined as any, // Unknown type 'RoomObjectId'. Add override mapping.
      location: wrapper.readString(),
    };

    return packet;
  }
}

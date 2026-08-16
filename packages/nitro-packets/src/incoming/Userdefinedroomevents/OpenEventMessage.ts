import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(ItemId: RoomObjectId): Unknown type 'RoomObjectId'. Add override mapping.

export type OpenEventMessageType = {
  itemId: any;
};

export class OpenEventMessage implements IIncomingPacket<OpenEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): OpenEventMessageType
  {

    const packet: OpenEventMessageType = {
      itemId: undefined as any, // Unknown type 'RoomObjectId'. Add override mapping.
    };

    return packet;
  }
}

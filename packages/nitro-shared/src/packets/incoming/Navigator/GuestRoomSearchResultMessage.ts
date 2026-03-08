import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(Data: object?): Unknown type 'object'. Add override mapping.

export type GuestRoomSearchResultMessageType = {
  data: any;
};

export class GuestRoomSearchResultMessage implements IIncomingPacket<GuestRoomSearchResultMessageType>
{
  public parse(wrapper: IMessageDataWrapper): GuestRoomSearchResultMessageType
  {

    const packet: GuestRoomSearchResultMessageType = {
      data: undefined as any, // Unknown type 'object'. Add override mapping.
    };

    return packet;
  }
}

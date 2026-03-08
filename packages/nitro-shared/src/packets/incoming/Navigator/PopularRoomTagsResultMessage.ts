import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(Data: object?): Unknown type 'object'. Add override mapping.

export type PopularRoomTagsResultMessageType = {
  data: any;
};

export class PopularRoomTagsResultMessage implements IIncomingPacket<PopularRoomTagsResultMessageType>
{
  public parse(wrapper: IMessageDataWrapper): PopularRoomTagsResultMessageType
  {

    const packet: PopularRoomTagsResultMessageType = {
      data: undefined as any, // Unknown type 'object'. Add override mapping.
    };

    return packet;
  }
}

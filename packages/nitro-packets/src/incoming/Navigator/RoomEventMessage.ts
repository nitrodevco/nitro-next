import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(Data: object?): Unknown type 'object'. Add override mapping.

export type RoomEventMessageType = {
  data: any;
};

export class RoomEventMessage implements IIncomingPacket<RoomEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): RoomEventMessageType
  {

    const packet: RoomEventMessageType = {
      data: undefined as any, // Unknown type 'object'. Add override mapping.
    };

    return packet;
  }
}

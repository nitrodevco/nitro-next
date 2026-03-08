import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(PromotedRooms: object?): Unknown type 'object'. Add override mapping.
// TODO(Data: object?): Unknown type 'object'. Add override mapping.
// TODO(AdRoom: object?): Unknown type 'object'. Add override mapping.

export type OfficialRoomsMessageType = {
  promotedRooms: any;
  data: any;
  adRoom: any;
};

export class OfficialRoomsMessage implements IIncomingPacket<OfficialRoomsMessageType>
{
  public parse(wrapper: IMessageDataWrapper): OfficialRoomsMessageType
  {

    const packet: OfficialRoomsMessageType = {
      promotedRooms: undefined as any, // Unknown type 'object'. Add override mapping.
      data: undefined as any, // Unknown type 'object'. Add override mapping.
      adRoom: undefined as any, // Unknown type 'object'. Add override mapping.
    };

    return packet;
  }
}

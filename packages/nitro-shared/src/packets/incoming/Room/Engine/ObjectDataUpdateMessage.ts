import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(ObjectId: RoomObjectId): Unknown type 'RoomObjectId'. Add override mapping.
// TODO(StuffData: StuffDataSnapshot): Unknown type 'StuffDataSnapshot'. Add override mapping.

export type ObjectDataUpdateMessageType = {
  objectId: any;
  stuffData: any;
};

export class ObjectDataUpdateMessage implements IIncomingPacket<ObjectDataUpdateMessageType>
{
  public parse(wrapper: IMessageDataWrapper): ObjectDataUpdateMessageType
  {

    const packet: ObjectDataUpdateMessageType = {
      objectId: undefined as any, // Unknown type 'RoomObjectId'. Add override mapping.
      stuffData: undefined as any, // Unknown type 'StuffDataSnapshot'. Add override mapping.
    };

    return packet;
  }
}

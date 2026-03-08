import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(ObjectId: RoomObjectId): Unknown type 'RoomObjectId'. Add override mapping.

export type ObjectRemoveMessageType = {
  objectId: any;
  isExpired: boolean;
  pickerId: number;
  delay: number;
};

export class ObjectRemoveMessage implements IIncomingPacket<ObjectRemoveMessageType>
{
  public parse(wrapper: IMessageDataWrapper): ObjectRemoveMessageType
  {

    const packet: ObjectRemoveMessageType = {
      objectId: undefined as any, // Unknown type 'RoomObjectId'. Add override mapping.
      isExpired: wrapper.readBoolean(),
      pickerId: wrapper.readInt(),
      delay: wrapper.readInt(),
    };

    return packet;
  }
}

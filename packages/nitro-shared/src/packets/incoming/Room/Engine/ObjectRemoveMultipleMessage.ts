import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(ObjectIdsToRemove: ImmutableArray<long>): Unknown type 'ImmutableArray<long>'. Add override mapping.

export type ObjectRemoveMultipleMessageType = {
  objectIdsToRemove: any;
  pickerId: number;
};

export class ObjectRemoveMultipleMessage implements IIncomingPacket<ObjectRemoveMultipleMessageType>
{
  public parse(wrapper: IMessageDataWrapper): ObjectRemoveMultipleMessageType
  {

    const packet: ObjectRemoveMultipleMessageType = {
      objectIdsToRemove: undefined as any, // Unknown type 'ImmutableArray<long>'. Add override mapping.
      pickerId: wrapper.readInt(),
    };

    return packet;
  }
}

import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(StuffDatas: ImmutableDictionary<long, StuffDataSnapshot>): Unknown type 'ImmutableDictionary<long, StuffDataSnapshot>'. Add override mapping.

export type ObjectsDataUpdateMessageType = {
  stuffDatas: any;
};

export class ObjectsDataUpdateMessage implements IIncomingPacket<ObjectsDataUpdateMessageType>
{
  public parse(wrapper: IMessageDataWrapper): ObjectsDataUpdateMessageType
  {

    const packet: ObjectsDataUpdateMessageType = {
      stuffDatas: undefined as any, // Unknown type 'ImmutableDictionary<long, StuffDataSnapshot>'. Add override mapping.
    };

    return packet;
  }
}

import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(ObjectStates: ImmutableDictionary<long, string>): Unknown type 'ImmutableDictionary<long, string>'. Add override mapping.

export type ItemsStateUpdateMessageType = {
  objectStates: any;
};

export class ItemsStateUpdateMessage implements IIncomingPacket<ItemsStateUpdateMessageType>
{
  public parse(wrapper: IMessageDataWrapper): ItemsStateUpdateMessageType
  {

    const packet: ItemsStateUpdateMessageType = {
      objectStates: undefined as any, // Unknown type 'ImmutableDictionary<long, string>'. Add override mapping.
    };

    return packet;
  }
}

import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CollectableMintableItemTypesMessageType = {
  // no fields

};

export class CollectableMintableItemTypesMessage implements IIncomingPacket<CollectableMintableItemTypesMessageType>
{
  public parse(wrapper: IMessageDataWrapper): CollectableMintableItemTypesMessageType
  {

    const packet: CollectableMintableItemTypesMessageType = {
    };

    return packet;
  }
}

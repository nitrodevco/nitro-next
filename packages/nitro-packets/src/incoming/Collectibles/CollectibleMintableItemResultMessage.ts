import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CollectibleMintableItemResultMessageType = {
  // no fields

};

export class CollectibleMintableItemResultMessage implements IIncomingPacket<CollectibleMintableItemResultMessageType>
{
  public parse(wrapper: IMessageDataWrapper): CollectibleMintableItemResultMessageType
  {

    const packet: CollectibleMintableItemResultMessageType = {
    };

    return packet;
  }
}

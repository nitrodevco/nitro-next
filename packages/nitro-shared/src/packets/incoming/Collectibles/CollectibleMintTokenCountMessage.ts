import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CollectibleMintTokenCountMessageType = {
  // no fields

};

export class CollectibleMintTokenCountMessage implements IIncomingPacket<CollectibleMintTokenCountMessageType>
{
  public parse(wrapper: IMessageDataWrapper): CollectibleMintTokenCountMessageType
  {

    const packet: CollectibleMintTokenCountMessageType = {
    };

    return packet;
  }
}

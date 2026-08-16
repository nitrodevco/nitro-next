import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CollectibleMintTokenOffersMessageType = {
  // no fields

};

export class CollectibleMintTokenOffersMessage implements IIncomingPacket<CollectibleMintTokenOffersMessageType>
{
  public parse(wrapper: IMessageDataWrapper): CollectibleMintTokenOffersMessageType
  {

    const packet: CollectibleMintTokenOffersMessageType = {
    };

    return packet;
  }
}

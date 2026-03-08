import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CollectibleMintingEnabledMessageType = {
  // no fields

};

export class CollectibleMintingEnabledMessage implements IIncomingPacket<CollectibleMintingEnabledMessageType>
{
  public parse(wrapper: IMessageDataWrapper): CollectibleMintingEnabledMessageType
  {

    const packet: CollectibleMintingEnabledMessageType = {
    };

    return packet;
  }
}

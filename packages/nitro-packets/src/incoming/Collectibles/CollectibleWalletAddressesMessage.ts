import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CollectibleWalletAddressesMessageType = {
  // no fields

};

export class CollectibleWalletAddressesMessage implements IIncomingPacket<CollectibleWalletAddressesMessageType>
{
  public parse(wrapper: IMessageDataWrapper): CollectibleWalletAddressesMessageType
  {

    const packet: CollectibleWalletAddressesMessageType = {
    };

    return packet;
  }
}

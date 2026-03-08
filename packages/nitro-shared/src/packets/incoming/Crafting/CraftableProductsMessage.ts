import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CraftableProductsMessageType = {
  // no fields

};

export class CraftableProductsMessage implements IIncomingPacket<CraftableProductsMessageType>
{
  public parse(wrapper: IMessageDataWrapper): CraftableProductsMessageType
  {

    const packet: CraftableProductsMessageType = {
    };

    return packet;
  }
}

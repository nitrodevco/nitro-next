import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type SellablePetPalettesMessageType = {
  // no fields

};

export class SellablePetPalettesMessage implements IIncomingPacket<SellablePetPalettesMessageType>
{
  public parse(wrapper: IMessageDataWrapper): SellablePetPalettesMessageType
  {

    const packet: SellablePetPalettesMessageType = {
    };

    return packet;
  }
}

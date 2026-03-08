import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type PurchaseErrorMessageType = {
  // no fields

};

export class PurchaseErrorMessage implements IIncomingPacket<PurchaseErrorMessageType>
{
  public parse(wrapper: IMessageDataWrapper): PurchaseErrorMessageType
  {

    const packet: PurchaseErrorMessageType = {
    };

    return packet;
  }
}

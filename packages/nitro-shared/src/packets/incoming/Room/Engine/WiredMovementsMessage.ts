import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type WiredMovementsMessageType = {
  // no fields

};

export class WiredMovementsMessage implements IIncomingPacket<WiredMovementsMessageType>
{
  public parse(wrapper: IMessageDataWrapper): WiredMovementsMessageType
  {

    const packet: WiredMovementsMessageType = {
    };

    return packet;
  }
}

import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CreditBalanceEventMessageType = {
  balance: string;
};

export class CreditBalanceEventMessage implements IIncomingPacket<CreditBalanceEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): CreditBalanceEventMessageType
  {

    const packet: CreditBalanceEventMessageType = {
      balance: wrapper.readString(),
    };

    return packet;
  }
}

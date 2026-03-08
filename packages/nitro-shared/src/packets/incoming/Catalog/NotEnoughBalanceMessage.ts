import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type NotEnoughBalanceMessageType = {
  // no fields

};

export class NotEnoughBalanceMessage implements IIncomingPacket<NotEnoughBalanceMessageType>
{
  public parse(wrapper: IMessageDataWrapper): NotEnoughBalanceMessageType
  {

    const packet: NotEnoughBalanceMessageType = {
    };

    return packet;
  }
}

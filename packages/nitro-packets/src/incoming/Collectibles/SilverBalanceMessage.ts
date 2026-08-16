import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type SilverBalanceMessageType = {
  silverBalance: number;
};

export class SilverBalanceMessage implements IIncomingPacket<SilverBalanceMessageType>
{
  public parse(wrapper: IMessageDataWrapper): SilverBalanceMessageType
  {

    const packet: SilverBalanceMessageType = {
      silverBalance: wrapper.readInt(),
    };

    return packet;
  }
}

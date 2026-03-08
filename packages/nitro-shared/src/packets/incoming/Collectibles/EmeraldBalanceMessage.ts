import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type EmeraldBalanceMessageType = {
  emeraldBalance: number;
};

export class EmeraldBalanceMessage implements IIncomingPacket<EmeraldBalanceMessageType>
{
  public parse(wrapper: IMessageDataWrapper): EmeraldBalanceMessageType
  {

    const packet: EmeraldBalanceMessageType = {
      emeraldBalance: wrapper.readInt(),
    };

    return packet;
  }
}

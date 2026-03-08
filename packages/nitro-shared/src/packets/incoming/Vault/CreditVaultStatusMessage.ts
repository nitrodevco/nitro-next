import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CreditVaultStatusMessageType = {
  isUnlocked: boolean;
  totalBalance: number;
  withdrawBalance: number;
};

export class CreditVaultStatusMessage implements IIncomingPacket<CreditVaultStatusMessageType>
{
  public parse(wrapper: IMessageDataWrapper): CreditVaultStatusMessageType
  {

    const packet: CreditVaultStatusMessageType = {
      isUnlocked: wrapper.readBoolean(),
      totalBalance: wrapper.readInt(),
      withdrawBalance: wrapper.readInt(),
    };

    return packet;
  }
}

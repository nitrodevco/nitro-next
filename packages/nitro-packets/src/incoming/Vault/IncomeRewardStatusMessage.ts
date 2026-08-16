import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(IncomeRewards: List<IncomeRewardSnapshot>): List<T> requires custom read loop (length + items).

export type IncomeRewardStatusMessageType = {
  incomeRewards: any[];
};

export class IncomeRewardStatusMessage implements IIncomingPacket<IncomeRewardStatusMessageType>
{
  public parse(wrapper: IMessageDataWrapper): IncomeRewardStatusMessageType
  {

    const packet: IncomeRewardStatusMessageType = {
      incomeRewards: undefined as any, // List<T> requires custom read loop (length + items).
    };

    return packet;
  }
}

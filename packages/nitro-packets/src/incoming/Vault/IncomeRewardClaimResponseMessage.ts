import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type IncomeRewardClaimResponseMessageType = {
  rewardCategory: number;
  result: boolean;
};

export class IncomeRewardClaimResponseMessage implements IIncomingPacket<IncomeRewardClaimResponseMessageType>
{
  public parse(wrapper: IMessageDataWrapper): IncomeRewardClaimResponseMessageType
  {
    const packet: IncomeRewardClaimResponseMessageType = {
      rewardCategory: wrapper.readByte(),
      result: wrapper.readBoolean(),
    };

    return packet;
  }
}

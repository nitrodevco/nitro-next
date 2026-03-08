import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(RewardCategory: VaultRewardCategoryType): Unknown type 'VaultRewardCategoryType'. Add override mapping.

export type IncomeRewardClaimResponseMessageType = {
  rewardCategory: any;
  result: boolean;
};

export class IncomeRewardClaimResponseMessage implements IIncomingPacket<IncomeRewardClaimResponseMessageType>
{
  public parse(wrapper: IMessageDataWrapper): IncomeRewardClaimResponseMessageType
  {

    const packet: IncomeRewardClaimResponseMessageType = {
      rewardCategory: undefined as any, // Unknown type 'VaultRewardCategoryType'. Add override mapping.
      result: wrapper.readBoolean(),
    };

    return packet;
  }
}

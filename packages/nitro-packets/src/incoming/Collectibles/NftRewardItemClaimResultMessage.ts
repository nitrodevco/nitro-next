import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type NftRewardItemClaimResultMessageType = {
  collectionId: string;
  walletAddress: string;
  success: boolean;
};

export class NftRewardItemClaimResultMessage implements IIncomingPacket<NftRewardItemClaimResultMessageType>
{
  public parse(wrapper: IMessageDataWrapper): NftRewardItemClaimResultMessageType
  {
    const packet: NftRewardItemClaimResultMessageType = {
      collectionId: wrapper.readString(),
      walletAddress: wrapper.readString(),
      success: wrapper.readBoolean(),
    };

    return packet;
  }
}

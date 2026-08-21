import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type NftBonusItemClaimResultMessageType = {
  collectionId: string;
  walletAddress: string;
  success: boolean;
};

export class NftBonusItemClaimResultMessage implements IIncomingPacket<NftBonusItemClaimResultMessageType>
{
  public parse(wrapper: IMessageDataWrapper): NftBonusItemClaimResultMessageType
  {
    const packet: NftBonusItemClaimResultMessageType = {
      collectionId: wrapper.readString(),
      walletAddress: wrapper.readString(),
      success: wrapper.readBoolean(),
    };

    return packet;
  }
}

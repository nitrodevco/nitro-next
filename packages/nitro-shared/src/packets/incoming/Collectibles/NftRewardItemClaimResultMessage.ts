import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type NftRewardItemClaimResultMessageType = {
  // no fields

};

export class NftRewardItemClaimResultMessage implements IIncomingPacket<NftRewardItemClaimResultMessageType>
{
  public parse(wrapper: IMessageDataWrapper): NftRewardItemClaimResultMessageType
  {

    const packet: NftRewardItemClaimResultMessageType = {
    };

    return packet;
  }
}

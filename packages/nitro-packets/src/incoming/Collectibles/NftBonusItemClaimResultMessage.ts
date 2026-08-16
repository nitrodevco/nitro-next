import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type NftBonusItemClaimResultMessageType = {
  // no fields

};

export class NftBonusItemClaimResultMessage implements IIncomingPacket<NftBonusItemClaimResultMessageType>
{
  public parse(wrapper: IMessageDataWrapper): NftBonusItemClaimResultMessageType
  {

    const packet: NftBonusItemClaimResultMessageType = {
    };

    return packet;
  }
}

import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type HabboClubExtendOfferMessageType = {
  // no fields

};

export class HabboClubExtendOfferMessage implements IIncomingPacket<HabboClubExtendOfferMessageType>
{
  public parse(wrapper: IMessageDataWrapper): HabboClubExtendOfferMessageType
  {

    const packet: HabboClubExtendOfferMessageType = {
    };

    return packet;
  }
}

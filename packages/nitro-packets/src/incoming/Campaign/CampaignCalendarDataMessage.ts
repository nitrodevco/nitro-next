import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CampaignCalendarDataMessageType = {
  // no fields

};

export class CampaignCalendarDataMessage implements IIncomingPacket<CampaignCalendarDataMessageType>
{
  public parse(wrapper: IMessageDataWrapper): CampaignCalendarDataMessageType
  {

    const packet: CampaignCalendarDataMessageType = {
    };

    return packet;
  }
}

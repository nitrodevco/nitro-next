import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CampaignCalendarDoorOpenedMessageType = {
  // no fields

};

export class CampaignCalendarDoorOpenedMessage implements IIncomingPacket<CampaignCalendarDoorOpenedMessageType>
{
  public parse(wrapper: IMessageDataWrapper): CampaignCalendarDoorOpenedMessageType
  {

    const packet: CampaignCalendarDoorOpenedMessageType = {
    };

    return packet;
  }
}

import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type GuideOnDutyStatusMessageType = {
  // no fields

};

export class GuideOnDutyStatusMessage implements IIncomingPacket<GuideOnDutyStatusMessageType>
{
  public parse(wrapper: IMessageDataWrapper): GuideOnDutyStatusMessageType
  {

    const packet: GuideOnDutyStatusMessageType = {
    };

    return packet;
  }
}

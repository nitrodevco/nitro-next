import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type GuideReportingStatusMessageType = {
  // no fields

};

export class GuideReportingStatusMessage implements IIncomingPacket<GuideReportingStatusMessageType>
{
  public parse(wrapper: IMessageDataWrapper): GuideReportingStatusMessageType
  {

    const packet: GuideReportingStatusMessageType = {
    };

    return packet;
  }
}

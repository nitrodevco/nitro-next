import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ErrorReportEventMessageType = {
  // no fields

};

export class ErrorReportEventMessage implements IIncomingPacket<ErrorReportEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): ErrorReportEventMessageType
  {

    const packet: ErrorReportEventMessageType = {
    };

    return packet;
  }
}

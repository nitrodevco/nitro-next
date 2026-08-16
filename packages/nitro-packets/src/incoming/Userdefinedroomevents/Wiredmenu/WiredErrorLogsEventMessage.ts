import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type WiredErrorLogsEventMessageType = {
  // no fields

};

export class WiredErrorLogsEventMessage implements IIncomingPacket<WiredErrorLogsEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): WiredErrorLogsEventMessageType
  {

    const packet: WiredErrorLogsEventMessageType = {
    };

    return packet;
  }
}

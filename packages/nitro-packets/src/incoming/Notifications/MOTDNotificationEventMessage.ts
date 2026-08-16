import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type MOTDNotificationEventMessageType = {
  // no fields

};

export class MOTDNotificationEventMessage implements IIncomingPacket<MOTDNotificationEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): MOTDNotificationEventMessageType
  {

    const packet: MOTDNotificationEventMessageType = {
    };

    return packet;
  }
}

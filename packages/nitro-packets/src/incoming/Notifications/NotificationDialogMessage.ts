import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type NotificationDialogMessageType = {
  // no fields

};

export class NotificationDialogMessage implements IIncomingPacket<NotificationDialogMessageType>
{
  public parse(wrapper: IMessageDataWrapper): NotificationDialogMessageType
  {

    const packet: NotificationDialogMessageType = {
    };

    return packet;
  }
}

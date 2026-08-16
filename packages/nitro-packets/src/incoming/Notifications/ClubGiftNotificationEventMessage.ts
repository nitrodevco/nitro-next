import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ClubGiftNotificationEventMessageType = {
  // no fields

};

export class ClubGiftNotificationEventMessage implements IIncomingPacket<ClubGiftNotificationEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): ClubGiftNotificationEventMessageType
  {

    const packet: ClubGiftNotificationEventMessageType = {
    };

    return packet;
  }
}

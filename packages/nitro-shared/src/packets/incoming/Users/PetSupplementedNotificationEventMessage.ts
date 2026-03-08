import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type PetSupplementedNotificationEventMessageType = {
  // no fields

};

export class PetSupplementedNotificationEventMessage implements IIncomingPacket<PetSupplementedNotificationEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): PetSupplementedNotificationEventMessageType
  {

    const packet: PetSupplementedNotificationEventMessageType = {
    };

    return packet;
  }
}

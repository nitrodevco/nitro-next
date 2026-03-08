import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type PetLevelNotificationEventMessageType = {
  // no fields

};

export class PetLevelNotificationEventMessage implements IIncomingPacket<PetLevelNotificationEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): PetLevelNotificationEventMessageType
  {

    const packet: PetLevelNotificationEventMessageType = {
    };

    return packet;
  }
}

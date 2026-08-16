import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type PetRespectNotificationEventMessageType = {
  // no fields

};

export class PetRespectNotificationEventMessage implements IIncomingPacket<PetRespectNotificationEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): PetRespectNotificationEventMessageType
  {

    const packet: PetRespectNotificationEventMessageType = {
    };

    return packet;
  }
}

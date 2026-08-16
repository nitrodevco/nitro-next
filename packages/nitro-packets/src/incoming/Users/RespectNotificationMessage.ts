import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type RespectNotificationMessageType = {
  // no fields

};

export class RespectNotificationMessage implements IIncomingPacket<RespectNotificationMessageType>
{
  public parse(wrapper: IMessageDataWrapper): RespectNotificationMessageType
  {

    const packet: RespectNotificationMessageType = {
    };

    return packet;
  }
}

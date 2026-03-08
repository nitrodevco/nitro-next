import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type RoomMessageNotificationMessageType = {
  // no fields

};

export class RoomMessageNotificationMessage implements IIncomingPacket<RoomMessageNotificationMessageType>
{
  public parse(wrapper: IMessageDataWrapper): RoomMessageNotificationMessageType
  {

    const packet: RoomMessageNotificationMessageType = {
    };

    return packet;
  }
}

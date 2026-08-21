import type { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CustomUserNotificationMessageType = {
  code: number;
};

export class CustomUserNotificationMessage implements IIncomingPacket<CustomUserNotificationMessageType>
{
  public parse(wrapper: IMessageDataWrapper): CustomUserNotificationMessageType
  {
    const packet: CustomUserNotificationMessageType = {
      code: 0,
    };

    packet.code = wrapper.readInt();

    return packet;
  }
}

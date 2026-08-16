import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(Code: CustomUserNotificationType): Unknown type 'CustomUserNotificationType'. Add override mapping.

export type CustomUserNotificationMessageType = {
  code: any;
};

export class CustomUserNotificationMessage implements IIncomingPacket<CustomUserNotificationMessageType>
{
  public parse(wrapper: IMessageDataWrapper): CustomUserNotificationMessageType
  {

    const packet: CustomUserNotificationMessageType = {
      code: undefined as any, // Unknown type 'CustomUserNotificationType'. Add override mapping.
    };

    return packet;
  }
}

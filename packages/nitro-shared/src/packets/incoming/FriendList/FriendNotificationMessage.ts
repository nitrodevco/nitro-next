import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(TypeCode: FriendNotificationCodeType): Unknown type 'FriendNotificationCodeType'. Add override mapping.

export type FriendNotificationMessageType = {
  avatarId: string;
  typeCode: any;
  message: string;
};

export class FriendNotificationMessage implements IIncomingPacket<FriendNotificationMessageType>
{
  public parse(wrapper: IMessageDataWrapper): FriendNotificationMessageType
  {

    const packet: FriendNotificationMessageType = {
      avatarId: wrapper.readString(),
      typeCode: undefined as any, // Unknown type 'FriendNotificationCodeType'. Add override mapping.
      message: wrapper.readString(),
    };

    return packet;
  }
}

import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(Avatars: ImmutableArray<RoomAvatarSnapshot>): Unknown type 'ImmutableArray<RoomAvatarSnapshot>'. Add override mapping.

export type UserUpdateMessageType = {
  avatars: any;
};

export class UserUpdateMessage implements IIncomingPacket<UserUpdateMessageType>
{
  public parse(wrapper: IMessageDataWrapper): UserUpdateMessageType
  {

    const packet: UserUpdateMessageType = {
      avatars: undefined as any, // Unknown type 'ImmutableArray<RoomAvatarSnapshot>'. Add override mapping.
    };

    return packet;
  }
}

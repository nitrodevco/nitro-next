import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(Avatars: ImmutableArray<RoomAvatarSnapshot>): Unknown type 'ImmutableArray<RoomAvatarSnapshot>'. Add override mapping.

export type UsersMessageType = {
  avatars: any;
};

export class UsersMessage implements IIncomingPacket<UsersMessageType>
{
  public parse(wrapper: IMessageDataWrapper): UsersMessageType
  {

    const packet: UsersMessageType = {
      avatars: undefined as any, // Unknown type 'ImmutableArray<RoomAvatarSnapshot>'. Add override mapping.
    };

    return packet;
  }
}

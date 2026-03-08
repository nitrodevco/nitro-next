import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(RoomInfo: RoomSnapshot): Unknown type 'RoomSnapshot'. Add override mapping.

export type GetGuestRoomResultMessageType = {
  enterRoom: boolean;
  roomInfo: any;
  roomForward: boolean;
  staffPick: boolean;
  isGroupMember: boolean;
  allInRoomMuted: boolean;
  canMute: boolean;
};

export class GetGuestRoomResultMessage implements IIncomingPacket<GetGuestRoomResultMessageType>
{
  public parse(wrapper: IMessageDataWrapper): GetGuestRoomResultMessageType
  {

    const packet: GetGuestRoomResultMessageType = {
      enterRoom: wrapper.readBoolean(),
      roomInfo: undefined as any, // Unknown type 'RoomSnapshot'. Add override mapping.
      roomForward: wrapper.readBoolean(),
      staffPick: wrapper.readBoolean(),
      isGroupMember: wrapper.readBoolean(),
      allInRoomMuted: wrapper.readBoolean(),
      canMute: wrapper.readBoolean(),
    };

    return packet;
  }
}

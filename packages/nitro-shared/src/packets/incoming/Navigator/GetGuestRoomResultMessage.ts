import type { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import type { IRoomInfo } from './Data/RoomSettingsParser';
import { RoomSettingsParser } from './Data/RoomSettingsParser';

export type GetGuestRoomResultMessageType = {
    enterRoom: boolean;
    roomInfo: IRoomInfo;
    roomForward: boolean;
    staffPick: boolean;
    isGroupMember: boolean;
    allInRoomMuted: boolean;
    canMute: boolean;
};

export class GetGuestRoomResultMessage implements IIncomingPacket<GetGuestRoomResultMessageType> {
    public parse(wrapper: IMessageDataWrapper): GetGuestRoomResultMessageType {
        const packet: GetGuestRoomResultMessageType = {
            enterRoom: wrapper.readBoolean(),
            roomInfo: RoomSettingsParser(wrapper),
            roomForward: wrapper.readBoolean(),
            staffPick: wrapper.readBoolean(),
            isGroupMember: wrapper.readBoolean(),
            allInRoomMuted: wrapper.readBoolean(),
            canMute: wrapper.readBoolean(),
        };

        return packet;
    }
}

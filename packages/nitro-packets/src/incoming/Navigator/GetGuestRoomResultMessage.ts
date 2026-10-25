import { IIncomingPacket, IMessageDataWrapper, IRoomChatSettings, IRoomModerationSettings } from '@nitrodevco/nitro-api';

import { RoomChatSettingsParser } from './Data/RoomChatSettingsParser';
import { RoomModerationParser } from './Data/RoomModerationParser';
import { IRoomInfo, RoomSettingsParser } from './Data/RoomSettingsParser';

export type GetGuestRoomResultMessageType = {
    enterRoom: boolean;
    roomInfo: IRoomInfo;
    roomForward: boolean;
    staffPick: boolean;
    isGroupMember: boolean;
    allInRoomMuted: boolean;
    moderation: IRoomModerationSettings;
    canMute: boolean;
    chat: IRoomChatSettings;
    openingConnection: boolean;
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
            moderation: RoomModerationParser(wrapper),
            canMute: wrapper.readBoolean(),
            chat: RoomChatSettingsParser(wrapper),
            openingConnection: wrapper.readBoolean(),
        };

        return packet;
    }
}

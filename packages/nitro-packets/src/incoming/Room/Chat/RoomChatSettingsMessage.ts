import { IIncomingPacket, IMessageDataWrapper, IRoomChatSettings } from '@nitrodevco/nitro-api';

import { RoomChatSettingsParser } from '../../Navigator/Data/RoomChatSettingsParser';

export type RoomChatSettingsMessageType = {
    chat: IRoomChatSettings;
};

/** Sent when a room's chat settings change while inside it - the same payload `GetGuestRoomResultMessage` carries (flood sensitivity only in the current client). */
export class RoomChatSettingsMessage implements IIncomingPacket<RoomChatSettingsMessageType> {
    public parse(wrapper: IMessageDataWrapper): RoomChatSettingsMessageType {
        const packet: RoomChatSettingsMessageType = {
            chat: RoomChatSettingsParser(wrapper),
        };

        return packet;
    }
}

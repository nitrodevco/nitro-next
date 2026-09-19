import { GetGuestRoomResultMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { roomStore } from '#base/context/room';

import { on, subscribeAll } from '../packetSubscriptions';

/**
 * What a room's `GetGuestRoomResult` tells the session about itself once you are in it - trade
 * mode, guild room, door mode, pets, who may kick, mute and ban, and the chat settings. Flash's
 * `RoomSessionManager` read the same message for the same fields.
 */
export const registerRoomDataHandlers = ({ subscribe }: WebSocketConnection) => {
    const { setTradeMode, setIsGuildRoom, setDoorMode, setAllowPets, setModerationSettings, setChatSettings } = roomStore.getState();

    return subscribeAll(subscribe, [
        on(GetGuestRoomResultMessage, (data) => {
            if (data.roomForward) return;

            const roomInfo = data.roomInfo;

            setTradeMode(roomInfo.tradeType);
            setIsGuildRoom(roomInfo.groupId !== 0);
            setDoorMode(roomInfo.doorMode);
            setAllowPets(roomInfo.allowPets);
            setModerationSettings(data.moderation);
            setChatSettings(data.chat);
        }),
    ]);
};

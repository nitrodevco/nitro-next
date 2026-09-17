import { GetGuestRoomResultMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { roomStore } from '#base/context/room';

import { on, subscribeAll } from '../packetSubscriptions';

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

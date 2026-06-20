import { GetGuestRoomResultMessage } from "@nitrodevco/nitro-shared";
import { useShallow } from "zustand/shallow";

import { useRoomContext } from "#base/context";
import { useMessageListener } from "#base/hooks";

export const useRoomDataHandler = () => {
    const { setRoomSettings, setIsGuildRoom } = useRoomContext(useShallow(x => ({
        setRoomSettings: x.setRoomSettings,
        setIsGuildRoom: x.setIsGuildRoom,
    })));

    useMessageListener(GetGuestRoomResultMessage, data => {
        if (data.roomForward) return;

        const roomInfo = data.roomInfo;

        setRoomSettings(roomInfo.doorMode, roomInfo.tradeType, roomInfo.allowPets);
        setIsGuildRoom(roomInfo.groupId !== 0);
    });
}
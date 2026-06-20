import { GetGuestRoomResultMessage } from "@nitrodevco/nitro-shared";

import { useRoomSettingActions } from "#base/actions";
import { useMessageListener } from "#base/hooks";

export const useRoomDataHandler = () => {
    const { setTradeMode, setIsGuildRoom, setDoorMode, setAllowPets } = useRoomSettingActions();

    useMessageListener(GetGuestRoomResultMessage, data => {
        if (data.roomForward) return;

        const roomInfo = data.roomInfo;

        setTradeMode(roomInfo.tradeType);
        setIsGuildRoom(roomInfo.groupId !== 0);
        setDoorMode(roomInfo.doorMode);
        setAllowPets(roomInfo.allowPets);
        // moderation settings
    });
}
import { GetGuestRoomResultMessage } from "@nitrodevco/nitro-packets";

import { useRoomSettingActions } from "#base/context";
import { useMessageListener } from "#base/hooks";

export const useRoomDataHandler = () => {
    const { setTradeMode, setIsGuildRoom, setDoorMode, setAllowPets, setModerationSettings, setChatSettings } = useRoomSettingActions();

    useMessageListener(GetGuestRoomResultMessage, data => {
        if (data.roomForward) return;

        const roomInfo = data.roomInfo;

        setTradeMode(roomInfo.tradeType);
        setIsGuildRoom(roomInfo.groupId !== 0);
        setDoorMode(roomInfo.doorMode);
        setAllowPets(roomInfo.allowPets);
        setModerationSettings(data.moderation);
        setChatSettings(data.chat);
    });
}
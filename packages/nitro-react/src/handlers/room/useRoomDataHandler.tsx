import { GetGuestRoomResultMessage } from "@nitrodevco/nitro-shared";
import { useShallow } from "zustand/shallow";

import { useRoomContext } from "#base/context";
import { useMessageListener } from "#base/hooks";

export const useRoomDataHandler = () => {
    const [setTradeMode, setIsGuildRoom, setDoorMode, setAllowPets] = useRoomContext(useShallow(x => [x.setTradeMode, x.setIsGuildRoom, x.setDoorMode, x.setAllowPets]));

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
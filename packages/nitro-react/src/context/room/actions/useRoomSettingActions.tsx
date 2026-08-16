import { useShallow } from "zustand/shallow";

import { useRoomContext } from "#base/context";

export const useRoomSettingActions = () => useRoomContext(useShallow(x => ({
    setDoorMode: x.setDoorMode,
    setTradeMode: x.setTradeMode,
    setAllowPets: x.setAllowPets,
    setIsGuildRoom: x.setIsGuildRoom,
    setModerationSettings: x.setModerationSettings,
    setChatSettings: x.setChatSettings
})));
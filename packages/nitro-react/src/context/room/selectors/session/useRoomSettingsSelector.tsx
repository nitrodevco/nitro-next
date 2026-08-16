import { useShallow } from "zustand/shallow";

import { useRoomContext } from "../../useRoomContext";

export const useRoomSettingsSelector = () => useRoomContext(useShallow(x => ({
    doorMode: x.doorMode,
    tradeMode: x.tradeMode,
    allowPets: x.allowPets,
    isGuildRoom: x.isGuildRoom,
    moderation: x.moderationSettings,
    chat: x.chatSettings
})));
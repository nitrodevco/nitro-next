import type { RoomStore } from "../RoomStore"

export type RoomSettingActions = {
    setDoorMode: RoomStore['setDoorMode'];
    setTradeMode: RoomStore['setTradeMode'];
    setAllowPets: RoomStore['setAllowPets'];
    setIsGuildRoom: RoomStore['setIsGuildRoom'];
}

export const extractRoomSettingActions = (store: RoomStore) => ({
    setDoorMode: store.setDoorMode,
    setTradeMode: store.setTradeMode,
    setAllowPets: store.setAllowPets,
    setIsGuildRoom: store.setIsGuildRoom
});
import type { RoomStore } from "../RoomStore"

export type RoomStackingHeightMapActions = {
    setHeightMap: RoomStore['setHeightMap'];
    setHeightMapUpdates: RoomStore['setHeightMapUpdates'];
    validateLocation: RoomStore['validateLocation'];
    getTileHeight: RoomStore['getTileHeight'];
}

export const extractRoomStackingHeightMapActions = (store: RoomStore) => ({
    setHeightMap: store.setHeightMap,
    setHeightMapUpdates: store.setHeightMapUpdates,
    getTileHeight: store.getTileHeight,
    validateLocation: store.validateLocation,
});
import type { RoomStore } from "../RoomStore"

export type RoomSessionActions = {
    setOwnRoomIndex: RoomStore['setOwnRoomIndex'];
    setIsDecorating: RoomStore['setIsDecorating'];
    setIsSpectator: RoomStore['setIsSpectator'];
    setIsPlayingGame: RoomStore['setIsPlayingGame'];
}

export const extractRoomSessionActions = (store: RoomStore) => ({
    setOwnRoomIndex: store.setOwnRoomIndex,
    setIsDecorating: store.setIsDecorating,
    setIsSpectator: store.setIsSpectator,
    setIsPlayingGame: store.setIsPlayingGame
});
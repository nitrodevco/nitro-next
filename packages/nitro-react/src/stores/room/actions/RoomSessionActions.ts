import type { RoomStore } from "../RoomStore"

export type RoomSessionActions = {
    setIsDecorating: RoomStore['setIsDecorating'];
    setIsSpectator: RoomStore['setIsSpectator'];
    setIsPlayingGame: RoomStore['setIsPlayingGame'];
}

export const extractRoomSessionActions = (store: RoomStore) => ({
    setIsDecorating: store.setIsDecorating,
    setIsSpectator: store.setIsSpectator,
    setIsPlayingGame: store.setIsPlayingGame
});
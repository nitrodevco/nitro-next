import { useRoomStore } from '../../useRoomStore';

/**
 * `RoomEngine.getActiveRoomIsPlayingGame`: the room session is in a game, or the room's wired
 * click settings put avatars in "game mode" (`IHabboUserDefinedRoomEvents.isGameMode`).
 */
export const useRoomIsPlayingGame = () => useRoomStore(x => x.isPlayingGame || x.isWiredGameMode);

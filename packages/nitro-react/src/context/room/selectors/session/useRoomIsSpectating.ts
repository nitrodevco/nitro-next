import { useRoomStore } from '../../useRoomStore';

/**
 * `RoomSession.isSpectatorMode`: the user watches the room rather than standing in it. `RoomUI`
 * creates the chat input, the friend requests and the avatar info widget only for a session that
 * is not spectating, and adds them when `RoomDesktop.enterAfterSpectate` ends it.
 */
export const useRoomIsSpectating = () => useRoomStore(x => x.isSpectator);

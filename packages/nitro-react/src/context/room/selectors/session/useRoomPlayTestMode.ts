import { useRoomStore } from '../../useRoomStore';

/** `RoomSession.playTestMode`: the wired menu's play test mode, the room used as a visitor would. */
export const useRoomPlayTestMode = () => useRoomStore(x => x.playTestMode);

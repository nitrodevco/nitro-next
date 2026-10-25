import { useRoomStore } from '../../useRoomStore';

/** Your rights in the room: `RoomSession.roomControllerLevel`, `None` while play test is on. */
export const useOwnControllerLevel = () => useRoomStore(x => x.controllerLevel);

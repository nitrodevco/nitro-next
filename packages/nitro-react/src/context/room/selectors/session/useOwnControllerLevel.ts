import { useRoomStore } from '../../useRoomStore';

export const useOwnControllerLevel = () => useRoomStore(x => x.controllerLevel);

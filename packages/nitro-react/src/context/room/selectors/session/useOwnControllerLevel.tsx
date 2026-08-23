import { useRoomContext } from '../../useRoomContext';

export const useOwnControllerLevel = () => useRoomContext(x => x.controllerLevel);

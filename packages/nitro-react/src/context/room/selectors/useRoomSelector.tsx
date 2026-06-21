import { useRoomContext } from "../useRoomContext";

export const useRoomSelector = () => useRoomContext(x => x.room);
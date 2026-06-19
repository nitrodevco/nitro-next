import { useRoomContext } from "#base/context";

export const useRoom = () => useRoomContext(x => x.room);
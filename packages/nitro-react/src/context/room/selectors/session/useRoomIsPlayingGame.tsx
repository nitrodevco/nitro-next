import { useRoomContext } from "#base/context";
import { selectIsPlayingGame } from "#base/stores";

export const useRoomIsPlayingGame = () => useRoomContext(selectIsPlayingGame);
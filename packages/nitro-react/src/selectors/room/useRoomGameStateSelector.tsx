import { useShallow } from "zustand/shallow";

import { useRoomContext } from '#base/context';
import { selectGameState } from '#base/stores';

export const useRoomGameStateSelector = () => useRoomContext(useShallow(selectGameState));

import { useShallow } from "zustand/shallow";

import { useRoomContext } from '#base/context';
import { selectSessionState } from '#base/stores';

export const useRoomSessionSelector = () => useRoomContext(useShallow(selectSessionState));
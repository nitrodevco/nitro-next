import { useShallow } from "zustand/shallow";

import { useRoomContext } from '#base/context';
import { selectTargetInfo } from '#base/stores';

export const useRoomCameraTargetSelector = () => useRoomContext(useShallow(selectTargetInfo));

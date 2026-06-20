import { useShallow } from "zustand/shallow";

import { useRoomContext } from '#base/context';
import { selectCameraFull } from '#base/stores';

export const useRoomCameraSelector = () => useRoomContext(useShallow(selectCameraFull));
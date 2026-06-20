import { useShallow } from "zustand/shallow";

import { useRoomContext } from '#base/context';
import { selectRoomSettings } from '#base/stores';

export const useRoomSettingsSelector = () => useRoomContext(useShallow(selectRoomSettings));

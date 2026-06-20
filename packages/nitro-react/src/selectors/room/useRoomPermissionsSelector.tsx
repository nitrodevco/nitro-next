import { useShallow } from "zustand/shallow";

import { useRoomContext } from '#base/context';
import { selectPermissions } from '#base/stores';

export const useRoomPermissionsSelector = () => useRoomContext(useShallow(selectPermissions));

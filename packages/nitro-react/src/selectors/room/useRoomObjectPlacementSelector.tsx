import { useShallow } from "zustand/shallow";

import { useRoomContext } from '#base/context';
import { selectObjectPlacement } from '#base/stores';

export const useRoomObjectPlacementSelector = () => useRoomContext(useShallow(selectObjectPlacement));

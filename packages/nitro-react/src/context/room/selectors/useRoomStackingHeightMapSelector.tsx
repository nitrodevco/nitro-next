import { useShallow } from 'zustand/shallow';

import { useRoomContext } from '../useRoomContext';

export const useRoomStackingHeightMapSelector = () => useRoomContext(useShallow(x => ({
    width: x.width,
    height: x.height,
    heights: x.heights,
})));

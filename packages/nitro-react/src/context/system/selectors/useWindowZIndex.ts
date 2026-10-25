import { useSystemStore } from '../useSystemStore';

/**
 * The z-index a window or stack was last brought to the front at, or the base frame z-index
 * until it has been.
 */
export const useWindowZIndex = (id: string) => useSystemStore(x => x.zIndexById[id]) ?? 100;

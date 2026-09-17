import { useSystemStore } from '../useSystemStore';

export const useWindowZIndex = (id: string) => useSystemStore(x => x.zIndexById)[id] ?? 100;

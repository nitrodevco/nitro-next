import { useSystemContext } from '../useSystemContext';

export const useWindowZIndex = (id: string) => useSystemContext(x => x.zIndexById)[id] ?? 100;

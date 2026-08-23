import { useShallow } from 'zustand/shallow';

import { useSystemContext } from '../useSystemContext';

export const useWindowSelectors = () => useSystemContext(useShallow(x => ({
    topZIndex: x.topZIndex,
    topId: x.topId,
    zIndexById: x.zIndexById,
})));

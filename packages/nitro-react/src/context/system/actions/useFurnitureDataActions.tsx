import { useShallow } from 'zustand/shallow';

import { useSystemContext } from '../useSystemContext';

export const useFurnitureDataActions = () => useSystemContext(useShallow(x => ({
    parseFloorItems: x.parseFloorItems,
    parseWallItems: x.parseWallItems,
    parseProductData: x.parseProductData,
})));

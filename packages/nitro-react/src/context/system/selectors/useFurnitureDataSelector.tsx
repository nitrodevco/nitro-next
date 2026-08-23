import { useShallow } from 'zustand/shallow';

import { useSystemContext } from '../useSystemContext';

export const useFurnitureDataSelector = () => useSystemContext(useShallow(x => ({
    floorItems: x.floorItems,
    wallItems: x.wallItems,
    productData: x.productData,
})));

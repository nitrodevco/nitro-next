/**
 * One item's furniture data, selected from the system store - `getFurnitureData` (Flash's
 * `SessionDataManager.getWallItemData` / `getFloorItemData`) for a component that shows one item.
 */
import { getFurnitureData } from '#base/utils';

import { useSystemStore } from '../useSystemStore';

/** Undefined while there is no type id, or when the furniture data has no such type. */
export const useFurnitureData = (typeId: number | undefined, isWallItem: boolean) => useSystemStore(x => ((typeId === undefined) ? undefined : getFurnitureData(x, typeId, isWallItem)));

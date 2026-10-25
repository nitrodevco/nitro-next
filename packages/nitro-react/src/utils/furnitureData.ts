/**
 * One item's furniture data by type id, from the floor or the wall table - Flash's
 * `SessionDataManager.getFloorItemData` / `getWallItemData`, and the `"s"` / `"i"` product type
 * switch its callers make before choosing one of the two.
 *
 * Pure: the tables come in as `FurnitureDataLookup`, which the system store's state is, so a
 * command or handler passes `systemStore.getState()` and a hook passes what it selected.
 */
import { FurnitureTypeEnum, IFurnitureData } from '@nitrodevco/nitro-api';

export interface FurnitureDataLookup {
    readonly floorItems: Record<number, IFurnitureData>;
    readonly wallItems: Record<number, IFurnitureData>;
}

/** `getWallItemData` for a wall item, `getFloorItemData` otherwise. */
export const getFurnitureData = (lookup: FurnitureDataLookup, typeId: number, isWallItem: boolean): IFurnitureData | undefined => (isWallItem ? lookup.wallItems : lookup.floorItems)[typeId];

/** Each table's items by class name, in id order, built once per table. */
const byNameCache = new WeakMap<Record<number, IFurnitureData>, Map<string, IFurnitureData>>();

const firstByName = (items: Record<number, IFurnitureData>, className: string): IFurnitureData | undefined => {
    let byName = byNameCache.get(items);

    if (!byName) {
        byName = new Map();

        for (const item of Object.values(items)) {
            if (!byName.has(item.className)) byName.set(item.className, item);
        }

        byNameCache.set(items, byName);
    }

    return byName.get(className);
};

/**
 * `SessionDataManager.getFloorItemDataByName(name)`: the first floor item of the class (the name
 * without its `*N` colour), which the furni data parser indexes by `className`.
 */
export const getFloorItemDataByName = (lookup: FurnitureDataLookup, className: string): IFurnitureData | undefined => firstByName(lookup.floorItems, className);

/** `SessionDataManager.getWallItemDataByName(name)`. */
export const getWallItemDataByName = (lookup: FurnitureDataLookup, className: string): IFurnitureData | undefined => firstByName(lookup.wallItems, className);

/** The same by product type: `"s"` is a floor item, `"i"` a wall item, anything else has no furniture data. */
export const getFurnitureDataForProductType = (lookup: FurnitureDataLookup, productType: string, typeId: number): IFurnitureData | undefined => {
    if (productType === String(FurnitureTypeEnum.Floor)) return lookup.floorItems[typeId];
    if (productType === String(FurnitureTypeEnum.Wall)) return lookup.wallItems[typeId];

    return undefined;
};

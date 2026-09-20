/**
 * The furni chest's grouping of stored items into grid cells - the static helpers of Flash
 * `wired_trading/chests/subcontrollers/views/FurniChestView` (`itemTypeKey`,
 * `findReusableGroupedView`, `getChestBasedItemName`) and the bookkeeping of its `addStorage` /
 * `removeStorage` / `itemsInitialize` / `itemsUpdated`, done on plain data so the store can keep
 * the grid while the window is closed.
 *
 * A group is one `FurniChestItemView`: the storages it stands for, the first of which is the
 * sample it draws. Flash kept the views in the order they were created and appended new ones;
 * `key` is a counter standing in for the view's identity, so a selection survives an update.
 */
import { FurnitureSpecialType, type IChestItemType, type IChestStorage } from '@nitrodevco/nitro-api';

/** `FurniChestView.itemTypeKey`: wall flag, type id and poster id. */
export const wiredChestItemTypeKey = (type: IChestItemType): string => `${type.isWallItem ? '1' : '0'}-${type.typeId}-${type.legacyPosterId}`;

/** One cell of the furni chest's grid: `FurniChestItemView`. */
export interface WiredChestItemGroup {
    key: number;
    typeKey: string;
    storages: IChestStorage[];
}

/** The groups and the storage -> group index Flash kept in `§_-x1k§` / `§_-N1O§`. */
export interface WiredChestItemGroups {
    groups: WiredChestItemGroup[];
    nextKey: number;
}

export const EMPTY_WIRED_CHEST_ITEM_GROUPS: WiredChestItemGroups = { groups: [], nextKey: 1 };

/**
 * `findReusableGroupedView`: a limited edition item always gets a cell of its own; a monsterplant
 * seed (special type 19, `FurnitureSpecialType.MonsterplantSeed`) joins the first cell of its type
 * with the same rarity level, since seeds of one type differ only by rarity; anything else joins
 * the first cell of its type.
 */
const findReusableGroup = (groups: WiredChestItemGroup[], storage: IChestStorage): WiredChestItemGroup | undefined => {
    const typeKey = wiredChestItemTypeKey(storage.type);
    const candidates = groups.filter(group => group.typeKey === typeKey);

    if (!candidates.length) return undefined;

    if (storage.stuffData.uniqueNumber > 0) return undefined;

    if (storage.specialType === Number(FurnitureSpecialType.MonsterplantSeed)) {
        const rarityLevel = storage.stuffData.rarityLevel;

        return candidates.find(group => group.storages[0] && (group.storages[0].stuffData.rarityLevel === rarityLevel));
    }

    return candidates[0];
};

/** `addStorage`, over copies: joins a cell or appends a new one. */
const addStorage = (groups: WiredChestItemGroup[], nextKey: number, storage: IChestStorage): number => {
    const group = findReusableGroup(groups, storage);

    if (group) {
        group.storages = [ ...group.storages, storage ];

        return nextKey;
    }

    groups.push({ key: nextKey, typeKey: wiredChestItemTypeKey(storage.type), storages: [ storage ] });

    return nextKey + 1;
};

/** `itemsInitialize`: every storage, grouped from scratch. */
export const initializeWiredChestItemGroups = (storages: IChestStorage[], nextKey: number): WiredChestItemGroups => {
    const groups: WiredChestItemGroup[] = [];

    for (const storage of storages) nextKey = addStorage(groups, nextKey, storage);

    return { groups, nextKey };
};

/**
 * `itemsUpdated`: the removed storages leave their cells (an emptied cell goes), the added ones
 * join or append. Surviving cells keep their place; new cells go to the end.
 */
export const updateWiredChestItemGroups = (current: WiredChestItemGroups, removed: IChestStorage[], added: IChestStorage[]): WiredChestItemGroups => {
    const removedIds = new Set(removed.map(storage => storage.inventoryId));
    const groups: WiredChestItemGroup[] = [];

    for (const group of current.groups) {
        const storages = group.storages.filter(storage => !removedIds.has(storage.inventoryId));

        if (storages.length) groups.push((storages.length === group.storages.length) ? { ...group } : { ...group, storages });
    }

    let nextKey = current.nextKey;

    for (const storage of added) nextKey = addStorage(groups, nextKey, storage);

    return { groups, nextKey };
};

/**
 * `FurniChestView.getChestBasedItemName`: a legacy poster by its own localization, anything
 * else by the furni data's name - Flash's literal when the type is unknown.
 */
export const getWiredChestItemName = (
    type: IChestItemType,
    specialType: number,
    translate: (key: string) => string,
    getFurnitureName: (isWallItem: boolean, typeId: number) => string | undefined,
): string => {
    if (type.isWallItem && (specialType === Number(FurnitureSpecialType.Poster)) && (type.legacyPosterId !== '')) return translate(`poster_${type.legacyPosterId}_name`);

    return getFurnitureName(type.isWallItem, type.typeId) ?? '(missing item name)';
};

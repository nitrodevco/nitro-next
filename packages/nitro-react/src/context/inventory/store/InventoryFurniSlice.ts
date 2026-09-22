/**
 * The inventory's furni - Flash `inventory/furni/FurniModel`: the list of group items the furni
 * grid shows (`§_-V2i§`), which of them is selected, whether the list has arrived
 * (`isListInited`) and whether it is still current (`HabboInventory`'s inited categories, which
 * `FurniListInvalidate` clears so the list is asked for again).
 *
 * - `insertFurniture`: a complete `FurniList` is diffed against what is held - items gone are
 *   removed, new ones added, the rest left as they are. Flash's "first list" test reads
 *   `Dictionary.length`, which is always undefined, so it never passes: the first item is
 *   selected only when nothing is.
 * - `addOrUpdateItem` / `addOrUpdateNonGroupableItem` / `addOrUpdateGroupableItem`: which group
 *   an item joins. A non-groupable item (and a rented one) gets a group of its own, except rares
 *   (19), which stack by rarity level, and chests (24, 25), which stack only while empty and
 *   unnamed. Groupable items stack by type and wall/floor, posters (6) also by poster id and
 *   guild furni (17) by equal stuff data.
 * - The locks: `updateItemLocks` marks the items whose room item id is in a running trade,
 *   `removeAllLocks` clears them.
 *
 * Not ported: the unseen item tracker (`UnseenItemsMessage`) - an item it names moves its group
 * to the top of the grid; without it every new group goes to the bottom, as Flash does for an
 * item the tracker does not name. The rentables category does not exist in this client. The
 * recycler (`RecyclerModel`) and the marketplace (`MarketplaceModel`) lock items by strip id
 * through `setFurniItemLocks`, and `updateFurniLocks` counts their items with the trade's.
 */
import { IFurniListAddOrUpdateFurni } from '@nitrodevco/nitro-packets';
import { StateCreator } from 'zustand';

import {
    createInventoryFurniItem, getInventoryFurniTotalCount, getStuffDataChestName, getStuffDataContentsCount, INVENTORY_FURNI_CATEGORY_CHEST_BROWN, INVENTORY_FURNI_CATEGORY_CHEST_GOLD, INVENTORY_FURNI_CATEGORY_GUILD_FURNI,
    INVENTORY_FURNI_CATEGORY_POST_IT, INVENTORY_FURNI_CATEGORY_POSTER, INVENTORY_FURNI_CATEGORY_RARE, InventoryFurniGroup, InventoryFurniItem, isInventoryFurniGroupGroupable, isInventoryFurniGroupWallItem,
} from './InventoryFurniGroup';

type State = {
    /** `§_-V2i§`, in grid order. */
    furniGroups: InventoryFurniGroup[];
    /** The selected group's `id`, -1 for none (`GroupItem.isSelected`). */
    furniSelectedGroupId: number;
    /** `isListInited`: a complete list has arrived; `FurniListAddOrUpdate` is ignored before that. */
    furniListInitialized: boolean;
    /** `HabboInventory.isInventoryCategoryInit('furni')`: false until the list arrives and after `FurniListInvalidate`. */
    furniCategoryInitialized: boolean;
};

type Actions = {
    /** `FurniModel.insertFurniture` with a complete list. */
    insertFurniture: (furni: Map<number, IFurniListAddOrUpdateFurni>) => void;
    /** `IncomingMessages.onFurnitureAddOrUpdate`. */
    addOrUpdateFurni: (furni: IFurniListAddOrUpdateFurni[]) => void;
    /** `FurniModel.removeFurni`, then `resetUnseenItems` when something went. */
    removeFurni: (stripId: number) => void;
    /** `IncomingMessages.onFurniListInvalidate`. */
    invalidateFurni: () => void;
    /** `GroupItem.itemEventProc` on `WME_DOWN`: `removeSelections` and select this one. */
    selectFurniGroup: (groupId: number) => void;
    /** `FurniModel.updateItemLocks` with the room item ids every lock source holds; none is `removeAllLocks`. */
    updateFurniLocks: (lockedRefs: number[]) => void;
    /**
     * `GroupItem.addLockTo` / `removeLockFrom` / `lockAllSellable` / `removeLocks`: the items with
     * these strip ids are locked or unlocked - what the recycler and the marketplace lock by hand.
     */
    setFurniItemLocks: (itemIds: readonly number[], locked: boolean) => void;
    /** `FurniModel.resetUnseenItems`: no group is new any more. */
    resetFurniUnseenItems: () => void;
};

export const InventoryFurniSliceInitialState: State = {
    furniGroups: [],
    furniSelectedGroupId: -1,
    furniListInitialized: false,
    furniCategoryInitialized: false,
};

export type InventoryFurniSlice = State & Actions;

let nextGroupId = 1;

/**
 * A copy of the group list that copies a group (and its item list) the first time it is
 * changed, so an unchanged group keeps its identity and its thumb does not re-render.
 */
class FurniGroupsDraft {
    public readonly groups: InventoryFurniGroup[];
    private readonly _copied = new Set<InventoryFurniGroup>();

    constructor(groups: InventoryFurniGroup[]) {
        this.groups = [ ...groups ];
    }

    public edit(index: number): InventoryFurniGroup {
        const group = this.groups[index];

        if (this._copied.has(group)) return group;

        const copy = { ...group, items: [ ...group.items ] };

        this.groups[index] = copy;
        this._copied.add(copy);

        return copy;
    }

    public add(group: InventoryFurniGroup) {
        this._copied.add(group);
        this.groups.push(group);
    }

    public indexOfItem(stripId: number): number {
        return this.groups.findIndex(group => group.items.some(item => item.id === stripId));
    }
}

/** `FurniModel.createGroupItem` plus the first `push`. */
const createGroup = (draft: FurniGroupsDraft, item: InventoryFurniItem): InventoryFurniGroup => {
    const group: InventoryFurniGroup = { id: nextGroupId++, typeId: item.typeId, category: item.category, stuffData: item.stuffData, extra: item.extra, items: [ item ], hasUnseenItems: false };

    draft.add(group);

    return group;
};

/** `GroupItem.push`: a strip id already held only loses its lock. */
const pushItem = (group: InventoryFurniGroup, item: InventoryFurniItem) => {
    const index = group.items.findIndex(existing => existing.id === item.id);

    if (index === -1) group.items.push(item);
    else if (group.items[index].locked) group.items[index] = { ...group.items[index], locked: false };
};

/** `addOrUpdateGroupableItem`'s search for the group an item stacks onto; the chest rule has no `break`, so the last match wins. */
const findStackGroupIndex = (groups: InventoryFurniGroup[], item: InventoryFurniItem): number => {
    let found = -1;

    for (let index = 0; index < groups.length; index++) {
        const group = groups[index];

        if ((group.typeId !== item.typeId) || (isInventoryFurniGroupWallItem(group) !== item.isWallItem)) continue;

        if (item.category === INVENTORY_FURNI_CATEGORY_RARE) {
            if (group.stuffData.rarityLevel === item.stuffData.rarityLevel) return index;
        } else if ((item.category === INVENTORY_FURNI_CATEGORY_CHEST_GOLD) || (item.category === INVENTORY_FURNI_CATEGORY_CHEST_BROWN)) {
            if ((getStuffDataContentsCount(group.stuffData) === 0) && (getStuffDataContentsCount(item.stuffData) === 0) && (getStuffDataChestName(group.stuffData) === '') && (getStuffDataChestName(item.stuffData) === '')) found = index;
        } else if (isInventoryFurniGroupGroupable(group)) {
            if (item.category === INVENTORY_FURNI_CATEGORY_POSTER) {
                if (group.stuffData.getLegacyString() === item.stuffData.getLegacyString()) return index;
            } else if (item.category !== INVENTORY_FURNI_CATEGORY_GUILD_FURNI) {
                return index;
            } else if (item.stuffData.compare(group.stuffData)) {
                return index;
            }
        }
    }

    return found;
};

/** `FurniModel.addOrUpdateItem`; `isInit` is Flash's second argument - from the full list, not a packet naming a new item. */
const addOrUpdateItem = (draft: FurniGroupsDraft, item: InventoryFurniItem, isInit: boolean) => {
    const isStackable = item.groupable || (item.category === INVENTORY_FURNI_CATEGORY_RARE) || (item.category === INVENTORY_FURNI_CATEGORY_CHEST_BROWN) || (item.category === INVENTORY_FURNI_CATEGORY_CHEST_GOLD);
    let group: InventoryFurniGroup;

    if (!isStackable) {
        // `addOrUpdateNonGroupableItem`: a group of the type that already holds the strip id is left alone.
        const index = draft.groups.findIndex(existing => (existing.typeId === item.typeId) && existing.items.some(held => held.id === item.id));

        group = (index === -1) ? createGroup(draft, item) : draft.edit(index);
    } else {
        const index = findStackGroupIndex(draft.groups, item);

        if (index === -1) {
            group = createGroup(draft, item);
        } else {
            group = draft.edit(index);
            pushItem(group, item);
        }
    }

    if (!isInit) group.hasUnseenItems = true;
};

/** `FurniModel.getAllStripIds`: a post-it stack answers for its first item only. */
const getAllStripIds = (groups: InventoryFurniGroup[]): Set<number> => {
    const ids = new Set<number>();

    for (const group of groups) {
        const count = (group.category === INVENTORY_FURNI_CATEGORY_POST_IT) ? 1 : getInventoryFurniTotalCount(group);

        for (let index = 0; (index < count) && (index < group.items.length); index++) ids.add(group.items[index].id);
    }

    return ids;
};

/** `FurniModel.removeFurni` on a draft; true when the strip id was held. */
const removeItem = (draft: FurniGroupsDraft, stripId: number): boolean => {
    const index = draft.indexOfItem(stripId);

    if (index === -1) return false;

    const group = draft.edit(index);

    group.items = group.items.filter(item => item.id !== stripId);

    if (getInventoryFurniTotalCount(group) <= 0) draft.groups.splice(index, 1);

    return true;
};

/** `resetUnseenItems` for the furni category: its non-rented groups are no longer new. The same list when nothing changes. */
const resetUnseen = (groups: InventoryFurniGroup[]): InventoryFurniGroup[] => {
    const isNew = (group: InventoryFurniGroup) => group.hasUnseenItems && !(group.items[0]?.isRented ?? false);

    if (!groups.some(isNew)) return groups;

    return groups.map(group => (isNew(group) ? { ...group, hasUnseenItems: false } : group));
};

/** `selectFirstItem` when the selected group is gone (or there was none). */
const keepSelection = (groups: InventoryFurniGroup[], selectedGroupId: number): number => {
    if (groups.some(group => group.id === selectedGroupId)) return selectedGroupId;

    return groups[0]?.id ?? -1;
};

export const createInventoryFurniSlice: StateCreator<InventoryFurniSlice, [], [], InventoryFurniSlice> = set => ({
    ...InventoryFurniSliceInitialState,
    insertFurniture: furni => set((x) => {
        const draft = new FurniGroupsDraft(x.furniGroups);
        const held = getAllStripIds(x.furniGroups);

        for (const stripId of held) {
            if (!furni.has(stripId)) removeItem(draft, stripId);
        }

        for (const [ stripId, data ] of furni) {
            if (!held.has(stripId)) addOrUpdateItem(draft, createInventoryFurniItem(data), true);
        }

        return {
            furniGroups: draft.groups,
            furniSelectedGroupId: keepSelection(draft.groups, x.furniSelectedGroupId),
            furniListInitialized: true,
            furniCategoryInitialized: true,
        };
    }),
    addOrUpdateFurni: furni => set((x) => {
        if (!x.furniListInitialized) return x;

        const draft = new FurniGroupsDraft(x.furniGroups);

        for (const data of furni) {
            const index = draft.indexOfItem(data.itemId);

            if (index === -1) {
                addOrUpdateItem(draft, createInventoryFurniItem(data), false);

                continue;
            }

            // `FurnitureItem.update`: everything the packet carries, the lock kept.
            const group = draft.edit(index);
            const itemIndex = group.items.findIndex(item => item.id === data.itemId);

            group.items[itemIndex] = createInventoryFurniItem(data, group.items[itemIndex].locked);
            group.hasUnseenItems = true;
        }

        return { furniGroups: draft.groups };
    }),
    removeFurni: stripId => set((x) => {
        const draft = new FurniGroupsDraft(x.furniGroups);

        if (!removeItem(draft, stripId)) return x;

        const groups = resetUnseen(draft.groups);

        return { furniGroups: groups, furniSelectedGroupId: keepSelection(groups, x.furniSelectedGroupId) };
    }),
    invalidateFurni: () => set({ furniCategoryInitialized: false }),
    selectFurniGroup: furniSelectedGroupId => set({ furniSelectedGroupId }),
    updateFurniLocks: lockedRefs => set((x) => {
        const refs = new Set(lockedRefs);
        let changed = false;

        // `GroupItem.updateLocks`, or `removeAllLocks` when nothing is locked anywhere.
        const groups = x.furniGroups.map((group) => {
            if (!group.items.some(item => item.locked !== refs.has(item.ref))) return group;

            changed = true;

            return { ...group, items: group.items.map(item => ((item.locked === refs.has(item.ref)) ? item : { ...item, locked: refs.has(item.ref) })) };
        });

        return changed ? { furniGroups: groups } : x;
    }),
    setFurniItemLocks: (itemIds, locked) => set((x) => {
        const ids = new Set(itemIds);
        let changed = false;

        const groups = x.furniGroups.map((group) => {
            if (!group.items.some(item => ids.has(item.id) && (item.locked !== locked))) return group;

            changed = true;

            return { ...group, items: group.items.map(item => ((ids.has(item.id) && (item.locked !== locked)) ? { ...item, locked } : item)) };
        });

        return changed ? { furniGroups: groups } : x;
    }),
    resetFurniUnseenItems: () => set((x) => {
        const furniGroups = resetUnseen(x.furniGroups);

        return (furniGroups === x.furniGroups) ? x : { furniGroups };
    }),
});

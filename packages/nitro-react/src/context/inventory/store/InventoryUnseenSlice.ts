/**
 * The inventory's unseen item tracker - Flash `inventory/UnseenItemTracker` (`IHabboInventory.
 * unseenItemTracker`, interface `§_-C2i§`): per unseen item category, the ids the server said
 * are new (`UnseenItemsMessage`, added to what is already held) and the ones the furni grid has
 * already moved to its top (`§_-nb§`, `setUnseenItemMovedToTop`).
 *
 * The slice only keeps the sets. Telling the server - `ResetUnseenItemsComposer` from
 * `resetCategory` and `resetCategoryIfEmpty` - is `inventoryUnseenCommands`, which runs these
 * actions and sends when they say something changed. `HabboUnseenItemsUpdatedEvent` (the toolbar's
 * and the tabs' counts) needs no event here: the counts are read from the store.
 *
 * Flash's `resetItems` (`ResetUnseenItemIdsComposer`) is not carried: no class in the client calls
 * it, so the composer is complete but nothing sends it.
 *
 * `UnseenItemCategory` is the obfuscated `inventory/enum/§_-q1O§`, whole; `drift/constants.py`
 * holds it to the class.
 */
import { StateCreator } from 'zustand';

/** `§_-q1O§`: the unseen item categories. */
export class UnseenItemCategory {
    public static readonly OWNED_FURNI = 1;
    public static readonly RENTED_FURNI = 2;
    public static readonly PET = 3;
    public static readonly BADGE = 4;
    public static readonly BOT = 5;
    public static readonly GAMES = 6;
    public static readonly COLLECTIBLES = 7;
    /** `§_-IW§`: what `HabbiconController` tracks its new habbicons under. */
    public static readonly HABBICONS = 8;
    /** The categories the inventory's own count (`HabboUnseenItemsUpdatedEvent.inventoryCount`) sums. */
    public static readonly INVENTORY_CATEGORIES = [ 1, 2, 3, 4, 5 ];
}

/** Ids per category, each list without repeats in the order the ids arrived (`Set`). */
export type UnseenItemIds = Readonly<Record<number, readonly number[]>>;

type State = {
    /** `_unseenItems`. */
    unseenItems: UnseenItemIds;
    /** `§_-nb§`: the unseen ids whose furni group has been moved to the top of the grid once. */
    unseenMovedToTop: UnseenItemIds;
};

type Actions = {
    /** `addItems` (`onUnseenItems` per category, `setUnseenItem`). */
    addUnseenItems: (category: number, ids: readonly number[]) => void;
    /** `resetCategory` without the message: true when the category held anything, and is now empty. */
    resetUnseenCategory: (category: number) => boolean;
    /** `resetCategoryIfEmpty` without the message: true when nothing is left, which is when Flash sends it. */
    resetUnseenCategoryIfEmpty: (category: number) => boolean;
    /** `removeUnseen`: true when the id was unseen. */
    removeUnseenItem: (category: number, id: number) => boolean;
};

export const InventoryUnseenSliceInitialState: State = {
    unseenItems: {},
    unseenMovedToTop: {},
};

export type InventoryUnseenSlice = State & Actions;

/** `addItems` on one of the two dictionaries. The same object when nothing is new. */
export const addUnseenItemIds = (lists: UnseenItemIds, category: number, ids: readonly number[]): UnseenItemIds => {
    const held = lists[category] ?? [];
    const added = [ ...new Set(ids) ].filter(id => !held.includes(id));

    if (!added.length && lists[category]) return lists;

    return { ...lists, [category]: [ ...held, ...added ] };
};

/** `removeItemsFromMovedToTop` / `Set.remove` for several ids. The same object when none was held. */
export const removeUnseenItemIds = (lists: UnseenItemIds, category: number, ids: readonly number[]): UnseenItemIds => {
    const held = lists[category];

    if (!held || !ids.some(id => held.includes(id))) return lists;

    return { ...lists, [category]: held.filter(id => !ids.includes(id)) };
};

/** `delete _unseenItems[category]`. */
const deleteCategory = (lists: UnseenItemIds, category: number): UnseenItemIds => {
    if (!(category in lists)) return lists;

    const rest: Record<number, readonly number[]> = { ...lists };

    delete rest[category];

    return rest;
};

/** `isUnseen` / `isUnseenItemMovedToTop`. */
export const isUnseenItem = (lists: UnseenItemIds, category: number, id: number): boolean => lists[category]?.includes(id) ?? false;

/** `getCount`. */
export const getUnseenItemCount = (lists: UnseenItemIds, category: number): number => lists[category]?.length ?? 0;

/** `sendUpdateEvent`'s `inventoryCount`: the unseen ids of every inventory category. */
export const getUnseenInventoryCount = (lists: UnseenItemIds): number => UnseenItemCategory.INVENTORY_CATEGORIES.reduce((total, category) => total + getUnseenItemCount(lists, category), 0);

export const createInventoryUnseenSlice: StateCreator<InventoryUnseenSlice, [], [], InventoryUnseenSlice> = (set, get) => ({
    ...InventoryUnseenSliceInitialState,
    addUnseenItems: (category, ids) => set(x => ({ unseenItems: addUnseenItemIds(x.unseenItems, category, ids) })),
    resetUnseenCategory: (category) => {
        if (!getUnseenItemCount(get().unseenItems, category)) return false;

        set(x => ({ unseenItems: deleteCategory(x.unseenItems, category), unseenMovedToTop: deleteCategory(x.unseenMovedToTop, category) }));

        return true;
    },
    resetUnseenCategoryIfEmpty: (category) => {
        if (getUnseenItemCount(get().unseenItems, category)) return false;

        set(x => ({ unseenItems: deleteCategory(x.unseenItems, category), unseenMovedToTop: deleteCategory(x.unseenMovedToTop, category) }));

        return true;
    },
    removeUnseenItem: (category, id) => {
        if (!isUnseenItem(get().unseenItems, category, id)) return false;

        set(x => ({ unseenItems: removeUnseenItemIds(x.unseenItems, category, [ id ]), unseenMovedToTop: removeUnseenItemIds(x.unseenMovedToTop, category, [ id ]) }));

        return true;
    },
});

/**
 * What `catalog/habbicons/HabbiconController` keeps between packets: the user's habbicons
 * (`§_-01z§`), the recently used ones (`§_-c2R§`), the shop's sets (`§_-a14§`, `§_-Q1e§`) and
 * habbicons (`§_-4r§`), and the flags of its requests.
 *
 * `updateCachedShopItemState` and `markCollectionRewardClaimable` - how a status change or a
 * `HabbiconInfo` is written back into the shop data - are ported as the transitions below; Flash
 * mutated the shared parser objects in place, here each change builds new ones.
 *
 * `unseenHabbiconIds` stands in for the inventory's `UnseenItemTracker` category 8, which Flash
 * reaches through `HabboInventory.unseenItemTracker`. The tracker itself (and the
 * `UnseenItemsMessage` it is fed by) is not ported, so only the habbicons the controller marks
 * unseen itself (`handleNewOwnedHabbicon`) are in it.
 *
 * `change` is the last `HabbiconControllerEvent` the hub reacts to: its `habbiconId` and
 * `collectionId` pick what `HabbiconView.onControllerDataUpdated` refreshes.
 */
import type { IHabbiconShopCollection, IHabbiconShopItem } from '@nitrodevco/nitro-packets';
import { StateCreator } from 'zustand';

import { HabbiconState } from '../HabbiconState';

/** `HabbiconController.RECENT_HABBICON_LIMIT`. */
export const HABBICON_RECENT_LIMIT = 10;

/** `HabbiconControllerEvent`: `hce_owned_habbicons_updated`, `hce_shop_data_updated`, `hce_habbicon_status_changed`, `hce_recent_habbicons_updated`. */
export interface HabbiconControllerChange {
    seq: number;
    type: 'owned' | 'shop' | 'status' | 'recent';
    habbiconId: number;
    collectionId: number;
}

type State = {
    /** `§_-01z§`: habbicon id -> `habbiconState` (1 claimable, 2 owned, 3 favourite). */
    ownedHabbicons: Record<number, number>;
    /** `§_-c2R§`, most recent first. */
    recentHabbiconIds: number[];
    /** `§_-a14§`, in the server's order. */
    shopCollections: IHabbiconShopCollection[];
    /** `§_-4r§`: every shop habbicon by id, `HabbiconInfo` answers included. */
    shopItems: Record<number, IHabbiconShopItem>;
    hasLoadedOwnedHabbicons: boolean;
    /** `§_-51O§`. */
    hasLoadedShopData: boolean;
    /** `§_-dR§`: a `GetHabbiconShopData` is on its way. */
    shopDataRequested: boolean;
    /** A buy or claim was sent, and the next purchase result is the controller's. */
    pendingPurchaseRefresh: boolean;
    unseenHabbiconIds: number[];
    change: HabbiconControllerChange;
};

type Actions = {
    /** `onUserHabbicons`: the owned list and the recent ids are replaced. */
    setOwnedHabbicons: (owned: Record<number, number>, recentHabbiconIds: number[]) => void;
    /** `onUserHabbiconStatusChanged`: a stored state (1-3) keeps the habbicon, any other drops it, then the shop data follows. */
    setHabbiconStatus: (habbiconId: number, habbiconState: number) => void;
    /** `onHabbiconShopData`. */
    setShopData: (collections: IHabbiconShopCollection[]) => void;
    /** `onHabbiconInfo`: the habbicon is cached and written into its set. */
    setShopItem: (item: IHabbiconShopItem) => void;
    setShopDataRequested: (requested: boolean) => void;
    setPendingPurchaseRefresh: (pending: boolean) => void;
    /** `addRecentHabbiconId`: moved (or added) to the front, the list cut at `HABBICON_RECENT_LIMIT`. */
    addRecentHabbiconId: (habbiconId: number) => void;
    addUnseenHabbicon: (habbiconId: number) => void;
    /** Returns whether it was unseen. */
    removeUnseenHabbicon: (habbiconId: number) => boolean;
    resetUnseenHabbicons: () => void;
    /** Dispatches a `HabbiconControllerEvent`. */
    notifyHabbiconChange: (type: HabbiconControllerChange['type'], habbiconId?: number, collectionId?: number) => void;
};

export const HabbiconControllerSliceInitialState: State = {
    ownedHabbicons: {},
    recentHabbiconIds: [],
    shopCollections: [],
    shopItems: {},
    hasLoadedOwnedHabbicons: false,
    hasLoadedShopData: false,
    shopDataRequested: false,
    pendingPurchaseRefresh: false,
    unseenHabbiconIds: [],
    change: { seq: 0, type: 'shop', habbiconId: 0, collectionId: 0 },
};

export type HabbiconControllerSlice = State & Actions;

/** `isStoredUserState`. */
export const isStoredHabbiconState = (state: number): boolean => (state === HabbiconState.CLAIMABLE) || (state === HabbiconState.OWNED) || (state === HabbiconState.FAVORITE);

/** `isClaimedRewardTransition`: a claimable habbicon became owned or favourite. */
export const isClaimedHabbiconTransition = (from: number, to: number): boolean => (from === HabbiconState.CLAIMABLE) && ((to === HabbiconState.OWNED) || (to === HabbiconState.FAVORITE));

/** `isCollectionCompleted`: every habbicon of the set is in a stored state. */
const isCollectionCompleted = (collection: IHabbiconShopCollection): boolean => (collection.habbicons.length > 0) && collection.habbicons.every(item => isStoredHabbiconState(item.state));

type ShopState = Pick<State, 'ownedHabbicons' | 'shopCollections' | 'shopItems'>;

/**
 * `updateCachedShopItemState`: a set's reward takes the state as its reward state and nothing
 * else changes (`updateCachedRewardState`); otherwise the cached habbicon (or the one given)
 * takes it, replaces its entry in its set, and a set that is now complete has its reward made
 * claimable (`markCollectionRewardClaimable`) unless it is already owned.
 */
const updateCachedShopItemState = (current: ShopState, habbiconId: number, habbiconState: number, given?: IHabbiconShopItem): ShopState => {
    const rewardIndex = current.shopCollections.findIndex(collection => collection.rewardHabbiconId === habbiconId);

    if (rewardIndex >= 0) {
        const shopCollections = [ ...current.shopCollections ];

        shopCollections[rewardIndex] = { ...shopCollections[rewardIndex], rewardState: habbiconState };

        return { ...current, shopCollections };
    }

    const cached = given ?? current.shopItems[habbiconId];

    if (!cached) return current;

    const item: IHabbiconShopItem = { ...cached, state: habbiconState };
    const shopItems = { ...current.shopItems, [habbiconId]: item };
    const collectionIndex = current.shopCollections.findIndex(collection => collection.collectionId === item.collectionId);

    if (collectionIndex < 0) return { ...current, shopItems };

    const collection = current.shopCollections[collectionIndex];
    const habbicons = [ ...collection.habbicons ];
    const entryIndex = habbicons.findIndex(entry => entry.habbiconId === habbiconId);

    if (entryIndex >= 0) habbicons[entryIndex] = item;

    const updated: IHabbiconShopCollection = { ...collection, habbicons };
    let ownedHabbicons = current.ownedHabbicons;

    updated.completed = isCollectionCompleted(updated);

    if (updated.completed && (updated.rewardHabbiconId > 0) && (updated.rewardState !== HabbiconState.OWNED) && (updated.rewardState !== HabbiconState.FAVORITE)) {
        updated.rewardState = HabbiconState.CLAIMABLE;
        ownedHabbicons = { ...ownedHabbicons, [updated.rewardHabbiconId]: HabbiconState.CLAIMABLE };
    }

    const shopCollections = [ ...current.shopCollections ];

    shopCollections[collectionIndex] = updated;

    return { ownedHabbicons, shopCollections, shopItems };
};

const nextChange = (change: HabbiconControllerChange, type: HabbiconControllerChange['type'], habbiconId: number = 0, collectionId: number = 0): HabbiconControllerChange => ({ seq: change.seq + 1, type, habbiconId, collectionId });

export const createHabbiconControllerSlice: StateCreator<HabbiconControllerSlice, [], [], HabbiconControllerSlice> = (set, get) => ({
    ...HabbiconControllerSliceInitialState,
    setOwnedHabbicons: (ownedHabbicons, recentHabbiconIds) => set({ ownedHabbicons, recentHabbiconIds: [ ...recentHabbiconIds ], hasLoadedOwnedHabbicons: true }),
    setHabbiconStatus: (habbiconId, habbiconState) => set((x) => {
        const ownedHabbicons = { ...x.ownedHabbicons };

        if (isStoredHabbiconState(habbiconState)) ownedHabbicons[habbiconId] = habbiconState;
        else delete ownedHabbicons[habbiconId];

        return updateCachedShopItemState({ ownedHabbicons, shopCollections: x.shopCollections, shopItems: x.shopItems }, habbiconId, habbiconState);
    }),
    setShopData: (collections) => {
        const shopItems: Record<number, IHabbiconShopItem> = {};

        for (const collection of collections) {
            for (const item of collection.habbicons) shopItems[item.habbiconId] = item;
        }

        set({ shopCollections: collections, shopItems, hasLoadedShopData: true, shopDataRequested: false });
    },
    setShopItem: item => set((x) => {
        const cached = { ...x, shopItems: { ...x.shopItems, [item.habbiconId]: item } };

        return updateCachedShopItemState(cached, item.habbiconId, item.state, item);
    }),
    setShopDataRequested: shopDataRequested => set({ shopDataRequested }),
    setPendingPurchaseRefresh: pendingPurchaseRefresh => set({ pendingPurchaseRefresh }),
    addRecentHabbiconId: (habbiconId) => {
        if (habbiconId <= 0) return;

        set(x => ({ recentHabbiconIds: [ habbiconId, ...x.recentHabbiconIds.filter(id => id !== habbiconId) ].slice(0, HABBICON_RECENT_LIMIT) }));
    },
    addUnseenHabbicon: habbiconId => set(x => (x.unseenHabbiconIds.includes(habbiconId) ? x : { unseenHabbiconIds: [ ...x.unseenHabbiconIds, habbiconId ] })),
    removeUnseenHabbicon: (habbiconId) => {
        if (!get().unseenHabbiconIds.includes(habbiconId)) return false;

        set(x => ({ unseenHabbiconIds: x.unseenHabbiconIds.filter(id => id !== habbiconId) }));

        return true;
    },
    resetUnseenHabbicons: () => set({ unseenHabbiconIds: [] }),
    notifyHabbiconChange: (type, habbiconId = 0, collectionId = 0) => set(x => ({ change: nextChange(x.change, type, habbiconId, collectionId) })),
});

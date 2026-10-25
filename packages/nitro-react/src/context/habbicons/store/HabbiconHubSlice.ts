/**
 * The hub window's state that outlives the window being closed - Flash builds `HabbiconView` once
 * and only takes it off the desktop when it closes, so its tab (`§_-M2D§`) and its set
 * (`§_-61n§`, kept by collection id) are still there when it opens again. (`showWindow` selects
 * the all sets tab the first time only, `§_-419§` - the tab the store starts on.)
 *
 * `purchase` is `HabbiconController.§_-wU§`, the one `HabbiconPurchaseConfirmationView` that can
 * be up: for a habbicon (`initializeForHabbicon`) or a whole set (`initializeForSet`).
 * `failedSeq` counts `purchaseFailed` calls, so the view can start its `RETRY_ENABLE_DELAY_MS`
 * timer for each.
 */
import { StateCreator } from 'zustand';

import type { HabbiconEntryModel, HabbiconSetModel } from '../HabbiconAlbumModel';
import { HabbiconTabMode, HabbiconTabModeName } from '../HabbiconState';

export type HabbiconPurchaseRequest
    = | { mode: 'habbicon'; item: HabbiconEntryModel }
        | { mode: 'set'; set: HabbiconSetModel };

export interface HabbiconPurchaseConfirmation {
    /** Tells one confirmation from the next, so a view opened anew starts from its own state. */
    id: number;
    request: HabbiconPurchaseRequest;
    failedSeq: number;
}

type State = {
    hubTab: HabbiconTabModeName;
    /** The collection of `§_-61n§`; 0 before a set was picked, which means the first. */
    hubCollectionId: number;
    purchase: HabbiconPurchaseConfirmation | undefined;
};

type Actions = {
    setHubTab: (tab: HabbiconTabModeName) => void;
    setHubCollectionId: (collectionId: number) => void;
    openHabbiconPurchase: (request: HabbiconPurchaseRequest) => void;
    closeHabbiconPurchase: () => void;
    /** `HabbiconPurchaseConfirmationView.purchaseFailed`. */
    failHabbiconPurchase: () => void;
};

export const HabbiconHubSliceInitialState: State = {
    hubTab: HabbiconTabMode.ALL_SETS,
    hubCollectionId: 0,
    purchase: undefined,
};

export type HabbiconHubSlice = State & Actions;

let nextPurchaseId = 1;

export const createHabbiconHubSlice: StateCreator<HabbiconHubSlice, [], [], HabbiconHubSlice> = set => ({
    ...HabbiconHubSliceInitialState,
    setHubTab: hubTab => set({ hubTab }),
    setHubCollectionId: hubCollectionId => set({ hubCollectionId }),
    openHabbiconPurchase: request => set({ purchase: { id: nextPurchaseId++, request, failedSeq: 0 } }),
    closeHabbiconPurchase: () => set({ purchase: undefined }),
    failHabbiconPurchase: () => set(x => (x.purchase ? { purchase: { ...x.purchase, failedSeq: x.purchase.failedSeq + 1 } } : x)),
});

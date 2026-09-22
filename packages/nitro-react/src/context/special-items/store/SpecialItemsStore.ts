/**
 * The special items display - `catalog/special_items_display/SpecialItemsController` and the
 * view state `SpecialItemsView` keeps between openings: the set a `special_items_display/<key>`
 * link opened, its items (`FurniSpecialItem`, read from the hotel's `special_items.<key>.items`),
 * the free claim (`special_items.<key>.free_claim`) and its `CLAIM_STATE_*`, the items the user
 * has looked at (`_visitedItems`) and the carousel (`specialItemsRotation`).
 *
 * An app-wide singleton, as the Flash component is: the view is built once and hidden, not
 * disposed, so reopening the same set finds the carousel where it was left (`displayNewData`
 * resets it only for another key).
 *
 * `makeClaimable` is Flash's `reevaluateClaimableState`: a free claim unlocks once every item has
 * been visited, whichever of the two - the last visit or the server's "not claimed yet" - comes
 * second.
 */
import { createStore } from 'zustand';

import { createSpecialItemsRotation, navigateSpecialItems, nextSpecialItem, previousSpecialItem, SpecialItemsRotation, stepSpecialItemsRotation } from './specialItemsRotation';

/** `SpecialItemsController.ITEM_TYPE_FURNI`: the only item type the controller parses. */
export const SPECIAL_ITEM_TYPE_FURNI = 'furni';

/** `SpecialItemsController.CLAIM_STATE_*`. */
export const SPECIAL_ITEMS_CLAIM_STATE_NOT_APPLICABLE = 0;
export const SPECIAL_ITEMS_CLAIM_STATE_FETCHING = 1;
export const SPECIAL_ITEMS_CLAIM_STATE_BROWSING = 2;
export const SPECIAL_ITEMS_CLAIM_STATE_CLAIMABLE = 3;
export const SPECIAL_ITEMS_CLAIM_STATE_CLAIMED = 4;

/**
 * `FurniSpecialItem` (`AbstractSpecialItem` + `IProductDisplayInfo`): a floor furni, found by
 * class name. `productTypeId` is always 1 (a floor item) and `itemTypeId` the furni type id.
 */
export interface SpecialItem {
    index: number;
    itemKey: string;
    /** `special_items.<set>.body.<item>.title`, or the furni's own name when the hotel has none. */
    name: string;
    /** `special_items.<set>.body.<item>.desc`. */
    description: string;
    /** The furni type id (`§_-hc§`). */
    furniTypeId: number;
    /** The furni's class name and colour - what the product image renders. */
    className: string;
    colorIndex: number;
}

type State = {
    /** `_key`: the set the last link named. */
    key: string;
    items: SpecialItem[];
    /** `_freeClaim`: the claim id, `''` for none. */
    freeClaim: string;
    /** `§_-T1R§`. */
    claimState: number;
    /** `_latestDisplayKey`: the set the view was last filled for. */
    displayKey: string;
    /** `_visitedItems`. */
    visitedItems: boolean[];
    rotation: SpecialItemsRotation;
};

type Actions = {
    /** `parseSpecialItems` + `initialize`'s claim state: the set a link opened. */
    setSpecialItems: (key: string, items: SpecialItem[], freeClaim: string, claimState: number) => void;
    /** `displayNewData`: fills the view for a new set - pages, elements, visited items and the carousel start over. */
    displaySpecialItems: () => void;
    /** `onHasClaimedProductResponse`: the answer for the free claim, while it is being fetched. */
    setClaimResponse: (claimId: string, hasClaimed: boolean) => void;
    /** `makeClaim`'s state change: the claim was sent. */
    setClaimed: () => void;
    /** `onNextClick`. */
    showNextSpecialItem: () => void;
    /** `onPreviousClick`. */
    showPreviousSpecialItem: () => void;
    /** A page button: `navigateTo(index)`. */
    showSpecialItem: (index: number) => void;
    /** `update(deltaTime)`. */
    stepSpecialItems: (deltaTime: number) => void;
};

export const SpecialItemsInitialState: State = {
    key: '',
    items: [],
    freeClaim: '',
    claimState: SPECIAL_ITEMS_CLAIM_STATE_NOT_APPLICABLE,
    displayKey: '',
    visitedItems: [],
    rotation: createSpecialItemsRotation(0),
};

export type SpecialItemsStore = State & Actions;

/** `markItemVisited`. */
const markVisited = (visitedItems: boolean[], index: number): boolean[] => {
    if ((index < 0) || (index >= visitedItems.length) || visitedItems[index]) return visitedItems;

    const next = [ ...visitedItems ];

    next[index] = true;

    return next;
};

/**
 * `reevaluateClaimableState` -> `makeClaimable`: browsing turns claimable once every item was
 * visited.
 */
const reevaluateClaimState = (state: Pick<State, 'freeClaim' | 'claimState' | 'visitedItems'>): number => {
    if (!state.freeClaim.length || (state.claimState !== SPECIAL_ITEMS_CLAIM_STATE_BROWSING)) return state.claimState;

    if (!state.visitedItems.length || state.visitedItems.some(visited => !visited)) return state.claimState;

    return SPECIAL_ITEMS_CLAIM_STATE_CLAIMABLE;
};

export const createSpecialItemsStore = () => createStore<SpecialItemsStore>()((set, get) => {
    /** `navigateTo`'s `selectedPage` / `markItemVisited` half, around the carousel's own change. */
    const navigate = (move: (rotation: SpecialItemsRotation, total: number) => SpecialItemsRotation) => {
        const { items, rotation, visitedItems, freeClaim, claimState } = get();

        if (!items.length) return;

        const next = move(rotation, items.length);
        const visited = markVisited(visitedItems, next.target);

        set({ rotation: next, visitedItems: visited, claimState: reevaluateClaimState({ freeClaim, claimState, visitedItems: visited }) });
    };

    return {
        ...SpecialItemsInitialState,
        setSpecialItems: (key, items, freeClaim, claimState) => set({ key, items, freeClaim, claimState }),
        displaySpecialItems: () => {
            const { key, displayKey, items, freeClaim, claimState, visitedItems } = get();

            if (key === displayKey) {
                // `updateClaimState` alone.
                set({ claimState: reevaluateClaimState({ freeClaim, claimState, visitedItems }) });

                return;
            }

            // `resetVisitedItems` + `resetToFirstElement` (which visits the first item).
            const visited = markVisited(new Array<boolean>(items.length).fill(false), 0);

            set({
                displayKey: key,
                visitedItems: visited,
                rotation: createSpecialItemsRotation(items.length),
                claimState: reevaluateClaimState({ freeClaim, claimState, visitedItems: visited }),
            });
        },
        setClaimResponse: (claimId, hasClaimed) => {
            const { freeClaim, claimState, visitedItems } = get();

            if ((claimId !== freeClaim) || (claimState !== SPECIAL_ITEMS_CLAIM_STATE_FETCHING)) return;

            const next = hasClaimed ? SPECIAL_ITEMS_CLAIM_STATE_CLAIMED : SPECIAL_ITEMS_CLAIM_STATE_BROWSING;

            set({ claimState: reevaluateClaimState({ freeClaim, claimState: next, visitedItems }) });
        },
        setClaimed: () => set({ claimState: SPECIAL_ITEMS_CLAIM_STATE_CLAIMED }),
        showNextSpecialItem: () => navigate(nextSpecialItem),
        showPreviousSpecialItem: () => navigate(previousSpecialItem),
        showSpecialItem: index => navigate(rotation => navigateSpecialItems(rotation, index)),
        stepSpecialItems: (deltaTime) => {
            const { rotation, items } = get();

            if (!rotation.animating) return;

            set({ rotation: stepSpecialItemsRotation(rotation, deltaTime, items.length) });
        },
    };
});

export const specialItemsStore = createSpecialItemsStore();

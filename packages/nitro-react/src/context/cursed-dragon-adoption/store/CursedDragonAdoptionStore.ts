/**
 * The cursed dragon adoption - `catalog/cursed_dragon_adoption/CursedDragonAdoptionController`'s
 * claim: the hotel's `cursed_dragon_adoption.claim_id` (`cursed_dragon_adoption` when unset) and
 * its `CLAIM_STATE_*`, which `open` moves to fetching (`HasClaimedProduct`) unless a fetch or claim
 * is under way or the claim is already taken, the answer to available or claimed, `makeClaim` to
 * claiming and the claim's result (`onClaimProductResult`) on: 0 and 1 claimed, 2 and 3
 * unavailable, anything else available again. An answer for another claim, or one that comes in
 * any other state, is ignored as Flash ignores it.
 *
 * An app-wide singleton, as the Flash component is: the window is built once and hidden, so the
 * state outlives a close.
 */
import { createStore } from 'zustand';

export const CURSED_DRAGON_CLAIM_STATE_UNKNOWN = 0;
export const CURSED_DRAGON_CLAIM_STATE_FETCHING = 1;
export const CURSED_DRAGON_CLAIM_STATE_AVAILABLE = 2;
export const CURSED_DRAGON_CLAIM_STATE_CLAIMING = 3;
export const CURSED_DRAGON_CLAIM_STATE_CLAIMED = 4;
export const CURSED_DRAGON_CLAIM_STATE_UNAVAILABLE = 5;

/** `CursedDragonAdoptionView.onBlueAdopt` / `onPurpleAdopt`: the choice each button claims. */
export const CURSED_DRAGON_CHOICE_BLUE = 0;
export const CURSED_DRAGON_CHOICE_PURPLE = 1;

type State = {
    claimId: string;
    claimState: number;
};

type Actions = {
    /** `open`: asks again unless fetching, claiming or claimed; answers whether it asked. */
    startFetching: (claimId: string) => boolean;
    /** `onHasClaimedProductResponse`. */
    setClaimResponse: (claimId: string, hasClaimed: boolean) => void;
    /** `makeClaim`: only from available, and only for a known choice; answers whether to send. */
    startClaiming: (choice: number) => boolean;
    /** `onClaimProductResult`. */
    setClaimResult: (claimId: string, result: number) => void;
};

export type CursedDragonAdoptionStore = State & Actions;

export const createCursedDragonAdoptionStore = () => createStore<CursedDragonAdoptionStore>()((set, get) => ({
    claimId: '',
    claimState: CURSED_DRAGON_CLAIM_STATE_UNKNOWN,
    startFetching: (claimId) => {
        const { claimState } = get();

        if ((claimState === CURSED_DRAGON_CLAIM_STATE_FETCHING) || (claimState === CURSED_DRAGON_CLAIM_STATE_CLAIMING) || (claimState === CURSED_DRAGON_CLAIM_STATE_CLAIMED)) return false;

        set({ claimId, claimState: CURSED_DRAGON_CLAIM_STATE_FETCHING });

        return true;
    },
    setClaimResponse: (claimId, hasClaimed) => {
        const state = get();

        if ((claimId !== state.claimId) || (state.claimState !== CURSED_DRAGON_CLAIM_STATE_FETCHING)) return;

        set({ claimState: hasClaimed ? CURSED_DRAGON_CLAIM_STATE_CLAIMED : CURSED_DRAGON_CLAIM_STATE_AVAILABLE });
    },
    startClaiming: (choice) => {
        if ((get().claimState !== CURSED_DRAGON_CLAIM_STATE_AVAILABLE) || ((choice !== CURSED_DRAGON_CHOICE_BLUE) && (choice !== CURSED_DRAGON_CHOICE_PURPLE))) return false;

        set({ claimState: CURSED_DRAGON_CLAIM_STATE_CLAIMING });

        return true;
    },
    setClaimResult: (claimId, result) => {
        const state = get();

        if ((claimId !== state.claimId) || (state.claimState !== CURSED_DRAGON_CLAIM_STATE_CLAIMING)) return;

        switch (result) {
            case 0:
            case 1:
                set({ claimState: CURSED_DRAGON_CLAIM_STATE_CLAIMED });
                return;
            case 2:
            case 3:
                set({ claimState: CURSED_DRAGON_CLAIM_STATE_UNAVAILABLE });
                return;
            default:
                set({ claimState: CURSED_DRAGON_CLAIM_STATE_AVAILABLE });
        }
    },
}));

export const cursedDragonAdoptionStore = createCursedDragonAdoptionStore();

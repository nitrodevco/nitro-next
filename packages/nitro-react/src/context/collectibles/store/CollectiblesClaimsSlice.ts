/**
 * The rewards tab - Flash `tabs/RewardClaimsTab`: the wallets still to ask for their claims (one
 * every 600 ms, and only while no answer is outstanding - `processNextRequest`), the claims
 * listed (those not yet claimed to their limit), whether a claim-all is on its way (`§_-BO§`), the
 * claim button and the ready state.
 */
import type { INftClaim } from '@nitrodevco/nitro-packets';
import { StateCreator } from 'zustand';

type State = {
    /** `§_-Y2F§`. */
    claimsQueue: string[];
    /** `_isRequestInProgress`. */
    claimsRequestInProgress: boolean;
    /** `§_-BO§`. */
    claimsClaiming: boolean;
    /** `§_-31s§`. */
    claimsReady: boolean;
    /** `_listItems`: the claims `createRewardItem` added, in arrival order. */
    claims: INftClaim[];
    /** `claim_button`, as `updateClaimButtonState` and `onClaimClicked` left it. */
    claimsButtonEnabled: boolean;
};

type Actions = {
    patchCollectiblesClaims: (patch: Partial<State>) => void;
};

export const CollectiblesClaimsSliceInitialState: State = {
    claimsQueue: [],
    claimsRequestInProgress: false,
    claimsClaiming: false,
    claimsReady: false,
    claims: [],
    claimsButtonEnabled: false,
};

export type CollectiblesClaimsSlice = State & Actions;

export const createCollectiblesClaimsSlice: StateCreator<CollectiblesClaimsSlice, [], [], CollectiblesClaimsSlice> = set => ({
    ...CollectiblesClaimsSliceInitialState,
    patchCollectiblesClaims: patch => set(patch),
});

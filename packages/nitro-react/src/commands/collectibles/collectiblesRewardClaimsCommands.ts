/**
 * The collectibles hub's rewards tab - Flash `tabs/RewardClaimsTab`.
 * Part of Flash `catalog/collectibles/CollectiblesController` - see `collectiblesCommands`.
 */
import { ClaimNftClaimsComposer, GetNftClaimsComposer, INftClaim } from '@nitrodevco/nitro-packets';

import { collectiblesStore } from '#base/context/collectibles';
import { Send } from '#base/context/communication';
import { translate as t } from '#base/context/system';

import { notifyCollectibles } from './collectiblesCommands';

/** `RewardClaimsTab`'s request timer: `Timer(600)`. */
const CLAIMS_REQUEST_INTERVAL = 600;

let claimsRequestTimer: ReturnType<typeof setInterval> | undefined;

/** `requestRewardClaims` / `requestClaimsForWallet`: every wallet is queued and the timer started. */
export const requestRewardClaims = (send: Send, wallets: string[]) => {
    if (!wallets.length) return;

    const { claimsQueue, patchCollectiblesClaims } = collectiblesStore.getState();

    patchCollectiblesClaims({ claimsQueue: [ ...claimsQueue, ...wallets ] });

    if (!claimsRequestTimer) claimsRequestTimer = setInterval(() => processNextClaimsRequest(send), CLAIMS_REQUEST_INTERVAL);
};

/** `processNextRequest`: one wallet at a time, the next only once the last was answered. */
const processNextClaimsRequest = (send: Send) => {
    const { claimsRequestInProgress, claimsQueue, patchCollectiblesClaims } = collectiblesStore.getState();

    if (claimsRequestInProgress || !claimsQueue.length) return;

    const [ wallet, ...rest ] = claimsQueue;

    patchCollectiblesClaims({ claimsQueue: rest, claimsRequestInProgress: true });
    send(new GetNftClaimsComposer({ walletAddress: wallet }));
};

const stopClaimsRequestTimer = () => {
    if (!claimsRequestTimer) return;

    clearInterval(claimsRequestTimer);
    claimsRequestTimer = undefined;
};

/** `updateClaimButtonState`: something to claim, no claim on its way and no request out. */
const updateClaimsButtonState = () => {
    const { claims, claimsClaiming, claimsRequestInProgress, patchCollectiblesClaims } = collectiblesStore.getState();

    patchCollectiblesClaims({ claimsButtonEnabled: (claims.length > 0) && !claimsClaiming && !claimsRequestInProgress });
};

/** `onNftClaimsMessage`: the claims not yet claimed to their limit are listed; the last wallet answered makes the tab ready. */
export const onNftClaims = (nftClaims: INftClaim[]) => {
    const { claims, claimsQueue, patchCollectiblesClaims } = collectiblesStore.getState();

    patchCollectiblesClaims({ claims: [ ...claims, ...nftClaims.filter(claim => claim.claimedAmount < claim.claimLimit) ], claimsRequestInProgress: false });

    if (claimsQueue.length === 0) {
        stopClaimsRequestTimer();
        patchCollectiblesClaims({ claimsReady: true });
        updateClaimsButtonState();
    }
};

/** `onClaimClicked`. */
export const claimAllRewards = (send: Send) => {
    collectiblesStore.getState().patchCollectiblesClaims({ claimsButtonEnabled: false, claimsClaiming: true, claimsReady: false });
    send(new ClaimNftClaimsComposer({}));
};

/** `onNftClaimResultMessage`: the bubble; a success clears the list. */
export const onNftClaimResult = (resultCode: number) => {
    const success = resultCode === 0;

    notifyCollectibles(success ? t('collectibles.claiming.success') : t('collectibles.claiming.failed', '', { id: String(resultCode) }));

    const { patchCollectiblesClaims } = collectiblesStore.getState();

    if (success) patchCollectiblesClaims({ claims: [] });

    patchCollectiblesClaims({ claimsClaiming: false });
    updateClaimsButtonState();
    patchCollectiblesClaims({ claimsReady: true });
};

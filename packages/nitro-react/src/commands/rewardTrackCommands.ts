/**
 * `quest/rewardtrack/RewardTrackController` - the reward tracks (`reward_track/open/<id>`,
 * Progression > Introduction), which the server sends unasked.
 *
 * - `RewardTracks` replaces the tracks - none when it says they are disabled. When it reloads, is
 *   disabled, or replaces tracks held already, the views and the premium confirmation go
 *   (`disposeCachedViews`); a reload while a track was on show says so in an alert.
 * - `RewardTrackProgress` sets a task's progress count and the track's points.
 * - `RewardTrackClaimResult` marks the prize claimed - or, failing, says why in a bubble
 *   (`reward_track.claim.notification.fail.<code>`).
 * - `RewardTrackPremiumPurchaseResult` marks the track premium with its new points and closes the
 *   confirmation - or, failing, says why and lets the confirmation be pressed again.
 * - The progression menu's count (`UnseenRewardTrackRewardsCountUpdateEvent`) is the prizes of
 *   every track that can be claimed (`getRewardTrackClaimableCount`).
 */
import type { RewardTrackClaimResultMessageType, RewardTrackPremiumPurchaseResultMessageType, RewardTrackProgressMessageType, RewardTracksMessageType } from '@nitrodevco/nitro-packets';
import { ClaimRewardTrackPrizeComposer, PurchaseRewardTrackPremiumComposer } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { notificationStore } from '#base/context/notifications';
import { rewardTrackStore } from '#base/context/reward-track';
import { systemStore } from '#base/context/system';

type Send = WebSocketConnection['send'];

const localize = (key: string) => systemStore.getState().getLocalizationValue(key, key);

/** `showNotification`: an info bubble. Flash's claim bubble picks an icon and then passes none (`addItemWithBitmap(text, "info", null)`). */
const notify = (key: string) => notificationStore.getState().addNotification(localize(key), 'info');

/** `localizeResult`. */
const notifyResult = (prefix: string, code: number) => notify(`${prefix}${code}`);

/** `getTrackById`. */
export const getRewardTrack = (trackId: string) => rewardTrackStore.getState().tracks.find(track => track.id === trackId);

/** `onRewardTracks`. */
export const onRewardTracks = (data: RewardTracksMessageType) => {
    const { tracks, shownTrackId, setTracks } = rewardTrackStore.getState();
    const wasShowing = shownTrackId !== undefined;
    const disposesViews = data.reload || data.disabled || (tracks.length > 0);

    setTracks(data.disabled ? [] : data.tracks, !disposesViews);

    if (data.reload && wasShowing) systemStore.getState().showAlert(localize('reward_track.reload.title'), localize('reward_track.reload.desc'));
};

/** `onRewardTrackProgress`: `RewardTrack.updateProgress`. */
export const onRewardTrackProgress = (data: RewardTrackProgressMessageType) => rewardTrackStore.getState().updateTrack(data.trackId, track => ({
    ...track,
    points: data.points,
    tasks: track.tasks.map(task => ((task.id === data.taskId) ? { ...task, progressCount: data.progressCount } : task)),
}));

/** `onRewardTrackClaimResult`. */
export const onRewardTrackClaimResult = (data: RewardTrackClaimResultMessageType) => {
    if (data.resultCode !== 0) {
        notifyResult('reward_track.claim.notification.fail.', data.resultCode);

        return;
    }

    if (!getRewardTrack(data.trackId)) return;

    rewardTrackStore.getState().updateTrack(data.trackId, track => ({ ...track, prizes: track.prizes.map(prize => ((prize.id === data.rewardId) ? { ...prize, claimed: true } : prize)) }));

    notify('reward_track.claim.notification.success');
};

/** `onRewardTrackPremiumPurchaseResult`. */
export const onRewardTrackPremiumPurchaseResult = (data: RewardTrackPremiumPurchaseResultMessageType) => {
    const { premiumConfirmationTrackId, setPremiumConfirmationTrackId, notePremiumPurchaseFailed, updateTrack } = rewardTrackStore.getState();

    if (data.resultCode !== 0) {
        notifyResult('reward_track.premium.notification.fail.', data.resultCode);

        // `purchaseFailed` on the confirmation, when one is open.
        if (premiumConfirmationTrackId !== undefined) notePremiumPurchaseFailed();

        return;
    }

    if (!getRewardTrack(data.trackId)) {
        setPremiumConfirmationTrackId(undefined);

        return;
    }

    // `markPremiumPurchased`.
    updateTrack(data.trackId, track => ({ ...track, premium: true, points: data.points }));
    setPremiumConfirmationTrackId(undefined);
    notify('reward_track.premium.notification.success');
};

/** `openRewardTrack`: a track held is shown (its view made the first time); any other does nothing. */
export const openRewardTrack = (trackId: string) => {
    if (!getRewardTrack(trackId)) return;

    rewardTrackStore.getState().showTrack(trackId);
};

/** `linkReceived`: `reward_track/open/<id>`. */
export const openRewardTrackLink = (parts: string[]) => {
    if ((parts.length >= 3) && (parts[1] === 'open')) openRewardTrack(parts[2]);
};

/** `RewardTrackView.hide`. */
export const hideRewardTrack = () => rewardTrackStore.getState().hideTrack();

/** `claimPrize`. */
export const claimRewardTrackPrize = (send: Send, trackId: string, prizeId: string) => send(new ClaimRewardTrackPrizeComposer({ trackId, prizeId }));

/** `purchasePremium`. */
export const purchaseRewardTrackPremium = (send: Send, trackId: string) => send(new PurchaseRewardTrackPremiumComposer({ trackId }));

/** `openPremiumPurchaseConfirmation` (any one open closed first) and `closePremiumPurchaseConfirmation`. */
export const openRewardTrackPremiumConfirmation = (trackId: string) => rewardTrackStore.getState().setPremiumConfirmationTrackId(trackId);
export const closeRewardTrackPremiumConfirmation = () => rewardTrackStore.getState().setPremiumConfirmationTrackId(undefined);

/** `hasRewardTrack` / `isRewardTrackComplete`, for the new feature notification's `reward_track_incomplete` condition. */
export const hasRewardTrack = (trackId: string) => !!getRewardTrack(trackId);
export const isRewardTrackComplete = (trackId: string) => !!getRewardTrack(trackId)?.complete;

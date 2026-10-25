/**
 * `quest/rewardtrack/RewardTrackController` - the reward tracks (`reward_track/open/<id>`,
 * Progression > Introduction), which the server sends unasked.
 *
 * - `RewardTracks` replaces the tracks - none when it says they are disabled. When it reloads, is
 *   disabled, or replaces tracks held already, the views and the premium confirmation go
 *   (`disposeCachedViews`); a reload while a track was on show says so in an alert.
 * - `RewardTrackProgress` sets a task's progress count and the track's points; points gained say so in
 *   a bubble with the task's icon that opens the track
 *   (`reward_track.task.notification.completed`).
 * - `RewardTrackClaimResult` marks the prize claimed and says so with the free or premium track's
 *   icon - or, failing, says why in a bubble (`reward_track.claim.notification.fail.<code>`).
 * - `RewardTrackPremiumPurchaseResult` marks the track premium with its new points and closes the
 *   confirmation - or, failing, says why and lets the confirmation be pressed again.
 * - The progression menu's count (`UnseenRewardTrackRewardsCountUpdateEvent`) is the prizes of
 *   every track that can be claimed (`getRewardTrackClaimableCount`), and each track's item in the
 *   menu counts its own (`trackCounts`).
 */
import type { RewardTrackClaimResultMessageType, RewardTrackPremiumPurchaseResultMessageType, RewardTrackProgressMessageType, RewardTracksMessageType } from '@nitrodevco/nitro-packets';
import { ClaimRewardTrackPrizeComposer, PurchaseRewardTrackPremiumComposer } from '@nitrodevco/nitro-packets';
import { GetAssetManager } from '@nitrodevco/nitro-renderer';

import { Send } from '#base/context/communication';
import { notificationStore } from '#base/context/notifications';
import { rewardTrackStore, RewardTrackTask } from '#base/context/reward-track';
import { systemStore, translate as t } from '#base/context/system';

/** The window manager's bitmaps, as the layouts' `asset_uri`s name them. */
export const rewardTrackAsset = (name: string) => `habbo-window-manager-com-${name}`;

/** `_windowManager.assets.hasAsset`. */
const hasRewardTrackAsset = (name: string) => !!GetAssetManager().getTexture(rewardTrackAsset(name));

/** `getTaskIconAssetName`: the track's own icon for the task (`reward_track_tasks_<track>_<task>`), else its action type's. */
export const getRewardTrackTaskIconAssetName = (trackId: string, task: RewardTrackTask) => {
    const own = `reward_track_tasks_${trackId}_${task.id}`;

    return hasRewardTrackAsset(own) ? own : `reward_track_tasks_${task.actionType.toLowerCase()}`;
};

/** `showNotification`: an info bubble, with the window manager's bitmap `icon` when it has one, opening `link`. */
const showNotification = (text: string, icon?: string, link?: string) => notificationStore.getState().addNotification(text, 'info', (icon && hasRewardTrackAsset(icon)) ? rewardTrackAsset(icon) : undefined, link);

const notify = (key: string, icon?: string) => showNotification(t(key, key), icon);

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

    if (data.reload && wasShowing) systemStore.getState().showAlert(t('reward_track.reload.title', 'reward_track.reload.title'), t('reward_track.reload.desc', 'reward_track.reload.desc'));
};

/** `onRewardTrackProgress`: `RewardTrack.updateProgress`, and a bubble for the points it gained. */
export const onRewardTrackProgress = (data: RewardTrackProgressMessageType) => {
    const track = getRewardTrack(data.trackId);

    if (!track) return;

    const gained = data.points - track.points;
    const task = track.tasks.find(task => task.id === data.taskId);

    rewardTrackStore.getState().updateTrack(data.trackId, track => ({
        ...track,
        points: data.points,
        tasks: track.tasks.map(task => ((task.id === data.taskId) ? { ...task, progressCount: data.progressCount } : task)),
    }));

    if (task && (gained > 0)) showNotification(t('reward_track.task.notification.completed', '', { points: String(gained) }), getRewardTrackTaskIconAssetName(track.id, task), `reward_track/open/${track.id}`);
};

/** `onRewardTrackClaimResult`. */
export const onRewardTrackClaimResult = (data: RewardTrackClaimResultMessageType) => {
    if (data.resultCode !== 0) {
        notifyResult('reward_track.claim.notification.fail.', data.resultCode);

        return;
    }

    const track = getRewardTrack(data.trackId);

    if (!track) return;

    // `markPrizeClaimed`: the prize, if the track has it.
    const prize = track.prizes.find(prize => prize.id === data.rewardId);

    rewardTrackStore.getState().updateTrack(data.trackId, track => ({ ...track, prizes: track.prizes.map(prize => ((prize.id === data.rewardId) ? { ...prize, claimed: true } : prize)) }));

    // `showClaimSuccessNotification`.
    notify('reward_track.claim.notification.success', prize?.premium ? 'reward_track_premium_track' : 'reward_track_free_track');
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

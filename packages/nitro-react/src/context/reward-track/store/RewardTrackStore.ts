/**
 * The reward tracks - Flash's `quest/rewardtrack/RewardTrackController` and its `data` classes
 * (`RewardTrack`, `RewardTrackTask`, `RewardTrackTaskLevel`, `RewardTrackPrize`): the tracks the
 * last `RewardTracksMessage` brought (none while the server says they are disabled), the track whose
 * `RewardTrackView` is on show, and the track whose premium purchase confirmation is open.
 *
 * A track is plain data: its derived state (`refreshDerivedState`: each prize's `available`, the
 * track's `complete` and `premiumComplete`) is worked out again whenever it changes, and the
 * predicates the views ask (`isClaimable`, `isComplete`, `activeLevelIndex` ...) are functions of it.
 */
import type { IRewardTrackData, IRewardTrackPrizeData, IRewardTrackTaskData, IRewardTrackTaskLevelData } from '@nitrodevco/nitro-packets';
import { createStore } from 'zustand';

export type RewardTrack = IRewardTrackData;
export type RewardTrackTask = IRewardTrackTaskData;
export type RewardTrackTaskLevel = IRewardTrackTaskLevelData;
export type RewardTrackPrize = IRewardTrackPrizeData;

/** `RewardTrackPrize.isPremiumLocked`: a premium prize of a track not bought. */
export const isRewardTrackPrizePremiumLocked = (prize: RewardTrackPrize, track: RewardTrack) => prize.premium && !track.premium;

/** `RewardTrackPrize.hasEnoughPoints`. */
export const rewardTrackPrizeHasEnoughPoints = (prize: RewardTrackPrize, track: RewardTrack) => track.points >= prize.requiredPoints;

/** `RewardTrackPrize.isAvailable`. */
export const isRewardTrackPrizeAvailable = (prize: RewardTrackPrize, track: RewardTrack) => !isRewardTrackPrizePremiumLocked(prize, track) && rewardTrackPrizeHasEnoughPoints(prize, track);

/** `RewardTrackPrize.isClaimable`. */
export const isRewardTrackPrizeClaimable = (prize: RewardTrackPrize, track: RewardTrack) => isRewardTrackPrizeAvailable(prize, track) && !prize.claimed;

/** `RewardTrackTask.isComplete`: at every level's required count. */
export const isRewardTrackTaskComplete = (task: RewardTrackTask) => task.levels.every(level => task.progressCount >= level.requiredCount);

/** `RewardTrackTask.hasProgress`. */
export const rewardTrackTaskHasProgress = (task: RewardTrackTask) => task.progressCount > 0;

/** `RewardTrackTask.activeLevelIndex`: the first level not reached, else the last. */
export const getRewardTrackTaskActiveLevelIndex = (task: RewardTrackTask) => {
    const index = task.levels.findIndex(level => task.progressCount < level.requiredCount);

    return (index >= 0) ? index : (task.levels.length - 1);
};

/** `RewardTrackTask.activeLevel`. */
export const getRewardTrackTaskActiveLevel = (task: RewardTrackTask): RewardTrackTaskLevel | undefined => task.levels[getRewardTrackTaskActiveLevelIndex(task)];

/** `RewardTrackTask.progressRatioFor`. */
export const getRewardTrackTaskProgressRatio = (task: RewardTrackTask, level: RewardTrackTaskLevel | undefined) => {
    if (!level || (level.requiredCount <= 0)) return 1;

    return Math.max(0, Math.min(1, task.progressCount / level.requiredCount));
};

/** `RewardTrack.completedTaskCount` / `claimedPrizeCount`. */
export const getRewardTrackCompletedTaskCount = (track: RewardTrack) => track.tasks.filter(isRewardTrackTaskComplete).length;
export const getRewardTrackClaimedPrizeCount = (track: RewardTrack) => track.prizes.filter(prize => prize.claimed).length;

/** `broadcastClaimableRewardsCount`: the prizes of every track that can be claimed. */
export const getRewardTrackClaimableCount = (tracks: readonly RewardTrack[]) => tracks.reduce((count, track) => count + track.prizes.filter(prize => isRewardTrackPrizeClaimable(prize, track)).length, 0);

/**
 * `RewardTrack.refreshDerivedState`: each prize's availability, then the track complete when every
 * free prize is claimed, and premium complete when, besides, every premium prize is - or when the
 * track has no premium configuration.
 */
export const refreshRewardTrack = (track: RewardTrack): RewardTrack => {
    const prizes = track.prizes.map(prize => ({ ...prize, available: isRewardTrackPrizeAvailable(prize, track) }));
    const freeClaimed = prizes.every(prize => prize.premium || prize.claimed);
    const premiumClaimed = prizes.every(prize => !prize.premium || prize.claimed);

    return { ...track, prizes, complete: freeClaimed, premiumComplete: !track.hasPremiumConfig || (freeClaimed && premiumClaimed) };
};

type State = {
    tracks: RewardTrack[];
    /** `RewardTrackController.§_-V28§`: the track whose view is on show. */
    shownTrackId: string | undefined;
    /** The track whose `RewardTrackPremiumPurchaseConfirmationView` is open. */
    premiumConfirmationTrackId: string | undefined;
    /** Bumped when the tracks are replaced (`disposeCachedViews`): the views start again. */
    generation: number;
    /** Bumped by `purchaseFailed`: the open confirmation can be pressed again. */
    premiumPurchaseFailures: number;
};

type Actions = {
    /** `onRewardTracks`: the tracks replaced; `keepShown` false takes the view down with the old ones. */
    setTracks: (tracks: RewardTrack[], keepShown: boolean) => void;
    /** Replaces one track with `update(track)`, its derived state refreshed. */
    updateTrack: (trackId: string, update: (track: RewardTrack) => RewardTrack) => void;
    showTrack: (trackId: string) => void;
    hideTrack: () => void;
    setPremiumConfirmationTrackId: (trackId: string | undefined) => void;
    notePremiumPurchaseFailed: () => void;
};

export type RewardTrackStore = State & Actions;

const INITIAL: State = { tracks: [], shownTrackId: undefined, premiumConfirmationTrackId: undefined, generation: 0, premiumPurchaseFailures: 0 };

export const createRewardTrackStore = () => createStore<RewardTrackStore>()(set => ({
    ...INITIAL,
    setTracks: (tracks, keepShown) => set(x => ({
        tracks: tracks.map(refreshRewardTrack),
        generation: keepShown ? x.generation : (x.generation + 1),
        shownTrackId: keepShown ? x.shownTrackId : undefined,
        premiumConfirmationTrackId: keepShown ? x.premiumConfirmationTrackId : undefined,
    })),
    updateTrack: (trackId, update) => set(x => ({ tracks: x.tracks.map(track => ((track.id === trackId) ? refreshRewardTrack(update(track)) : track)) })),
    showTrack: trackId => set({ shownTrackId: trackId }),
    hideTrack: () => set({ shownTrackId: undefined }),
    setPremiumConfirmationTrackId: trackId => set({ premiumConfirmationTrackId: trackId }),
    notePremiumPurchaseFailed: () => set(x => ({ premiumPurchaseFailures: x.premiumPurchaseFailures + 1 })),
}));

export const rewardTrackStore = createRewardTrackStore();

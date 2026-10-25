/**
 * Wired reward popups - Flash `wired_trading/reward_notification/RewardNotificationController`:
 * every successful transaction that carries a reward is kept by its `internalId`, and up to
 * `MAX_OPEN_REWARD_NOTIFICATIONS` `RewardNotificationView`s show them, each nudged off the last
 * so a burst of rewards does not stack exactly.
 *
 * `internalId` is a counter Flash's success parser stamps on each packet; here the handler
 * stamps it (`nextRewardInternalId`), so the notification bubble's `wiredrewards/open/<id>`
 * link and this store agree on it.
 */
import type { IWiredTransactionSuccessContents } from '@nitrodevco/nitro-packets';
import { StateCreator } from 'zustand';

/** `RewardNotificationController.MAX_OPEN_REWARD_NOTIFICATIONS`. */
export const WIRED_MAX_OPEN_REWARD_NOTIFICATIONS = 10;
/** The step between two popups, in `openRewardView`. */
const REWARD_VIEW_OFFSET_STEP = 25;

export interface WiredRewardContents extends IWiredTransactionSuccessContents {
    internalId: number;
}

/** One `RewardNotificationView`. */
export interface WiredRewardView {
    internalId: number;
    /** `viewIndex`: 0..9, cycling. */
    viewIndex: number;
    /** How far the popup is moved from the centre. */
    offsetX: number;
    offsetY: number;
}

type State = {
    /** `§_-7a§`. */
    rewardsById: Record<number, WiredRewardContents>;
    /** `§_-C15§`, oldest first. */
    rewardViews: WiredRewardView[];
};

type Actions = {
    addReward: (contents: WiredRewardContents) => void;
    /** `openRewardView`: an open popup for the reward stays as it is. */
    openRewardView: (internalId: number) => void;
    closeRewardView: (internalId: number) => void;
    /** `REE_DISPOSED`: every popup goes, the rewards stay openable from their bubbles. */
    closeAllRewardViews: () => void;
};

export const WiredRewardSliceInitialState: State = {
    rewardsById: {},
    rewardViews: [],
};

export type WiredRewardSlice = State & Actions;

/** The offsets `openRewardView` gives the popup with this index: 0 in place, then alternately down-right and up-left, a step further every two. */
const rewardViewOffset = (viewIndex: number): number => {
    if (viewIndex <= 0) return 0;

    const distance = REWARD_VIEW_OFFSET_STEP * Math.trunc((viewIndex + 1) / 2);

    return (((viewIndex + 1) % 2) === 0) ? distance : -distance;
};

let rewardInternalIdCounter = 0;

/** `WiredTransactionSuccessContents.internalId`. */
export const nextRewardInternalId = () => ++rewardInternalIdCounter;

export const createWiredRewardSlice: StateCreator<WiredRewardSlice, [], [], WiredRewardSlice> = set => ({
    ...WiredRewardSliceInitialState,
    addReward: contents => set(x => ({ rewardsById: { ...x.rewardsById, [contents.internalId]: contents } })),
    openRewardView: internalId => set((x) => {
        if (x.rewardViews.some(view => view.internalId === internalId)) return x;

        const views = x.rewardViews.slice(Math.max(0, x.rewardViews.length - (WIRED_MAX_OPEN_REWARD_NOTIFICATIONS - 1)));
        const last = views[views.length - 1];
        const viewIndex = last ? ((last.viewIndex + 1) % WIRED_MAX_OPEN_REWARD_NOTIFICATIONS) : 0;
        const offset = rewardViewOffset(viewIndex);

        return { rewardViews: [ ...views, { internalId, viewIndex, offsetX: offset, offsetY: offset } ] };
    }),
    closeRewardView: internalId => set(x => ({ rewardViews: x.rewardViews.filter(view => view.internalId !== internalId) })),
    closeAllRewardViews: () => set({ rewardViews: [] }),
});

/**
 * The NFT reward box popup - Flash `CollectiblesRewardBoxView` on `collectible_reward.xml`: the
 * rewards waiting to be shown (`§_-F1F§`), the one up, and its `product_image` widget's preview
 * with that widget's own easter egg counter. The window, once built, is only taken off the desktop
 * when the last reward is dismissed.
 */
import type { ICollectibleBaseItem } from '@nitrodevco/nitro-packets';
import { StateCreator } from 'zustand';

import { COLLECTIBLE_PREVIEW_EASTER_EGG_INITIAL, COLLECTIBLE_PREVIEW_PLACEHOLDER, CollectiblePreview, CollectiblePreviewEasterEgg } from './CollectiblesPreview';

type State = {
    /** The window is on the desktop. */
    rewardBoxVisible: boolean;
    /** `§_-F1F§`. */
    rewardBoxQueue: ICollectibleBaseItem[];
    /** The reward `populateRewardItem` last showed. */
    rewardBoxCurrent: ICollectibleBaseItem | null;
    /** `product_image`'s widget. */
    rewardBoxPreview: CollectiblePreview;
    rewardBoxPreviewEasterEgg: CollectiblePreviewEasterEgg;
};

type Actions = {
    patchCollectiblesRewardBox: (patch: Partial<State>) => void;
};

export const CollectiblesRewardBoxSliceInitialState: State = {
    rewardBoxVisible: false,
    rewardBoxQueue: [],
    rewardBoxCurrent: null,
    rewardBoxPreview: COLLECTIBLE_PREVIEW_PLACEHOLDER,
    rewardBoxPreviewEasterEgg: COLLECTIBLE_PREVIEW_EASTER_EGG_INITIAL,
};

export type CollectiblesRewardBoxSlice = State & Actions;

export const createCollectiblesRewardBoxSlice: StateCreator<CollectiblesRewardBoxSlice, [], [], CollectiblesRewardBoxSlice> = set => ({
    ...CollectiblesRewardBoxSliceInitialState,
    patchCollectiblesRewardBox: patch => set(patch),
});

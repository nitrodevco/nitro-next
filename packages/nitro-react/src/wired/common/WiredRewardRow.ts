/**
 * What one `uibuilder/presets/combinations/RewardRowPreset` holds - a line of the "give reward"
 * box: whether the code is a badge code, the product or badge code, and the chance to get it,
 * kept as the text that was typed (`probabilityText`; the element parses it when it saves).
 */
export interface WiredRewardRowData {
    isBadge: boolean;
    code: string;
    probabilityText: string;
}

/** `RewardRowPreset.clear`. */
export const EMPTY_WIRED_REWARD_ROW: WiredRewardRowData = { isBadge: false, code: '', probabilityText: '' };

/** The rows of a new `RewardListPreset` - all `maxRewards` of them exist, `displayedRewards` are shown. */
export const createWiredRewardRows = (maxRewards: number): WiredRewardRowData[] =>
    Array.from({ length: maxRewards }, () => EMPTY_WIRED_REWARD_ROW);

/** `RewardListPreset.setDisplayedRewards` - how many rows show, kept within `0 .. maxRewards`. */
export const clampDisplayedRewards = (maxRewards: number, count: number): number => Math.max(0, Math.min(maxRewards, count));

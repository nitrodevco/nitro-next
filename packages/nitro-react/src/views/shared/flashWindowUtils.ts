/**
 * The window layout helpers Flash gives each package its own `Util` for (`navigator.Util`,
 * `friendlist.Util`, `inventory.Util`, `roomevents.Util`) and the quest engine carries as statics
 * (`AchievementController`, `HabboQuestEngine`) - one port of each body, run against a template's
 * `LayoutWindow`s inside an `arrange`. Where two packages' bodies differ the difference is a
 * parameter, named for the packages that use it.
 */
import { LayoutWindow } from '#base/theme';

/**
 * `getLowestPoint`: the lowest bottom among the visible children. `navigator.Util`,
 * `friendlist.Util` and `AchievementController` take every visible child; `inventory.Util` and
 * `roomevents.Util` skip one with no height (`skipEmpty`).
 */
export const getLowestPoint = (window: LayoutWindow, skipEmpty: boolean = false): number => window.children.reduce((lowest, child) => ((child.visible && (!skipEmpty || (child.height > 0))) ? Math.max(lowest, child.y + child.height) : lowest), 0);

/**
 * `layoutChildrenInArea`: the visible children left to right from `x`, `spacing` apart, wrapped
 * onto a new row `rowHeight` lower when the next would pass `width` (a row's first child always
 * fits). `friendlist.Util`'s takes neither `spacing` nor `x`: both 0, as here by default.
 */
export const layoutChildrenInArea = (window: LayoutWindow, width: number, rowHeight: number, spacing: number = 0, x: number = 0) => {
    let left = x;
    let top = 0;

    for (const child of window.children) {
        if (!child.visible) continue;

        if ((left > 0) && ((left + child.width) > width)) {
            left = 0;
            top += rowHeight;
        }

        child.setX(left);
        child.setY(top);
        left += child.width + spacing;
    }
};

/**
 * `HabboQuestEngine.moveChildrenToRow`: the visible windows one after the other from `x`, `spacing`
 * apart. `refreshReward` lays the reward's caption, amount and currency icon out with it - see
 * `QUEST_REWARD_ROW`.
 */
export const moveWindowsToRow = (windows: readonly (LayoutWindow | undefined)[], x: number, spacing: number) => {
    let left = x;

    for (const window of windows) {
        if (!window?.visible) continue;

        window.setX(left);
        left += window.width + spacing;
    }
};

/** `HabboQuestEngine.refreshReward`: the reward row's windows, and the spacing `moveChildrenToRow` lays them out with. */
export const QUEST_REWARD_ROW = [ 'reward_caption_txt', 'reward_amount_txt', 'currency_icon' ] as const;
export const QUEST_REWARD_SPACING = 3;

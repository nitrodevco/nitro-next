/**
 * The friend bar's geometry - `HabboFriendBarView`'s constants, `Tab.WIDTH` / `Tab.HEIGHT`, and the
 * `new_bar` layout's measures - and `layoutFriendBar`, the part of `populate` and
 * `getNumberOfFindFriendsTabs` that decides which tabs the bar holds.
 *
 * Kept free of runtime imports so it can be tested under Node as it stands.
 */

/** `Tab.WIDTH` / `Tab.HEIGHT`: every tab's size on the bar. */
export const FRIEND_BAR_TAB_WIDTH = 127;
export const FRIEND_BAR_TAB_HEIGHT = 36;
/** `list`'s `spacing`. */
export const FRIEND_BAR_TAB_SPACING = 3;
/** `friendtools`' width - and the width of the bar collapsed to it (`COLLAPSED_MARGIN`). */
export const FRIEND_BAR_TOOLS_WIDTH = 150;
/** `button_left_page` / `button_right_page` / `collapse_right`: the widths `arrangeWindows` adds up. */
export const FRIEND_BAR_LEFT_PAGE_WIDTH = 28;
export const FRIEND_BAR_RIGHT_PAGE_WIDTH = 29;
export const FRIEND_BAR_COLLAPSE_WIDTH = 15;
/** `new_bar`'s height, and its gap to the desktop's bottom (`NEW_BAR_BOTTOM_OFFSET`). */
export const FRIEND_BAR_HEIGHT = 48;
export const FRIEND_BAR_BOTTOM_OFFSET = 1;
/** `COLLAPSE_ANIMATION_DURATION_MS`. */
export const FRIEND_BAR_COLLAPSE_MS = 140;
/** `getNumberOfFindFriendsTabs`: find friends tabs fill the bar up to this many tabs. */
const MIN_TABS = 3;

/**
 * `maxNumOfTabsVisible`: `(width - friendtools.width - 16) / (Tab.WIDTH + spacing)`, where the
 * width is what `resizeAndPopulate` gives the bar first - the desktop right of the toolbar.
 */
export const maxFriendBarTabs = (availableWidth: number): number =>
    Math.trunc((availableWidth - FRIEND_BAR_TOOLS_WIDTH - 16) / (FRIEND_BAR_TAB_WIDTH + FRIEND_BAR_TAB_SPACING));

export interface FriendBarLayout {
    /** The first friend shown, clamped as `populate` clamps `_startIndex`. */
    startIndex: number;
    /** How many friends from `startIndex` get a tab. */
    friendTabs: number;
    /** How many find friends tabs follow them. */
    findFriendsTabs: number;
    /** Whether the page arrows show, and whether each can be pressed (`toggleArrowButtons`). */
    arrows: boolean;
    canPageLeft: boolean;
    canPageRight: boolean;
}

/**
 * `populate` with the bar's find friends tabs on (`_SafeStr_8168`) and no friend request tabs -
 * the count it adds them for is a local that stays 0, so none are ever made.
 */
export const layoutFriendBar = (numFriends: number, maxTabs: number, requestedStart: number): FriendBarLayout => {
    let total = numFriends + 1;
    const shown = Math.min(maxTabs, total);
    let startIndex = requestedStart;

    if ((startIndex + shown) > total) startIndex = Math.max(0, startIndex - ((startIndex + shown) - total));

    let friendTabs = 0;

    for (let index = startIndex; index < numFriends; index++) {
        if (friendTabs >= maxTabs) break;

        friendTabs++;
    }

    let findFriendsTabs = 0;

    if (friendTabs < maxTabs) {
        findFriendsTabs = 1;

        if ((friendTabs + findFriendsTabs) < MIN_TABS) findFriendsTabs = Math.min(maxTabs - friendTabs, MIN_TABS - friendTabs);
    }

    total = numFriends + findFriendsTabs;

    const tabs = friendTabs + findFriendsTabs;

    return {
        startIndex,
        friendTabs,
        findFriendsTabs,
        arrows: (tabs < total) && (total > 0),
        canPageLeft: startIndex !== 0,
        canPageRight: (startIndex + tabs) < total,
    };
};

/**
 * `barWindowEventProc`'s page buttons: a page of tabs either way, the count including the find
 * friends tab and, while there are any, one for the friend requests.
 */
export const pageFriendBar = (startIndex: number, direction: -1 | 1, numFriends: number, numRequests: number, maxTabs: number): number => {
    const total = numFriends + 1 + ((numRequests > 0) ? 1 : 0);

    if (direction < 0) return Math.max(0, startIndex - maxTabs);

    return Math.max(0, Math.min(total - maxTabs, startIndex + maxTabs));
};

/** `arrangeWindows`: the bar is as wide as the windows it shows, laid side by side. */
export const friendBarWidth = (tabs: number, arrows: boolean, collapsed: boolean): number => {
    const list = (tabs > 0) ? ((tabs * FRIEND_BAR_TAB_WIDTH) + ((tabs - 1) * FRIEND_BAR_TAB_SPACING)) : 0;

    return FRIEND_BAR_TOOLS_WIDTH + (arrows ? (FRIEND_BAR_LEFT_PAGE_WIDTH + FRIEND_BAR_RIGHT_PAGE_WIDTH) : 0) + list + (collapsed ? 0 : FRIEND_BAR_COLLAPSE_WIDTH);
};

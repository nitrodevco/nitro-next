/**
 * The badge leaderboard store - what Flash's `groups/badge_leaderboard/BadgeLeaderboardController`
 * shows in its one `BadgeLeaderboardView`: the board picked (`type` / `rarity`, `§_-8Z§` /
 * `§_-O1i§`), the page (`currentPage`) and the page's data (`§_-N24§`, a `BadgeLeaderboardPageData`)
 * once the data server has it. The chunks the data server holds are not view state: they live in
 * `badgeLeaderboardCommands`.
 */
import type { IBadgeLeaderboardEntryData } from '@nitrodevco/nitro-packets';
import { createStore } from 'zustand';

/** `BadgeLeaderboardPageData`. */
export interface BadgeLeaderboardPageData {
    type: number;
    rarity: number;
    page: number;
    totalEntries: number;
    entries: IBadgeLeaderboardEntryData[];
    ownEntry: IBadgeLeaderboardEntryData | undefined;
}

type State = {
    /** `BadgeLeaderboardView.isShowing`. */
    shown: boolean;
    type: number;
    rarity: number;
    page: number;
    pageData: BadgeLeaderboardPageData | undefined;
    /** Bumped by `openDropdownMenu`: the hidden drop menu opens its list. */
    menuOpenRequest: number;
};

type Actions = {
    /** `showBadgeLeaderboard`: the board and page, their data cleared (`clearVisibleData`) and the window shown. */
    showBoard: (type: number, rarity: number, page: number) => void;
    setPageData: (pageData: BadgeLeaderboardPageData) => void;
    requestMenuOpen: () => void;
    hide: () => void;
};

export type BadgeLeaderboardStore = State & Actions;

const INITIAL: State = { shown: false, type: 0, rarity: -1, page: 0, pageData: undefined, menuOpenRequest: 0 };

export const createBadgeLeaderboardStore = () => createStore<BadgeLeaderboardStore>()(set => ({
    ...INITIAL,
    showBoard: (type, rarity, page) => set({ shown: true, type, rarity, page, pageData: undefined }),
    setPageData: pageData => set({ pageData }),
    requestMenuOpen: () => set(x => ({ menuOpenRequest: x.menuOpenRequest + 1 })),
    hide: () => set({ shown: false }),
}));

export const badgeLeaderboardStore = createBadgeLeaderboardStore();

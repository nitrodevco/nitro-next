/**
 * The badge leaderboard store's actions. Zustand actions are created once and never change, so they
 * are read off the store a single time here rather than subscribed to: a component using these
 * re-renders for nothing.
 */
import { badgeLeaderboardStore } from '../store';

const state = badgeLeaderboardStore.getState();

const actions = {
    showBoard: state.showBoard,
    setPageData: state.setPageData,
    requestMenuOpen: state.requestMenuOpen,
    hide: state.hide,
};

export const useBadgeLeaderboardActions = () => actions;

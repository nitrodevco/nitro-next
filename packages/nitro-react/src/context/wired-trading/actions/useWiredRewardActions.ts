/**
 * The reward popups' actions. Read off the store once: a component using these re-renders for
 * nothing.
 */
import { wiredTradingStore } from '../store/WiredTradingStore';

const state = wiredTradingStore.getState();

const actions = {
    openRewardView: state.openRewardView,
    closeRewardView: state.closeRewardView,
};

export const useWiredRewardActions = () => actions;

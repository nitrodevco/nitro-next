import { wiredTradingStore } from '../store/WiredTradingStore';

const state = wiredTradingStore.getState();

/**
 * The reward popups' actions. Read off the store once: a component using these re-renders for
 * nothing.
 */
const actions = {
    openRewardView: state.openRewardView,
    closeRewardView: state.closeRewardView,
};

export const useWiredRewardActions = () => actions;

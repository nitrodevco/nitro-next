import { wiredTradingStore } from '../store/WiredTradingStore';

const state = wiredTradingStore.getState();

/**
 * The wired trade's actions a window may call itself; accepting, confirming and cancelling talk
 * to the server and go through `wiredTradingCommands`. Read off the store once: a component
 * using these re-renders for nothing.
 */
const actions = {
    setTradeRequirementsVisible: state.setTradeRequirementsVisible,
};

export const useWiredTradeActions = () => actions;

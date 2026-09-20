import { wiredTradingStore } from '../store/WiredTradingStore';

const state = wiredTradingStore.getState();

/**
 * The chest slice's actions a window may call itself - which of the chest's own windows are up.
 * Opening, closing and anything that talks to the server go through `wiredTradingCommands`.
 * Read off the store once: a component using these re-renders for nothing.
 */
const actions = {
    setChestSettings: state.setChestSettings,
    setChestNotificationSettings: state.setChestNotificationSettings,
    setChestUpgrade: state.setChestUpgrade,
};

export const useWiredChestActions = () => actions;

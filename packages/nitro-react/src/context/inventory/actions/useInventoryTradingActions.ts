import { inventoryStore } from '../store/InventoryStore';

const state = inventoryStore.getState();

/**
 * `InventoryTradingSlice`'s view-side actions: the countdown tick the command schedules, and the
 * collectibles page's pick. Everything a trade button does talks to the server and goes through
 * `inventoryTradingCommands`. Read off the store once: a component using these re-renders for
 * nothing.
 */
const actions = {
    setTradingCountdown: state.setTradingCountdown,
    selectTradingNft: state.selectTradingNft,
    setTradingNameScamWarning: state.setTradingNameScamWarning,
};

export const useInventoryTradingActions = () => actions;

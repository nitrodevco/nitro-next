import { inventoryStore } from '../store/InventoryStore';

const state = inventoryStore.getState();

/**
 * `InventoryBotsSlice`'s view-side actions - picking a bot. The list is asked for and a bot is
 * placed through `inventoryBotsCommands`. Read off the store once: a component using these
 * re-renders for nothing.
 */
const actions = {
    selectBot: state.selectBot,
};

export const useInventoryBotsActions = () => actions;

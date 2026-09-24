import { inventoryStore } from '../store/InventoryStore';

const state = inventoryStore.getState();

/**
 * `InventoryBadgesSlice`'s view-side actions - picking a badge. Putting one on and taking it off
 * tells the server too (`BadgesModel.saveBadgeSelection`) and goes through
 * `inventoryBadgeCommands`. Read off the store once: a component using these re-renders for
 * nothing.
 */
const actions = {
    selectBadge: state.selectBadge,
};

export const useInventoryBadgesActions = () => actions;

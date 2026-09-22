import { inventoryStore } from '../store/InventoryStore';

const state = inventoryStore.getState();

/**
 * `InventoryRecyclerSlice`'s setters. Starting, stopping and locking go through
 * `catalogRecyclerCommands` (`RecyclerModel`'s methods, which the catalogue's recycler calls).
 * Read off the store once: a component using these re-renders for nothing.
 */
const actions = {
    setRecyclerState: state.setRecyclerState,
    setRecyclerItemIds: state.setRecyclerItemIds,
};

export const useInventoryRecyclerActions = () => actions;

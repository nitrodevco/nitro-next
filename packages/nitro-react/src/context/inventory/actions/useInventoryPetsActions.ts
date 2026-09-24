import { inventoryStore } from '../store/InventoryStore';

const state = inventoryStore.getState();

/**
 * `InventoryPetsSlice`'s view-side actions - picking a pet. The list is asked for and a pet is
 * placed through `inventoryPetsCommands`. Read off the store once: a component using these
 * re-renders for nothing.
 */
const actions = {
    selectPet: state.selectPet,
};

export const useInventoryPetsActions = () => actions;

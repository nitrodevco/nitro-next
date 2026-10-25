/**
 * `InventoryPlacementSlice`'s view-side action - flagging that the room's object mover was asked
 * for from the inventory. Read off the store once: a hook using this re-renders for nothing.
 */
import { inventoryStore } from '../store/InventoryStore';

const state = inventoryStore.getState();

const actions = {
    setInventoryMoverRequested: state.setInventoryMoverRequested,
    setInventoryMoverItemId: state.setInventoryMoverItemId,
};

export const useInventoryPlacementActions = () => actions;

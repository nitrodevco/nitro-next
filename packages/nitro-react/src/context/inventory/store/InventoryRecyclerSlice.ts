/**
 * The inventory's side of the recycler - Flash's `inventory/recycler/RecyclerModel`: whether it
 * runs (`state`, `STATE_ACTIVE` while the catalogue's recycler page is up, which also shows the
 * recycle mark on the furni thumbs - `FurniModel.showRecyclable`) and the items it has locked
 * into the recycler's slots (`_itemList`, by strip id; none while it is stopped).
 */
import { StateCreator } from 'zustand';

/** `RecyclerModel.STATE_READY` / `STATE_ACTIVE`. */
export const INVENTORY_RECYCLER_STATE_READY = 0;
export const INVENTORY_RECYCLER_STATE_ACTIVE = 1;

type State = {
    recyclerState: number;
    recyclerItemIds: readonly number[] | undefined;
};

type Actions = {
    setRecyclerState: (state: number) => void;
    setRecyclerItemIds: (itemIds: readonly number[] | undefined) => void;
};

export const InventoryRecyclerSliceInitialState: State = {
    recyclerState: INVENTORY_RECYCLER_STATE_READY,
    recyclerItemIds: undefined,
};

export type InventoryRecyclerSlice = State & Actions;

export const createInventoryRecyclerSlice: StateCreator<InventoryRecyclerSlice, [], [], InventoryRecyclerSlice> = set => ({
    ...InventoryRecyclerSliceInitialState,
    setRecyclerState: recyclerState => set({ recyclerState }),
    setRecyclerItemIds: recyclerItemIds => set({ recyclerItemIds }),
});

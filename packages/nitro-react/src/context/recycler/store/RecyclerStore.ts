/**
 * The recycler's store - Flash's `catalog/recycler/RecyclerLogic`, one slice (`RecyclerSlice`).
 * An app-wide singleton: the logic is created once by `HabboCatalog` and both the catalogue's
 * recycler page and the inventory (`HabboInventory.recycleSelectedFurni`) reach it, which a store
 * created with the catalogue window would not allow.
 */
import { createStore } from 'zustand';

import { createRecyclerSlice, RecyclerSlice } from './RecyclerSlice';

export type RecyclerStore = RecyclerSlice;

export const createRecyclerStore = () => createStore<RecyclerStore>()((set, get, store) => ({
    ...createRecyclerSlice(set, get, store),
}));

export const recyclerStore = createRecyclerStore();

/**
 * The inventory store - what Flash's `HabboInventory` models keep between packets, one slice
 * each. Only the furni model (`FurniModel`) exists so far: the pets, bots and badges tabs are
 * stubs with no data of their own.
 *
 * An app-wide singleton, like `wiredTradingStore`: the furni list arrives and changes while the
 * inventory window is closed (Flash keeps its models for the whole session), and a window-scoped
 * store would forget it every time the window closes.
 */
import { createStore } from 'zustand';

import { createInventoryFurniSlice, InventoryFurniSlice } from './InventoryFurniSlice';

export type InventoryStore = InventoryFurniSlice;

export const createInventoryStore = () => createStore<InventoryStore>()((set, get, store) => ({
    ...createInventoryFurniSlice(set, get, store),
}));

export const inventoryStore = createInventoryStore();

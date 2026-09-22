/**
 * The inventory store - what Flash's `HabboInventory` models keep between packets, one slice
 * each: the furni model (`FurniModel`) and the badge list of `BadgesModel` that the catalogue's
 * badge display page reads, and the marketplace (`MarketplaceModel`) and recycler
 * (`RecyclerModel`) models the furni page works with. The pets and bots tabs are stubs with no data of their own, and the
 * badges tab draws nothing yet.
 *
 * An app-wide singleton, like `wiredTradingStore`: the furni list arrives and changes while the
 * inventory window is closed (Flash keeps its models for the whole session), and a window-scoped
 * store would forget it every time the window closes.
 */
import { createStore } from 'zustand';

import { createInventoryBadgesSlice, InventoryBadgesSlice } from './InventoryBadgesSlice';
import { createInventoryFurniSlice, InventoryFurniSlice } from './InventoryFurniSlice';
import { createInventoryMarketplaceSlice, InventoryMarketplaceSlice } from './InventoryMarketplaceSlice';
import { createInventoryRecyclerSlice, InventoryRecyclerSlice } from './InventoryRecyclerSlice';

export type InventoryStore = InventoryFurniSlice & InventoryBadgesSlice & InventoryMarketplaceSlice & InventoryRecyclerSlice;

export const createInventoryStore = () => createStore<InventoryStore>()((set, get, store) => ({
    ...createInventoryFurniSlice(set, get, store),
    ...createInventoryBadgesSlice(set, get, store),
    ...createInventoryMarketplaceSlice(set, get, store),
    ...createInventoryRecyclerSlice(set, get, store),
}));

export const inventoryStore = createInventoryStore();

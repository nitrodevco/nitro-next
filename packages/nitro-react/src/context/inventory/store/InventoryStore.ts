/**
 * The inventory store - what Flash's `HabboInventory` models keep between packets, one slice each:
 * the furni model (`FurniModel`) with the filters its page's search box and dropmenus set, the
 * badges (`BadgesModel`), pets (`PetsModel`) and bots (`BotsModel`) the other three tabs draw, the
 * user-to-user trade (`TradingModel`), and the marketplace (`MarketplaceModel`) and recycler
 * (`RecyclerModel`) models the furni page works with, the object mover flag the three placing
 * pages share, and the unseen item tracker (`UnseenItemTracker`) the furni and badge lists and
 * every "new" count read.
 *
 * An app-wide singleton, like `wiredTradingStore`: the furni list arrives and changes while the
 * inventory window is closed (Flash keeps its models for the whole session), a trade may open with
 * the window shut, and a window-scoped store would forget all of it every time the window closes.
 */
import { createStore } from 'zustand';

import { createInventoryBadgesSlice, InventoryBadgesSlice } from './InventoryBadgesSlice';
import { createInventoryBotsSlice, InventoryBotsSlice } from './InventoryBotsSlice';
import { createInventoryFurniFilterSlice, InventoryFurniFilterSlice } from './InventoryFurniFilterSlice';
import { createInventoryFurniSlice, InventoryFurniSlice } from './InventoryFurniSlice';
import { createInventoryMarketplaceSlice, InventoryMarketplaceSlice } from './InventoryMarketplaceSlice';
import { createInventoryPetsSlice, InventoryPetsSlice } from './InventoryPetsSlice';
import { createInventoryPlacementSlice, InventoryPlacementSlice } from './InventoryPlacementSlice';
import { createInventoryRecyclerSlice, InventoryRecyclerSlice } from './InventoryRecyclerSlice';
import { createInventoryTradingSlice, InventoryTradingSlice } from './InventoryTradingSlice';
import { createInventoryUnseenSlice, InventoryUnseenSlice } from './InventoryUnseenSlice';

/**
 * `InventoryMainView.categoryViewId`: the page the window last showed, which the toolbar's click
 * brings back (`onHabboToolbarEvent` toggles that category; a collectibles page toggles furni).
 */
interface InventoryLastPageSlice {
    lastPage: 'furni' | 'pets' | 'bots' | 'badges';
    setLastPage: (lastPage: InventoryLastPageSlice['lastPage']) => void;
}

export type InventoryStore = InventoryLastPageSlice & InventoryFurniSlice & InventoryFurniFilterSlice & InventoryBadgesSlice & InventoryPetsSlice & InventoryBotsSlice & InventoryTradingSlice & InventoryPlacementSlice & InventoryMarketplaceSlice & InventoryRecyclerSlice & InventoryUnseenSlice;

export const createInventoryStore = () => createStore<InventoryStore>()((set, get, store) => ({
    lastPage: 'furni',
    setLastPage: lastPage => set({ lastPage }),
    ...createInventoryFurniSlice(set, get, store),
    ...createInventoryFurniFilterSlice(set, get, store),
    ...createInventoryBadgesSlice(set, get, store),
    ...createInventoryPetsSlice(set, get, store),
    ...createInventoryBotsSlice(set, get, store),
    ...createInventoryTradingSlice(set, get, store),
    ...createInventoryPlacementSlice(set, get, store),
    ...createInventoryMarketplaceSlice(set, get, store),
    ...createInventoryRecyclerSlice(set, get, store),
    ...createInventoryUnseenSlice(set, get, store),
}));

export const inventoryStore = createInventoryStore();

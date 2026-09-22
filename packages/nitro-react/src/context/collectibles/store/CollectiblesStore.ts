/**
 * The collectibles store - what Flash's `catalog/collectibles/CollectiblesController` and the
 * windows it owns keep: the hub (`CollectiblesView`) and its five tabs, the NFT reward box and the
 * purchase confirmation of a token pack or shop offer. One slice each.
 *
 * An app-wide singleton, as the Flash component is: the controller lives as long as the session,
 * the hub is built on the first `collectibles/open` and afterwards only hidden and shown, so it
 * finds its tabs as they were left. Nothing here is per room.
 */
import { createStore } from 'zustand';

import { CollectiblesClaimsSlice, createCollectiblesClaimsSlice } from './CollectiblesClaimsSlice';
import { CollectiblesCollectionsSlice, createCollectiblesCollectionsSlice } from './CollectiblesCollectionsSlice';
import { CollectiblesHubSlice, createCollectiblesHubSlice } from './CollectiblesHubSlice';
import { CollectiblesMintSlice, createCollectiblesMintSlice } from './CollectiblesMintSlice';
import { CollectiblesPurchaseSlice, createCollectiblesPurchaseSlice } from './CollectiblesPurchaseSlice';
import { CollectiblesRewardBoxSlice, createCollectiblesRewardBoxSlice } from './CollectiblesRewardBoxSlice';
import { CollectiblesShopSlice, createCollectiblesShopSlice } from './CollectiblesShopSlice';
import { CollectiblesTransferSlice, createCollectiblesTransferSlice } from './CollectiblesTransferSlice';

export type CollectiblesStore = CollectiblesHubSlice & CollectiblesCollectionsSlice & CollectiblesMintSlice & CollectiblesShopSlice & CollectiblesClaimsSlice & CollectiblesTransferSlice & CollectiblesRewardBoxSlice & CollectiblesPurchaseSlice;

export const createCollectiblesStore = () => createStore<CollectiblesStore>()((set, get, store) => ({
    ...createCollectiblesHubSlice(set, get, store),
    ...createCollectiblesCollectionsSlice(set, get, store),
    ...createCollectiblesMintSlice(set, get, store),
    ...createCollectiblesShopSlice(set, get, store),
    ...createCollectiblesClaimsSlice(set, get, store),
    ...createCollectiblesTransferSlice(set, get, store),
    ...createCollectiblesRewardBoxSlice(set, get, store),
    ...createCollectiblesPurchaseSlice(set, get, store),
}));

export const collectiblesStore = createCollectiblesStore();

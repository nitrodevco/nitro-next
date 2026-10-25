/**
 * The one store of each catalogue type, made the first time it is asked for. Flash has one
 * `HabboCatalog` holding both window states, so what one catalogue knows - the Builders Club
 * membership and furni count - is there for the rest of the client too (`IHabboCatalog.canPlaceWithBC`,
 * which the infostand asks). Each catalogue window's provider (`CatalogContextProvider`) hands out
 * its type's store; anything outside the window reads it here.
 */
import { CatalogTypeEnum } from '@nitrodevco/nitro-api';
import { StoreApi } from 'zustand';

import { CatalogStore, createCatalogStore } from './store';

const catalogStores = new Map<CatalogTypeEnum, StoreApi<CatalogStore>>();

export const getCatalogStore = (catalogType: CatalogTypeEnum): StoreApi<CatalogStore> => {
    let store = catalogStores.get(catalogType);

    if (!store) {
        store = createCatalogStore(catalogType);

        catalogStores.set(catalogType, store);
    }

    return store;
};

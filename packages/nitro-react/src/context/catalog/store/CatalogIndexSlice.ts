/**
 * The catalogue's index and where the user is in it - Flash's `CatalogNavigator` (the node tree
 * `CatalogIndexMessage` builds, the offer -> nodes map, the open path and the unfolded folders),
 * the page a link asked for before the index arrived (`RequestedPage`), and the search result that
 * replaces the navigation list while a search is on (`HabboCatalog.performSearch`).
 */
import { CatalogRequestedPageUtilities, ICatalogNode, ICatalogRequestedPage, ICatalogSearchResult } from '@nitrodevco/nitro-api';
import { StateCreator } from 'zustand';

type State = {
    rootNode: ICatalogNode | undefined;
    /** Every node that lists an offer, by offer id - `CatalogNavigator.getNodesByOfferId`. */
    offersToNodes: Record<number, ICatalogNode[]>;
    /** The path from the tab down to the page being shown; a node is active when it is on it. */
    activeNodes: ICatalogNode[];
    /**
     * The folders that are unfolded in the navigation. Nodes, not page ids: a category that only
     * groups pages has page id -1, so every such folder would share one id.
     */
    openNodes: ICatalogNode[];
    requestedPage: ICatalogRequestedPage;
    searchResult: ICatalogSearchResult | undefined;
    /**
     * `§_-31q§`: `CatalogIndexMessage.newAdditionsAvailable`, cleared the first time the window
     * opens after it, which is when `toggleCatalog` sends `MarkCatalogNewAdditionsPageOpened`.
     */
    newAdditionsAvailable: boolean;
};

type Actions = {
    setRootNode: (rootNode: ICatalogNode | undefined) => void;
    setOffersToNodes: (offersToNodes: Record<number, ICatalogNode[]>) => void;
    setActiveNodes: (activeNodes: ICatalogNode[]) => void;
    setOpenNodes: (openNodes: ICatalogNode[]) => void;
    setRequestedPage: (requestedPage: ICatalogRequestedPage) => void;
    setSearchResult: (searchResult: ICatalogSearchResult | undefined) => void;
    setNewAdditionsAvailable: (newAdditionsAvailable: boolean) => void;
};

export const CatalogIndexSliceInitialState: State = {
    rootNode: undefined,
    offersToNodes: {},
    activeNodes: [],
    openNodes: [],
    requestedPage: CatalogRequestedPageUtilities.getEmpty(),
    searchResult: undefined,
    newAdditionsAvailable: false,
};

export type CatalogIndexSlice = State & Actions;

export const createCatalogIndexSlice: StateCreator<CatalogIndexSlice, [], [], CatalogIndexSlice> = set => ({
    ...CatalogIndexSliceInitialState,
    setRootNode: rootNode => set({ rootNode }),
    setOffersToNodes: offersToNodes => set({ offersToNodes }),
    setActiveNodes: activeNodes => set({ activeNodes }),
    setOpenNodes: openNodes => set({ openNodes }),
    setRequestedPage: requestedPage => set({ requestedPage }),
    setSearchResult: searchResult => set({ searchResult }),
    setNewAdditionsAvailable: newAdditionsAvailable => set({ newAdditionsAvailable }),
});

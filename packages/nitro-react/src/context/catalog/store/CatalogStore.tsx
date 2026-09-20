import { CatalogRequestedPageUtilities, CatalogTypeEnum, IActivePage, ICatalogFrontPageItem, ICatalogNode, ICatalogRequestedPage, ICatalogSearchResult, IPurchasableOffer, IPurchaseOptions } from '@nitrodevco/nitro-api';
import { createStore } from 'zustand';

type State = {
    catalogType: CatalogTypeEnum;
    rootNode: ICatalogNode | undefined;
    offersToNodes: Record<number, ICatalogNode[]>;
    /** The path from the tab down to the page being shown; a node is active when it is on it. */
    activeNodes: ICatalogNode[];
    /** The navigation folders currently unfolded, by page id. */
    /**
     * The folders that are unfolded in the navigation. Nodes, not page ids: a category that only
     * groups pages has page id -1, so every such folder would share one id.
     */
    openNodes: ICatalogNode[];
    isBusy: boolean;
    activePageId: number;
    activePage: IActivePage | undefined;
    activeOffer: IPurchasableOffer | undefined;
    frontPageItems: ICatalogFrontPageItem[];
    requestedPage: ICatalogRequestedPage;
    purchaseOptions: IPurchaseOptions;
    activePurchase: IPurchaseOptions | undefined;
    /**
     * The confirmation dialog is waiting for the server's answer to its `PurchaseFromCatalog`:
     * `PurchaseWindowCtrl`'s locked buy button. Every answer clears it - `PurchaseOKMessage`,
     * `PurchaseErrorMessage`, `PurchaseNotAllowedMessage` and `NotEnoughBalanceMessage` - so a
     * refused purchase can be tried again instead of leaving the button dead.
     */
    isPurchasing: boolean;
    searchResult: ICatalogSearchResult | undefined;
};

type Actions = {
    setRootNode: (rootNode: ICatalogNode) => void;
    setOffersToNodes: (offersToNodes: Record<number, ICatalogNode[]>) => void;
    setActiveNodes: (activeNodes: ICatalogNode[]) => void;
    setOpenNodes: (openNodes: ICatalogNode[]) => void;
    setIsBusy: (isBusy: boolean) => void;
    setActivePageId: (activePageId: number) => void;
    setActivePage: (activePage: IActivePage) => void;
    setActiveOffer: (activeOffer: IPurchasableOffer | undefined) => void;
    setFrontPageItems: (frontPageItems: ICatalogFrontPageItem[]) => void;
    setRequestedPage: (requestedPage: ICatalogRequestedPage) => void;
    setPurchaseOptions: (purchaseOptions: Partial<IPurchaseOptions>) => void;
    setActivePurchase: (activePurchase: IPurchaseOptions | undefined) => void;
    setIsPurchasing: (isPurchasing: boolean) => void;
    setSearchResult: (searchResult: ICatalogSearchResult | undefined) => void;
    resetCatalog: () => void;
};

const initialState: State = {
    catalogType: CatalogTypeEnum.Normal,
    rootNode: undefined,
    offersToNodes: {},
    activeNodes: [],
    openNodes: [],
    isBusy: false,
    activePageId: -1,
    activePage: undefined,
    activeOffer: undefined,
    frontPageItems: [],
    requestedPage: CatalogRequestedPageUtilities.getEmpty(),
    purchaseOptions: { offer: undefined, quantity: 1, extraData: '', extraParamRequired: false, objectData: undefined },
    activePurchase: undefined,
    isPurchasing: false,
    searchResult: undefined,
};

/**
 * The catalog window's own state: the index tree, the active page and offer, and the page a
 * link asked for. Window-scoped: created with the window and dropped when it closes.
 */
export type CatalogStore = State & Actions;

export const createCatalogStore = (catalogType: CatalogTypeEnum) => createStore<CatalogStore>()((set, get, store) => ({
    ...initialState,
    catalogType,
    setRootNode: (rootNode: ICatalogNode | undefined) => set({ rootNode }),
    setOffersToNodes: (offersToNodes: Record<number, ICatalogNode[]>) => set({ offersToNodes }),
    setActiveNodes: (activeNodes: ICatalogNode[]) => set({ activeNodes }),
    setOpenNodes: (openNodes: ICatalogNode[]) => set({ openNodes }),
    setIsBusy: (isBusy: boolean) => set({ isBusy }),
    setActivePageId: (activePageId: number) => set({ activePageId }),
    setActivePage: (activePage: IActivePage | undefined) => set({ activePage }),
    setActiveOffer: (activeOffer: IPurchasableOffer | undefined) => set({ activeOffer, purchaseOptions: { offer: activeOffer, quantity: 1, extraData: '', extraParamRequired: false, objectData: undefined } }),
    setFrontPageItems: (frontPageItems: ICatalogFrontPageItem[]) => set({ frontPageItems }),
    setRequestedPage: (requestedPage: ICatalogRequestedPage) => set({ requestedPage }),
    setPurchaseOptions: (purchaseOptions: Partial<IPurchaseOptions>) => set(x => ({ purchaseOptions: { ...x.purchaseOptions, ...purchaseOptions } })),
    setActivePurchase: (activePurchase: IPurchaseOptions) => set({ activePurchase, isPurchasing: false }),
    setIsPurchasing: (isPurchasing: boolean) => set({ isPurchasing }),
    setSearchResult: (searchResult: ICatalogSearchResult | undefined) => set({ searchResult }),
    resetCatalog: () => set({ ...initialState, catalogType }),
}));

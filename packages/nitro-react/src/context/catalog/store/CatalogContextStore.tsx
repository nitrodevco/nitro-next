import { CatalogRequestedPageUtilities, CatalogTypeEnum, IActivePage, ICatalogFrontPageItem, ICatalogNode, ICatalogRequestedPage, ICatalogSearchResult, IPurchasableOffer, IPurchaseOptions } from '@nitrodevco/nitro-api';
import { createStore } from 'zustand';

type State = {
    catalogType: CatalogTypeEnum;
    rootNode: ICatalogNode | undefined;
    offersToNodes: Record<number, ICatalogNode[]>;
    activeNodes: ICatalogNode[];
    isBusy: boolean;
    activePageId: number;
    activePage: IActivePage | undefined;
    activeOffer: IPurchasableOffer | undefined;
    frontPageItems: ICatalogFrontPageItem[];
    requestedPage: ICatalogRequestedPage;
    purchaseOptions: IPurchaseOptions;
    activePurchase: IPurchaseOptions | undefined;
    searchResult: ICatalogSearchResult | undefined;
};

type Actions = {
    setRootNode: (rootNode: ICatalogNode) => void;
    setOffersToNodes: (offersToNodes: Record<number, ICatalogNode[]>) => void;
    setActiveNodes: (activeNodes: ICatalogNode[]) => void;
    setIsBusy: (isBusy: boolean) => void;
    setActivePageId: (activePageId: number) => void;
    setActivePage: (activePage: IActivePage) => void;
    setActiveOffer: (activeOffer: IPurchasableOffer | undefined) => void;
    setFrontPageItems: (frontPageItems: ICatalogFrontPageItem[]) => void;
    setRequestedPage: (requestedPage: ICatalogRequestedPage) => void;
    setPurchaseOptions: (purchaseOptions: Partial<IPurchaseOptions>) => void;
    setActivePurchase: (activePurchase: IPurchaseOptions | undefined) => void;
    setSearchResult: (searchResult: ICatalogSearchResult | undefined) => void;
    resetCatalog: () => void;
};

const initialState: State = {
    catalogType: CatalogTypeEnum.Normal,
    rootNode: undefined,
    offersToNodes: {},
    activeNodes: [],
    isBusy: false,
    activePageId: -1,
    activePage: undefined,
    activeOffer: undefined,
    frontPageItems: [],
    requestedPage: CatalogRequestedPageUtilities.getEmpty(),
    purchaseOptions: { offer: undefined, quantity: 1, extraData: '', extraParamRequired: false, objectData: undefined },
    activePurchase: undefined,
    searchResult: undefined,
};

export type CatalogContextStore = State & Actions;

export const createCatalogContextStore = (catalogType: CatalogTypeEnum) => createStore<CatalogContextStore>()((set, get, store) => ({
    ...initialState,
    catalogType,
    setRootNode: (rootNode: ICatalogNode | undefined) => set({ rootNode }),
    setOffersToNodes: (offersToNodes: Record<number, ICatalogNode[]>) => set({ offersToNodes }),
    setActiveNodes: (activeNodes: ICatalogNode[]) => set({ activeNodes }),
    setIsBusy: (isBusy: boolean) => set({ isBusy }),
    setActivePageId: (activePageId: number) => set({ activePageId }),
    setActivePage: (activePage: IActivePage | undefined) => set({ activePage }),
    setActiveOffer: (activeOffer: IPurchasableOffer | undefined) => set({ activeOffer, purchaseOptions: { offer: activeOffer, quantity: 1, extraData: '', extraParamRequired: false, objectData: undefined } }),
    setFrontPageItems: (frontPageItems: ICatalogFrontPageItem[]) => set({ frontPageItems }),
    setRequestedPage: (requestedPage: ICatalogRequestedPage) => set({ requestedPage }),
    setPurchaseOptions: (purchaseOptions: Partial<IPurchaseOptions>) => set(x => ({ purchaseOptions: { ...x.purchaseOptions, ...purchaseOptions } })),
    setActivePurchase: (activePurchase: IPurchaseOptions) => set({ activePurchase }),
    setSearchResult: (searchResult: ICatalogSearchResult | undefined) => set({ searchResult }),
    resetCatalog: () => set({ ...initialState, catalogType }),
}));

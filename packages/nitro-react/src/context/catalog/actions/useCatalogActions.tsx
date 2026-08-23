import { useShallow } from 'zustand/shallow';

import { useCatalogContext } from '../useCatalogContext';

export const useCatalogActions = () => useCatalogContext(useShallow(x => ({
    setRootNode: x.setRootNode,
    setOffersToNodes: x.setOffersToNodes,
    setActiveNodes: x.setActiveNodes,
    setIsBusy: x.setIsBusy,
    setActivePageId: x.setActivePageId,
    setActivePage: x.setActivePage,
    setActiveOffer: x.setActiveOffer,
    setFrontPageItems: x.setFrontPageItems,
    setRequestedPage: x.setRequestedPage,
    setPurchaseOptions: x.setPurchaseOptions,
    setActivePurchase: x.setActivePurchase,
    setSearchResult: x.setSearchResult,
    resetCatalog: x.resetCatalog,
})));

import { useCatalogStoreApi } from '../useCatalogStoreApi';

/**
 * Zustand actions are created once and never change, so they are read off the store rather than
 * subscribed to: a component using these re-renders for nothing.
 */
export const useCatalogActions = () => {
    const state = useCatalogStoreApi().getState();

    return {
        setRootNode: state.setRootNode,
        setOffersToNodes: state.setOffersToNodes,
        setActiveNodes: state.setActiveNodes,
        setIsBusy: state.setIsBusy,
        setActivePageId: state.setActivePageId,
        setActivePage: state.setActivePage,
        setActiveOffer: state.setActiveOffer,
        setFrontPageItems: state.setFrontPageItems,
        setRequestedPage: state.setRequestedPage,
        setPurchaseOptions: state.setPurchaseOptions,
        setActivePurchase: state.setActivePurchase,
        setSearchResult: state.setSearchResult,
        resetCatalog: state.resetCatalog,
    };
};

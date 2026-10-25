import { useCatalogStoreApi } from '../useCatalogStoreApi';

/**
 * The catalogue store's actions, every slice's. Zustand actions are created once and never
 * change, so they are read off the store rather than subscribed to: a component using these
 * re-renders for nothing.
 */
export const useCatalogActions = () => {
    const state = useCatalogStoreApi().getState();

    return {
        setRootNode: state.setRootNode,
        setOffersToNodes: state.setOffersToNodes,
        setActiveNodes: state.setActiveNodes,
        setOpenNodes: state.setOpenNodes,
        setRequestedPage: state.setRequestedPage,
        setSearchResult: state.setSearchResult,
        setIsBusy: state.setIsBusy,
        setActivePageId: state.setActivePageId,
        setActivePage: state.setActivePage,
        setForceRefresh: state.setForceRefresh,
        setFrontPageItems: state.setFrontPageItems,
        setActivePurchase: state.setActivePurchase,
        setIsPurchasing: state.setIsPurchasing,
        resetCatalog: state.resetCatalog,
    };
};

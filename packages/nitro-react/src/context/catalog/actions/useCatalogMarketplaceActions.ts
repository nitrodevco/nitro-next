import { useCatalogStoreApi } from '../useCatalogStoreApi';

/**
 * `CatalogMarketplaceSlice`'s actions, read off the store once (they never change). The marketplace
 * widgets and the purchase confirmation talk to the server through
 * `commands/catalogMarketplaceCommands`; what they set themselves is the dialog on show.
 */
export const useCatalogMarketplaceActions = () => {
    const state = useCatalogStoreApi().getState();

    return {
        setMarketplaceOffers: state.setMarketplaceOffers,
        updateMarketplaceOffers: state.updateMarketplaceOffers,
        setMarketplaceOwnOffers: state.setMarketplaceOwnOffers,
        removeMarketplaceOwnOffers: state.removeMarketplaceOwnOffers,
        setMarketplaceOwnOffersCategory: state.setMarketplaceOwnOffersCategory,
        setMarketplacePendingClearCategory: state.setMarketplacePendingClearCategory,
        setMarketplaceAveragePricePeriod: state.setMarketplaceAveragePricePeriod,
        setMarketplaceStatsRequest: state.setMarketplaceStatsRequest,
        setMarketplaceItemStats: state.setMarketplaceItemStats,
        setMarketplaceSearch: state.setMarketplaceSearch,
        setMarketplaceConfirmation: state.setMarketplaceConfirmation,
    };
};

import { inventoryStore } from '../store/InventoryStore';

const state = inventoryStore.getState();

/**
 * `InventoryMarketplaceSlice`'s setters. Making an offer talks to the server and goes through
 * `inventoryMarketplaceCommands`; the dialogs read the slice. Read off the store once: a
 * component using these re-renders for nothing.
 */
const actions = {
    setMarketplaceConfiguration: state.setMarketplaceConfiguration,
    setMarketplaceOfferGroupId: state.setMarketplaceOfferGroupId,
    setMarketplaceOfferItems: state.setMarketplaceOfferItems,
    setMarketplaceBuyingTokens: state.setMarketplaceBuyingTokens,
    setMarketplaceStatsRequest: state.setMarketplaceStatsRequest,
    setMarketplaceView: state.setMarketplaceView,
    setMarketplaceViewStats: state.setMarketplaceViewStats,
};

export const useInventoryMarketplaceActions = () => actions;

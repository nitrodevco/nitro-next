import { useCatalogStoreApi } from '../useCatalogStoreApi';

/**
 * The purchase flow's store actions a view may call itself: the purchase widget recording what it
 * would buy with (`CatalogPurchaseSlice.purchaseWidgetState`). Everything that talks to the server
 * or opens a dialog goes through `commands/catalogPurchaseFlowCommands`. Read off the store once:
 * a component using these re-renders for nothing.
 */
export const useCatalogPurchaseActions = () => {
    const state = useCatalogStoreApi().getState();

    return {
        setPurchaseWidgetState: state.setPurchaseWidgetState,
    };
};

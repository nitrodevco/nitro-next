import { useCatalogStoreApi } from '../useCatalogStoreApi';

/**
 * `CatalogRoomAdSlice`'s actions, read off the store once (they never change), so a component
 * using them re-renders for nothing - the room ads widget writes the purchase data as the user
 * types and picks, and clears it after a purchase.
 */
export const useCatalogRoomAdActions = () => {
    const state = useCatalogStoreApi().getState();

    return {
        setRoomAdPurchaseData: state.setRoomAdPurchaseData,
        updateRoomAdPurchaseData: state.updateRoomAdPurchaseData,
        clearRoomAdPurchaseData: state.clearRoomAdPurchaseData,
        setRoomAdPurchaseInfo: state.setRoomAdPurchaseInfo,
    };
};

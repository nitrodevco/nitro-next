import { useCatalogStoreApi } from '../useCatalogStoreApi';

/**
 * `CatalogBundleDiscountSlice`'s actions, read off the store once (they never change), so a
 * component using them re-renders for nothing.
 */
export const useCatalogBundleDiscountActions = () => {
    const state = useCatalogStoreApi().getState();

    return {
        setBundleDiscountRuleset: state.setBundleDiscountRuleset,
    };
};

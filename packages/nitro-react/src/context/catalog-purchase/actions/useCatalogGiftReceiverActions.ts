/**
 * `CatalogGiftReceiverSlice`'s view-side action - naming who a gift goes to, which the present
 * widgets do when the user replies to one. Read off the store once: a component using this
 * re-renders for nothing.
 */
import { catalogPurchaseStore } from '../store/CatalogPurchaseStore';

const state = catalogPurchaseStore.getState();

const actions = {
    setGiftReceiver: state.setGiftReceiver,
};

export const useCatalogGiftReceiverActions = () => actions;

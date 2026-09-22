/**
 * The catalogue's marketplace calls - the public methods of Flash's
 * `catalog/marketplace/MarketPlaceLogic` and the `HabboCatalog` senders they go through
 * (`getPublicMarketPlaceOffers`, `getOwnMarketPlaceOffers`, `buyMarketPlaceOffer`,
 * `redeemExpiredMarketPlaceOffer`, `cancelAllMarketPlaceOffers`, `clearOwnMarketPlaceHistory`,
 * `getMarketplaceItemStats`). Each takes the window's catalogue store, which holds the logic's
 * state (`CatalogMarketplaceSlice`); the answers come back through
 * `handlers/catalog/registerCatalogMarketplaceHandlers`.
 *
 * `HabboCatalog.redeemSoldMarketPlaceOffers` (`RedeemMarketplaceOfferCreditsMessageComposer`) is
 * not here: nothing in this revision of the client calls it - the own items page has no redeem
 * button, and a sold offer's credits are paid out by the server.
 */
import { BuyMarketplaceOfferComposer, CancelAllMarketplaceOffersComposer, CancelMarketplaceOfferComposer, ClearMarketplaceOwnHistoryComposer, GetMarketplaceItemStatsComposer, GetMarketplaceOffersComposer, GetMarketplaceOwnOffersComposer } from '@nitrodevco/nitro-packets';
import { StoreApi } from 'zustand';

import { CatalogStore } from '#base/context/catalog';
import { WebSocketConnection } from '#base/context/communication';
import { systemStore } from '#base/context/system';
import { userStore } from '#base/context/user';
import { isMarketplaceOwnCategoryClearable, isMarketplacePosterItem, MARKETPLACE_OWN_CATEGORY_OPEN, MARKETPLACE_PURCHASE_CONFIRM_TYPE_NORMAL, MarketplaceOfferData, resolveMarketplaceStatsCategory } from '#base/utils';

type Send = WebSocketConnection['send'];
type CatalogStoreApi = StoreApi<CatalogStore>;

/** `MarketPlaceLogic.requestOffers`: the search is kept for `refreshOffers`, then sent. */
export const requestMarketplaceOffers = (send: Send, store: CatalogStoreApi, minPrice: number, maxPrice: number, searchString: string, sortType: number, combineUniques: boolean = true) => {
    store.getState().setMarketplaceSearch({ minPrice, maxPrice, searchString, sortType, combineUniques });

    send(new GetMarketplaceOffersComposer({ minPrice, maxPrice, searchString, sortType, combineUniques }));
};

/** `MarketPlaceLogic.refreshOffers`: the last search again. */
export const refreshMarketplaceOffers = (send: Send, store: CatalogStoreApi) => {
    const { minPrice, maxPrice, searchString, sortType, combineUniques } = store.getState().marketplaceSearch;

    requestMarketplaceOffers(send, store, minPrice, maxPrice, searchString, sortType, combineUniques);
};

/** `MarketPlaceLogic.requestOwnItems`: the own offers of one category. */
export const requestMarketplaceOwnItems = (send: Send, store: CatalogStoreApi, category: number = MARKETPLACE_OWN_CATEGORY_OPEN) => {
    store.getState().setMarketplaceOwnOffersCategory(category);

    send(new GetMarketplaceOwnOffersComposer({ category }));
};

/** `MarketPlaceLogic.requestItemStats`: which furni the answer is for is kept, and a poster sends its poster id. */
export const requestMarketplaceItemStats = (send: Send, store: CatalogStoreApi, offer: MarketplaceOfferData) => {
    const category = resolveMarketplaceStatsCategory(offer);
    const extraData = isMarketplacePosterItem(offer, systemStore.getState().wallItems) ? offer.extraData : undefined;

    store.getState().setMarketplaceStatsRequest(category, offer.furniId);

    send(new GetMarketplaceItemStatsComposer({ category, furniTypeId: offer.furniId, extraData }));
};

/**
 * `HabboCatalog.showNotEnoughCreditsAlert`. Flash asks whether to open the web shop; this client
 * has no shop to open, so it is the alert with the same texts - as `registerCatalogHandlers`
 * answers `NotEnoughBalanceMessage`.
 */
export const showMarketplaceNotEnoughCreditsAlert = () => {
    const { getLocalizationValue, showAlert } = systemStore.getState();

    showAlert(getLocalizationValue('catalog.alert.notenough.title'), getLocalizationValue('catalog.alert.notenough.credits.description'));
};

/** `MarketPlaceLogic.buyOffer`: a held offer the purse can pay for opens the purchase confirmation. */
export const buyMarketplaceOffer = (store: CatalogStoreApi, offerId: number) => {
    const { marketplaceOffers, setMarketplaceConfirmation } = store.getState();

    if (!marketplaceOffers) return;

    const offer = marketplaceOffers.find(held => held.offerId === offerId);

    if (!offer) return;

    if (userStore.getState().credits < offer.price) {
        showMarketplaceNotEnoughCreditsAlert();

        return;
    }

    setMarketplaceConfirmation({ type: MARKETPLACE_PURCHASE_CONFIRM_TYPE_NORMAL, offer });
};

/** `HabboCatalog.buyMarketPlaceOffer` - the purchase confirmation's buy button. */
export const confirmMarketplacePurchase = (send: Send, offerId: number) => send(new BuyMarketplaceOfferComposer({ offerId }));

/** `MarketPlaceLogic.redeemExpiredOffer`: an own offer is taken back (`CancelMarketplaceOfferMessageComposer`). */
export const redeemExpiredMarketplaceOffer = (send: Send, offerId: number) => send(new CancelMarketplaceOfferComposer({ offerId }));

/** `MarketPlaceLogic.recallAllOffers`. */
export const recallAllMarketplaceOffers = (send: Send) => send(new CancelAllMarketplaceOffersComposer({}));

/** `MarketPlaceLogic.clearOwnHistory`: only a sold or expired category; the answer clears the list if it is still that one. */
export const clearMarketplaceOwnHistory = (send: Send, store: CatalogStoreApi, category: number) => {
    if (!isMarketplaceOwnCategoryClearable(category)) return;

    store.getState().setMarketplacePendingClearCategory(category);

    send(new ClearMarketplaceOwnHistoryComposer({ category }));
};

/** `MarketPlaceLogic.isAccountSafetyLocked`. */
export const isMarketplaceAccountSafetyLocked = () => userStore.getState().accountSafetyLocked;

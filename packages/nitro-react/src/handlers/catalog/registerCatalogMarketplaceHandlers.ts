/**
 * The marketplace packets `HabboCatalog` listens to and hands to its `MarketPlaceLogic`
 * (`onMarketPlaceOffers` ... `onMarketplaceMakeOfferResult`), writing the window's
 * `CatalogMarketplaceSlice`:
 *
 * - `MarketPlaceOffersMessage` / `MarketPlaceOwnOffersMessage`: `onOffers` / `onOwnOffers` - the
 *   held list is replaced and the widgets told (`listUpdatedNotify`).
 * - `MarketplaceBuyOfferResultMessage`: `onBuyResult` - 1 bought (the search is repeated), 2 gone
 *   (dropped from the list, with an alert), 3 the price went up (the offer comes back under its
 *   new id and price at the end of the list, one fewer on offer, and the confirmation opens again
 *   with the "higher" header - Flash's `Map.add` refuses a key it holds, so an offer that keeps
 *   its id is dropped instead), 4 not enough credits.
 * - `MarketplaceCancelOfferResultMessage`, `MarketplaceCancelAllOffersResultMessage`,
 *   `MarketplaceClearOwnHistoryResultMessage`: the own offers taken back or marked seen leave the
 *   list (`removeOfferIds`), or an alert says it failed. A clear only empties the list when it is
 *   still the category it was asked for.
 * - `MarketplaceItemStatsMessage`: kept only when it is about the furni last asked about.
 * - `MarketplaceConfigurationMessage`: the average price period the texts name.
 * - `MarketplaceMakeOfferResultMessage`: a new offer of one's own makes the catalogue repeat its
 *   last search (the inventory answers the same packet for its own dialog).
 */
import { MarketplaceBuyOfferResultMessage, MarketplaceCancelAllOffersResultMessage, MarketplaceCancelOfferResultMessage, MarketplaceClearOwnHistoryResultMessage, MarketplaceConfigurationMessage, MarketplaceItemStatsMessage, MarketplaceMakeOfferResultMessage, MarketPlaceOffersMessage, MarketPlaceOwnOffersMessage } from '@nitrodevco/nitro-packets';
import { StoreApi } from 'zustand';

import { refreshMarketplaceOffers } from '#base/commands';
import { CatalogStore } from '#base/context/catalog';
import { WebSocketConnection } from '#base/context/communication';
import { systemStore } from '#base/context/system';
import { createMarketplaceItemStats, createMarketplaceOfferData, MARKETPLACE_PURCHASE_CONFIRM_TYPE_HIGHER } from '#base/utils';

import { on, subscribeAll } from '../packetSubscriptions';

/** `MarketplaceBuyOfferResultEvent`'s results. */
const BUY_RESULT_OK = 1;
const BUY_RESULT_NOT_AVAILABLE = 2;
const BUY_RESULT_PRICE_CHANGED = 3;
const BUY_RESULT_NOT_ENOUGH_CREDITS = 4;

/** `MarketplaceMakeOfferResult`'s success. */
const MAKE_OFFER_RESULT_OK = 1;

export const registerCatalogMarketplaceHandlers = (store: StoreApi<CatalogStore>, { send, subscribe }: WebSocketConnection) => {
    const {
        setMarketplaceOffers, updateMarketplaceOffers, setMarketplaceOwnOffers, removeMarketplaceOwnOffers, setMarketplacePendingClearCategory,
        setMarketplaceAveragePricePeriod, setMarketplaceItemStats, setMarketplaceConfirmation,
    } = store.getState();

    const alert = (title: string, message: string) => {
        const { getLocalizationValue, showAlert } = systemStore.getState();

        showAlert(getLocalizationValue(title), getLocalizationValue(message));
    };

    return subscribeAll(subscribe, [
        on(MarketPlaceOffersMessage, data => setMarketplaceOffers(data.offers.map(offer => createMarketplaceOfferData(offer, false)), data.totalItemsFound)),

        on(MarketPlaceOwnOffersMessage, data => setMarketplaceOwnOffers(data.offers.map(offer => createMarketplaceOfferData(offer, true)), data.creditsWaiting)),

        on(MarketplaceBuyOfferResultMessage, (data) => {
            const offers = store.getState().marketplaceOffers;

            switch (data.result) {
                case BUY_RESULT_OK:
                    refreshMarketplaceOffers(send, store);

                    return;
                case BUY_RESULT_NOT_AVAILABLE:
                    if (offers) updateMarketplaceOffers(offers.filter(offer => offer.offerId !== data.requestedOfferId));

                    alert('catalog.marketplace.not_available_title', 'catalog.marketplace.not_available_header');

                    return;
                case BUY_RESULT_PRICE_CHANGED: {
                    if (!offers) return;

                    const held = offers.find(offer => offer.offerId === data.requestedOfferId);
                    const updated = held ? { ...held, offerId: data.offerId, price: data.newPrice, offerCount: held.offerCount - 1 } : undefined;
                    let next = offers;

                    if (updated && !offers.some(offer => offer.offerId === data.offerId)) next = [ ...next, updated ];

                    next = next.filter(offer => offer !== held);

                    if (updated) setMarketplaceConfirmation({ type: MARKETPLACE_PURCHASE_CONFIRM_TYPE_HIGHER, offer: updated });

                    updateMarketplaceOffers(next);

                    return;
                }
                case BUY_RESULT_NOT_ENOUGH_CREDITS:
                    alert('catalog.alert.notenough.title', 'catalog.alert.notenough.credits.description');

                    return;
            }
        }),

        on(MarketplaceCancelOfferResultMessage, (data) => {
            if (data.success) removeMarketplaceOwnOffers([ data.offerId ]);
            else alert('catalog.marketplace.operation_failed.topic', 'catalog.marketplace.cancel_failed');
        }),

        on(MarketplaceCancelAllOffersResultMessage, (data) => {
            if (data.success) removeMarketplaceOwnOffers(data.offerIds);
            else alert('catalog.marketplace.operation_failed.topic', 'shop.marketplace.recall.failed');
        }),

        on(MarketplaceClearOwnHistoryResultMessage, (data) => {
            const { marketplacePendingClearCategory, marketplaceOwnOffersCategory, marketplaceOwnOffers } = store.getState();

            setMarketplacePendingClearCategory(0);

            if (!data.success) {
                alert('catalog.marketplace.operation_failed.topic', 'shop.marketplace.mark.as.seen.failed');

                return;
            }

            if ((marketplacePendingClearCategory !== marketplaceOwnOffersCategory) || !marketplaceOwnOffers) return;

            removeMarketplaceOwnOffers(marketplaceOwnOffers.map(offer => offer.offerId));
        }),

        on(MarketplaceItemStatsMessage, (data) => {
            const { marketplaceStatsCategory, marketplaceStatsFurniTypeId } = store.getState();

            if ((data.furniCategoryId !== marketplaceStatsCategory) || (data.furniTypeId !== marketplaceStatsFurniTypeId)) return;

            setMarketplaceItemStats(createMarketplaceItemStats(data));
        }),

        on(MarketplaceConfigurationMessage, data => setMarketplaceAveragePricePeriod(data.averagePricePeriod)),

        on(MarketplaceMakeOfferResultMessage, (data) => {
            if (data.result === MAKE_OFFER_RESULT_OK) refreshMarketplaceOffers(send, store);
        }),
    ]);
};

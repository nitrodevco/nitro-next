/**
 * `HabboCatalog.buySnowWarTokensOffer` -> `showPurchaseConfirmation(offer, -1, localizationId)` for
 * a `GameTokensOffer`: the offer `buySnowWarTokensOffer` leaves in the app-wide `gameTokensStore`
 * opens the normal catalogue's purchase confirmation, whose store is window-scoped. Not a packet
 * listener: it returns the store subscription's unsubscribe, and the catalogue window registers it
 * with its packet handlers (`CatalogComponent`).
 */
import { StoreApi } from 'zustand';

import { showGameTokensPurchaseConfirmation } from '#base/commands';
import { CatalogStore } from '#base/context/catalog';
import { gameTokensStore } from '#base/context/game-tokens';

export const bridgeGameTokensPurchaseConfirmation = (store: StoreApi<CatalogStore>) => gameTokensStore.subscribe((state) => {
    const offer = state.confirmationRequest;

    if (!offer) return;

    state.setConfirmationRequest(undefined);
    showGameTokensPurchaseConfirmation(store, offer);
});

/**
 * `HabboCatalog`'s snowwar game token purchase: `buySnowWarTokensOffer` and
 * `purchaseGameTokensOffer`, against the offers `gameTokensStore` keeps.
 *
 * In Flash `buySnowWarTokensOffer` is called by the games UI (`GamesMainViewController`'s three
 * buy buttons and `SnowWarEngine`) and hands a known offer to `showPurchaseConfirmation(offer,
 * -1, localizationId)`, whose `PurchaseConfirmationDialog` skips the credit checks for a
 * `GameTokensOffer` and, on buy, calls `purchaseGameTokensOffer(localizationId)`. The catalogue's
 * dialog lives in its window-scoped store, so the offer is left in `gameTokensStore` and the
 * catalogue opens it (`bridgeGameTokensPurchaseConfirmation` ->
 * `showGameTokensPurchaseConfirmation`). The games UI is not ported, so nothing calls
 * `buySnowWarTokensOffer` yet.
 */
import { GetSnowWarGameTokensOfferComposer, PurchaseSnowWarGameTokensOfferComposer } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { gameTokensStore } from '#base/context/game-tokens';

type Send = WebSocketConnection['send'];

/**
 * `buySnowWarTokensOffer(localizationId)`: a known offer goes to the purchase confirmation; an
 * unknown one asks the server for the offers (`GetSnowWarGameTokensOfferComposer`) instead.
 */
export const buySnowWarTokensOffer = (send: Send, localizationId: string) => {
    const { offers, setConfirmationRequest } = gameTokensStore.getState();
    const offer = offers[localizationId];

    if (offer) {
        setConfirmationRequest(offer);

        return;
    }

    send(new GetSnowWarGameTokensOfferComposer({}));
};

/** `purchaseGameTokensOffer(localizationId)`: buys a known offer; an unknown id sends nothing. */
export const purchaseGameTokensOffer = (send: Send, localizationId: string) => {
    const offer = gameTokensStore.getState().offers[localizationId];

    if (!offer) return;

    send(new PurchaseSnowWarGameTokensOfferComposer({ offerId: offer.offerId }));
};

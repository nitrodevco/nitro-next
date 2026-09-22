/**
 * What the targeted offer views do - the public methods of Flash's
 * `catalog/targetedoffers/OfferController`: `minimizeOffer`, `maximizeOffer`,
 * `purchaseTargetedOffer`, `showConfirmation`, `destroyView`, `purchaseCredits` and
 * `sendLogEvent`. Each sends the packet Flash sends there and writes `targetedOfferStore`.
 *
 * `purchaseCredits` is Flash's log event and `HabboCatalog.openCreditsHabblet`, which opens
 * `web.shop.relativeUrl` under the hotel's web root (`HabboWebTools.openWebPageAndMinimizeClient`).
 * The port has no hotel web page to open it under - the client is served from its own origin,
 * as `onNotEnoughBalance` in `registerCatalogHandlers` notes - so only the log event is sent.
 */
import { EventLogComposer, PurchaseTargetedOfferComposer, SetTargetedOfferStateComposer } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { systemStore } from '#base/context/system';
import {
    isTargetedOfferExpired, purchasedTargetedOffer, TARGETED_OFFER_DIALOG_LAYOUT, TARGETED_OFFER_DIALOG_VARIATION_LAYOUT, TARGETED_OFFER_STATE_MAXIMIZED, TARGETED_OFFER_STATE_MINIMIZED, TargetedOffer, targetedOfferStore,
} from '#base/context/targeted-offers';

type Send = WebSocketConnection['send'];

/** `§_-u1N§.TARGETED_OFFER_OPEN_CREDITS_PAGE_CLICKED`. */
export const TARGETED_OFFER_OPEN_CREDITS_PAGE_CLICKED = 'targeted.offer.open.credits.page.clicked';

/** `destroyView`: whichever view is up goes, and the offer with it. */
export const destroyTargetedOfferView = () => {
    const { hideView, setOffer } = targetedOfferStore.getState();

    hideView();
    setOffer(null);
};

/** `minimizeOffer`: the offer docks in the toolbar's extension column. */
export const minimizeTargetedOffer = (send: Send, offer: TargetedOffer) => {
    const { showMinimizedView, setOffer } = targetedOfferStore.getState();

    destroyTargetedOfferView();
    setOffer(offer);
    showMinimizedView();

    send(new SetTargetedOfferStateComposer({ targetedOfferId: offer.id, trackingState: TARGETED_OFFER_STATE_MINIMIZED }));
};

/**
 * `maximizeOffer`: nothing while the dialog is up; otherwise the view that is up goes and, unless
 * the offer has run out, the dialog is built from `getLayoutOverride` - the layout
 * `targeted.offer.override.layout.<id>` names when the catalogue has that asset, else the default.
 * The variation is the only other dialog layout the catalogue carries.
 */
export const maximizeTargetedOffer = (send: Send, offer: TargetedOffer) => {
    const { view, showDialogView, setOffer } = targetedOfferStore.getState();

    if (view === 'dialog') return;

    destroyTargetedOfferView();

    if (isTargetedOfferExpired(offer, performance.now())) return;

    const override = systemStore.getState().config[`targeted.offer.override.layout.${offer.id}`];

    setOffer(offer);
    showDialogView((override === TARGETED_OFFER_DIALOG_VARIATION_LAYOUT) ? TARGETED_OFFER_DIALOG_VARIATION_LAYOUT : TARGETED_OFFER_DIALOG_LAYOUT);

    send(new SetTargetedOfferStateComposer({ targetedOfferId: offer.id, trackingState: TARGETED_OFFER_STATE_MAXIMIZED }));
};

/** `showConfirmation`: nothing while the confirmation is up; otherwise it replaces the view that is. */
export const showTargetedOfferConfirmation = (offer: TargetedOffer, quantity: number) => {
    const { view, showConfirmationView, setOffer } = targetedOfferStore.getState();

    if (view === 'confirmation') return;

    destroyTargetedOfferView();
    setOffer(offer);
    showConfirmationView(quantity);
};

/** `purchaseTargetedOffer`: bought, counted off the limit, and minimized while any are left. */
export const purchaseTargetedOffer = (send: Send, offer: TargetedOffer, quantity: number) => {
    send(new PurchaseTargetedOfferComposer({ offerId: offer.id, quantity }));

    const purchased = purchasedTargetedOffer(offer, quantity);

    if (purchased.purchaseLimit > 0) minimizeTargetedOffer(send, purchased);
    else destroyTargetedOfferView();
};

/** `sendLogEvent`: `EventLogMessageComposer("TargetedOffers", "FLASH.UNKNOWN", action, extra)`. */
export const sendTargetedOfferLogEvent = (send: Send, action: string, extra: string = '') =>
    send(new EventLogComposer({ event: 'TargetedOffers', data: 'FLASH.UNKNOWN', action, extraString: extra, extraInt: 0 }));

/** `purchaseCredits` - the log event; see the docblock for the web shop it cannot open. */
export const purchaseTargetedOfferCredits = (send: Send, offer: TargetedOffer) =>
    sendTargetedOfferLogEvent(send, TARGETED_OFFER_OPEN_CREDITS_PAGE_CLICKED, offer.identifier);

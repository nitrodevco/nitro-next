/**
 * What the targeted offer views do - the public methods of Flash's
 * `catalog/targetedoffers/OfferController`: `minimizeOffer`, `maximizeOffer`,
 * `purchaseTargetedOffer`, `showConfirmation`, `destroyView`, `purchaseCredits` and
 * `sendLogEvent`, and for a Habbo Mall offer `onHabboMallOffer`, `maximizeMallOffer`,
 * `minimizeMallOffer`, `onHabboMallOfferOpened` and `onHabboMallOfferClosed`. Each sends the packet
 * Flash sends there and writes `targetedOfferStore`.
 *
 * `purchaseCredits` and `onHabboMallOfferOpened` open the web shop with `openCreditsHabblet`.
 */
import { EventLogComposer, PurchaseTargetedOfferComposer, SetTargetedOfferStateComposer, ShopTargetedOfferViewedComposer } from '@nitrodevco/nitro-packets';

import { Send } from '#base/context/communication';
import { configString } from '#base/context/system';
import {
    HabboMallOffer, isTargetedOfferExpired, purchasedTargetedOffer, TARGETED_OFFER_DIALOG_LAYOUT, TARGETED_OFFER_DIALOG_VARIATION_LAYOUT, TARGETED_OFFER_STATE_MAXIMIZED, TARGETED_OFFER_STATE_MINIMIZED,
    TARGETED_OFFER_STATE_PREVIEWED, TARGETED_OFFER_STATE_REJECTED, TARGETED_OFFER_STATE_SELECTED, TargetedOffer, targetedOfferStore,
} from '#base/context/targeted-offers';

import { openCreditsHabblet } from './catalogClubCommands';

/** `§_-u1N§.TARGETED_OFFER_OPEN_CREDITS_PAGE_CLICKED`. */
export const TARGETED_OFFER_OPEN_CREDITS_PAGE_CLICKED = 'targeted.offer.open.credits.page.clicked';

/** `destroyView`: whichever view is up goes, and the offer with it. */
export const destroyTargetedOfferView = () => {
    const { hideView, setOffer, setMallOffer } = targetedOfferStore.getState();

    hideView();
    setOffer(null);
    setMallOffer(null);
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

    const override = configString(`targeted.offer.override.layout.${offer.id}`);

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

/** `purchaseCredits`: the log event, and the web shop. */
export const purchaseTargetedOfferCredits = (send: Send, offer: TargetedOffer) => {
    sendTargetedOfferLogEvent(send, TARGETED_OFFER_OPEN_CREDITS_PAGE_CLICKED, offer.identifier);
    openCreditsHabblet();
};

/** `onHabboMallOffer`: a rejected offer is dropped; one new (0), selected or previewed opens its dialog, any other docks. */
export const onHabboMallOffer = (send: Send, offer: HabboMallOffer) => {
    switch (offer.trackingState) {
        case TARGETED_OFFER_STATE_REJECTED:
            return;
        case 0:
        case TARGETED_OFFER_STATE_SELECTED:
        case TARGETED_OFFER_STATE_PREVIEWED:
            maximizeMallOffer(send, offer);
            return;
        default:
            minimizeMallOffer(offer);
    }
};

/** `maximizeMallOffer`: nothing while the mall dialog is up; otherwise it replaces the view that is, and the offer is told previewed. */
export const maximizeMallOffer = (send: Send, offer: HabboMallOffer) => {
    const { view, showMallDialogView, setMallOffer } = targetedOfferStore.getState();

    if (view === 'mallDialog') return;

    destroyTargetedOfferView();
    setMallOffer(offer);
    showMallDialogView();

    send(new ShopTargetedOfferViewedComposer({ targetedOfferId: offer.targetedOfferId, trackingState: TARGETED_OFFER_STATE_PREVIEWED }));
};

/** `minimizeMallOffer`: the offer docks in the toolbar's extension column; nothing is sent. */
export const minimizeMallOffer = (offer: HabboMallOffer) => {
    const { showMallMinimizedView, setMallOffer } = targetedOfferStore.getState();

    destroyTargetedOfferView();
    setMallOffer(offer);
    showMallMinimizedView();
};

/** `onHabboMallOfferOpened`, the dialog's `btn_buy`: told opened (1), the web shop (`openCreditsHabblet`), and docked. */
export const openHabboMallOffer = (send: Send, offer: HabboMallOffer) => {
    send(new ShopTargetedOfferViewedComposer({ targetedOfferId: offer.targetedOfferId, trackingState: TARGETED_OFFER_STATE_MAXIMIZED }));
    openCreditsHabblet();
    minimizeMallOffer(offer);
};

/** `onHabboMallOfferClosed`, the dialog's close button: told closed (4), and docked. */
export const closeHabboMallOffer = (send: Send, offer: HabboMallOffer) => {
    send(new ShopTargetedOfferViewedComposer({ targetedOfferId: offer.targetedOfferId, trackingState: TARGETED_OFFER_STATE_MINIMIZED }));
    minimizeMallOffer(offer);
};

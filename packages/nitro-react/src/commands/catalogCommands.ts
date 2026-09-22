/**
 * The catalogue window's controller functions - the parts of Flash's `HabboCatalog` and
 * `CatalogViewer` that load a page, build it and open the purchase confirmation. The catalogue
 * store is window-scoped, so each takes it (`useCatalogStoreApi()` in a view, the store the
 * window registered its handlers with in `handlers/catalog`).
 */
import { CatalogTypeEnum, ICatalogNode, ICatalogPageLocalization, IObjectData, IPurchasableOffer } from '@nitrodevco/nitro-api';
import { GetCatalogPageComposer, MarkCatalogNewAdditionsPageOpenedComposer } from '@nitrodevco/nitro-packets';
import { StoreApi } from 'zustand';

import { CATALOG_SEARCH_PAGE_ID, CatalogPage, CatalogStore, PetImageRequest } from '#base/context/catalog';
import { catalogPurchaseStore } from '#base/context/catalog-purchase';
import { WebSocketConnection } from '#base/context/communication';
import { GameTokensOffer } from '#base/context/game-tokens';
import { systemStore } from '#base/context/system';
import { userStore } from '#base/context/user';
import { calculateBundlePrice, gameTokensOfferAsPurchasableOffer } from '#base/utils';

import { showNotEnoughActivityPointsAlert, showNotEnoughCreditsAlert } from './catalogClubCommands';
import { onCatalogWindowToggled, syncPlacedOfferWithPurchase } from './catalogPlacementCommands';
import { disposePurchaseDialog } from './catalogPurchaseFlowCommands';
import { isHabbiconOfferOwned, showHabbiconAlreadyOwnedAlert } from './habbiconCommands';

type Send = WebSocketConnection['send'];
type CatalogStoreApi = StoreApi<CatalogStore>;

/** `CatalogNavigator.getNodesByOfferId`: the nodes that list an offer, only the visible ones when asked. */
export const getCatalogNodesByOfferId = (offersToNodes: Record<number, ICatalogNode[]>, offerId: number, onlyVisible: boolean = false): ICatalogNode[] => {
    const nodes = offersToNodes[offerId] ?? [];

    return onlyVisible ? nodes.filter(node => node.visible) : nodes;
};

/** `HabboCatalog.loadCatalogPage`: ask for a page and mark the window busy until it arrives. */
export const loadCatalogPage = (send: Send, store: CatalogStoreApi, pageId: number, offerId: number) => {
    if (pageId < 0) return;

    const { catalogType, setIsBusy, setActivePageId } = store.getState();

    setIsBusy(true);
    setActivePageId(pageId);

    send(new GetCatalogPageComposer({ pageId, offerId, catalogType }));
};

/**
 * `CatalogViewer.showCatalogPage`: the page on show only selects the offer when the server sends
 * it again (unless a link forced a refresh); anything else builds a new `CatalogPage`, whose view
 * selects `offerId` once its widgets are up. A search passes `CatalogPage.MODE_SEARCH`
 * (`showSearchResults`), whose page id never matches, so every search builds its page.
 */
export const showCatalogPage = (store: CatalogStoreApi, pageId: number, layoutCode: string, localization: ICatalogPageLocalization, offers: IPurchasableOffer[], offerId: number, acceptSeasonCurrencyAsCredits: boolean, mode: number = -1) => {
    const { activePage, forceRefresh, catalogType, setActivePage } = store.getState();

    if (activePage && !forceRefresh && (mode !== CatalogPage.MODE_SEARCH) && (activePage.pageId === pageId)) {
        if (offerId > -1) activePage.selectOffer(offerId);

        return;
    }

    setActivePage(new CatalogPage(pageId, layoutCode, localization, offers, acceptSeasonCurrencyAsCredits, catalogType, offerId, mode));
};

/**
 * `HabboCatalog.showPurchaseConfirmation`: open the confirmation dialog for an offer. A search
 * result is bought for the first visible page that lists it, as Flash maps the search page's
 * `-12345678` back to a page.
 *
 * The purse is checked first: an offer the credits or the activity points cannot pay for - its
 * price times the quantity when `catalog.multiple.purchase.enabled` (`multiplePurchaseEnabled`,
 * never in the builders club) - opens `showNotEnoughCreditsAlert` /
 * `showNotEnoughActivityPointsAlert` instead. The dialog gets the gift receiver the caller names,
 * else `HabboCatalog.giftReceiver`; a purchase the purchase widget marked as a gift
 * (`purchaseWillBeGift`) opens turned into gifting, and the mark is cleared. The dialog shown for
 * another offer than the one dropped in the room drops that one (`syncPlacedOfferWithPurchase`).
 *
 * An owned habbicon is refused with `showHabbiconAlreadyOwnedAlert` before anything else. A
 * `previewImage` (Flash's eighth argument, the pets widgets' pet picture) replaces the product's
 * picture in the dialog. Flash also routes club offers (`ClubBuyOfferData`) to `ClubBuyController`;
 * those do not come through here - the club pages open their own dialog
 * (`showClubPurchaseConfirmation`). Game token offers come through
 * `showGameTokensPurchaseConfirmation`.
 */
export const showPurchaseConfirmation = (store: CatalogStoreApi, offer: IPurchasableOffer, pageId: number, extraParameter: string = '', quantity: number = 1, stuffData: IObjectData | undefined = undefined, userName: string | undefined = undefined, previewImage: PetImageRequest | undefined = undefined) => {
    openPurchaseConfirmation(store, offer, pageId, extraParameter, quantity, stuffData, userName, previewImage, false);
};

/**
 * `buySnowWarTokensOffer`'s `showPurchaseConfirmation(offer, -1, localizationId)` for a
 * `GameTokensOffer`: the same dialog, with the purse check skipped (`param1 is GameTokensOffer`)
 * and the offer bought through `purchaseGameTokensOffer(localizationId)`.
 */
export const showGameTokensPurchaseConfirmation = (store: CatalogStoreApi, offer: GameTokensOffer) => {
    openPurchaseConfirmation(store, gameTokensOfferAsPurchasableOffer(offer), -1, offer.localizationId, 1, undefined, undefined, undefined, true);
};

const openPurchaseConfirmation = (store: CatalogStoreApi, offer: IPurchasableOffer, pageId: number, extraParameter: string, quantity: number, stuffData: IObjectData | undefined, userName: string | undefined, previewImage: PetImageRequest | undefined, isGameTokensOffer: boolean) => {
    const { offersToNodes, catalogType, purchaseWillBeGift, setActivePurchase, setPurchaseWillBeGift } = store.getState();
    const { credits, activityPoints } = userStore.getState();

    if (pageId === CATALOG_SEARCH_PAGE_ID) {
        const nodes = getCatalogNodesByOfferId(offersToNodes, offer.offerId, true);

        if (nodes.length) pageId = nodes[0].pageId;
    }

    if (isHabbiconOfferOwned(offer)) {
        showHabbiconAlreadyOwnedAlert();

        return;
    }

    let priceInCredits = offer.priceInCredits;
    let priceInActivityPoints = offer.priceInActivityPoints;

    if ((systemStore.getState().config['catalog.multiple.purchase.enabled'] === true) && (catalogType !== CatalogTypeEnum.BuildersClub)) {
        priceInCredits = calculateBundlePrice(true, offer.priceInCredits, quantity);
        priceInActivityPoints = calculateBundlePrice(true, offer.priceInActivityPoints, quantity);
    }

    if ((priceInCredits > 0) && (priceInCredits > credits) && !isGameTokensOffer) {
        showNotEnoughCreditsAlert();

        return;
    }

    if ((priceInActivityPoints > 0) && (priceInActivityPoints > (activityPoints[offer.activityPointType] ?? 0)) && !isGameTokensOffer) {
        showNotEnoughActivityPointsAlert(offer.activityPointType);

        return;
    }

    // `showOffer` -> `showConfirmationDialog` builds a new window: a raffle still shown in the old one ends as `dispose` would end it.
    disposePurchaseDialog(store);

    setActivePurchase({
        offer,
        pageId,
        extraParameter,
        quantity,
        stuffData,
        receiverName: userName ?? catalogPurchaseStore.getState().giftReceiver,
        asGift: purchaseWillBeGift,
        previewImage,
        isGameTokensOffer,
    });

    syncPlacedOfferWithPurchase(offer);

    if (purchaseWillBeGift) setPurchaseWillBeGift(false);
};

/**
 * `PurchaseCatalogWidget.initPurchase` (`CatalogWidgetInitPurchaseEvent`, which a finished drag
 * into the room sends): buy the widget's offer now, with the extra parameter, quantity and stuff
 * data it collected. The widget records those for its page (`purchaseWidgetState`) because the
 * drag hid the window and the port unmounts a hidden window's widgets; a page without a purchase
 * widget has no record and buys nothing, as Flash's has no listener.
 */
export const initPurchaseFromPurchaseWidget = (store: CatalogStoreApi) => {
    const { purchaseWidgetState, activePage } = store.getState();

    if (!activePage || !purchaseWidgetState || (purchaseWidgetState.page !== activePage) || !purchaseWidgetState.offer) return;

    if (isHabbiconOfferOwned(purchaseWidgetState.offer)) {
        showHabbiconAlreadyOwnedAlert();

        return;
    }

    showPurchaseConfirmation(store, purchaseWidgetState.offer, activePage.pageId, purchaseWidgetState.additionalParameters, purchaseWidgetState.quantity, purchaseWidgetState.stuffData);
};

/**
 * `toggleCatalog` as the window's visibility changes: an offer still in the mover is cancelled
 * (not when the mover itself hid or showed the window), and opening the window while
 * `CatalogIndexMessage` said there are new additions sends `MarkCatalogNewAdditionsPageOpened`
 * once (`markNewAdditionPageOpened`, clearing `§_-31q§`).
 */
export const onCatalogVisibilityChanged = (send: Send, store: CatalogStoreApi, visible: boolean) => {
    if (!onCatalogWindowToggled() || !visible) return;

    const { newAdditionsAvailable, setNewAdditionsAvailable } = store.getState();

    if (!newAdditionsAvailable) return;

    setNewAdditionsAvailable(false);
    send(new MarkCatalogNewAdditionsPageOpenedComposer({}));
};

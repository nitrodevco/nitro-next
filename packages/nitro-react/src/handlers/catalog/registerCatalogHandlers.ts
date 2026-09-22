/**
 * The catalogue window's packets - the listeners Flash's `HabboCatalog` registers in
 * `initializeCatalogMessageEvents` for the index, the pages, the lazy offers, a republished
 * catalogue and the four answers to a purchase. The catalogue store is created with the window
 * (`CatalogContextProvider`), so these are registered from it: `CatalogComponent` calls
 * `useRegisterHandlers(socket => registerCatalogHandlers(store, socket))`.
 *
 * There are two catalogue windows, the normal one and the Builders Club one
 * (`CatalogBuildersClubComponent`), each with its own store and these listeners, where Flash has
 * one `HabboCatalog` over two window states. Each store keeps what its own catalogue type sent
 * (the index and page packets carry the type); what Flash does once - the alerts, and the lazy
 * offer for the page on show - only the active catalogue's store does (`isActiveCatalogType`).
 *
 * The rest of `HabboCatalog`'s listeners - gift wrapping, the club offers, the
 * marketplace, the recycler, pet names and palettes, the bundle discount ruleset, limited edition
 * sell-outs - are in their own files or wait for the pages and dialogs that read them; each is
 * listed in `drift/known.py`'s `HANDLERS_UNHANDLED` with what it waits for.
 */
import { FurnitureTypeEnum, ICatalogNode, IPurchasableOffer } from '@nitrodevco/nitro-api';
import { CatalogIndexMessage, CatalogPageMessage, CatalogPublishedMessage, NotEnoughBalanceMessage, ProductOfferEventMessage, PurchaseErrorMessage, PurchaseNotAllowedMessage, PurchaseOKMessage } from '@nitrodevco/nitro-packets';
import { StoreApi } from 'zustand';

import { disposePurchaseDialog, resetPlacedOfferData, showCatalogPage, showNotEnoughActivityPointsAlert, showNotEnoughCreditsAlert } from '#base/commands';
import { CatalogStore, CatalogWidgetEventEnum, getCatalogWindowName, isActiveCatalogType } from '#base/context/catalog';
import { WebSocketConnection } from '#base/context/communication';
import { notificationStore } from '#base/context/notifications';
import { systemStore } from '#base/context/system';
import { getOfferProduct, processCatalogOffer } from '#base/utils';

import { on, subscribeAll } from '../packetSubscriptions';

/** `onPurchaseNotAllowed`: only code 1 has a description of its own; everything else is the unknown one. */
const PURCHASE_NOT_ALLOWED_REQUIRES_CLUB = 1;

export const registerCatalogHandlers = (store: StoreApi<CatalogStore>, { subscribe }: WebSocketConnection) => {
    const { setRootNode, setOffersToNodes, setFrontPageItems, setIsBusy, setActivePurchase, setGiveGiftEnabled, setLtdRaffleRunning, resetCatalog } = store.getState();
    const t = (key: string, defaultValue?: string, replacements?: Record<string, string>) => systemStore.getState().getLocalizationValue(key, defaultValue, replacements);
    /** `isActiveCatalogType`: whether this window's store answers for `HabboCatalog` - the alerts and the page on show. */
    const isActive = () => isActiveCatalogType(store.getState().catalogType, systemStore.getState().visibleWindows);

    return subscribeAll(subscribe, [
        /*
         * `onCatalogPublished`: the catalogue changed on the server, so everything built from it
         * goes (`reset()` disposes the window). An open catalogue says so in an alert, a closed
         * one in an info bubble - once, from the active catalogue's store (`isActiveCatalogType`),
         * whichever of the two windows was open.
         */
        on(CatalogPublishedMessage, () => {
            const { visibleWindows, hideWindow, showAlert } = systemStore.getState();
            const wasVisible = (!!visibleWindows.catalog || !!visibleWindows.builders_catalog);
            const active = isActive();

            resetCatalog();
            hideWindow(getCatalogWindowName(store.getState().catalogType));

            if (!active) return;

            if (wasVisible) showAlert(t('catalog.alert.published.title'), t('catalog.alert.published.description'), { onClose: () => resetPlacedOfferData() });
            else notificationStore.getState().addNotification(t('catalog.alert.published.description'), 'info', 'if_icon_temp_png');
        }),

        /** `onCatalogIndex`: the node tree, each node's depth and parent, and every offer's nodes. */
        on(CatalogIndexMessage, (data) => {
            if (data.catalogType !== store.getState().catalogType) return;

            const offers: Record<number, ICatalogNode[]> = {};

            const getNode = (node: ICatalogNode, depth: number, parent: ICatalogNode | undefined) => {
                node.depth = depth;
                node.parent = parent;

                for (const offerId of node.offerIds) {
                    if (offers[offerId] !== undefined) offers[offerId].push(node);
                    else offers[offerId] = [ node ];
                }

                for (const child of node.children) getNode(child, depth + 1, node);

                return node;
            };

            setRootNode(getNode(data.root, 0, undefined));
            setOffersToNodes(offers);
        }),

        /**
         * `onCatalogPage`: the page's offers are built, and the page is shown if it is still the
         * one last asked for (`lastPageRequestId`); the window stops being busy either way.
         */
        on(CatalogPageMessage, (data) => {
            const page = data.page;
            const { catalogType, activePageId } = store.getState();

            if (!page || (page.catalogType !== catalogType)) return;

            const lookup = systemStore.getState();
            const offers: IPurchasableOffer[] = [];

            for (const offer of page.offers) {
                const purchasableOffer = processCatalogOffer(offer, catalogType, lookup);

                if (purchasableOffer) offers.push(purchasableOffer);
            }

            if (page.frontPageItems.length) setFrontPageItems(page.frontPageItems);

            if (page.pageId === activePageId) showCatalogPage(store, page.pageId, page.layout, page.localization, offers, page.offerId, page.acceptSeasonCurrencyAsCredits);

            setIsBusy(false);
        }),

        /**
         * `onProductOffer`: the real offer behind a lazy one (a search hit) or a refreshed limited
         * offer. Its remaining count goes to the page, and the page's widgets are told it is the
         * selected product - with a wall item's extra parameter, as the item grid would.
         */
        on(ProductOfferEventMessage, (data) => {
            const { catalogType, activePage } = store.getState();
            const firstProduct = data.offer?.products[0];

            if (!firstProduct || !isActive()) return;

            if (activePage && firstProduct.isUnique) activePage.updateLimitedItemsLeft(data.offer.id, firstProduct.uniqueRemaining);

            const offer = processCatalogOffer(data.offer, catalogType, systemStore.getState());

            if (!offer || !activePage) return;

            offer.page = activePage;

            activePage.dispatchWidgetEvent({ type: CatalogWidgetEventEnum.SELECT_PRODUCT, offer });

            const product = getOfferProduct(offer);

            if (product && (product.productType === FurnitureTypeEnum.Wall)) activePage.dispatchWidgetEvent({ type: CatalogWidgetEventEnum.SET_EXTRA_PARAMETER, parameter: product.extraParam });
        }),

        /**
         * `onPurchaseOK`: the dialog's raffle ends (`ltdRaffleEnded`) and the dialog closes. Flash
         * first flies the product picture to the inventory icon (`createTransitionToIcon`, the
         * me menu's for an effect) unless the purchase was a gift or a drop into the room, and
         * tells its listeners (`CatalogFurniPurchaseEvent`); the port's toolbar has no icon
         * transition and nothing listens for the event, so neither happens here.
         */
        on(PurchaseOKMessage, () => {
            if (!store.getState().activePurchase) return;

            setLtdRaffleRunning(false);
            setActivePurchase(undefined);
        }),

        /** `onPurchaseError`: the error alert (whose close clears a dropped offer), and the dialog is disposed. */
        on(PurchaseErrorMessage, (data) => {
            if (isActive()) {
                systemStore.getState().showAlert(t('catalog.alert.purchaseerror.title'), t((data.errorCode > 0) ? `catalog.alert.purchaseerror.description.${data.errorCode}` : 'catalog.alert.purchaseerror.description'), { onClose: () => resetPlacedOfferData() });
            }

            disposePurchaseDialog(store);
        }),

        /**
         * `onPurchaseNotAllowed`: only the alert (whose close clears a dropped offer). The dialog
         * stays as `onBuyButtonClick` left it - buy and cancel disabled, the header close to leave by.
         */
        on(PurchaseNotAllowedMessage, (data) => {
            if (!isActive()) return;

            systemStore.getState().showAlert(t('catalog.alert.purchasenotallowed.title'), t((Number(data.errorType) === PURCHASE_NOT_ALLOWED_REQUIRES_CLUB) ? 'catalog.alert.purchasenotallowed.hc.description' : 'catalog.alert.purchasenotallowed.unknown.description'), { onClose: () => resetPlacedOfferData() });
        }),

        /**
         * `onNotEnoughBalance`: `showNotEnoughCreditsAlert` (a confirm that opens the web shop) or
         * `showNotEnoughActivityPointsAlert`, then `_purchaseWindow.notEnoughCredits()` - the gift
         * dialog's give button works again; the confirmation's buy and cancel stay disabled.
         */
        on(NotEnoughBalanceMessage, (data) => {
            if (isActive()) {
                if (data.notEnoughCredits) showNotEnoughCreditsAlert();
                else if (data.notEnoughActivityPoints) showNotEnoughActivityPointsAlert(data.activityPointType);
            }

            if (store.getState().activePurchase) setGiveGiftEnabled(true);
        }),
    ]);
};

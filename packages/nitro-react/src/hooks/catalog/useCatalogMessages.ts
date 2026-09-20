/**
 * The catalogue window's packets. The store is created with the window, so these are subscribed
 * from it rather than from `handlers/` - `CatalogComponent` calls this once.
 *
 * The four answers to a purchase are Flash `HabboCatalog.onPurchaseOK`, `onPurchaseError`,
 * `onPurchaseNotAllowed` and `onNotEnoughBalance`. Each ends the confirmation dialog's wait;
 * a purchase that went through, or failed outright, closes it (`_purchaseWindow.dispose()`),
 * while one the server only refused leaves it open so the price can be read again.
 */
import { ICatalogNode, IPurchasableOffer } from '@nitrodevco/nitro-api';
import { CatalogIndexMessage, CatalogPageMessage, CatalogPublishedMessage, NotEnoughBalanceMessage, ProductOfferEventMessage, PurchaseErrorMessage, PurchaseNotAllowedMessage, PurchaseOKMessage } from '@nitrodevco/nitro-packets';

import { useCatalogActions, useCatalogStore } from '#base/context/catalog';
import { useConfigData, useTranslation, useWindowActions } from '#base/context/system';
import { useMessageListener } from '#base/hooks';

import { useWindowVisibility } from '../system';
import { useCatalogNavigation } from './useCatalogNavigation';
import { useCatalogOfferActions } from './useCatalogOfferActions';

/** `onPurchaseNotAllowed`: only code 1 has a description of its own; everything else is the unknown one. */
const PURCHASE_NOT_ALLOWED_REQUIRES_CLUB = 1;

export const useCatalogMessages = () => {
    const catalogType = useCatalogStore(x => x.catalogType);
    const activePageId = useCatalogStore(x => x.activePageId);
    const activePurchase = useCatalogStore(x => x.activePurchase);
    const { showCatalogPage, selectOffer } = useCatalogNavigation();
    const { setRootNode, setOffersToNodes, setFrontPageItems, setIsBusy, setActivePurchase, setIsPurchasing, resetCatalog } = useCatalogActions();
    const { processOffer } = useCatalogOfferActions();
    const { hide } = useWindowVisibility('catalog');
    const { showAlert } = useWindowActions();
    const config = useConfigData();
    const t = useTranslation();

    useMessageListener(CatalogPublishedMessage, (data) => {
        resetCatalog();
        hide();

        // alert catalog.alert.published.description
    });

    useMessageListener(CatalogPageMessage, (data) => {
        const page = data.page;

        if (!page || page.catalogType !== catalogType || page.pageId !== activePageId) return;

        const purchasableOffers: IPurchasableOffer[] = [];

        for (const offer of page.offers) {
            const purchasableOffer = processOffer(offer);

            if (purchasableOffer) purchasableOffers.push(purchasableOffer);
        }

        if (page.frontPageItems.length) setFrontPageItems(page.frontPageItems);

        setIsBusy(false);

        showCatalogPage(page.pageId, page.layout, page.localization, purchasableOffers, page.offerId, page.acceptSeasonCurrencyAsCredits);
    });

    useMessageListener(ProductOfferEventMessage, (data) => {
        const purchasableOffer = processOffer(data.offer);

        if (!purchasableOffer) return;

        selectOffer(purchasableOffer);
    });

    useMessageListener(CatalogIndexMessage, (data) => {
        if (data.catalogType !== catalogType) return;

        const offers: Record<number, ICatalogNode[]> = {};

        const getNode = (node: ICatalogNode, depth: number, parent: ICatalogNode | undefined) => {
            node.depth = depth;
            node.parent = parent;

            for (const offerId of node.offerIds) {
                if (offers[offerId] !== undefined) offers[offerId].push(node);
                else offers[offerId] = [ node ];
            }

            depth++;

            for (const child of node.children) getNode(child, depth, node);

            return node;
        };

        setRootNode(getNode(data.root, 0, undefined));
        setOffersToNodes(offers);
    });

    useMessageListener(PurchaseOKMessage, (data) => {
        if (!activePurchase?.offer || !data.offer || (data.offer.id !== activePurchase.offer.offerId)) return;

        setActivePurchase(undefined);
    });

    useMessageListener(PurchaseErrorMessage, (data) => {
        showAlert(t('catalog.alert.purchaseerror.title'), t((data.errorCode > 0) ? `catalog.alert.purchaseerror.description.${data.errorCode}` : 'catalog.alert.purchaseerror.description'));

        setActivePurchase(undefined);
    });

    useMessageListener(PurchaseNotAllowedMessage, (data) => {
        showAlert(t('catalog.alert.purchasenotallowed.title'), t((Number(data.errorType) === PURCHASE_NOT_ALLOWED_REQUIRES_CLUB) ? 'catalog.alert.purchasenotallowed.hc.description' : 'catalog.alert.purchasenotallowed.unknown.description'));

        setIsPurchasing(false);
    });

    useMessageListener(NotEnoughBalanceMessage, (data) => {
        // Flash offers to open the web shop here; there is no shop to open, so the alert only says so.
        if (data.notEnoughCredits) showAlert(t('catalog.alert.notenough.title'), t('catalog.alert.notenough.credits.description'));
        else if (data.notEnoughActivityPoints) {
            // `getActivityPointName`: the config names the currency's text key, which is then localized.
            const nameKey = (config[`activitypoint.name.${data.activityPointType}`] as string | undefined) ?? '';
            const currencyname = t(nameKey, nameKey);

            showAlert(t('catalog.alert.notenough.activitypoints.title', '', { currencyname }), t('catalog.alert.notenough.activitypoints.description', '', { currencyname }));
        }

        // `_purchaseWindow.notEnoughCredits()`: the dialog stays open with its buy button live again.
        setIsPurchasing(false);
    });

    return null;
};

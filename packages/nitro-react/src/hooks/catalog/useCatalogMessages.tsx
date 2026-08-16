import { FurnitureTypeEnum, ICatalogNode, IPurchasableOffer } from "@nitrodevco/nitro-api";
import { CatalogIndexMessage, CatalogPageMessage, CatalogPublishedMessage, ProductOfferEventMessage } from "@nitrodevco/nitro-packets";

import { useCatalogActions, useCatalogSelectors } from "#base/context";
import { useMessageListener } from "#base/hooks";

import { useCatalogNavigation } from "./useCatalogNavigation";
import { useCatalogOfferActions } from "./useCatalogOfferActions";
import { useCatalogVisibility } from "./useCatalogVisibility";

export const useCatalogMessages = () => {
    const { catalogType, activePageId, activePage } = useCatalogSelectors();
    const { showCatalogPage } = useCatalogNavigation();
    const { setRootNode, setOffersToNodes, setFrontPageItems, setIsBusy, setActiveOffer, resetCatalog } = useCatalogActions();
    const { getOfferProduct, processOffer } = useCatalogOfferActions();
    const { hideCatalog } = useCatalogVisibility();

    useMessageListener(CatalogPublishedMessage, data => {
        resetCatalog();
        hideCatalog();

        //alert catalog.alert.published.description
    });

    useMessageListener(CatalogPageMessage, data => {
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

    useMessageListener(ProductOfferEventMessage, data => {
        const purchasableOffer = processOffer(data.offer);

        if (!purchasableOffer) return;

        purchasableOffer.page = activePage;

        setActiveOffer(purchasableOffer);

        const product = getOfferProduct(purchasableOffer);

        if (product && product.productType === FurnitureTypeEnum.Wall) {
            // set purchase options
        }
    });

    useMessageListener(CatalogIndexMessage, data => {
        if (data.catalogType !== catalogType) return;

        const offers: Record<number, ICatalogNode[]> = {};

        const getNode = (node: ICatalogNode, depth: number, parent: ICatalogNode | undefined) => {
            node.depth = depth;
            node.parent = parent;

            for (const offerId of node.offerIds) {
                if (offers[offerId] !== undefined) offers[offerId].push(node);
                else offers[offerId] = [node];
            }

            depth++;

            for (const child of node.children) getNode(child, depth, node);

            return node;
        };

        setRootNode(getNode(data.root, 0, undefined));
        setOffersToNodes(offers);
    });

    return null;
}
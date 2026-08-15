import { CatalogRequestedPageUtilities, IActivePage, ICatalogNode, ICatalogPageLocalization, IPurchasableOffer } from "@nitrodevco/nitro-api";
import { GetCatalogPageComposer } from "@nitrodevco/nitro-shared";

import { useCatalogActions, useCatalogSelectors, useWebSocketContext } from "#base/context";

import { useCatalogNodeActions } from "./useCatalogNodeActions";
import { useCatalogVisibility } from "./useCatalogVisibility";

export const useCatalogNavigation = () => {
    const { catalogType, activeNodes, openNodeIds, rootNode } = useCatalogSelectors();
    const { setNavigationState, setIsBusy, setActivePageId, setActivePage, setActiveOffer, setRequestedPage } = useCatalogActions();
    const { getNodeByPageId, getNodeByPageName, getNodesByOfferId } = useCatalogNodeActions();
    const { isCatalogVisible, showCatalog } = useCatalogVisibility();
    const { send } = useWebSocketContext();

    const loadCatalogPage = (pageId: number, offerId: number) => {
        if (pageId < 0) return;

        setIsBusy(true);
        setActivePageId(pageId);

        send(new GetCatalogPageComposer({ pageId, offerId, catalogType }));
    }

    const showCatalogPage = (pageId: number, layoutCode: string, localization: ICatalogPageLocalization, offers: IPurchasableOffer[], offerId: number, acceptSeasonCurrencyAsCredits: boolean, mode: number = -1) => {
        const page = {
            pageId,
            layoutCode,
            localization,
            offers,
            acceptSeasonCurrencyAsCredits,
            mode: mode === -1 ? 0 : mode
        } as IActivePage;

        for (const offer of page.offers) offer.page = page;

        setActivePage(page);

        if (offerId > -1 && page.offers.length) {
            for (const offer of page.offers) {
                if (offer.offerId !== offerId) continue;

                setActiveOffer(offer);

                break;
            }
        }
    }

    const activateNode = (targetNode: ICatalogNode, offerId: number = -1) => {
        if (targetNode.parent?.pageName && targetNode.parent.pageName === 'root') {
            for (const child of targetNode.children) {
                if (!child.visible) continue;

                targetNode = child;

                break;
            }
        }

        const nodes: ICatalogNode[] = [];

        let node: ICatalogNode | undefined = targetNode;

        while (node && (node.pageName !== 'root')) {
            nodes.push(node);

            node = node.parent;
        }

        nodes.reverse();

        const prevNodes = [...activeNodes];
        const nextOpenNodeIds = new Set(openNodeIds);
        const isActive = prevNodes.indexOf(targetNode) >= 0;
        const isOpen = nextOpenNodeIds.has(targetNode.pageId);

        for (const n of prevNodes) {
            if (nodes.indexOf(n) === -1) nextOpenNodeIds.delete(n.pageId);
        }

        for (const n of nodes) {
            if (n.parent) nextOpenNodeIds.add(n.pageId);
        }

        if (isActive && isOpen) nextOpenNodeIds.delete(targetNode.pageId);
        else nextOpenNodeIds.add(targetNode.pageId);

        setNavigationState(nodes, [...nextOpenNodeIds]);

        if (targetNode.pageId > -1) loadCatalogPage(targetNode.pageId, offerId);
    }

    const selectOffer = (offer: IPurchasableOffer) => {
        if (offer.isLazy) return;

        setActiveOffer(offer);
    }

    const openPageById = (pageId: number) => {
        if (!isCatalogVisible) {
            setRequestedPage(CatalogRequestedPageUtilities.getForPageId(pageId));

            showCatalog();
        } else {
            if (!rootNode) return;

            const node = getNodeByPageId(pageId, rootNode);

            if (node) activateNode(node);
        }
    }

    const openPageByName = (pageName: string) => {
        if (!isCatalogVisible) {
            setRequestedPage(CatalogRequestedPageUtilities.getForPageName(pageName));

            showCatalog();
        } else {
            if (!rootNode) return;

            const node = getNodeByPageName(pageName, rootNode);

            if (node) activateNode(node);
        }
    }

    const openPageByOfferId = (offerId: number) => {
        if (!isCatalogVisible) {
            setRequestedPage(CatalogRequestedPageUtilities.getForOfferId(offerId));

            showCatalog();
        } else {
            const nodes = getNodesByOfferId(offerId)

            if (nodes.length) activateNode(nodes[0], offerId);
        }
    }

    return { loadCatalogPage, showCatalogPage, activateNode, selectOffer, openPageById, openPageByName, openPageByOfferId };
}

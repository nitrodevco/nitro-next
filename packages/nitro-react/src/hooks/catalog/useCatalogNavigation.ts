import { CatalogRequestedPageUtilities, FurnitureTypeEnum, IActivePage, ICatalogNode, ICatalogPageLocalization, IPurchasableOffer } from '@nitrodevco/nitro-api';
import { GetCatalogPageComposer, GetProductOfferComposer } from '@nitrodevco/nitro-packets';

import { useCatalogActions, useCatalogStore } from '#base/context/catalog';
import { useWebSocketContext } from '#base/context/communication';

import { useWindowVisibility } from '../system';
import { useCatalogNodeActions } from './useCatalogNodeActions';
import { useCatalogOfferActions } from './useCatalogOfferActions';

export const useCatalogNavigation = () => {
    const catalogType = useCatalogStore(x => x.catalogType);
    const activeNodes = useCatalogStore(x => x.activeNodes);
    const openNodes = useCatalogStore(x => x.openNodes);
    const rootNode = useCatalogStore(x => x.rootNode);
    const { setActiveNodes, setOpenNodes, setIsBusy, setActivePageId, setActivePage, setActiveOffer, setRequestedPage, setPurchaseOptions } = useCatalogActions();
    const { getNodeByPageId, getNodeByPageName, getNodesByOfferId } = useCatalogNodeActions();
    const { getOfferProduct } = useCatalogOfferActions();
    const { isWindowVisible, show } = useWindowVisibility('catalog');
    const { send } = useWebSocketContext();

    const loadCatalogPage = (pageId: number, offerId: number) => {
        if (pageId < 0) return;

        setIsBusy(true);
        setActivePageId(pageId);

        send(new GetCatalogPageComposer({ pageId, offerId, catalogType }));
    };

    const showCatalogPage = (pageId: number, layoutCode: string, localization: ICatalogPageLocalization, offers: IPurchasableOffer[], offerId: number, acceptSeasonCurrencyAsCredits: boolean, mode: number = -1) => {
        const page = {
            pageId,
            layoutCode,
            localization,
            offers,
            acceptSeasonCurrencyAsCredits,
            mode: mode === -1 ? 0 : mode,
        } as IActivePage;

        for (const offer of page.offers) offer.page = page;

        setActivePage(page);

        if (offerId > -1 && page.offers.length) {
            for (const offer of page.offers) {
                if (offer.offerId !== offerId) continue;

                setActiveOffer(offer);

                return;
            }
        }

        setActiveOffer(undefined);
    };

    /**
     * `CatalogNavigator.getPathToNodeWithLayout`: from a tab, the way down to the first visible
     * page that has a layout - through folders (page id -1) if need be. Empty when there is none.
     */
    const getPathToNodeWithLayout = (node: ICatalogNode): ICatalogNode[] => {
        for (const child of node.children) {
            if (!child.visible) continue;

            if (child.pageId > -1) return [ child ];

            if (child.children.length) {
                const path = getPathToNodeWithLayout(child);

                if (path.length) return [ child, ...path ];
            }
        }

        return [];
    };

    const activateNode = (targetNode: ICatalogNode, offerId: number = -1) => {
        // `CatalogNavigator.showNodeContent`: a tab opens the first page under it that has a
        // layout, and its own page only when there is none.
        if (targetNode.parent?.pageName === 'root') {
            const path = getPathToNodeWithLayout(targetNode);

            if (path.length) targetNode = path[path.length - 1];
        }

        const nodes: ICatalogNode[] = [];

        let node: ICatalogNode | undefined = targetNode;

        while (node && (node.pageName !== 'root')) {
            nodes.push(node);

            node = node.parent;
        }

        nodes.reverse();

        /*
         * `CatalogNavigation.activateNode`: the nodes that were on the old path and are not on
         * the new one fold up, everything on the new path unfolds, and clicking the page that
         * is already open toggles its own folder. All of it is store state, never a flag on
         * the node - the tree is shared data, and a view re-renders on the store, not on a
         * mutation it cannot see.
         */
        const wasActive = activeNodes.includes(targetNode);
        const wasOpen = openNodes.includes(targetNode);
        const leftBehind = activeNodes.filter(n => !nodes.includes(n));
        const open = new Set(openNodes.filter(n => !leftBehind.includes(n)));

        for (const n of nodes) open.add(n);

        if (wasActive && wasOpen) open.delete(targetNode);

        setActiveNodes(nodes);
        setOpenNodes([ ...open ]);

        if (targetNode.pageId > -1) loadCatalogPage(targetNode.pageId, offerId);
    };

    const selectOffer = (offer: IPurchasableOffer) => {
        const product = getOfferProduct(offer);

        if (!product) return;

        if (offer.isLazy) {
            send(new GetProductOfferComposer({ offerId: product.furnitureData.rentOfferId > -1 ? product.furnitureData.rentOfferId : product.furnitureData.purchaseOfferId }));
        } else {
            setActiveOffer(offer);

            if (product.productType === FurnitureTypeEnum.Wall) setPurchaseOptions({ extraData: product.extraParam });
        }
    };

    const openPageById = (pageId: number) => {
        if (!isWindowVisible) {
            setRequestedPage(CatalogRequestedPageUtilities.getForPageId(pageId));

            show();
        } else {
            if (!rootNode) return;

            const node = getNodeByPageId(pageId, rootNode);

            if (node) activateNode(node);
        }
    };

    const openPageByName = (pageName: string) => {
        if (!isWindowVisible) {
            setRequestedPage(CatalogRequestedPageUtilities.getForPageName(pageName));

            show();
        } else {
            if (!rootNode) return;

            const node = getNodeByPageName(pageName, rootNode);

            if (node) activateNode(node);
        }
    };

    const openPageByOfferId = (offerId: number) => {
        if (!isWindowVisible) {
            setRequestedPage(CatalogRequestedPageUtilities.getForOfferId(offerId));

            show();
        } else {
            const nodes = getNodesByOfferId(offerId);

            if (nodes.length) activateNode(nodes[0], offerId);
        }
    };

    return { loadCatalogPage, showCatalogPage, activateNode, selectOffer, openPageById, openPageByName, openPageByOfferId };
};

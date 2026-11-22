/**
 * The catalogue navigation - Flash's `CatalogNavigator` (`showNodeContent`, `openCategoryForNode`,
 * `activateNode`) and `HabboCatalog.openCatalogPage*`: which nodes are open, which page is loaded,
 * and how a link or a request finds its page. A page link on an open catalogue forces the page to
 * be rebuilt (`openCatalogPageById` -> `catalogViewer.setForceRefresh()`).
 */
import { CatalogRequestedPageUtilities, ICatalogNode } from '@nitrodevco/nitro-api';

import { catalogInvisiblePageVisited, loadCatalogPage } from '#base/commands';
import { getCatalogWindowName, isNonTabbedCatalog, useCatalogActions, useCatalogRootNode, useCatalogStore, useCatalogStoreApi, useCatalogType } from '#base/context/catalog';
import { useWebSocketContext } from '#base/context/communication';

import { useWindowVisibility } from '../system';
import { useCatalogNodeActions } from './useCatalogNodeActions';

export const useCatalogNavigation = () => {
    const activeNodes = useCatalogStore(x => x.activeNodes);
    const openNodes = useCatalogStore(x => x.openNodes);
    const rootNode = useCatalogRootNode();
    const store = useCatalogStoreApi();
    const { setActiveNodes, setOpenNodes, setRequestedPage, setForceRefresh } = useCatalogActions();
    const { getNodeByPageId, getNodeByPageName, getNodesByOfferId } = useCatalogNodeActions();
    const catalogType = useCatalogType();
    const { isWindowVisible, show } = useWindowVisibility(getCatalogWindowName(catalogType));
    const { send } = useWebSocketContext();

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
        // layout, and its own page only when there is none. A tab is a child of the index root,
        // which is the node with no parent - the name is the server's and is not relied on.
        if (targetNode.parent && !targetNode.parent.parent) {
            const path = getPathToNodeWithLayout(targetNode);

            if (path.length) targetNode = path[path.length - 1];
        }

        const nodes: ICatalogNode[] = [];

        let node: ICatalogNode | undefined = targetNode;

        /*
         * `CatalogNavigator.openCategoryForNode`: the walk up stops at the tab - the node whose
         * parent is the index root - so `nodes[0]` is always the tab whose children the list
         * draws (`showNodeContent` adds `param1.children`, never `param1`). Flash stops on
         * `_loc2_.parent == null || _loc2_.parent.pageName == "root"`, and only the structural
         * half of that is portable: the index root's page name is whatever the server has in the
         * row, and the index packet marks it no other way. Stopping on the name instead pushed
         * the index itself onto the path wherever the server does not call its root `root`, and
         * the list then drew every tab where it should draw the open tab's children.
         */
        while (node && node.parent) {
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

        if (targetNode.pageId > -1) loadCatalogPage(send, store, targetNode.pageId, offerId);
    };

    /**
     * `CatalogNavigator.showNodeContent`: a node with children shows the way down to its first
     * page with a layout (each node on it activated, the page always), else its own page. A tab
     * selected (`TopViewSelector.selectTabButton`) and the front page come through here. A node
     * without children is activated too: the open tab and the header are store state here, not
     * the tab bar's selection.
     */
    const showNodeContent = (node: ICatalogNode | undefined) => {
        if (!node || !node.visible) return;

        const path = node.children.length ? getPathToNodeWithLayout(node) : [];

        if (!path.length) {
            activateNode(node);

            return;
        }

        path.forEach((pathNode, index) => {
            if ((index === path.length - 1) || !activeNodes.includes(pathNode)) activateNode(pathNode);
        });
    };

    /**
     * `CatalogNavigator.openNavigatorAtNode` -> `openCategoryForNode`: the node's tab is selected,
     * which shows its content (`selectTabByIndex`), its content is shown again, and the node is
     * activated. So every link into an open catalogue asks for the tab's first page twice between
     * the two requests of the page itself (official, lab28 + catlab 2026-10-26, 5/5).
     */
    const openNavigatorAtNode = (node: ICatalogNode) => {
        let category = node.parent;

        while (category?.parent?.parent) category = category.parent;

        if (category?.parent) showNodeContent(category);

        showNodeContent(category);
        activateNode(node);
    };

    /** `CatalogNavigator.openPageById(pageId, offerId)`: the page, with the offer on it picked when one is given. */
    const openPageById = (pageId: number, offerId: number = -1) => {
        if (!isWindowVisible) {
            setRequestedPage({ ...CatalogRequestedPageUtilities.getForPageId(pageId), ...((offerId > -1) ? { offerId } : {}) });

            show();
        } else {
            if (!rootNode) return;

            const node = getNodeByPageId(pageId, rootNode);

            if (!node) return;

            setForceRefresh();
            loadCatalogPage(send, store, node.pageId, offerId);
            openNavigatorAtNode(node);
        }
    };

    /** `CatalogNavigator.loadFrontPage` -> `getFirstNavigable`: the first visible node under the index, depth first. */
    const getFirstNavigable = (node: ICatalogNode): ICatalogNode | undefined => {
        if (node.visible && (node !== rootNode)) return node;

        for (const child of node.children) {
            const found = getFirstNavigable(child);

            if (found) return found;
        }

        return undefined;
    };

    /** `CatalogNavigator.loadFrontPage`: the content of the first visible node under the index. */
    const loadFrontPage = () => {
        if (rootNode) showNodeContent(getFirstNavigable(rootNode));
    };

    /**
     * `CatalogNavigator.showIndex`, when an index comes in: the first tab is selected, which shows
     * its content - the first visible root node, or in a catalogue without tabs (the builders club)
     * the first root node. `onCatalogIndex` then loads the front page as well, so official asks for
     * the front page twice on the first opening of a login (lab33 + catlab 2026-10-26, 2/2), and the
     * builders club for its first page twice (catlab Q3).
     */
    const showIndex = () => {
        if (!rootNode) return;

        showNodeContent(isNonTabbedCatalog(catalogType) ? rootNode.children[0] : rootNode.children.find(child => child.visible));
    };

    /**
     * `CatalogNavigator.openPage`: a visible page opens; otherwise the front page does, and a page
     * that exists but is hidden raises `CATALOG_INVISIBLE_PAGE_VISITED` first.
     */
    const openPageByName = (pageName: string) => {
        if (!isWindowVisible) {
            setRequestedPage(CatalogRequestedPageUtilities.getForPageName(pageName));

            show();
        } else {
            if (!rootNode) return;

            const node = getNodeByPageName(pageName, rootNode);

            if (node && node.visible) {
                loadCatalogPage(send, store, node.pageId, -1);
                openNavigatorAtNode(node);

                return;
            }

            if (node) catalogInvisiblePageVisited();

            loadFrontPage();
        }
    };

    const openPageByOfferId = (offerId: number) => {
        if (!isWindowVisible) {
            setRequestedPage(CatalogRequestedPageUtilities.getForOfferId(offerId));

            show();
        } else {
            const nodes = getNodesByOfferId(offerId);

            if (!nodes.length) return;

            setForceRefresh();
            loadCatalogPage(send, store, nodes[0].pageId, offerId);
            openNavigatorAtNode(nodes[0]);
        }
    };

    return { activateNode, showIndex, loadFrontPage, openPageById, openPageByName, openPageByOfferId };
};

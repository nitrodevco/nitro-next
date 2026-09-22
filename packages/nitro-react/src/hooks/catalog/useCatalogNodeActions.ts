import { ICatalogNode } from '@nitrodevco/nitro-api';

import { getCatalogNodesByOfferId } from '#base/commands';
import { useCatalogStore } from '#base/context/catalog';

/** Finding nodes in the catalogue index - `CatalogNavigator.getNodeById`, `getNodeByName`, `getNodesByOfferId`. */
export const useCatalogNodeActions = () => {
    const rootNode = useCatalogStore(x => x.rootNode);
    const offersToNodes = useCatalogStore(x => x.offersToNodes);
    const activeNodes = useCatalogStore(x => x.activeNodes);

    const isNodeActive = (node: ICatalogNode) => activeNodes.indexOf(node) >= 0;

    const getNodeByPageId = (pageId: number, node: ICatalogNode): ICatalogNode | undefined => {
        if (node.pageId === pageId && node !== rootNode) return node;

        for (const child of node.children) {
            const found = getNodeByPageId(pageId, child);

            if (found) return found;
        }

        return undefined;
    };

    const getNodeByPageName = (pageName: string, node: ICatalogNode): ICatalogNode | undefined => {
        if (node.pageName === pageName && node !== rootNode) return node;

        for (const child of node.children) {
            const found = getNodeByPageName(pageName, child);

            if (found) return found;
        }

        return undefined;
    };

    const getNodesByOfferId = (offerId: number, onlyVisible: boolean = false) => getCatalogNodesByOfferId(offersToNodes, offerId, onlyVisible);

    return { isNodeActive, getNodeByPageId, getNodeByPageName, getNodesByOfferId };
};

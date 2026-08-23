import { ICatalogNode } from '@nitrodevco/nitro-api';

import { useCatalogSelectors } from '#base/context';

export const useCatalogNodeActions = () => {
    const { rootNode, offersToNodes, activeNodes } = useCatalogSelectors();

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

    const getNodesByOfferId = (offerId: number, flag: boolean = false): ICatalogNode[] => {
        if (flag) {
            const nodes: ICatalogNode[] = [];
            const offerNodes = offersToNodes[offerId];

            if (offerNodes?.length) {
                for (const node of offerNodes) {
                    if (node.visible) nodes.push(node);
                }
            }
        }

        return offersToNodes[offerId] ?? [];
    };

    return { isNodeActive, getNodeByPageId, getNodeByPageName, getNodesByOfferId };
};

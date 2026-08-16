import { useShallow } from "zustand/shallow";

import { useCatalogContext } from "../useCatalogContext";

export const useCatalogSelectors = () => useCatalogContext(useShallow(x => ({
    catalogType: x.catalogType,
    rootNode: x.rootNode,
    offersToNodes: x.offersToNodes,
    activeNodes: x.activeNodes,
    isBusy: x.isBusy,
    activePageId: x.activePageId,
    activePage: x.activePage,
    activeOffer: x.activeOffer,
    requestedPage: x.requestedPage,
    frontPageItems: x.frontPageItems
})));
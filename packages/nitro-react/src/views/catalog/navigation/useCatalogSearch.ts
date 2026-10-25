/**
 * The catalogue search - Flash's `HabboCatalog.onSearchInputEvent` / `performSearch`: the field's
 * text, and 300 ms after it changes the matching pages for the navigation list
 * (`CatalogNavigator.filter`) and the matching offers as a search page (`CatalogPage.MODE_SEARCH`,
 * `default_3x3`). A furni matches by its localized name or its product's name; in the builders
 * club catalogue only one available to it, found by its builders club offer, and one it has no
 * offer for still matches the pages of its furni line. The input's own timing (Flash searches 50 ms
 * after a key once the text is three long, or on Enter) is not this.
 */
import { CatalogTypeEnum, ICatalogNode, IFurnitureData, IPurchasableOffer } from '@nitrodevco/nitro-api';
import { useEffect, useState } from 'react';

import { showCatalogPage } from '#base/commands';
import { CatalogPage, useCatalogActions, useCatalogRootNode, useCatalogStore, useCatalogStoreApi, useCatalogType } from '#base/context/catalog';
import { useSystemStore } from '#base/context/system';
import { useCatalogOfferActions } from '#base/hooks';

/** `performSearch` stops at this many offers. */
const MAX_SEARCH_RESULTS = 400;

/** `CatalogNavigator.isSearchMatch`. */
const isSearchMatch = (search: string, furniLines: string[], matchedPageIds: Set<number>, node: ICatalogNode) => {
    if (matchedPageIds.has(node.pageId)) return true;

    const hayStack = [ node.pageName, node.localization ].join(' ').toLowerCase().replace(/[\s_-]+/gi, '');

    if (hayStack.indexOf(search) > -1) return true;

    return furniLines.some(furniLine => hayStack.indexOf(furniLine) >= 0);
};

/** `CatalogNavigator.includeVisibleSubtree`. */
const includeVisibleSubtree = (node: ICatalogNode, marked: Set<ICatalogNode>) => {
    if (node.visible && (node.pageId > 0)) marked.add(node);

    for (const child of node.children) includeVisibleSubtree(child, marked);
};

/**
 * `CatalogNavigator.markSearchNodes`: a visible page matches when it holds a matching offer, or its
 * name and localization contain the needle or a matching furni line; a match brings its whole
 * visible subtree, and a page with a match under it comes too. The index root is never a result of
 * its own - it is where the walk starts, and the root's page id is whatever the server writes.
 */
const markSearchNodes = (search: string, furniLines: string[], matchedPageIds: Set<number>, node: ICatalogNode, marked: Set<ICatalogNode>, isRoot: boolean): boolean => {
    const isPage = !isRoot && node.visible && (node.pageId > 0);

    if (isPage && isSearchMatch(search, furniLines, matchedPageIds, node)) {
        includeVisibleSubtree(node, marked);

        return true;
    }

    let childMatched = false;

    for (const child of node.children) {
        if (markSearchNodes(search, furniLines, matchedPageIds, child, marked, false)) childMatched = true;
    }

    if (isPage && childMatched) marked.add(node);

    return childMatched;
};

/** `CatalogNavigator.addSearchNodesToList`: the marked pages in tree order. */
const addSearchNodesToList = (node: ICatalogNode, marked: Set<ICatalogNode>, nodes: ICatalogNode[]) => {
    for (const child of node.children) {
        if (child.visible && marked.has(child)) nodes.push(child);

        addSearchNodesToList(child, marked, nodes);
    }
};

export const useCatalogSearch = () => {
    const [ searchValue, setSearchValue ] = useState('');
    const floorItems = useSystemStore(x => x.floorItems);
    const wallItems = useSystemStore(x => x.wallItems);
    const productData = useSystemStore(x => x.productData);
    const catalogType = useCatalogType();
    const rootNode = useCatalogRootNode();
    const offersToNodes = useCatalogStore(x => x.offersToNodes);
    const { setSearchResult } = useCatalogActions();
    const store = useCatalogStoreApi();
    const { processAsOffer } = useCatalogOfferActions();

    /** `getNodesByOfferId(offerId, true)`: the visible pages the offer is on. */
    const getVisibleOfferNodes = (offerId: number) => (offersToNodes[offerId] ?? []).filter(node => node.visible);

    /**
     * `createSearchResultOffer`: the builders club catalogue finds a furni by its builders club
     * offer only (`bcOfferId`); the normal one by its purchase offer, else its rent offer - each
     * only while a visible page has it.
     */
    const getSearchResultOffer = (furnitureData: IFurnitureData): { offerId: number; isRent: boolean } | undefined => {
        if (catalogType === CatalogTypeEnum.BuildersClub) return ((furnitureData.bcOfferId !== -1) && getVisibleOfferNodes(furnitureData.bcOfferId).length) ? { offerId: furnitureData.bcOfferId, isRent: false } : undefined;

        if ((furnitureData.purchaseOfferId !== -1) && getVisibleOfferNodes(furnitureData.purchaseOfferId).length) return { offerId: furnitureData.purchaseOfferId, isRent: false };

        if ((furnitureData.rentOfferId !== -1) && getVisibleOfferNodes(furnitureData.rentOfferId).length) return { offerId: furnitureData.rentOfferId, isRent: true };

        return undefined;
    };

    useEffect(() => {
        // `normalizeSearchText`.
        const search = searchValue?.toLocaleLowerCase();

        if (!search || !search.length) {
            setSearchResult(undefined);

            return;
        }

        const timeout = setTimeout(() => {
            if (!rootNode) return;

            const furnitureDatas: Record<number, IFurnitureData> = { ...floorItems, ...wallItems };
            const purchasableOffers: IPurchasableOffer[] = [];
            const foundFurniLines: string[] = [];
            const matchedPageIds = new Set<number>();

            for (const furnitureData of Object.values(furnitureDatas)) {
                if (!furnitureData) continue;

                if ((catalogType === CatalogTypeEnum.BuildersClub) && !furnitureData.availableForBuildersClub) continue;

                if ((catalogType === CatalogTypeEnum.Normal) && furnitureData.excludeDynamic) continue;

                // `ensureSearchEntries`: the furni's localized name and its product's name.
                const searchTerms = [ furnitureData.localizedName, productData[furnitureData.className]?.name ?? '' ].map(term => term.toLocaleLowerCase()).filter(term => term.length);

                if (!searchTerms.some(term => term.indexOf(search) >= 0)) continue;

                const found = getSearchResultOffer(furnitureData);

                if (found) {
                    // `addMatchingNodesForOffer`: its pages match, whatever the furni's class.
                    for (const node of getVisibleOfferNodes(found.offerId)) matchedPageIds.add(node.pageId);

                    // `isExcludedFromFurnitureSearchResults`: the builders club's own `bc_` furni.
                    if (furnitureData.className.startsWith('bc_')) continue;

                    const offer = processAsOffer(furnitureData, found.offerId, found.isRent);

                    if (offer) purchasableOffers.push(offer);

                    if (purchasableOffers.length >= MAX_SEARCH_RESULTS) break;
                } else if ((catalogType === CatalogTypeEnum.BuildersClub) && (furnitureData.furniLine !== '')) {
                    const furniLine = furnitureData.furniLine.toLocaleLowerCase();

                    if (foundFurniLines.indexOf(furniLine) < 0) foundFurniLines.push(furniLine);
                }
            }

            const marked = new Set<ICatalogNode>();
            const nodes: ICatalogNode[] = [];

            markSearchNodes(search, foundFurniLines, matchedPageIds, rootNode, marked, true);
            addSearchNodesToList(rootNode, marked, nodes);

            setSearchResult({
                searchValue: search,
                offers: purchasableOffers,
                nodes,
            });

            showCatalogPage(store, -1, 'default_3x3', { imageDatas: [], textDatas: [] }, purchasableOffers, -1, false, CatalogPage.MODE_SEARCH);
        }, 300);

        return () => clearTimeout(timeout);
    }, [ offersToNodes, catalogType, rootNode, searchValue ]);

    return { searchValue, setSearchValue };
};

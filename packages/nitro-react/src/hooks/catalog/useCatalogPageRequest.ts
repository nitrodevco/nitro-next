import { CatalogPageRequestType, CatalogRequestedPageUtilities, ICatalogNode, ICatalogRequestedPage } from '@nitrodevco/nitro-api';
import { useEffect, useRef } from 'react';

import { applyRoomAdExtension } from '#base/commands';
import { getCatalogWindowName, useCatalogActions, useCatalogRootNode, useCatalogStore, useCatalogStoreApi, useCatalogType } from '#base/context/catalog';
import { useWebSocketContext } from '#base/context/communication';
import { useWindowParams } from '#base/context/system';

import { useWindowVisibility } from '../system';
import { useCatalogNavigation } from './useCatalogNavigation';

/**
 * The catalogue window's params acted on: a `pageId`, `pageName` or `offerId` passed to `showWindow`
 * (or a catalogue link) becomes the requested page - a `pageId` with an `offerId` the page with that
 * offer picked - opened once the window is up and the index is
 * in - `HabboCatalog.openCatalogPageById` / `openCatalogPage` / `openCatalogPageByOfferId` - and
 * then cleared. Each index that comes in first shows its first tab (`showIndex`); with nothing
 * requested the front page then loads (`loadFrontPage`), and a window shown again with a page
 * open stays on it, asking for nothing (official, catlab 2026-10-26 Q3, 3/3).
 */
export const useCatalogPageRequest = () => {
    // The window of this store's catalogue type - `catalog` or `builders_catalog`.
    const windowName = getCatalogWindowName(useCatalogType());
    const { isWindowVisible } = useWindowVisibility(windowName);
    const rootNode = useCatalogRootNode();
    const activeNodes = useCatalogStore(x => x.activeNodes);
    const requestedPage = useCatalogStore(x => x.requestedPage);
    const { showIndex, loadFrontPage, openPageById, openPageByName, openPageByOfferId } = useCatalogNavigation();
    // The index whose first tab was shown (`onCatalogIndex` -> `showIndex`, once per index that comes in).
    const shownIndex = useRef<ICatalogNode>(undefined);
    const { setRequestedPage } = useCatalogActions();
    const store = useCatalogStoreApi();
    const { send } = useWebSocketContext();

    const params = useWindowParams(windowName);

    useEffect(() => {
        let requestedPage: ICatalogRequestedPage | undefined;

        if (params.pageId !== undefined) {
            requestedPage = CatalogRequestedPageUtilities.getForPageId(params.pageId);
        }

        if (params.pageName !== undefined) {
            requestedPage = CatalogRequestedPageUtilities.getForPageName(params.pageName);
        }

        // A page id and an offer id: the page, with the offer picked on it (`openCatalogPageById`).
        if (params.offerId !== undefined) {
            requestedPage = (params.pageId !== undefined) ? { ...CatalogRequestedPageUtilities.getForPageId(params.pageId), offerId: params.offerId } : CatalogRequestedPageUtilities.getForOfferId(params.offerId);
        }

        // `openRoomAdCatalogPageInExtendedMode`: the purchase data is written before the page opens.
        if (params.roomAdExtension) applyRoomAdExtension(send, store, params.roomAdExtension);

        if (!requestedPage) return;

        setRequestedPage(requestedPage);
    }, [ params ]);

    useEffect(() => {
        if (!isWindowVisible || !rootNode || !requestedPage) return;

        const newIndex = (shownIndex.current !== rootNode);

        if (newIndex) {
            shownIndex.current = rootNode;

            showIndex();
        }

        switch (requestedPage.type) {
            case CatalogPageRequestType.None: {
                // `onCatalogIndex` loads the front page after a new index; a window shown again
                // only when nothing is open yet. Not `activePage`: a requested page is still on its
                // way from the server when the request is cleared, and the front page would replace it.
                if (!newIndex && activeNodes.length) return;

                loadFrontPage();

                return;
            }
            case CatalogPageRequestType.PageId: {
                if (requestedPage.pageId !== undefined) openPageById(requestedPage.pageId, requestedPage.offerId);
                setRequestedPage(CatalogRequestedPageUtilities.getEmpty());
                return;
            }
            case CatalogPageRequestType.PageName: {
                if (requestedPage.pageName !== undefined) openPageByName(requestedPage.pageName);
                setRequestedPage(CatalogRequestedPageUtilities.getEmpty());
                return;
            }
            case CatalogPageRequestType.OfferId: {
                if (requestedPage.offerId !== undefined) openPageByOfferId(requestedPage.offerId);
                setRequestedPage(CatalogRequestedPageUtilities.getEmpty());
                return;
            }
        }
    }, [ isWindowVisible, rootNode, requestedPage ]);
};

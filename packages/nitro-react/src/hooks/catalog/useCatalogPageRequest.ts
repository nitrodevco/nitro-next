import { CatalogPageRequestType, CatalogRequestedPageUtilities, ICatalogRequestedPage } from '@nitrodevco/nitro-api';
import { useEffect } from 'react';

import { getCatalogWindowName, useCatalogActions, useCatalogStore } from '#base/context/catalog';
import { useWindowParams } from '#base/context/system';

import { useWindowVisibility } from '../system';
import { useCatalogNavigation } from './useCatalogNavigation';

export const useCatalogPageRequest = () => {
    // The window of this store's catalogue type - `catalog` or `builders_catalog`.
    const windowName = getCatalogWindowName(useCatalogStore(x => x.catalogType));
    const { isWindowVisible } = useWindowVisibility(windowName);
    const rootNode = useCatalogStore(x => x.rootNode);
    const activePage = useCatalogStore(x => x.activePage);
    const requestedPage = useCatalogStore(x => x.requestedPage);
    const { activateNode, openPageById, openPageByName, openPageByOfferId } = useCatalogNavigation();
    const { setRequestedPage } = useCatalogActions();

    const params = useWindowParams(windowName);

    useEffect(() => {
        let requestedPage: ICatalogRequestedPage | undefined;

        if (params.pageId !== undefined) {
            requestedPage = CatalogRequestedPageUtilities.getForPageId(params.pageId);
        }

        if (params.pageName !== undefined) {
            requestedPage = CatalogRequestedPageUtilities.getForPageName(params.pageName);
        }

        if (params.offerId !== undefined) {
            requestedPage = CatalogRequestedPageUtilities.getForOfferId(params.offerId);
        }

        if (!requestedPage) return;

        setRequestedPage(requestedPage);
    }, [ params ]);

    useEffect(() => {
        if (!isWindowVisible || !rootNode || !requestedPage) return;

        switch (requestedPage.type) {
            case CatalogPageRequestType.None: {
                if (activePage) return;

                if (rootNode.children.length > 0) for (const child of rootNode.children) {
                    if (child.visible) {
                        activateNode(child);

                        return;
                    }
                }

                return;
            }
            case CatalogPageRequestType.PageId: {
                if (requestedPage.pageId !== undefined) openPageById(requestedPage.pageId);
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

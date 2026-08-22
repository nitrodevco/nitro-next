import { BuildersClubQueryFurniCountComposer, GetCatalogIndexComposer, GetClubGiftInfoComposer, GetGiftWrappingConfigurationComposer } from "@nitrodevco/nitro-packets";
import { useEffect } from "react";

import { useCatalogSelectors, useIsWindowVisible, useWebSocketContext } from "#base/context";
import { useCatalogMessages, useCatalogNavigation, useCatalogPageRequest, useCatalogVisibility, useLinkEventTracker } from "#base/hooks";
import { CatalogView } from "#base/views/catalog/CatalogView";

export const CatalogComponent = () => {
    const isVisible = useIsWindowVisible('catalog');
    const { catalogType, rootNode } = useCatalogSelectors();
    const { send } = useWebSocketContext();
    const { openPageByName } = useCatalogNavigation();
    const { showCatalog } = useCatalogVisibility();

    useCatalogMessages();
    useCatalogPageRequest();

    /*
     * HabboCatalog.linkReceived, linkPattern "catalog/": open/<pageName> opens that
     * page, bare open just opens the catalog (warehouse/club_buy not built yet)
     */
    useLinkEventTracker('catalog/', url => {
        const parts = url.split('/');

        if (parts.length < 2 || parts[1] !== 'open') return;

        if (parts.length > 2) openPageByName(parts[2]);
        else showCatalog();
    });

    useEffect(() => {
        if (!isVisible || rootNode) return;

        send(new GetGiftWrappingConfigurationComposer({}), new GetClubGiftInfoComposer({}), new GetCatalogIndexComposer({ catalogType }), new BuildersClubQueryFurniCountComposer({}));
    }, [isVisible, rootNode, catalogType]);

    if (!isVisible) return null;

    return <CatalogView />;
}

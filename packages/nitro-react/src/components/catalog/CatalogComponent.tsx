import { BuildersClubQueryFurniCountComposer, GetCatalogIndexComposer, GetClubGiftInfoComposer, GetGiftWrappingConfigurationComposer } from "@nitrodevco/nitro-packets";
import { useEffect } from "react";

import { useCatalogSelectors, useIsWindowVisible, useWebSocketContext } from "#base/context";
import { createLinkEvent, useCatalogMessages, useCatalogNavigation, useCatalogPageRequest, useCatalogVisibility, useLinkEventTracker } from "#base/hooks";
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

        if (parts.length < 2) return;

        if (parts[1] === 'open') {
            if (parts.length > 2) openPageByName(parts[2]);
            else showCatalog();
        } else if (parts[1] === 'club_buy') {
            /* openClubCenter — forwards to the HC center UI (not built yet) */
            createLinkEvent('habboUI/open/hccenter');
        }
    });

    useEffect(() => {
        if (!isVisible || rootNode) return;

        send(new GetGiftWrappingConfigurationComposer({}), new GetClubGiftInfoComposer({}), new GetCatalogIndexComposer({ catalogType }), new BuildersClubQueryFurniCountComposer({}));
    }, [isVisible, rootNode, catalogType]);

    if (!isVisible) return null;

    return <CatalogView />;
}

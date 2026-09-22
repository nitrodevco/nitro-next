import { BuildersClubQueryFurniCountComposer, GetCatalogIndexComposer } from '@nitrodevco/nitro-packets';
import { useEffect } from 'react';

import { useCatalogStore, useCatalogStoreApi } from '#base/context/catalog';
import { useWebSocketContext } from '#base/context/communication';
import { useIsWindowVisible } from '#base/context/system';
import { bridgeCatalogRoomChanged, registerCatalogBuildersClubHandlers, registerCatalogHandlers } from '#base/handlers';
import { useCatalogPageRequest, useCatalogPurchaseFlow, useRegisterHandlers } from '#base/hooks';
import { CatalogView } from '#base/views/catalog/CatalogView';

/**
 * The Builders Club catalogue's mount - Flash's `BUILDERS_CLUB` `CatalogWindowState`, inside the
 * provider of its own store (`CatalogWrapper`). It registers the catalogue's own packets
 * (`registerCatalogHandlers`, which keep to this store's catalogue type), the Builders Club
 * membership and furni count, and the room-changed bridge; the listeners of the normal
 * catalogue's pages (club, pets, guilds, media, room ads, bundles, limited editions) stay with that
 * window, as none of its layouts is a Builders Club page. The first time the window opens it asks
 * for its index (`toggleCatalog` -> `refreshCatalogIndex("BUILDERS_CLUB")`) and the furni count
 * (`init`'s `BuildersClubQueryFurniCount`), then shows the window - `catalog_ubuntu`, which
 * `CatalogView` draws for this catalogue type.
 */
export const CatalogBuildersClubComponent = () => {
    const isVisible = useIsWindowVisible('builders_catalog');
    const catalogType = useCatalogStore(x => x.catalogType);
    const rootNode = useCatalogStore(x => x.rootNode);
    const store = useCatalogStoreApi();
    const { send } = useWebSocketContext();

    useRegisterHandlers(socket => registerCatalogHandlers(store, socket));
    useRegisterHandlers(socket => registerCatalogBuildersClubHandlers(store, socket));
    useRegisterHandlers(() => bridgeCatalogRoomChanged(store));
    useCatalogPageRequest();
    // A builders club offer dragged into the room is bought by placing it (`onObjectPlacedInRoom`).
    useCatalogPurchaseFlow();

    useEffect(() => {
        if (!isVisible || rootNode) return;

        send(new GetCatalogIndexComposer({ catalogType }), new BuildersClubQueryFurniCountComposer({}));
    }, [ isVisible, rootNode, catalogType ]);

    if (!isVisible) return null;

    return <CatalogView />;
};

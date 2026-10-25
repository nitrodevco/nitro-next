import { RoomEngineObjectEvent } from '@nitrodevco/nitro-api';
import { BuildersClubQueryFurniCountComposer, GetCatalogIndexComposer } from '@nitrodevco/nitro-packets';
import { useEffect, useRef } from 'react';

import { useCatalogRootNode, useCatalogStoreApi, useCatalogType } from '#base/context/catalog';
import { useWebSocketContext } from '#base/context/communication';
import { useConfigBoolean, useIsWindowVisible } from '#base/context/system';
import { bridgeCatalogRoomChanged, registerCatalogBuildersClubHandlers, registerCatalogHandlers } from '#base/handlers';
import { useCatalogPageRequest, useCatalogPurchaseFlow, useRegisterHandlers, useRoomEventDispatcher } from '#base/hooks';
import { CatalogView } from '#base/views/catalog/CatalogView';

/**
 * The Builders Club catalogue's mount - Flash's `BUILDERS_CLUB` `CatalogWindowState`, inside the
 * provider of its own store (`CatalogWrapper`). It registers the catalogue's own packets
 * (`registerCatalogHandlers`, which keep to this store's catalogue type), the Builders Club
 * membership and furni count, and the room-changed bridge; the listeners of the normal
 * catalogue's pages (club, pets, guilds, media, room ads, bundles, limited editions) stay with that
 * window, as none of its layouts is a Builders Club page. Until its index is in, it asks for it
 * (`refreshCatalogIndex("BUILDERS_CLUB")`) and, the first time, for the furni count (`init`'s
 * `BuildersClubQueryFurniCount`): when the window opens (`toggleCatalog`), and when anything in the
 * room is selected while `builders.club.enabled` is on (`onObjectSelected`), so the infostand
 * knows the membership before the catalogue was ever opened. Then it shows the window -
 * `catalog_ubuntu`, which `CatalogView` draws for this catalogue type.
 */
export const CatalogBuildersClubComponent = () => {
    const isVisible = useIsWindowVisible('builders_catalog');
    const catalogType = useCatalogType();
    const rootNode = useCatalogRootNode();
    const buildersClubEnabled = useConfigBoolean('builders.club.enabled');
    const store = useCatalogStoreApi();
    const { send } = useWebSocketContext();
    const furniCountRequested = useRef(false);

    useRegisterHandlers(socket => registerCatalogHandlers(store, socket));
    useRegisterHandlers(socket => registerCatalogBuildersClubHandlers(store, socket));
    useRegisterHandlers(() => bridgeCatalogRoomChanged(store));
    useCatalogPageRequest();
    // A builders club offer dragged into the room is bought by placing it (`onObjectPlacedInRoom`).
    useCatalogPurchaseFlow();

    const requestIndex = () => {
        send(new GetCatalogIndexComposer({ catalogType }));

        if (furniCountRequested.current) return;

        furniCountRequested.current = true;
        send(new BuildersClubQueryFurniCountComposer({}));
    };

    useRoomEventDispatcher(RoomEngineObjectEvent.SELECTED, () => {
        if (buildersClubEnabled && !rootNode) requestIndex();
    });

    useEffect(() => {
        if (!isVisible || rootNode) return;

        requestIndex();
    }, [ isVisible, rootNode, catalogType ]);

    if (!isVisible) return null;

    return <CatalogView />;
};

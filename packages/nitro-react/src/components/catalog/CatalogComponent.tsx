import { BuildersClubQueryFurniCountComposer, GetCatalogIndexComposer, GetClubGiftInfoComposer, GetGiftWrappingConfigurationComposer } from '@nitrodevco/nitro-packets';
import { useEffect } from 'react';

import { useCatalogStore } from '#base/context/catalog';
import { useWebSocketContext } from '#base/context/communication';
import { useIsWindowVisible } from '#base/context/system';
import { useCatalogMessages, useCatalogPageRequest } from '#base/hooks';
import { CatalogView } from '#base/views/catalog/CatalogView';

export const CatalogComponent = () => {
    const isVisible = useIsWindowVisible('catalog');
    const catalogType = useCatalogStore(x => x.catalogType);
    const rootNode = useCatalogStore(x => x.rootNode);
    const { send } = useWebSocketContext();

    useCatalogMessages();
    useCatalogPageRequest();

    useEffect(() => {
        if (!isVisible || rootNode) return;

        send(new GetGiftWrappingConfigurationComposer({}), new GetClubGiftInfoComposer({}), new GetCatalogIndexComposer({ catalogType }), new BuildersClubQueryFurniCountComposer({}));
    }, [ isVisible, rootNode, catalogType ]);

    if (!isVisible) return null;

    return <CatalogView />;
};

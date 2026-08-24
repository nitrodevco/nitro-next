import { BuildersClubQueryFurniCountComposer, GetCatalogIndexComposer, GetClubGiftInfoComposer, GetGiftWrappingConfigurationComposer } from '@nitrodevco/nitro-packets';
import { useEffect } from 'react';

import { useCatalogSelectors, useIsWindowVisible, useWebSocketContext } from '#base/context';
import { useCatalogMessages, useCatalogPageRequest } from '#base/hooks';
import { CatalogView } from '#base/views/catalog/CatalogView';

export const CatalogComponent = () => {
    const isVisible = useIsWindowVisible('catalog');
    const { catalogType, rootNode } = useCatalogSelectors();
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

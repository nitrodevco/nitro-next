import { useCatalogSelectors } from '#base/context';

import { CatalogLayoutDefaultView } from './layouts/CatalogLayoutDefaultView';

/** Pixi port of views/catalog/page/CatalogActivePage.tsx. */
export const CatalogActivePagePixi = () => {
    const { activePage } = useCatalogSelectors();

    if (!activePage) return null;

    switch (activePage.layoutCode) {
        case 'default_3x3': {
            return <CatalogLayoutDefaultView />;
        }
    }

    return null;
};

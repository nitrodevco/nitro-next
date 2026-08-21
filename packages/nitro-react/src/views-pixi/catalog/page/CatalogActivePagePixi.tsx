import { useCatalogSelectors } from '#base/context';

import { CatalogLayoutDefaultViewPixi } from './layouts/CatalogLayoutDefaultViewPixi';

/** Pixi port of views/catalog/page/CatalogActivePage.tsx. */
export const CatalogActivePagePixi = () => {
    const { activePage } = useCatalogSelectors();

    if (!activePage) return null;

    switch (activePage.layoutCode) {
        case 'default_3x3': {
            return <CatalogLayoutDefaultViewPixi />;
        }
    }

    return null;
};

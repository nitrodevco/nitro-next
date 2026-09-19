import { useCatalogStore } from '#base/context/catalog';

import { CatalogLayoutDefaultView } from './layouts/CatalogLayoutDefaultView';

/** Pixi port of views/catalog/page/CatalogActivePage.tsx. */
export const CatalogActivePage = () => {
    const activePage = useCatalogStore(x => x.activePage);

    if (!activePage) return null;

    switch (activePage.layoutCode) {
        case 'default_3x3': {
            return <CatalogLayoutDefaultView />;
        }
    }

    return null;
};

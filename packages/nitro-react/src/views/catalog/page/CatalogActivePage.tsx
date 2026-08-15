import { useCatalogSelectors } from "#base/context";

import { CatalogLayoutDefaultView } from "./layouts/CatalogLayoutDefaultView";

export const CatalogActivePage = () => {
    const { activePage } = useCatalogSelectors();

    if (!activePage) return null;

    switch (activePage.layoutCode) {
        case 'default_3x3': {
            return <CatalogLayoutDefaultView />;
        }
        case 'default_3x3_color_grouping': {
            return <CatalogLayoutDefaultView />;
        }
        default: {
            if (activePage.offers.length) return <CatalogLayoutDefaultView />;

            return null;
        }
    }
}

import { BoxLayout, Region } from '#base/theme';

import { CatalogPromoLayoutCatalogPromo, CatalogPromoLayoutCatalogPromoProps } from './CatalogPromoLayoutCatalogPromo';

/** Generated from `69_catalog_promo_xml` (layout "catalog_promo", 507x188) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CatalogPromoLayoutProps {
    catalogPromo?: CatalogPromoLayoutCatalogPromoProps;
    layout?: BoxLayout;
}

export const CatalogPromoLayout = ({ catalogPromo, layout }: CatalogPromoLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 507, height: 188, ...layout }}>
            <CatalogPromoLayoutCatalogPromo {...catalogPromo} />
        </Region>
    );
};

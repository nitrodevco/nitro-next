import { BoxLayout, Region } from '#base/theme';

import { CatalogVolterLayoutCatalogMainContainer, CatalogVolterLayoutCatalogMainContainerProps } from './CatalogVolterLayoutCatalogMainContainer';

/** Generated from `1659_catalog_volter_xml` (layout "catalog_volter", 550x516) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CatalogVolterLayoutProps {
    catalogMainContainer?: CatalogVolterLayoutCatalogMainContainerProps;
    layout?: BoxLayout;
}

export const CatalogVolterLayout = ({ catalogMainContainer, layout }: CatalogVolterLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 550, height: 516, ...layout }}>
            <CatalogVolterLayoutCatalogMainContainer {...catalogMainContainer} />
        </Region>
    );
};

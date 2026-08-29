import { BoxLayout, Region } from '#base/theme';

import { ProductViewWidgetLayoutMainContainer, ProductViewWidgetLayoutMainContainerProps } from './ProductViewWidgetLayoutMainContainer';

/** Generated from `1555_productViewWidget_xml` (layout "productViewWidget", 360x348) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ProductViewWidgetLayoutProps {
    layout?: BoxLayout;
    mainContainer?: ProductViewWidgetLayoutMainContainerProps;
}

export const ProductViewWidgetLayout = ({ layout, mainContainer }: ProductViewWidgetLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 348, ...layout }}>
            <ProductViewWidgetLayoutMainContainer {...mainContainer} />
        </Region>
    );
};

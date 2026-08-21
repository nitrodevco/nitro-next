import { Box } from '#base/theme-pixi';

import { CatalogItemGridWidgetViewPixi } from '../widgets/CatalogItemGridWidgetViewPixi';
import { CatalogProductViewWidgetViewPixi } from '../widgets/CatalogProductViewWidgetViewPixi';
import { CatalogPurchaseWidgetViewPixi } from '../widgets/CatalogPurchaseWidgetViewPixi';
import { CatalogSpinnerWidgetViewPixi } from '../widgets/CatalogSpinnerWidgetViewPixi';
import { CatalogTotalPriceWidgetViewPixi } from '../widgets/CatalogTotalPriceWidgetViewPixi';

/** Pixi port of views/catalog/page/layouts/CatalogLayoutDefaultView.tsx. */
export const CatalogLayoutDefaultViewPixi = () => (
    <>
        <Box layout={{ minHeight: 240, maxHeight: 240, width: '100%' }}>
            <CatalogProductViewWidgetViewPixi />
        </Box>
        <Box layout={{ minHeight: 0, flex: 1, width: '100%' }}>
            <CatalogItemGridWidgetViewPixi />
        </Box>
        <Box layout={{ flexDirection: 'column', alignItems: 'flex-end', minHeight: 55, maxHeight: 55, width: '100%', gap: 4, paddingLeft: 6, paddingRight: 6 }}>
            <Box layout={{ flexDirection: 'row', width: '100%', gap: 8 }}>
                <CatalogSpinnerWidgetViewPixi />
                <CatalogTotalPriceWidgetViewPixi />
            </Box>
            <CatalogPurchaseWidgetViewPixi />
        </Box>
    </>
);

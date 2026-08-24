import { Box } from '#base/theme-pixi';

import { CatalogItemGridWidgetView } from '../widgets/CatalogItemGridWidgetView';
import { CatalogProductViewWidgetView } from '../widgets/CatalogProductViewWidgetView';
import { CatalogPurchaseWidgetView } from '../widgets/CatalogPurchaseWidgetView';
import { CatalogSpinnerWidgetView } from '../widgets/CatalogSpinnerWidgetView';
import { CatalogTotalPriceWidgetView } from '../widgets/CatalogTotalPriceWidgetView';

/** Pixi port of views/catalog/page/layouts/CatalogLayoutDefaultView.tsx. */
export const CatalogLayoutDefaultView = () => (
    <>
        <Box layout={{ minHeight: 240, maxHeight: 240, width: '100%' }}>
            <CatalogProductViewWidgetView />
        </Box>
        <Box layout={{ minHeight: 0, flex: 1, width: '100%' }}>
            <CatalogItemGridWidgetView />
        </Box>
        <Box layout={{ flexDirection: 'column', alignItems: 'flex-end', minHeight: 55, maxHeight: 55, width: '100%', gap: 4, paddingLeft: 6, paddingRight: 6 }}>
            <Box layout={{ flexDirection: 'row', width: '100%', gap: 8 }}>
                <CatalogSpinnerWidgetView />
                <CatalogTotalPriceWidgetView />
            </Box>
            <CatalogPurchaseWidgetView />
        </Box>
    </>
);

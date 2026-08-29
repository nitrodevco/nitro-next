import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';
import { CatalogWidgetFlags } from '#base/views/layouts/layoutAssets';

/**
 * Catalog widget `bundlePurchaseExtraInfoWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutDefault_1725Layout); each passes its own placement through `layout`.
 */
/** Named region `bundlePurchaseExtraInfoWidget` of BundlePurchaseExtraInfoWidget - configured through the parent's `bundlePurchaseExtraInfoWidget` prop. */
export interface BundlePurchaseExtraInfoWidgetProps extends CatalogWidgetFlags {
    bundlePurchaseExtraInfoWidget?: ReactNode;
    layout?: BoxLayout;
}

export const BundlePurchaseExtraInfoWidget = ({ bundlePurchaseExtraInfoWidget, layout }: BundlePurchaseExtraInfoWidgetProps) => {
    return (
        <Region
            name="bundlePurchaseExtraInfoWidget"
            layout={{ position: 'absolute', ...layout }}
        >
            {bundlePurchaseExtraInfoWidget}
        </Region>
    );
};

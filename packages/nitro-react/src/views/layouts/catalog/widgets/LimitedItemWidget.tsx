import { ReactNode } from 'react';

import { BoxLayout, Region, WidgetSlot } from '#base/theme';
import { CatalogWidgetFlags } from '#base/views/layouts/layoutAssets';

/**
 * Catalog widget `limitedItemWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 2 pages
 * (LayoutBadgeDisplay_1669Layout, LayoutDefault_1595Layout); each passes its own placement through `layout`.
 */
/** Named region `limitedItemWidget` of LimitedItemWidget - configured through the parent's `limitedItemWidget` prop. */
export interface LimitedItemWidgetProps extends CatalogWidgetFlags {
    layout?: BoxLayout;
    uniqueItemOverlayContainer?: ReactNode;
}

export const LimitedItemWidget = ({ layout, uniqueItemOverlayContainer }: LimitedItemWidgetProps) => {
    return (
        <Region
            name="limitedItemWidget"
            layout={{ position: 'absolute', ...layout }}
        >
            <WidgetSlot
                widgetType="limited_item_overlay_supply"
                name="unique_item_overlay_container"
                layout={{ position: 'absolute', left: 0, width: 200, top: 0, height: 40 }}
            >
                {uniqueItemOverlayContainer}
            </WidgetSlot>
        </Region>
    );
};

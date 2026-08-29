import { ReactNode } from 'react';

import { BoxLayout, Region, WidgetSlot } from '#base/theme';
import { CatalogWidgetFlags } from '#base/views/layouts/layoutAssets';

/**
 * Catalog widget `limitedItemWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutBadgeDisplay_1641Layout); each passes its own placement through `layout`.
 */
/** Named region `limitedItemWidget` of LimitedItemWidget3 - configured through the parent's `limitedItemWidget` prop. */
export interface LimitedItemWidget3Props extends CatalogWidgetFlags {
    layout?: BoxLayout;
    uniqueItemOverlayContainer?: ReactNode;
}

export const LimitedItemWidget3 = ({ layout, uniqueItemOverlayContainer }: LimitedItemWidget3Props) => {
    return (
        <Region
            name="limitedItemWidget"
            layout={{ position: 'absolute', ...layout }}
        >
            <WidgetSlot
                widgetType="limited_item_overlay_supply"
                name="unique_item_overlay_container"
                layout={{ position: 'absolute', left: 0, width: 200, top: 0, bottom: -10 }}
            >
                {uniqueItemOverlayContainer}
            </WidgetSlot>
        </Region>
    );
};

import { BoxLayout, Region, WidgetSlot } from '#base/theme';

/**
 * Catalog widget `limitedItemWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutDefault_1725Layout); each passes its own placement through `layout`.
 */
/** Named region `limitedItemWidget` of LimitedItemWidget2 - configured through the parent's `limitedItemWidget` prop. */
export interface LimitedItemWidget2Props {
    layout?: BoxLayout;
    tags?: string[];
    visibleLimitedItemWidget?: boolean;
}

export const LimitedItemWidget2 = ({ layout, tags, visibleLimitedItemWidget }: LimitedItemWidget2Props) => {
    return (
        <Region
            name="limitedItemWidget"
            tags={tags}
            visible={visibleLimitedItemWidget ?? false}
            layout={{ position: 'absolute', ...layout }}
        >
            <WidgetSlot
                widgetType="limited_item_overlay_supply"
                name="unique_item_overlay_container"
                layout={{ position: 'absolute', left: 0, width: 200, top: 0, height: 40 }}
            />
        </Region>
    );
};

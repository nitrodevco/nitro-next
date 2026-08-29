import { BoxLayout, Region, WidgetSlot } from '#base/theme';

/**
 * Catalog widget `addOnBadgeViewWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (AddOnBadgeViewWidgetLayout); each passes its own placement through `layout`.
 */
/** Named region `addOnBadgeViewWidget` of AddOnBadgeViewWidget2 - configured through the parent's `addOnBadgeViewWidget` prop. */
export interface AddOnBadgeViewWidget2Props {
    layout?: BoxLayout;
    tags?: string[];
}

export const AddOnBadgeViewWidget2 = ({ layout, tags }: AddOnBadgeViewWidget2Props) => {
    return (
        <Region
            name="addOnBadgeViewWidget"
            tags={tags}
            layout={{ position: 'absolute', ...layout }}
        >
            <WidgetSlot
                widgetType="badge_image"
                name="badge"
                layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 40 }}
            />
        </Region>
    );
};

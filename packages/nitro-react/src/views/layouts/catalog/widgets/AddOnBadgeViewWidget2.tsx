import { BoxLayout, Region, WidgetSlot } from '#base/theme';
import { CatalogWidgetFlags } from '#base/views/layouts/layoutAssets';

/**
 * Catalog widget `addOnBadgeViewWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (AddOnBadgeViewWidgetLayout); each passes its own placement through `layout`.
 */
/** Named region `addOnBadgeViewWidget` of AddOnBadgeViewWidget2 - configured through the parent's `addOnBadgeViewWidget` prop. */
export interface AddOnBadgeViewWidget2Props extends CatalogWidgetFlags {
    layout?: BoxLayout;
}

export const AddOnBadgeViewWidget2 = ({ layout }: AddOnBadgeViewWidget2Props) => {
    return (
        <Region
            name="addOnBadgeViewWidget"
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

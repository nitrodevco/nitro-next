import { BoxLayout, Region } from '#base/theme';
import { CatalogWidgetFlags } from '#base/views/layouts/layoutAssets';

/**
 * Catalog widget `simplePriceWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutGuildForumLayout); each passes its own placement through `layout`.
 */
/** Named region `simplePriceWidget` of SimplePriceWidget2 - configured through the parent's `simplePriceWidget` prop. */
export interface SimplePriceWidget2Props extends CatalogWidgetFlags {
    layout?: BoxLayout;
}

export const SimplePriceWidget2 = ({ layout }: SimplePriceWidget2Props) => {
    return (
        <Region
            name="simplePriceWidget"
            layout={{ position: 'absolute', ...layout }}
        />
    );
};

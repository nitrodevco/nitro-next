import { BoxLayout, Region } from '#base/theme';
import { CatalogWidgetFlags } from '#base/views/layouts/layoutAssets';

/**
 * Catalog widget `simplePriceWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 2 pages
 * (LayoutSingleBundle_1587Layout, LayoutSingleBundle_1643Layout); each passes its own placement through `layout`.
 */
/** Named region `fake_productimage` of SimplePriceWidget - configured through the parent's `fakeProductimage` prop. */
export interface SimplePriceWidgetFakeProductimageProps {
    layout?: BoxLayout;
}

export const SimplePriceWidgetFakeProductimage = ({ layout }: SimplePriceWidgetFakeProductimageProps) => {
    return (
        <Region
            name="fake_productimage"
            layout={{ position: 'absolute', left: 0, width: 83, top: 0, height: 30, ...layout }}
        />
    );
};

/** Named region `simplePriceWidget` of SimplePriceWidget - configured through the parent's `simplePriceWidget` prop. */
export interface SimplePriceWidgetProps extends CatalogWidgetFlags {
    fakeProductimage?: SimplePriceWidgetFakeProductimageProps;
    layout?: BoxLayout;
}

export const SimplePriceWidget = ({ fakeProductimage, layout }: SimplePriceWidgetProps) => {
    return (
        <Region
            name="simplePriceWidget"
            layout={{ position: 'absolute', ...layout }}
        >
            <SimplePriceWidgetFakeProductimage {...fakeProductimage} />
        </Region>
    );
};

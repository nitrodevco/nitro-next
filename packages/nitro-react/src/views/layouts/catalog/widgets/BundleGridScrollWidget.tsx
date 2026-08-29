import { BoxLayout, Region, ScrollArea } from '#base/theme';
import { CatalogWidgetFlags } from '#base/views/layouts/layoutAssets';

/**
 * Catalog widget `bundleGridScrollWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutSingleBundle_1643Layout); each passes its own placement through `layout`.
 */
/** Named region `bundleGrid` of BundleGridScrollWidget - configured through the parent's `bundleGrid` prop. */
export interface BundleGridScrollWidgetBundleGridProps {
    layout?: BoxLayout;
}

export const BundleGridScrollWidgetBundleGrid = ({ layout }: BundleGridScrollWidgetBundleGridProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, width: 176, top: 0, height: 157, ...layout }}
        >
            <Region
                name="bundleGrid"
                layout={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}
            />
        </ScrollArea>
    );
};

/** Named region `bundleGridScrollWidget` of BundleGridScrollWidget - configured through the parent's `bundleGridScrollWidget` prop. */
export interface BundleGridScrollWidgetProps extends CatalogWidgetFlags {
    bundleGrid?: BundleGridScrollWidgetBundleGridProps;
    layout?: BoxLayout;
}

export const BundleGridScrollWidget = ({ bundleGrid, layout }: BundleGridScrollWidgetProps) => {
    return (
        <Region
            name="bundleGridScrollWidget"
            layout={{ position: 'absolute', ...layout }}
        >
            <BundleGridScrollWidgetBundleGrid {...bundleGrid} />
        </Region>
    );
};

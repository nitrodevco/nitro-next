import { BoxLayout, Region } from '#base/theme';
import { SpecialInfoWidgetLayout, SpecialInfoWidgetLayoutProps } from '#base/views/layouts/catalog/widgets/SpecialInfoWidgetLayout';
import { CatalogWidgetFlags } from '#base/views/layouts/layoutAssets';

/**
 * Catalog widget `specialInfoWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 10 pages
 * (LayoutBadgeDisplay_1641Layout, LayoutBadgeDisplay_1669Layout, LayoutDefault_1595Layout, LayoutDefault_1725Layout, LayoutGuildCustomFurni_1586Layout, LayoutGuildCustomFurni_1680Layout, …); each passes its own placement through `layout`.
 */
export type SpecialInfoWidgetProps = Omit<SpecialInfoWidgetLayoutProps, 'layout'> & CatalogWidgetFlags & { layout?: BoxLayout };

export const SpecialInfoWidget = ({ layout, ...widget }: SpecialInfoWidgetProps) => {
    return (
        <Region
            name="specialInfoWidget"
            layout={{ position: 'absolute', ...layout }}
        >
            <SpecialInfoWidgetLayout
                {...widget}
                layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
            />
        </Region>
    );
};

import { BoxLayout, Region } from '#base/theme';
import { PurchaseWidgetLayout, PurchaseWidgetLayoutProps } from '#base/views/layouts/catalog/widgets/PurchaseWidgetLayout';
import { CatalogWidgetFlags } from '#base/views/layouts/layoutAssets';

/**
 * Catalog widget `purchaseWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 20 pages
 * (LayoutBadgeDisplay_1641Layout, LayoutBadgeDisplay_1669Layout, LayoutDefault_1595Layout, LayoutDefault_1725Layout, LayoutGuildCustomFurni_1586Layout, LayoutGuildCustomFurni_1680Layout, …); each passes its own placement through `layout`.
 */
export type PurchaseWidgetProps = Omit<PurchaseWidgetLayoutProps, 'layout'> & CatalogWidgetFlags & { layout?: BoxLayout };

export const PurchaseWidget = ({ layout, ...widget }: PurchaseWidgetProps) => {
    return (
        <Region
            name="purchaseWidget"
            layout={{ position: 'absolute', ...layout }}
        >
            <PurchaseWidgetLayout
                {...widget}
                layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
            />
        </Region>
    );
};

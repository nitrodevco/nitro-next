import { BoxLayout, Region } from '#base/theme';
import { PurchaseWidgetLayout, PurchaseWidgetLayoutProps } from '#base/views/layouts/catalog/PurchaseWidgetLayout';

/**
 * Catalog widget `purchaseWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 10 pages
 * (LayoutBadgeDisplay_1669Layout, LayoutDefault_1595Layout, LayoutGuildCustomFurni_1680Layout, LayoutPetcustomization_1656Layout, LayoutSingleBundle_1587Layout, LayoutSoundmachine_1627Layout, …); each passes its own placement through `layout`.
 */
export type PurchaseWidgetProps = Omit<PurchaseWidgetLayoutProps, 'layout'> & { layout?: BoxLayout };

export const PurchaseWidget = ({ layout, ...widget }: PurchaseWidgetProps) => {
    return (
        <Region
            name="purchaseWidget"
            params={1040}
            layout={{ position: 'absolute', ...layout }}
        >
            <PurchaseWidgetLayout
                {...widget}
                layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
            />
        </Region>
    );
};

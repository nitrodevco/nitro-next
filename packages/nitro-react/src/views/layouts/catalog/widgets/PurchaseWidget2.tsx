import { BoxLayout, Region } from '#base/theme';
import { PurchaseWidgetLayout, PurchaseWidgetLayoutProps } from '#base/views/layouts/catalog/PurchaseWidgetLayout';

/**
 * Catalog widget `purchaseWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 10 pages
 * (LayoutBadgeDisplay_1641Layout, LayoutDefault_1725Layout, LayoutGuildCustomFurni_1586Layout, LayoutPetcustomization_1713Layout, LayoutSingleBundle_1643Layout, LayoutSoundmachine_1654Layout, …); each passes its own placement through `layout`.
 */
export type PurchaseWidget2Props = Omit<PurchaseWidgetLayoutProps, 'layout'> & { layout?: BoxLayout };

export const PurchaseWidget2 = ({ layout, ...widget }: PurchaseWidget2Props) => {
    return (
        <Region
            name="purchaseWidget"
            params={16}
            layout={{ position: 'absolute', ...layout }}
        >
            <PurchaseWidgetLayout
                {...widget}
                layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
            />
        </Region>
    );
};

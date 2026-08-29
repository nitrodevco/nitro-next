import { BoxLayout, Region } from '#base/theme';
import { PurchaseWidgetLayout, PurchaseWidgetLayoutProps } from '#base/views/layouts/catalog/PurchaseWidgetLayout';

/**
 * Catalog widget `purchaseWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutGuildForumLayout); each passes its own placement through `layout`.
 */
export type PurchaseWidget4Props = Omit<PurchaseWidgetLayoutProps, 'layout'> & { layout?: BoxLayout };

export const PurchaseWidget4 = ({ layout, ...widget }: PurchaseWidget4Props) => {
    return (
        <Region
            name="purchaseWidget"
            tags={[ 'NO_GIFT_OPTION' ]}
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

import { BoxLayout, Region } from '#base/theme';
import { PurchaseWidgetLayout, PurchaseWidgetLayoutProps } from '#base/views/layouts/catalog/PurchaseWidgetLayout';

/**
 * Catalog widget `purchaseWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (RoomAdsCatalogWidget); each passes its own placement through `layout`.
 */
export type PurchaseWidget3Props = Omit<PurchaseWidgetLayoutProps, 'layout'> & { layout?: BoxLayout };

export const PurchaseWidget3 = ({ layout, ...widget }: PurchaseWidget3Props) => {
    return (
        <Region
            name="purchaseWidget"
            tags={[ 'NO_GIFT_OPTION', 'ROOM_INITIATE_PURCHASE' ]}
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

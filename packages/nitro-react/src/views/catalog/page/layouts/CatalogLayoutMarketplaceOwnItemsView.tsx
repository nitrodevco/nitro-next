import { CatalogWidgetEnum } from '#base/context/catalog';
import { Region } from '#base/theme';

import { CatalogLayoutProps } from '../CatalogPageRegistry';
import { CatalogWidgetSlot } from '../CatalogWidgetSlot';

/**
 * The `marketplace_own_items` page, `layout_marketplace_own_items.xml`
 * (`ctlg_marketplace_own_items`, 360x460, stretched to the page): a `0x21ffffff` fill under the one
 * `marketPlaceOwnItemsWidget` container, which is `EMBEDDED` - the widget
 * (`CatalogMarketPlaceOwnItemsWidgetView`) draws the layout's own children. The container's
 * `0xffeeeeee` colour is not drawn: it has no `background`.
 */
export const CatalogLayoutMarketplaceOwnItemsView = ({ page }: CatalogLayoutProps) => (
    <Region
        name="ctlg_marketplace_own_items"
        backgroundColor="#ffffff"
        backgroundAlpha={0x21 / 255}
        layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
    >
        <CatalogWidgetSlot
            page={page}
            name={CatalogWidgetEnum.MARKET_PLACE_OWN_ITEMS}
            tags={[ 'EMBEDDED' ]}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
        />
    </Region>
);

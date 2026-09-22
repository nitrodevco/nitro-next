import { CatalogWidgetEnum } from '#base/context/catalog';
import { Region } from '#base/theme';

import { CatalogLayoutProps } from '../CatalogPageRegistry';
import { CatalogWidgetSlot } from '../CatalogWidgetSlot';

/**
 * The `marketplace` page, `layout_marketplace.xml` (`ctlg_marketplace`, 360x608, stretched to the
 * page): a `0x21ffffff` fill under the one `marketPlaceWidget` container, which is `EMBEDDED` -
 * the widget (`CatalogMarketPlaceWidgetView`) draws the layout's own children, the search
 * selector, search container, status and offer list, at the container's full size.
 */
export const CatalogLayoutMarketplaceView = ({ page }: CatalogLayoutProps) => (
    <Region
        name="ctlg_marketplace"
        backgroundColor="#ffffff"
        backgroundAlpha={0x21 / 255}
        layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
    >
        <CatalogWidgetSlot
            page={page}
            name={CatalogWidgetEnum.MARKET_PLACE}
            tags={[ 'EMBEDDED' ]}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
        />
    </Region>
);

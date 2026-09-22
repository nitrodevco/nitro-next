import { CatalogWidgetEnum } from '#base/context/catalog';
import { Region } from '#base/theme';

import { CatalogLayoutProps } from '../CatalogPageRegistry';
import { CatalogWidgetSlot } from '../CatalogWidgetSlot';

/**
 * The `loyalty_vip_buy` page, `layout_loyalty_vip_buy.xml` (`ctlg_loyalty_vip_buy`, 360x460, a
 * `0x21` white wash over the page): the embedded `loyaltyVipBuyWidget` filling it, whose children
 * are the widget's view (`CatalogLoyaltyVipBuyWidgetView`).
 */
export const CatalogLayoutLoyaltyVipBuyView = ({ page }: CatalogLayoutProps) => (
    <Region
        name="ctlg_loyalty_vip_buy"
        backgroundColor="#ffffff"
        backgroundAlpha={0.129}
        layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
    >
        <CatalogWidgetSlot
            page={page}
            name={CatalogWidgetEnum.LOYALTY_VIP_BUY}
            tags={[ 'EMBEDDED' ]}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
        />
    </Region>
);

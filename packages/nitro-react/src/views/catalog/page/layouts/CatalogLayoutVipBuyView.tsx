import { CatalogWidgetEnum } from '#base/context/catalog';
import { Region } from '#base/theme';

import { CatalogLayoutProps } from '../CatalogPageRegistry';
import { CatalogWidgetSlot } from '../CatalogWidgetSlot';

/**
 * The `vip_buy` page, `layout_vip_buy.xml` (`ctlg_vip_buy`, 360x460, a `0x21` white wash over the
 * page): the `vipBuyWidget` container filling it. It has no `EMBEDDED` tag, but
 * `VipBuyCatalogWidget` attaches no view of its own, so the container's children are the widget's
 * view (`CatalogVipBuyWidgetView`); its `0xfff1f1f1` colour has no `background` and draws nothing.
 */
export const CatalogLayoutVipBuyView = ({ page }: CatalogLayoutProps) => (
    <Region
        name="ctlg_vip_buy"
        backgroundColor="#ffffff"
        backgroundAlpha={0.129}
        layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
    >
        <CatalogWidgetSlot
            page={page}
            name={CatalogWidgetEnum.VIP_BUY}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
        />
    </Region>
);

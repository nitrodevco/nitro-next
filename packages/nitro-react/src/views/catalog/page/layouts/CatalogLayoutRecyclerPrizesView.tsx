import { CatalogWidgetEnum } from '#base/context/catalog';
import { Region } from '#base/theme';

import { CatalogLayoutProps } from '../CatalogPageRegistry';
import { CatalogWidgetSlot } from '../CatalogWidgetSlot';

/**
 * The `recycler_prizes` page, `layout_recycler_prizes.xml` (360x659, its root named
 * `ctlg_default_3x3`, stretched to the page): the `specialInfoWidget` container (142x73 at
 * 100,46) and the `recyclerPrizesWidget` container over the whole page (tagged `WIDE`), whose
 * `productView` and `itemList` the widget fills. The layout's `${catalog_selectproduct}` label
 * is `visible="false"` and nothing shows it, so it is not drawn.
 */
export const CatalogLayoutRecyclerPrizesView = ({ page }: CatalogLayoutProps) => (
    <Region
        name="ctlg_default_3x3"
        layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
    >
        <CatalogWidgetSlot
            page={page}
            name={CatalogWidgetEnum.SPECIAL_INFO}
            layout={{ position: 'absolute', left: 100, width: 142, top: 46, height: 73 }}
        />
        <CatalogWidgetSlot
            page={page}
            name={CatalogWidgetEnum.RECYCLER_PRIZES}
            tags={[ 'WIDE' ]}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
        />
    </Region>
);

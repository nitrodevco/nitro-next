import { CatalogWidgetEnum } from '#base/context/catalog';
import { Region } from '#base/theme';

import { CatalogLayoutProps } from '../CatalogPageRegistry';
import { CatalogWidgetSlot } from '../CatalogWidgetSlot';

/**
 * The `club_buy` page, `layout_club_buy.xml` (`ctlg_club_buy`, 360x460, a `0x21` white wash over
 * the page): the embedded `clubBuyWidget` filling it, whose children are the widget's view
 * (`CatalogClubBuyWidgetView`).
 */
export const CatalogLayoutClubBuyView = ({ page }: CatalogLayoutProps) => (
    <Region
        name="ctlg_club_buy"
        backgroundColor="#ffffff"
        backgroundAlpha={0.129}
        layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
    >
        <CatalogWidgetSlot
            page={page}
            name={CatalogWidgetEnum.CLUB_BUY}
            tags={[ 'EMBEDDED' ]}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
        />
    </Region>
);

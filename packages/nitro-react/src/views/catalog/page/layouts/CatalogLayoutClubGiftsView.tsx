import { CatalogWidgetEnum } from '#base/context/catalog';
import { Region } from '#base/theme';

import { CatalogLayoutProps } from '../CatalogPageRegistry';
import { CatalogWidgetSlot } from '../CatalogWidgetSlot';

/**
 * The `club_gifts` page, `layout_club_gifts.xml` (`ctlg_presents`, 360x460): the embedded
 * `clubGiftWidget` filling it, whose children are the widget's view (`CatalogClubGiftWidgetView`).
 */
export const CatalogLayoutClubGiftsView = ({ page }: CatalogLayoutProps) => (
    <Region
        name="ctlg_presents"
        layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
    >
        <CatalogWidgetSlot
            page={page}
            name={CatalogWidgetEnum.CLUB_GIFTS}
            tags={[ 'EMBEDDED' ]}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
        />
    </Region>
);

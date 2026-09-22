import { CatalogWidgetEnum } from '#base/context/catalog';
import { Region, ThemeText } from '#base/theme';

import { CatalogLayoutProps } from '../CatalogPageRegistry';
import { CatalogWidgetSlot } from '../CatalogWidgetSlot';

/**
 * The `roomads` page, `layout_roomads.xml` (`roomads`, 360x460): the room ads widget
 * (`RoomAdsCatalogWidget`, whose view is its container's own children) with the purchase widget
 * nested in it - no gift option, and tagged `ROOM_INITIATE_PURCHASE` - which the widget draws among
 * its elements. The page's `ctlg_price_1` text has no caption and no page text goes to it
 * (`PageLocalization` sends none there), so it stays empty.
 */
export const CatalogLayoutRoomadsView = ({ page }: CatalogLayoutProps) => (
    <Region
        name="roomads"
        layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
    >
        <ThemeText
            name="ctlg_price_1"
            text=""
            textStyle="u_regular"
            textOptions={{ wordWrap: true, wordWrapWidth: 74 }}
            clip
            verticalAlign="top"
            layout={{ position: 'absolute', left: 242, width: 78, top: 395, height: 13 }}
        />
        <CatalogWidgetSlot
            page={page}
            name={CatalogWidgetEnum.ROOMADS}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
        >
            <CatalogWidgetSlot
                page={page}
                name={CatalogWidgetEnum.PURCHASE}
                tags={[ 'NO_GIFT_OPTION', 'ROOM_INITIATE_PURCHASE' ]}
                layout={{ position: 'absolute', left: 0, width: 360, bottom: 14, height: 30 }}
            />
        </CatalogWidgetSlot>
    </Region>
);

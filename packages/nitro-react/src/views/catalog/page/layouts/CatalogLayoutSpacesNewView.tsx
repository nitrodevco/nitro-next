import { CatalogWidgetEnum } from '#base/context/catalog';
import { Region } from '#base/theme';

import { CatalogLayoutProps } from '../CatalogPageRegistry';
import { CatalogWidgetSlot } from '../CatalogWidgetSlot';

/**
 * The `spaces_new` page, `layout_spaces_new.xml` (`ctlg_spaces_new`, 360x460): the product view
 * (tagged `NO_ROOM_CANVAS`, so it shows no room) and the room preview on top of it over the top
 * 240px, the activity point display at 180,205, the spaces widget under them stretched down to
 * 35px above the bottom, and the purchase widget at the bottom.
 *
 * The room preview draws its container's own `catalog_floor_preview_example` bitmap
 * (`CatalogRoomPreviewWidgetView`), and the spaces widget, `EMBEDDED,FIXED`, its container's
 * selector, border and item grid (`CatalogSpacesNewWidgetView`).
 */
export const CatalogLayoutSpacesNewView = ({ page }: CatalogLayoutProps) => (
    <Region
        name="ctlg_spaces_new"
        layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
    >
        <CatalogWidgetSlot
            page={page}
            name={CatalogWidgetEnum.PRODUCT_VIEW}
            tags={[ 'NO_ROOM_CANVAS' ]}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240 }}
        />
        <CatalogWidgetSlot
            page={page}
            name={CatalogWidgetEnum.ROOM_PREVIEW}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240 }}
        />
        <CatalogWidgetSlot
            page={page}
            name={CatalogWidgetEnum.ACTIVITY_POINT_DISPLAY}
            layout={{ position: 'absolute', left: 180, width: 175, top: 205, height: 28 }}
        />
        <CatalogWidgetSlot
            page={page}
            name={CatalogWidgetEnum.SPACES_NEW}
            tags={[ 'EMBEDDED', 'FIXED' ]}
            layout={{ position: 'absolute', left: 0, width: 360, top: 245, bottom: 35 }}
        />
        <CatalogWidgetSlot
            page={page}
            name={CatalogWidgetEnum.PURCHASE}
            layout={{ position: 'absolute', left: 0, width: 360, bottom: 0, height: 30 }}
        />
    </Region>
);

import { CatalogWidgetEnum } from '#base/context/catalog';
import { Region } from '#base/theme';

import { CatalogLayoutProps } from '../CatalogPageRegistry';
import { CatalogWidgetSlot } from '../CatalogWidgetSlot';

/**
 * The `soundmachine` page, `layout_soundmachine.xml` (`ctlg_soundmachine`, 360x460): the item grid
 * under the top 245px, stretched down to 35px above the bottom; the song disk product view over the
 * top 240px, with the special info widget over it; the purchase widget at the bottom. The song disk
 * product view is `EMBEDDED` - it draws its container's own children (the teaser bitmap, the texts
 * and the play preview box - `CatalogSongDiskProductViewWidgetView`).
 *
 * The layout's `${catalog_selectproduct}` text is `visible="false"` and nothing shows it, so it is
 * not drawn.
 */
export const CatalogLayoutSoundmachineView = ({ page }: CatalogLayoutProps) => (
    <Region
        name="ctlg_soundmachine"
        layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
    >
        <CatalogWidgetSlot
            page={page}
            name={CatalogWidgetEnum.ITEM_GRID}
            layout={{ position: 'absolute', left: 0, width: 360, top: 245, bottom: 35 }}
        />
        <CatalogWidgetSlot
            page={page}
            name={CatalogWidgetEnum.SONG_DISK_PRODUCT_VIEW}
            tags={[ 'EMBEDDED' ]}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240 }}
        />
        <CatalogWidgetSlot
            page={page}
            name={CatalogWidgetEnum.SPECIAL_INFO}
            layout={{ position: 'absolute', left: 110, width: 142, top: 28, height: 73 }}
        />
        <CatalogWidgetSlot
            page={page}
            name={CatalogWidgetEnum.PURCHASE}
            layout={{ position: 'absolute', left: 0, width: 360, bottom: 0, height: 30 }}
        />
    </Region>
);

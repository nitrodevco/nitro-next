import { CatalogWidgetEnum } from '#base/context/catalog';
import { Region } from '#base/theme';

import { CatalogLayoutProps } from '../CatalogPageRegistry';
import { CatalogWidgetSlot } from '../CatalogWidgetSlot';

/**
 * The `guild_custom_furni` page, `layout_guild_custom_furni.xml` (`ctlg_default_3x3`, 360x460):
 * the group furni's item grid (stretching with the window) under the product view, the group
 * selector centred under the grid, the special info and activity points of the default page, the
 * picked group's badge over the preview's right edge, and the purchase widget at the bottom.
 *
 * The layout's `${catalog_selectproduct}` label is `visible="false"` and nothing shows it, so it is
 * not drawn.
 */
export const CatalogLayoutGuildCustomFurniView = ({ page }: CatalogLayoutProps) => (
    <Region
        name="ctlg_default_3x3"
        layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
    >
        <CatalogWidgetSlot
            page={page}
            name={CatalogWidgetEnum.ITEM_GRID}
            tags={[ 'E' ]}
            layout={{ position: 'absolute', left: 0, width: 360, top: 245, bottom: 90 }}
        />
        <CatalogWidgetSlot
            page={page}
            name={CatalogWidgetEnum.PRODUCT_VIEW}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240 }}
        />
        <CatalogWidgetSlot
            page={page}
            name={CatalogWidgetEnum.GUILD_SELECTOR}
            layout={{ position: 'absolute', left: 90, width: 180, bottom: 0, height: 85 }}
        />
        <CatalogWidgetSlot
            page={page}
            name={CatalogWidgetEnum.SPECIAL_INFO}
            layout={{ position: 'absolute', left: 94, width: 142, top: 18, height: 73 }}
        />
        <CatalogWidgetSlot
            page={page}
            name={CatalogWidgetEnum.ACTIVITY_POINT_DISPLAY}
            layout={{ position: 'absolute', left: 199, width: 156, top: 190, height: 28 }}
        />
        <CatalogWidgetSlot
            page={page}
            name={CatalogWidgetEnum.GUILD_BADGE_VIEW}
            layout={{ position: 'absolute', left: 307, width: 40, top: 138, height: 40 }}
        />
        <CatalogWidgetSlot
            page={page}
            name={CatalogWidgetEnum.PURCHASE}
            layout={{ position: 'absolute', left: 0, width: 360, bottom: 0, height: 30 }}
        />
    </Region>
);

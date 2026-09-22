import { CatalogWidgetEnum } from '#base/context/catalog';
import { Region } from '#base/theme';

import { CatalogLayoutProps } from '../CatalogPageRegistry';
import { CatalogWidgetSlot } from '../CatalogWidgetSlot';

/**
 * The `badge_display` page, `layout_badge_display.xml` (`ctlg_badge_display`, 360x460): the
 * product preview over the top 240px, the special info and limited item widgets over it, and under
 * it the narrow item grid (95 wide) beside the badge selector (255 wide), both stretched down to
 * 40px above the bottom, where the purchase widget sits. Each widget container at the layout's
 * rect; the page stretches with the window, and the two lower widgets stretch with it.
 *
 * The badge selector draws its container's own children (the search field and the badge grid -
 * `CatalogUserBadgeSelectorWidgetView`); the limited item widget's `unique_item_overlay_container`
 * is the limited item widget's to draw. The layout's `${catalog_selectproduct}` and
 * `${catalog_selectbadge}` labels are `visible="false"` and nothing shows them, so they are not
 * drawn.
 */
export const CatalogLayoutBadgeDisplayView = ({ page }: CatalogLayoutProps) => (
    <Region
        name="ctlg_badgedisplay"
        layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
    >
        <CatalogWidgetSlot
            page={page}
            name={CatalogWidgetEnum.PRODUCT_VIEW}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240 }}
        />
        <CatalogWidgetSlot
            page={page}
            name={CatalogWidgetEnum.SPECIAL_INFO}
            layout={{ position: 'absolute', left: 99, width: 142, top: 13, height: 73 }}
        />
        <CatalogWidgetSlot
            page={page}
            name={CatalogWidgetEnum.PURCHASE}
            layout={{ position: 'absolute', left: 0, width: 360, bottom: 0, height: 30 }}
        />
        <CatalogWidgetSlot
            page={page}
            name={CatalogWidgetEnum.ITEM_GRID}
            layout={{ position: 'absolute', left: 0, width: 95, top: 245, bottom: 40 }}
        />
        <CatalogWidgetSlot
            page={page}
            name={CatalogWidgetEnum.LIMITED_ITEM}
            layout={{ position: 'absolute', left: 180, width: 170, top: 20, height: 30, overflow: 'hidden' }}
        />
        <CatalogWidgetSlot
            page={page}
            name={CatalogWidgetEnum.USER_BADGE_SELECTOR}
            layout={{ position: 'absolute', left: 105, width: 255, top: 245, bottom: 40 }}
        />
    </Region>
);

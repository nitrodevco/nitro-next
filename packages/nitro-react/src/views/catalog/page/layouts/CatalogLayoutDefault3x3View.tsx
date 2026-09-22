import { CatalogWidgetEnum } from '#base/context/catalog';
import { Region } from '#base/theme';

import { CatalogLayoutProps } from '../CatalogPageRegistry';
import { CatalogWidgetSlot } from '../CatalogWidgetSlot';

/** `CatalogPage.initializeWidgets`' gap between the shortened item grid and the colour grid it shows under it. */
const COLOUR_GROUPING_GAP = 3;

/**
 * The `default_3x3` page, `layout_default_3x3.xml` (`layout_default_ubuntu`, 360x460) - also what
 * the `bots`, `default_3x3_extrainfo`, `pixeleffects`, `sold_ltd_items` and
 * `default_3x3_color_grouping` codes build. Each widget container at the layout's rect: the item
 * grid stretches with the window and everything below it is anchored to the bottom, as the
 * containers' params anchor them.
 *
 * `default_3x3_color_grouping` is the one code `initializeWidgets` re-arranges: the item grid
 * shrinks to 61px and the hidden `colourGridWidget` shows under it, 3px apart, 360x91.
 *
 * The layout's `${catalog_selectproduct}` label is `visible="false"` and nothing shows it, so it is
 * not drawn.
 */
export const CatalogLayoutDefault3x3View = ({ page }: CatalogLayoutProps) => {
    const isColourGrouping = (page.layoutCode === 'default_3x3_color_grouping');

    return (
        <Region
            name="container"
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
        >
            <CatalogWidgetSlot
                page={page}
                name={CatalogWidgetEnum.PRODUCT_VIEW}
                tags={[ 'E' ]}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240 }}
            />
            <CatalogWidgetSlot
                page={page}
                name={CatalogWidgetEnum.ITEM_GRID}
                tags={[ 'E' ]}
                layout={{ position: 'absolute', left: 0, width: 360, top: 245, bottom: isColourGrouping ? (460 - 245 - (64 - COLOUR_GROUPING_GAP)) : 60 }}
            />
            <CatalogWidgetSlot
                page={page}
                name={CatalogWidgetEnum.COLOUR_GRID}
                tags={[ 'E' ]}
                visible={isColourGrouping}
                layout={isColourGrouping
                    ? { position: 'absolute', left: 0, width: 360, bottom: 60, height: 91 }
                    : { position: 'absolute', left: 182, width: 176, bottom: 60, height: 155 }}
            />
            <CatalogWidgetSlot
                page={page}
                name={CatalogWidgetEnum.PURCHASE}
                layout={{ position: 'absolute', left: 0, width: 360, bottom: 0, height: 30 }}
            />
            <CatalogWidgetSlot
                page={page}
                name={CatalogWidgetEnum.ACTIVITY_POINT_DISPLAY}
                layout={{ position: 'absolute', left: 182, width: 175, top: 2, height: 25 }}
            />
            <CatalogWidgetSlot
                page={page}
                name={CatalogWidgetEnum.SPECIAL_INFO}
                layout={{ position: 'absolute', left: 109, width: 142, top: 20, height: 73 }}
            />
            <CatalogWidgetSlot
                page={page}
                name={CatalogWidgetEnum.LIMITED_ITEM}
                layout={{ position: 'absolute', left: 186, width: 174, top: 5, height: 35, overflow: 'hidden' }}
            />
            <CatalogWidgetSlot
                page={page}
                name={CatalogWidgetEnum.SOLD_LIMITED_ITEMS}
                layout={{ position: 'absolute', left: 0, width: 360, bottom: 5, height: 30 }}
            />
            <CatalogWidgetSlot
                page={page}
                name={CatalogWidgetEnum.SPINNER}
                tags={[ 'EMBEDDED' ]}
                layout={{ position: 'absolute', left: 0, width: 200, bottom: 30, height: 25 }}
            />
            <CatalogWidgetSlot
                page={page}
                name={CatalogWidgetEnum.TOTAL_PRICE}
                tags={[ 'EMBEDDED' ]}
                layout={{ position: 'absolute', left: 180, width: 180, bottom: 30, height: 25 }}
            />
            <CatalogWidgetSlot
                page={page}
                name={CatalogWidgetEnum.BUILDER}
                layout={{ position: 'absolute', left: 0, width: 360, bottom: 0, height: 60 }}
            />
        </Region>
    );
};

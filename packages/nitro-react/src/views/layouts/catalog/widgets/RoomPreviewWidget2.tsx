import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { CatalogWidgetFlags } from '#base/views/layouts/layoutAssets';

/**
 * Catalog widget `roomPreviewWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutSpacesNew_1576Layout); each passes its own placement through `layout`.
 */
/** Named region `roomPreviewWidget` of RoomPreviewWidget2 - configured through the parent's `roomPreviewWidget` prop. */
export interface RoomPreviewWidget2Props extends CatalogWidgetFlags {
    layout?: BoxLayout;
    srcCatalogFloorPreviewExample?: string;
    srcCatalogSpacePreviewWindow?: string;
    srcCatalogWallPreviewBRight?: string;
    tintCatalogFloorPreviewExample?: string;
    tintCatalogSpacePreviewWindow?: string;
    tintCatalogWallPreviewBRight?: string;
}

export const RoomPreviewWidget2 = ({ layout, srcCatalogFloorPreviewExample, srcCatalogSpacePreviewWindow, srcCatalogWallPreviewBRight, tintCatalogFloorPreviewExample, tintCatalogSpacePreviewWindow, tintCatalogWallPreviewBRight }: RoomPreviewWidget2Props) => {
    return (
        <Region
            name="roomPreviewWidget"
            layout={{ position: 'absolute', ...layout }}
        >
            <ThemeImage
                name="catalog_floor_preview_example"
                src={srcCatalogFloorPreviewExample}
                tint={tintCatalogFloorPreviewExample}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240 }}
            />
            <ThemeImage
                name="catalog_wall_preview_b_right"
                src={srcCatalogWallPreviewBRight}
                tint={tintCatalogWallPreviewBRight}
                layout={{ position: 'absolute', left: 29, width: 288, top: 21, height: 147 }}
            />
            <ThemeImage
                name="catalog_space_preview_window"
                src={srcCatalogSpacePreviewWindow}
                tint={tintCatalogSpacePreviewWindow}
                layout={{ position: 'absolute', left: 123, width: 120, top: 51, height: 118 }}
            />
        </Region>
    );
};

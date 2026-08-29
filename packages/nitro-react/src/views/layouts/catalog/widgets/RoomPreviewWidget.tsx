import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { CatalogWidgetFlags } from '#base/views/layouts/layoutAssets';

/**
 * Catalog widget `roomPreviewWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutSpacesNew_1657Layout); each passes its own placement through `layout`.
 */
/** Named region `roomPreviewWidget` of RoomPreviewWidget - configured through the parent's `roomPreviewWidget` prop. */
export interface RoomPreviewWidgetProps extends CatalogWidgetFlags {
    layout?: BoxLayout;
    srcCatalogFloorPreviewExample?: string;
    srcCatalogSpacePreviewWindow?: string;
    srcCatalogWallPreviewBRight?: string;
    tintCatalogFloorPreviewExample?: string;
    tintCatalogSpacePreviewWindow?: string;
    tintCatalogWallPreviewBRight?: string;
}

export const RoomPreviewWidget = ({ layout, srcCatalogFloorPreviewExample, srcCatalogSpacePreviewWindow, srcCatalogWallPreviewBRight, tintCatalogFloorPreviewExample, tintCatalogSpacePreviewWindow, tintCatalogWallPreviewBRight }: RoomPreviewWidgetProps) => {
    return (
        <Region
            name="roomPreviewWidget"
            layout={{ position: 'absolute', ...layout }}
        >
            <ThemeImage
                name="catalog_floor_preview_example"
                src={srcCatalogFloorPreviewExample}
                tint={tintCatalogFloorPreviewExample}
                layout={{ position: 'absolute', left: 0, width: 180, top: 0, height: 277 }}
            />
            <ThemeImage
                name="catalog_wall_preview_b_right"
                src={srcCatalogWallPreviewBRight}
                tint={tintCatalogWallPreviewBRight}
                layout={{ position: 'absolute', left: 29, width: 288, top: 151, height: 147 }}
            />
            <ThemeImage
                name="catalog_space_preview_window"
                src={srcCatalogSpacePreviewWindow}
                tint={tintCatalogSpacePreviewWindow}
                layout={{ position: 'absolute', left: 118, width: 120, bottom: 6, height: 118 }}
            />
        </Region>
    );
};

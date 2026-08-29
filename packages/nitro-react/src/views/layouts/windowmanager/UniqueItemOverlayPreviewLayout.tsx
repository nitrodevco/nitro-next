import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2305_unique_item_overlay_preview_xml` (layout "unique_item_overlay_preview", 40x40) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UniqueItemOverlayPreviewLayoutProps {
    layout?: BoxLayout;
    limitedItemWidget?: UniqueItemOverlayPreviewLayoutLimitedItemWidgetProps;
}

export const UniqueItemOverlayPreviewLayout = ({ layout, limitedItemWidget }: UniqueItemOverlayPreviewLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 40, height: 40, ...layout }}>
            <UniqueItemOverlayPreviewLayoutLimitedItemWidget {...limitedItemWidget} />
        </Region>
    );
};

/** Named region `limitedItemWidget` of UniqueItemOverlayPreviewLayout - configured through the parent's `limitedItemWidget` prop. */
export interface UniqueItemOverlayPreviewLayoutLimitedItemWidgetProps {
    layout?: BoxLayout;
    srcPlaque?: string;
    srcUniqueItemEditionSizeBitmap?: string;
    srcUniqueItemSerialNumberBitmap?: string;
}

export const UniqueItemOverlayPreviewLayoutLimitedItemWidget = ({ layout, srcPlaque, srcUniqueItemEditionSizeBitmap, srcUniqueItemSerialNumberBitmap }: UniqueItemOverlayPreviewLayoutLimitedItemWidgetProps) => {
    return (
        <Region
            name="limitedItemWidget"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 40, ...layout }}
        >
            <ThemeImage
                name="plaque"
                params={16}
                src={srcPlaque ?? layoutImage('unique_item_large_tile_upright.png')}
                layout={{ position: 'absolute', left: 5, width: 30, top: 0, height: 30 }}
            />
            <ThemeImage
                name="unique_item_edition_size_bitmap"
                params={16}
                src={srcUniqueItemEditionSizeBitmap}
                layout={{ position: 'absolute', left: 10, width: 20, top: 23, height: 5 }}
            />
            <ThemeImage
                name="unique_item_serial_number_bitmap"
                params={16}
                src={srcUniqueItemSerialNumberBitmap}
                layout={{ position: 'absolute', left: 10, width: 20, top: 16, height: 5 }}
            />
        </Region>
    );
};

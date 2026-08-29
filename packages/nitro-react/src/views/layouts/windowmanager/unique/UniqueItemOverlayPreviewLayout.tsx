import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2305_unique_item_overlay_preview_xml` (layout "unique_item_overlay_preview", 40x40) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UniqueItemOverlayPreviewLayoutProps {
    layout?: BoxLayout;
    srcPlaque?: string;
    srcUniqueItemEditionSizeBitmap?: string;
    srcUniqueItemSerialNumberBitmap?: string;
    tintUniqueItemEditionSizeBitmap?: string;
    tintUniqueItemSerialNumberBitmap?: string;
}

export const UniqueItemOverlayPreviewLayout = ({ layout, srcPlaque, srcUniqueItemEditionSizeBitmap, srcUniqueItemSerialNumberBitmap, tintUniqueItemEditionSizeBitmap, tintUniqueItemSerialNumberBitmap }: UniqueItemOverlayPreviewLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 40, height: 40, ...layout }}>
            <Region
                name="limitedItemWidget"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <ThemeImage
                    name="plaque"
                    src={srcPlaque ?? layoutImage('unique_item_large_tile_upright.png')}
                    layout={{ position: 'absolute', left: 5, width: 30, top: 0, height: 30 }}
                />
                <ThemeImage
                    name="unique_item_edition_size_bitmap"
                    src={srcUniqueItemEditionSizeBitmap}
                    tint={tintUniqueItemEditionSizeBitmap}
                    layout={{ position: 'absolute', left: 10, width: 20, bottom: 12, height: 5 }}
                />
                <ThemeImage
                    name="unique_item_serial_number_bitmap"
                    src={srcUniqueItemSerialNumberBitmap}
                    tint={tintUniqueItemSerialNumberBitmap}
                    layout={{ position: 'absolute', left: 10, width: 20, alignSelf: 'center', marginTop: -1.5, marginBottom: 1.5, height: 5 }}
                />
            </Region>
        </Region>
    );
};

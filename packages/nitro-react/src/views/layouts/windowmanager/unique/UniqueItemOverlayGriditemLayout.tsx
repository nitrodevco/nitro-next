import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2136_unique_item_overlay_griditem_xml` (layout "unique_item_overlay_griditem", 36x36) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UniqueItemOverlayGriditemLayoutProps {
    layout?: BoxLayout;
    uniqueItemOverlayContainerInternal?: UniqueItemOverlayGriditemLayoutUniqueItemOverlayContainerInternalProps;
}

export const UniqueItemOverlayGriditemLayout = ({ layout, uniqueItemOverlayContainerInternal }: UniqueItemOverlayGriditemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 36, height: 36, ...layout }}>
            <UniqueItemOverlayGriditemLayoutUniqueItemOverlayContainerInternal {...uniqueItemOverlayContainerInternal} />
        </Region>
    );
};

/** Named region `unique_item_overlay_container_internal` of UniqueItemOverlayGriditemLayout - configured through the parent's `uniqueItemOverlayContainerInternal` prop. */
export interface UniqueItemOverlayGriditemLayoutUniqueItemOverlayContainerInternalProps {
    layout?: BoxLayout;
    srcUniqueItemOverlayGlazeBitmap?: string;
    srcUniqueItemOverlayPlaqueBackgroundBitmap?: string;
    srcUniqueItemOverlayPlaqueNumberBitmap?: string;
    srcUniqueItemPlaqueForegroundBitmap?: string;
    srcUniqueItemPlaqueStudsBitmap?: string;
}

export const UniqueItemOverlayGriditemLayoutUniqueItemOverlayContainerInternal = ({ layout, srcUniqueItemOverlayGlazeBitmap, srcUniqueItemOverlayPlaqueBackgroundBitmap, srcUniqueItemOverlayPlaqueNumberBitmap, srcUniqueItemPlaqueForegroundBitmap, srcUniqueItemPlaqueStudsBitmap }: UniqueItemOverlayGriditemLayoutUniqueItemOverlayContainerInternalProps) => {
    return (
        <Region
            name="unique_item_overlay_container_internal"
            layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 36, ...layout }}
        >
            <ThemeImage
                name="unique_item_overlay_plaque_background_bitmap"
                src={srcUniqueItemOverlayPlaqueBackgroundBitmap}
                layout={{ position: 'absolute', left: 1, width: 34, top: 28, height: 7 }}
            />
            <ThemeImage
                name="unique_item_plaque_foreground_bitmap"
                src={srcUniqueItemPlaqueForegroundBitmap ?? layoutImage('unique_item_label_plaque_border.png')}
                layout={{ position: 'absolute', left: 0, width: 36, top: 27, height: 9 }}
            />
            <ThemeImage
                name="unique_item_overlay_plaque_number_bitmap"
                src={srcUniqueItemOverlayPlaqueNumberBitmap}
                layout={{ position: 'absolute', left: 6, width: 24, top: 29, height: 5 }}
            />
            <ThemeImage
                name="unique_item_plaque_studs_bitmap"
                src={srcUniqueItemPlaqueStudsBitmap ?? layoutImage('unique_item_label_studs.png')}
                layout={{ position: 'absolute', left: 0, width: 36, top: 27, height: 9 }}
            />
            <ThemeImage
                name="unique_item_overlay_glaze_bitmap"
                src={srcUniqueItemOverlayGlazeBitmap ?? layoutImage('unique_item_label_glass_shine.png')}
                layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 36 }}
            />
        </Region>
    );
};

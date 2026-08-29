import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2652_chest_overlay_griditem_xml` (layout "chest_overlay_griditem", 36x36) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ChestOverlayGriditemLayoutProps {
    layout?: BoxLayout;
    srcChestOverlayGlazeBitmap?: string;
    srcChestPlaqueBitmap?: string;
    srcChestPlaqueNumberBitmap?: string;
    tintChestPlaqueNumberBitmap?: string;
}

export const ChestOverlayGriditemLayout = ({ layout, srcChestOverlayGlazeBitmap, srcChestPlaqueBitmap, srcChestPlaqueNumberBitmap, tintChestPlaqueNumberBitmap }: ChestOverlayGriditemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 36, height: 36, ...layout }}>
            <Region
                name="chest_overlay_container_internal"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <ThemeImage
                    name="chest_plaque_bitmap"
                    src={srcChestPlaqueBitmap ?? layoutImage('chest_overlay_brown_plaque.png')}
                    layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 36 }}
                />
                <ThemeImage
                    name="chest_plaque_number_bitmap"
                    src={srcChestPlaqueNumberBitmap}
                    tint={tintChestPlaqueNumberBitmap}
                    layout={{ position: 'absolute', left: 6, width: 24, bottom: 3, height: 5 }}
                />
                <ThemeImage
                    name="chest_overlay_glaze_bitmap"
                    src={srcChestOverlayGlazeBitmap ?? layoutImage('chest_overlay_shine.png')}
                    layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 36 }}
                />
            </Region>
        </Region>
    );
};

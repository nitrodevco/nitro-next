import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2652_chest_overlay_griditem_xml` (layout "chest_overlay_griditem", 36x36) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ChestOverlayGriditemLayoutProps {
    layout?: BoxLayout;
    srcChestOverlayGlazeBitmap?: string;
    srcChestPlaqueBitmap?: string;
    srcChestPlaqueNumberBitmap?: string;
}

export const ChestOverlayGriditemLayout = ({ layout, srcChestOverlayGlazeBitmap, srcChestPlaqueBitmap, srcChestPlaqueNumberBitmap }: ChestOverlayGriditemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 36, height: 36, ...layout }}>
            <Region
                name="chest_overlay_container_internal"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 36 }}
            >
                <ThemeImage
                    name="chest_plaque_bitmap"
                    params={16}
                    src={srcChestPlaqueBitmap ?? layoutImage('chest_overlay_brown_plaque.png')}
                    layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 36 }}
                />
                <ThemeImage
                    name="chest_plaque_number_bitmap"
                    params={16}
                    src={srcChestPlaqueNumberBitmap}
                    layout={{ position: 'absolute', left: 6, width: 24, top: 28, height: 5 }}
                />
                <ThemeImage
                    name="chest_overlay_glaze_bitmap"
                    params={16}
                    src={srcChestOverlayGlazeBitmap ?? layoutImage('chest_overlay_shine.png')}
                    layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 36 }}
                />
            </Region>
        </Region>
    );
};

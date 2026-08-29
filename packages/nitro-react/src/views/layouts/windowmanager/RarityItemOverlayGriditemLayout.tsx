import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2730_rarity_item_overlay_griditem_xml` (layout "rarity_item_overlay_griditem", 36x36) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RarityItemOverlayGriditemLayoutProps {
    layout?: BoxLayout;
    srcRarityItemOverlayPlaqueNumberBitmap?: string;
    srcRarityItemPlaqueBitmap?: string;
    tintRarityItemOverlayPlaqueNumberBitmap?: string;
}

export const RarityItemOverlayGriditemLayout = ({ layout, srcRarityItemOverlayPlaqueNumberBitmap, srcRarityItemPlaqueBitmap, tintRarityItemOverlayPlaqueNumberBitmap }: RarityItemOverlayGriditemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 36, height: 36, ...layout }}>
            <Region
                name="rarity_item_overlay_container_internal"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <ThemeImage
                    name="rarity_item_plaque_bitmap"
                    src={srcRarityItemPlaqueBitmap ?? layoutImage('rarity_item_rarity_item_plaque.png')}
                    layout={{ position: 'absolute', left: 0, width: 36, bottom: 0, height: 9 }}
                />
                <ThemeImage
                    name="rarity_item_overlay_plaque_number_bitmap"
                    src={srcRarityItemOverlayPlaqueNumberBitmap}
                    tint={tintRarityItemOverlayPlaqueNumberBitmap}
                    layout={{ position: 'absolute', left: 6, width: 24, bottom: 2, height: 5 }}
                />
            </Region>
        </Region>
    );
};

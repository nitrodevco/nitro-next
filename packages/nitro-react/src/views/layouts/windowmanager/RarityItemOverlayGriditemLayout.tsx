import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2730_rarity_item_overlay_griditem_xml` (layout "rarity_item_overlay_griditem", 36x36) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RarityItemOverlayGriditemLayoutProps {
    layout?: BoxLayout;
    rarityItemOverlayContainerInternal?: RarityItemOverlayGriditemLayoutRarityItemOverlayContainerInternalProps;
}

export const RarityItemOverlayGriditemLayout = ({ layout, rarityItemOverlayContainerInternal }: RarityItemOverlayGriditemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 36, height: 36, ...layout }}>
            <RarityItemOverlayGriditemLayoutRarityItemOverlayContainerInternal {...rarityItemOverlayContainerInternal} />
        </Region>
    );
};

/** Named region `rarity_item_overlay_container_internal` of RarityItemOverlayGriditemLayout - configured through the parent's `rarityItemOverlayContainerInternal` prop. */
export interface RarityItemOverlayGriditemLayoutRarityItemOverlayContainerInternalProps {
    layout?: BoxLayout;
    srcRarityItemOverlayPlaqueNumberBitmap?: string;
    srcRarityItemPlaqueBitmap?: string;
    tags?: string[];
}

export const RarityItemOverlayGriditemLayoutRarityItemOverlayContainerInternal = ({ layout, srcRarityItemOverlayPlaqueNumberBitmap, srcRarityItemPlaqueBitmap, tags }: RarityItemOverlayGriditemLayoutRarityItemOverlayContainerInternalProps) => {
    return (
        <Region
            name="rarity_item_overlay_container_internal"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 36, ...layout }}
        >
            <ThemeImage
                name="rarity_item_plaque_bitmap"
                src={srcRarityItemPlaqueBitmap ?? layoutImage('rarity_item_rarity_item_plaque.png')}
                layout={{ position: 'absolute', left: 0, width: 36, top: 27, height: 9 }}
            />
            <ThemeImage
                name="rarity_item_overlay_plaque_number_bitmap"
                src={srcRarityItemOverlayPlaqueNumberBitmap}
                layout={{ position: 'absolute', left: 6, width: 24, top: 29, height: 5 }}
            />
        </Region>
    );
};

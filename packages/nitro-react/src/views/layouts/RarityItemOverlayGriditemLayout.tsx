import { BoxLayout, Region, ThemeImage } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `2730_rarity_item_overlay_griditem_xml` (layout "rarity_item_overlay_griditem", 36x36) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RarityItemOverlayGriditemLayoutProps {
    layout?: BoxLayout;
}

export const RarityItemOverlayGriditemLayout = ({ layout }: RarityItemOverlayGriditemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 36, height: 36, ...layout }}>
            <Region
                name="rarity_item_overlay_container_internal"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 36 }}
            >
                <ThemeImage
                    name="rarity_item_plaque_bitmap"
                    params={16}
                    src={layoutImage('rarity_item_rarity_item_plaque.png')}
                    layout={{ position: 'absolute', left: 0, width: 36, top: 27, height: 9 }}
                />
                <ThemeImage
                    name="rarity_item_overlay_plaque_number_bitmap"
                    params={16}
                    src={undefined}
                    layout={{ position: 'absolute', left: 6, width: 24, top: 29, height: 5 }}
                />
            </Region>
        </Region>
    );
};

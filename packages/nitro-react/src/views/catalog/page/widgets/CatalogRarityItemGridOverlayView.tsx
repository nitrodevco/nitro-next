/**
 * The rarity plaque over a grid item's icon - the `rarity_item_overlay_grid` window widget,
 * `RarityItemGridOverlayWidget` on `rarity_item_overlay_griditem.xml`: the
 * `rarity_item_rarity_item_plaque` at 0,27 and the rarity level in the
 * `unique_item_number_glyph_*` digits centred in the 24x5 `rarity_item_overlay_plaque_number_bitmap`
 * at 6,29 (`LimitedItemNumberBitmap.createBitmap`, as the limited plaque draws its number).
 */
import { LayoutImage, Region, ThemeImage } from '#base/theme';
import { GlyphNumber } from '#base/views/room-widgets/object-infostand/UniqueItemPlaqueView';

export interface CatalogRarityItemGridOverlayViewProps {
    /** `rarityLevel`. */
    rarityLevel: number;
}

export const CatalogRarityItemGridOverlayView = ({ rarityLevel }: CatalogRarityItemGridOverlayViewProps) => (
    <Region
        name="rarity_item_overlay_container_internal"
        layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 36 }}
    >
        <ThemeImage
            name="rarity_item_plaque_bitmap"
            src={LayoutImage('window-manager/rarity_item_rarity_item_plaque.png')}
            bitmap={{ stretchedX: false, stretchedY: false }}
            layout={{ position: 'absolute', left: 0, width: 36, top: 27, height: 9 }}
        />
        <GlyphNumber
            value={rarityLevel}
            width={24}
            layout={{ left: 6, top: 29 }}
        />
    </Region>
);

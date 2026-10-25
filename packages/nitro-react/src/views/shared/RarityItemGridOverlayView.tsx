import { TemplateWindow } from '#base/theme';

import { LimitedItemNumber } from './LimitedItemNumber';

/** `rarity_item_overlay_plaque_number_bitmap`'s width, the slot the level is centred in. */
const NUMBER_WIDTH = 24;

export interface RarityItemGridOverlayViewProps {
    /** `rarityLevel`. */
    rarityLevel: number;
}

/**
 * The rarity plaque over a grid item's icon - the `rarity_item_overlay_grid` window widget,
 * `RarityItemGridOverlayWidget`, which builds `rarity_item_overlay_griditem_xml` as its root
 * window. `set rarityLevel` fills `rarity_item_overlay_plaque_number_bitmap` with
 * `LimitedItemNumberBitmap.createBitmap`, as the limited plaque draws its number.
 */
export const RarityItemGridOverlayView = ({ rarityLevel }: RarityItemGridOverlayViewProps) => (
    <TemplateWindow
        id="habbo-window-manager-com/rarity_item_overlay_griditem_xml"
        bindings={{
            rarity_item_overlay_plaque_number_bitmap: {
                children: (
                    <LimitedItemNumber
                        value={rarityLevel}
                        width={NUMBER_WIDTH}
                        layout={{ left: 0, top: 0 }}
                    />
                ),
            },
        }}
    />
);

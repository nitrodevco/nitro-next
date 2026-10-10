import { LayoutImage, TemplateWindow } from '#base/theme';
import { LimitedItemNumber } from '#base/views/shared/LimitedItemNumber';

/** `ChestItemGridOverlayWidget.COLOR_SILVER` / `COLOR_GOLD` / `COLOR_BROWN`. */
export type ChestOverlayColor = 'silver' | 'gold' | 'brown';

/** `chest_plaque_number_bitmap`'s width in `chest_overlay_griditem_xml`, the slot the number is centred in. */
const NUMBER_WIDTH = 24;

export interface ChestItemGridOverlayViewProps {
    /** `contentsCount`: what the chest holds, set in the plaque's number glyphs. */
    contentsCount: number;
    color: ChestOverlayColor;
}

/**
 * The plaque over a chest's grid item - the `chest_overlay_grid` window widget,
 * `ChestItemGridOverlayWidget`, which builds `chest_overlay_griditem_xml` as its root window. `color`
 * sets `chest_plaque_bitmap` to `chest_overlay_<color>_plaque`, and `contentsCount` fills
 * `chest_plaque_number_bitmap` with the limited items' number glyphs (`createBitmap`, centred in its
 * 24px slot); the layout's `chest_overlay_shine` lies over both.
 */
export const ChestItemGridOverlayView = ({ contentsCount, color }: ChestItemGridOverlayViewProps) => (
    <TemplateWindow
        id="habbo-window-manager-com/chest_overlay_griditem_xml"
        bindings={{
            chest_plaque_bitmap: { asset: LayoutImage(`habbo-window-manager-com/chest_overlay_${color}_plaque.png`) },
            chest_plaque_number_bitmap: {
                children: (
                    <LimitedItemNumber
                        value={contentsCount}
                        width={NUMBER_WIDTH}
                        layout={{ left: 0, top: 0 }}
                    />
                ),
            },
        }}
    />
);

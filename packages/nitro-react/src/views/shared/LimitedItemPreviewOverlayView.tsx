import { Box, TemplateWindow } from '#base/theme';

import { LimitedItemNumber } from './LimitedItemNumber';

/** The width of `unique_item_serial_number_bitmap` and `unique_item_edition_size_bitmap`, the slots the numbers are centred in. */
const NUMBER_WIDTH = 20;

export interface LimitedItemPreviewOverlayViewProps {
    /** `serialNumber`. */
    serialNumber: number;
    /** `seriesSize`. */
    seriesSize: number;
    /** Where the widget's window is in the window that holds it, when it is not the slot's own origin. */
    layout?: { left?: number; top?: number; right?: number; bottom?: number };
}

/**
 * The little metal plaque a limited edition item wears over a preview - the
 * `limited_item_overlay_preview` window widget, `LimitedItemPreviewOverlayWidget`, which builds
 * `habbo-window-manager-com/unique_item_overlay_preview_xml` as its root window: the
 * `unique_item_large_tile_upright` plate, and `set serialNumber` / `set seriesSize` filling
 * `unique_item_serial_number_bitmap` over `unique_item_edition_size_bitmap` with
 * `LimitedItemNumberBitmap.createBitmap`. The catalogue, inventory and marketplace previews use it,
 * and so does the infostand (its `unique_item_plaque_widget`).
 */
export const LimitedItemPreviewOverlayView = ({ serialNumber, seriesSize, layout }: LimitedItemPreviewOverlayViewProps) => {
    const plaque = (
        <TemplateWindow
            id="habbo-window-manager-com/unique_item_overlay_preview_xml"
            bindings={{
                unique_item_serial_number_bitmap: {
                    children: (
                        <LimitedItemNumber
                            value={serialNumber}
                            width={NUMBER_WIDTH}
                            layout={{ left: 0, top: 0 }}
                        />
                    ),
                },
                unique_item_edition_size_bitmap: {
                    children: (
                        <LimitedItemNumber
                            value={seriesSize}
                            width={NUMBER_WIDTH}
                            layout={{ left: 0, top: 0 }}
                        />
                    ),
                },
            }}
        />
    );

    if (!layout) return plaque;

    return <Box layout={{ position: 'absolute', ...layout }}>{plaque}</Box>;
};

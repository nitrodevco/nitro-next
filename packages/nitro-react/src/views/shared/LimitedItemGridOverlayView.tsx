import { GetTicker } from '@nitrodevco/nitro-renderer';
import { useEffect, useState } from 'react';

import { LayoutImage, TemplateWindow, ThemeImage } from '#base/theme';

import { LimitedItemNumber } from './LimitedItemNumber';

/** `LimitedItemGridOverlayWidget.SHINE_INTERVAL_MS` / `SHINE_LENGTH_MS`. */
const SHINE_INTERVAL_MS = 10000;
const SHINE_LENGTH_MS = 250;
/** `unique_item_label_plaque_metal`'s height. */
const PLAQUE_METAL_HEIGHT = 36;
/** `unique_item_overlay_plaque_background_bitmap`'s size in `unique_item_overlay_griditem_xml`. */
const PLAQUE_WIDTH = 34;
const PLAQUE_HEIGHT = 7;
/** `unique_item_overlay_plaque_number_bitmap`'s width, the slot the number is centred in. */
const NUMBER_WIDTH = 24;
const PLAQUE_METAL = LayoutImage('habbo-window-manager-com/unique_item_label_plaque_metal.png');

/**
 * The shine that runs down the metal plaque (`LimitedItemGridOverlayWidget.update`, an animated
 * overlay): every 10 seconds the slice of `unique_item_label_plaque_metal` the plaque background
 * shows slides down the sheet for a quarter second, then snaps back to the top.
 */
const usePlaqueShineOffset = () => {
    const [ offset, setOffset ] = useState(0);

    useEffect(() => {
        let time = 0;
        let lastShine = 0;

        const update = () => {
            time += GetTicker().deltaMS;

            if ((time - lastShine) <= SHINE_INTERVAL_MS) return;

            const progress = (time - lastShine - SHINE_INTERVAL_MS) / SHINE_LENGTH_MS;

            if (progress < 1) {
                setOffset(Math.trunc((PLAQUE_METAL_HEIGHT - PLAQUE_HEIGHT) * progress));

                return;
            }

            setOffset(0);
            lastShine = time;
        };

        GetTicker().add(update);

        return () => {
            GetTicker().remove(update);
        };
    }, []);

    return offset;
};

export interface LimitedItemGridOverlayViewProps {
    /** `serialNumber` - the catalogue gives it the series size (`enableLimitedItemLayout`). */
    serialNumber: number;
}

/**
 * The limited edition plaque over a grid item's icon - the `limited_item_overlay_grid` window
 * widget, `LimitedItemGridOverlayWidget`, which builds `unique_item_overlay_griditem_xml` as its
 * root window. The code draws two of its bitmaps: `unique_item_overlay_plaque_background_bitmap`
 * gets the metal sheet (the shining slice of it, as the catalogue sets `animated`), and
 * `set serialNumber` fills `unique_item_overlay_plaque_number_bitmap` with
 * `LimitedItemNumberBitmap.createBitmap`.
 */
export const LimitedItemGridOverlayView = ({ serialNumber }: LimitedItemGridOverlayViewProps) => {
    const offset = usePlaqueShineOffset();

    return (
        <TemplateWindow
            id="habbo-window-manager-com/unique_item_overlay_griditem_xml"
            bindings={{
                unique_item_overlay_plaque_background_bitmap: {
                    children: (
                        <ThemeImage
                            src={PLAQUE_METAL}
                            frame={{ x: 0, y: offset, width: PLAQUE_WIDTH, height: PLAQUE_HEIGHT }}
                            layout={{ position: 'absolute', left: 0, top: 0 }}
                        />
                    ),
                },
                unique_item_overlay_plaque_number_bitmap: {
                    children: (
                        <LimitedItemNumber
                            value={serialNumber}
                            width={NUMBER_WIDTH}
                            layout={{ left: 0, top: 0 }}
                        />
                    ),
                },
            }}
        />
    );
};

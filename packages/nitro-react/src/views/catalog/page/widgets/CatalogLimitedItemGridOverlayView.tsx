import { GetTicker } from '@nitrodevco/nitro-renderer';
import { useEffect, useState } from 'react';

import { LayoutImage, Region, ThemeImage } from '#base/theme';
import { GlyphNumber } from '#base/views/room-widgets/object-infostand/UniqueItemPlaqueView';

/** `LimitedItemGridOverlayWidget.SHINE_INTERVAL_MS` / `SHINE_LENGTH_MS`. */
const SHINE_INTERVAL_MS = 10000;
const SHINE_LENGTH_MS = 250;
/** `unique_item_label_plaque_metal`'s height, and the plaque background window's size. */
const PLAQUE_METAL_HEIGHT = 36;
const PLAQUE_WIDTH = 34;
const PLAQUE_HEIGHT = 7;

/**
 * The shine that runs down the metal plaque (`LimitedItemGridOverlayWidget.update`, an animated
 * overlay): every 10 seconds the 34x7 window over `unique_item_label_plaque_metal` slides down the
 * 36px sheet for a quarter second, then snaps back to the top.
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

export interface CatalogLimitedItemGridOverlayViewProps {
    /** `serialNumber` - the catalogue gives it the series size (`enableLimitedItemLayout`). */
    serialNumber: number;
}

/**
 * The limited edition plaque over a grid item's icon - the `limited_item_overlay_grid` window
 * widget, `LimitedItemGridOverlayWidget` on `unique_item_overlay_griditem.xml`: the metal plaque
 * background (shining, since the catalogue sets `animated`), its border, the number in the
 * `unique_item_number_glyph_*` digits centred in a 24x5 slot, the studs and the glass shine over
 * the whole 36x36 icon.
 */
export const CatalogLimitedItemGridOverlayView = ({ serialNumber }: CatalogLimitedItemGridOverlayViewProps) => {
    const offset = usePlaqueShineOffset();

    return (
        <Region
            name="unique_item_overlay_container_internal"
            layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 36 }}
        >
            <ThemeImage
                name="unique_item_overlay_plaque_background_bitmap"
                src={LayoutImage('window-manager/unique_item_label_plaque_metal.png')}
                frame={{ x: 0, y: offset, width: PLAQUE_WIDTH, height: PLAQUE_HEIGHT }}
                layout={{ position: 'absolute', left: 1, top: 28 }}
            />
            <ThemeImage
                name="unique_item_plaque_foreground_bitmap"
                src={LayoutImage('window-manager/unique_item_label_plaque_border.png')}
                bitmap={{ stretchedX: false, stretchedY: false }}
                layout={{ position: 'absolute', left: 0, width: 36, top: 27, height: 9 }}
            />
            <GlyphNumber
                value={serialNumber}
                width={24}
                layout={{ left: 6, top: 29 }}
            />
            <ThemeImage
                name="unique_item_plaque_studs_bitmap"
                src={LayoutImage('window-manager/unique_item_label_studs.png')}
                bitmap={{ stretchedX: false, stretchedY: false }}
                layout={{ position: 'absolute', left: 0, width: 36, top: 27, height: 9 }}
            />
            <ThemeImage
                name="unique_item_overlay_glaze_bitmap"
                src={LayoutImage('window-manager/unique_item_label_glass_shine.png')}
                bitmap={{}}
                layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 36 }}
            />
        </Region>
    );
};

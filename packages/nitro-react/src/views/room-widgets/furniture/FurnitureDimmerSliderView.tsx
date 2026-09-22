import { Container as PixiContainer, FederatedPointerEvent } from 'pixi.js';
import { useEffect, useRef, useState } from 'react';

import { LayoutImage, Region, ThemeImage } from '#base/theme';

/** `slider_movement_area`'s width less `slider_button`'s: `_referenceWidth` (206 - 12). */
const REFERENCE_WIDTH = 194;

/** `slider_button`'s y in `slider_movement_area` as the layout places it, before anything moves it. */
const BUTTON_LAYOUT_TOP = 7;

export interface FurnitureDimmerSliderViewProps {
    value: number;
    min: number;
    max: number;
    /**
     * `DimmerViewAlphaSlider.buttonProcedure` reports only on `WME_UP` / `WME_UP_OUTSIDE`, and the
     * dimmer then puts the button back where the value says (`setValue`), so it snaps.
     * `BackgroundColorWidgetSlider.buttonProcedure` reports on every event the button sees - over,
     * down, each relocate of the drag, up - and never moves the button back.
     */
    reportOnEveryEvent: boolean;
    onChange: (value: number) => void;
    /** Where `brightness_container` / `<parameter>_container` puts `slider_base`; the movement area sits one pixel lower. */
    top: number;
}

/**
 * The brightness slider of the dimmer and each channel slider of the background toner - one
 * `slider_base` bitmap (`dimmer_slider_base`, 201x12 at 2, top) and one `slider_movement_area`
 * (206x17 at 0, top + 1) holding the `slider_button` bitmap (`dimmer_slider_button`, 12x17),
 * which is its own drag target and trigger with `bound_to_parent_rect`: `DimmerViewAlphaSlider`
 * and `BackgroundColorWidgetSlider`, which are the same class twice.
 *
 * The button's x is `int(_referenceWidth * (value - min) / (max - min))` and a dropped x reads back
 * as `int(x / _referenceWidth * (max - min)) + min`. The layout puts the button at y 7, which the
 * 17-high movement area clips to its top 10 pixels; the first time anything moves it
 * (`setValue` to a new x, or a drag), `WindowController.setRectangle`'s `bound_to_parent_rect`
 * branch pulls it up by its overhang to y 0, where it stays.
 */
export const FurnitureDimmerSliderView = ({ value, min, max, reportOnEveryEvent, onChange, top }: FurnitureDimmerSliderViewProps) => {
    const areaRef = useRef<PixiContainer | null>(null);
    const stopRef = useRef<(() => void) | null>(null);
    const [ dragX, setDragX ] = useState<number | null>(null);
    /** The background toner's button stays where it was dropped, while the value is still the one read from there. */
    const [ dropped, setDropped ] = useState<{ x: number; value: number } | null>(null);
    const [ moved, setMoved ] = useState(false);

    useEffect(() => () => stopRef.current?.(), []);

    const getSliderPosition = (next: number) => Math.trunc(REFERENCE_WIDTH * ((next - min) / (max - min)));
    const getValue = (x: number) => Math.trunc((x / REFERENCE_WIDTH) * (max - min)) + min;

    const restingX = (dropped && (dropped.value === value)) ? dropped.x : getSliderPosition(value);
    const x = dragX ?? restingX;

    // `set x` goes through `setRectangle` only when the x changes, and that is what drops it to y 0.
    if (!moved && (x !== 0)) setMoved(true);

    const report = (buttonX: number) => {
        const next = getValue(buttonX);

        if (!reportOnEveryEvent) setDropped(null);
        else setDropped({ x: buttonX, value: next });

        onChange(next);
    };

    const onPointerDown = (event: FederatedPointerEvent) => {
        const area = areaRef.current;

        if (!area) return;

        stopRef.current?.();

        // `WindowMouseDragger`: the grab offset is kept, so the pressed pixel stays under the pointer.
        const pointerId = event.pointerId;
        const startClient = { x: event.clientX, y: event.clientY };
        const startGlobal = { x: event.global.x, y: event.global.y };
        const grabX = area.toLocal(startGlobal).x;
        const startX = x;
        let current = startX;

        if (reportOnEveryEvent) report(current);

        const move = (moveEvent: PointerEvent) => {
            if (moveEvent.pointerId !== pointerId) return;

            // Any move of the drag goes through `setRectangle`, which bounds y to the area.
            setMoved(true);

            const pointerX = area.toLocal({ x: startGlobal.x + (moveEvent.clientX - startClient.x), y: startGlobal.y + (moveEvent.clientY - startClient.y) }).x;
            const next = Math.min(REFERENCE_WIDTH, Math.max(0, startX + Math.trunc(pointerX - grabX)));

            if (next === current) return;

            current = next;

            setDragX(next);

            if (reportOnEveryEvent) report(next);
        };

        const stop = () => {
            window.removeEventListener('pointermove', move);
            window.removeEventListener('pointerup', up);
            window.removeEventListener('pointercancel', up);

            stopRef.current = null;
        };

        // `WME_UP` / `WME_UP_OUTSIDE`: a release anywhere ends the drag.
        const up = (upEvent: PointerEvent) => {
            if (upEvent.pointerId !== pointerId) return;

            stop();
            setDragX(null);
            report(current);
        };

        stopRef.current = stop;

        window.addEventListener('pointermove', move);
        window.addEventListener('pointerup', up);
        window.addEventListener('pointercancel', up);
    };

    return (
        <>
            <ThemeImage
                src={LayoutImage('room-ui/dimmer_slider_base.png')}
                bitmap={{}}
                layout={{ position: 'absolute', left: 2, top, width: 201, height: 12 }}
            />
            <Region
                ref={areaRef}
                layout={{ position: 'absolute', left: 0, top: top + 1, width: 206, height: 17, overflow: 'hidden' }}
            >
                <ThemeImage
                    src={LayoutImage('room-ui/dimmer_slider_button.png')}
                    bitmap={{}}
                    hitThreshold={10}
                    onPointerOver={reportOnEveryEvent ? () => report(x) : undefined}
                    onPointerDown={onPointerDown}
                    layout={{ position: 'absolute', left: x, top: moved ? 0 : BUTTON_LAYOUT_TOP, width: 12, height: 17 }}
                />
            </Region>
        </>
    );
};

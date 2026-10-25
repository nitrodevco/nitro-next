import { Container as PixiContainer, FederatedPointerEvent } from 'pixi.js';
import { useState } from 'react';

import { useWindowPointerDrag } from '#base/hooks';
import { ClientToStage, LayoutImage, TemplateBindings, TemplateWindows } from '#base/theme';

/** `slider_movement_area`'s width less `slider_button`'s: `_referenceWidth` (206 - 12). */
const REFERENCE_WIDTH = 194;

export interface FurnitureSliderOptions {
    /** The window holding `slider_base` and `slider_movement_area`: `brightness_container`, `hue_container`... */
    container: string;
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
}

export interface FurnitureSlider {
    /** `slider_base` and `slider_button` of the container, by path. */
    bindings: TemplateBindings;
    /** Puts the button where the value (or the drag) says, through the window model. */
    arrange: (windows: TemplateWindows) => void;
}

/**
 * The brightness slider of the dimmer and each channel slider of the background toner -
 * `DimmerViewAlphaSlider` and `BackgroundColorWidgetSlider`, which are the same class twice, on the
 * layout's `slider_base` bitmap (given `dimmer_slider_base`) and `slider_button` bitmap (given
 * `dimmer_slider_button`) inside `slider_movement_area`. The button is its own drag target with
 * `bound_to_parent_rect`.
 *
 * The button's x is `int(_referenceWidth * (value - min) / (max - min))` (`setValue`) and a dropped
 * x reads back as `int(x / _referenceWidth * (max - min)) + min` (`getValue`). The layout puts the
 * button at y 7, which the 17-high movement area clips to its top 10 pixels; the first time
 * anything moves it (`set x` to a new x, or a drag), `setRectangle`'s `bound_to_parent_rect` branch
 * pulls it up by its overhang to y 0, where it stays.
 *
 * The drag itself is the template's: `slider_button`'s params make it a `mouse_dragging_target`
 * and trigger (33073), so the engine moves it by an offset on top of its laid-out place
 * (`useDragTarget`, `WindowMouseDragger`). This hook only reads the drag - the same whole-pixel
 * move, bounded to the area - and holds the laid-out place while it lasts. The button is
 * `dropToLayout`: at the release the engine's move goes and the button is laid out where
 * `setValue` says, so no move is left over for a later value (another preset, a reopen) to allow
 * for - which a layout bounded to the area (`bound_to_parent_rect`) could not.
 */
export const useFurnitureSlider = ({ container, value, min, max, reportOnEveryEvent, onChange }: FurnitureSliderOptions): FurnitureSlider => {
    const pointerDrag = useWindowPointerDrag();
    /** The laid-out place held while a drag is under way, so the engine's offset alone moves it. */
    const [ held, setHeld ] = useState<{ x: number; y: number | undefined } | null>(null);
    /** The background toner's button stays where it was dropped, while the value is still the one read from there. */
    const [ dropped, setDropped ] = useState<{ x: number; value: number } | null>(null);
    const [ moved, setMoved ] = useState(false);

    const getSliderPosition = (next: number) => Math.trunc(REFERENCE_WIDTH * ((next - min) / (max - min)));
    const getValue = (x: number) => Math.trunc((x / REFERENCE_WIDTH) * (max - min)) + min;

    /** Where the button shows, in the movement area. */
    const x = (dropped && (dropped.value === value)) ? dropped.x : getSliderPosition(value);

    // `set x` goes through `setRectangle` only when the x changes, and that is what drops it to y 0.
    if (!moved && (x !== 0)) setMoved(true);

    const layoutX = held ? held.x : x;
    const layoutY = held ? held.y : (moved ? 0 : undefined);

    const report = (buttonX: number) => {
        const next = getValue(buttonX);

        if (!reportOnEveryEvent) setDropped(null);
        else setDropped({ x: buttonX, value: next });

        onChange(next);
    };

    const onPointerDown = (event: FederatedPointerEvent) => {
        const target = event.currentTarget as PixiContainer | null;

        if (!target || (event.button !== 0)) return;

        // `WindowMouseDragger`: the grab offset is kept, so the pressed pixel stays under the pointer.
        const startClient = { x: event.clientX, y: event.clientY };
        const startGlobal = { x: event.global.x, y: event.global.y };
        // The button's space as the press found it: what draws it moves with it, so the pointer
        // is read against where it was, not where the drag has taken it.
        const space = target.worldTransform.clone();
        const grabX = space.applyInverse(startGlobal).x;
        const startX = x;
        let current = startX;
        let anyMove = false;

        setHeld({ x: layoutX, y: layoutY });

        if (reportOnEveryEvent) report(current);

        const move = (moveEvent: PointerEvent) => {
            anyMove = true;

            const pointerX = space.applyInverse({ x: startGlobal.x + ClientToStage(moveEvent.clientX - startClient.x), y: startGlobal.y + ClientToStage(moveEvent.clientY - startClient.y) }).x;
            const next = Math.min(REFERENCE_WIDTH, Math.max(0, startX + Math.trunc(pointerX - grabX)));

            if (next === current) return;

            current = next;

            if (reportOnEveryEvent) report(next);
        };

        // `WME_UP` / `WME_UP_OUTSIDE`: a release anywhere ends the drag.
        pointerDrag.start(event.pointerId, {
            onMove: move,
            onEnd: () => {
                // Any move of the drag goes through `setRectangle`, which bounds y to the area (0).
                if (anyMove) setMoved(true);

                setHeld(null);
                report(current);
            },
        });
    };

    return {
        bindings: {
            [`${container}/slider_base`]: { asset: LayoutImage('habbo-room-ui-com/dimmer_slider_base.png') },
            [`${container}/slider_button`]: {
                asset: LayoutImage('habbo-room-ui-com/dimmer_slider_button.png'),
                dropToLayout: true,
                onPointerOver: reportOnEveryEvent ? () => report(x) : undefined,
                onPointerDown,
            },
        },
        arrange: ({ find }) => {
            const button = find(`${container}/slider_button`);

            if (!button) return;

            if (layoutY !== undefined) button.setY(layoutY);

            button.setX(layoutX);
        },
    };
};

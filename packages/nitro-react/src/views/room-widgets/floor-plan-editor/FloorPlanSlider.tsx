import { Container as PixiContainer, FederatedPointerEvent } from 'pixi.js';
import { ReactNode, useCallback, useEffect, useRef } from 'react';

import { Box, BoxLayout, getGlobalRect, LayoutImage, ThemeImage } from '#base/theme';

export interface FloorPlanSliderProps {
    /** How many values the bar covers - `HeightMapEditor.LEVELS` for the draw height, `WALL_HEIGHT_LIMIT` for the walls. */
    steps: number;
    value: number;
    onChange: (value: number) => void;
    /** The bar's own width, which is what the pointer's distance along it is divided by. */
    width: number;
    height: number;
    /** Where the bar sits inside the control, and how far down the handle rides. */
    barLeft: number;
    barTop: number;
    trackTop: number;
    disabled?: boolean;
    /** The bar itself - a gradient for the draw height, a stretched divider for the wall height. */
    children: ReactNode;
    layout?: BoxLayout;
}

/** `tile_height_slider_track` / `wall_height_slider_track` - both sliders name the same handle bitmap. */
const TRACK_IMAGE = 'shared/avatar_editor_avatar_editor_download_icon.png';
const TRACK_WIDTH = 12;
const TRACK_HEIGHT = 16;

/** `BCFloorPlanEditor.enableWallHeightControls` dims what it turns off rather than hiding it. */
const DISABLED_ALPHA = 0.6;

/**
 * The two drag bars of the floor plan editor - `BCFloorPlanEditor.colorMapWindowProcedure` and
 * `wallHeightSliderProcedure`, which are the same gesture over different bars: where along the bar
 * the pointer is, as a fraction of its width, times the number of steps.
 *
 * Flash followed the pointer through the bar's own mouse events; the drag runs on window-level
 * pointer events here, so it keeps following once the pointer leaves the bar - which is what
 * `WME_UP_OUTSIDE` was there to cope with.
 */
export const FloorPlanSlider = ({ steps, value, onChange, width, height, barLeft, barTop, trackTop, disabled = false, children, layout }: FloorPlanSliderProps) => {
    const onChangeRef = useRef(onChange);
    const barRef = useRef<PixiContainer | null>(null);
    const listenersRef = useRef<{ move: (event: PointerEvent) => void; up: () => void } | null>(null);

    useEffect(() => {
        onChangeRef.current = onChange;
    });

    const stopDragging = useCallback(() => {
        const listeners = listenersRef.current;

        if (!listeners) return;

        window.removeEventListener('pointermove', listeners.move);
        window.removeEventListener('pointerup', listeners.up);
        listenersRef.current = null;
    }, []);

    useEffect(() => stopDragging, [ stopDragging ]);

    const onPointerDown = (event: FederatedPointerEvent) => {
        if (disabled || (event.button !== 0)) return;

        const node = barRef.current;

        if (!node) return;

        const pick = (clientX: number) => onChangeRef.current(Math.trunc(((clientX - getGlobalRect(node).x) / width) * steps));
        const move = (moveEvent: PointerEvent) => pick(moveEvent.clientX);

        listenersRef.current = { move, up: stopDragging };

        window.addEventListener('pointermove', move);
        window.addEventListener('pointerup', stopDragging);

        pick(event.clientX);
    };

    return (
        <Box layout={{ width, height, flexShrink: 0, ...layout }}>
            <Box
                ref={barRef}
                eventMode={disabled ? 'none' : 'static'}
                cursor={disabled ? undefined : 'pointer'}
                alpha={disabled ? DISABLED_ALPHA : 1}
                onPointerDown={onPointerDown}
                layout={{ position: 'absolute', left: barLeft, top: barTop, width, height: height - barTop }}
            >
                {children}
            </Box>
            <ThemeImage
                name="slider_track"
                src={LayoutImage(TRACK_IMAGE)}
                alpha={disabled ? DISABLED_ALPHA : 1}
                layout={{ position: 'absolute', left: Math.round(value * (width / steps)), top: trackTop, width: TRACK_WIDTH, height: TRACK_HEIGHT }}
            />
        </Box>
    );
};

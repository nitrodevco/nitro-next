import { FederatedPointerEvent } from 'pixi.js';

import { useWindowPointerDrag } from '#base/hooks';
import { ClientToStage, getGlobalRect, useLatest } from '#base/theme';

/**
 * The floor plan editor's two drag bars - `BCFloorPlanEditor.colorMapWindowProcedure` on
 * `tile_height_colormap` and `wallHeightSliderProcedure` on `wall_height_slider`, the same gesture
 * over different bars: where along the bar the pointer is (`localX / width`), times the number of
 * steps. Returns the bar's `onPointerDown`.
 *
 * Flash followed the pointer through the bar's own mouse events, `WME_UP_OUTSIDE` ending a drag
 * that left it; the drag runs on window-level pointer events here, so it keeps following once the
 * pointer leaves the bar.
 */
export const useFloorPlanSliderDrag = (steps: number, width: number, onChange: (value: number) => void, disabled = false) => {
    const onChangeRef = useLatest(onChange);
    const pointerDrag = useWindowPointerDrag();

    return (event: FederatedPointerEvent) => {
        if (disabled || (event.button !== 0)) return;

        const left = getGlobalRect(event.currentTarget).x;
        const pick = (clientX: number) => onChangeRef.current(Math.trunc(((ClientToStage(clientX) - left) / width) * steps));

        pointerDrag.start(event.pointerId, { onMove: move => pick(move.clientX) });

        pick(event.clientX);
    };
};

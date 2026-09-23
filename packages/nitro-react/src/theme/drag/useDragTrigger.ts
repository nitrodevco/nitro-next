import { Container as PixiContainer, FederatedPointerEvent } from 'pixi.js';
import { useContext } from 'react';

import { DragTargetContext, DragTargetController } from './DragTargetContext';

/**
 * Whether a press on `event.target` reached `event.currentTarget` unclaimed. In the client a
 * `WME_DOWN` goes to the window under the pointer and climbs to its parent only while no window
 * handles it (`MouseEventProcessor.passMouseEvent`), so a button inside a drag bar is pressed, not
 * dragged. Pixi fires a JSX `onPointerDown` on every ancestor whatever the child does (see
 * `useFrameDrag`), so the claim is read off the path instead: a node between the two with a
 * press or click handler of its own takes the press.
 */
const reachedUnclaimed = (event: FederatedPointerEvent): boolean => {
    let node = event.target as PixiContainer | null;

    while (node && node !== event.currentTarget) {
        if (node.onpointerdown || node.onpointertap || node.onclick || node.onmousedown) return false;

        node = node.parent;
    }

    return true;
};

/**
 * A window with Flash's `mouse_dragging_trigger` flag (257): the press handler that starts a drag
 * of the nearest `mouse_dragging_target` - `WindowController.update`'s `WME_DOWN` case walks up
 * from the trigger itself to the first ancestor-or-self with flag 32768 and hands it to
 * `getMouseDraggingService().begin`. `ownTarget` is the trigger's own controller when the same
 * window carries both flags (the self in ancestor-or-self); otherwise it is the nearest
 * `DragTargetContext`. Returns `undefined` when disabled, so a non-trigger adds no handler.
 */
export const useDragTrigger = (enabled: boolean, ownTarget?: DragTargetController | null): ((event: FederatedPointerEvent) => void) | undefined => {
    const inherited = useContext(DragTargetContext);
    const target = ownTarget ?? inherited;

    if (!enabled || !target) return undefined;

    return (event: FederatedPointerEvent) => {
        // Flash drags on `mouseDown`, the primary button's.
        if (event.button !== 0 || !reachedUnclaimed(event)) return;

        target.begin(event);
    };
};

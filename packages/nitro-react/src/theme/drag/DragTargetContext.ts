import { FederatedPointerEvent } from 'pixi.js';
import { createContext } from 'react';

/**
 * What a `mouse_dragging_target` window (param flag 32768) hands down to the windows inside it:
 * the way to start dragging it. `WindowController.update` on `WME_DOWN` walks up from a
 * `mouse_dragging_trigger` window (flag 257) to the first ancestor-or-self carrying the target
 * flag and gives that one to `WindowMouseDragger.begin`; the nearest provider of this context is
 * that ancestor. See `useDragTarget` and `useDragTrigger`.
 */
export interface DragTargetController {
    /** `IMouseDraggingService.begin(target)`: grab the target at the pointer of this press. */
    begin: (event: FederatedPointerEvent) => void;
}

export const DragTargetContext = createContext<DragTargetController | null>(null);

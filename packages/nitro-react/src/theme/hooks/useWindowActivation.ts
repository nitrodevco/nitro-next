/**
 * Window ordering for a window that is not a `Frame` - `WindowController.activate()`, the half of
 * it `useFrameDrag` does for frames that have a title bar to drag. A window takes the top of the
 * stack when it opens and again whenever it is pressed, and draws at the z-index the stack hands
 * it, so it sorts against every other window on the desktop (`WindowLayer` sorts its children).
 *
 * The toolbar's four settings windows are what needs this: Flash builds each one straight onto
 * desktop 1 (`SettingsExtension.open*Window`), where `activate()` orders it with the rest, but
 * none of them has a frame - they are bare bordered panels, so there is no `useFrameDrag` to
 * carry the ordering for them. They are all placed at the same corner, so without this a window
 * opened over another draws under it.
 *
 * Spread the result onto the window's root: `zIndex` and `onPointerDown`. The press reaches the
 * root by bubbling from whatever was actually clicked, so a control inside the window raises it
 * too - only `CloseButton` stops propagation, and a window being closed needs no raising.
 */
import { useEffect } from 'react';

import { useWindowActions, useWindowZIndex } from '#base/context/system';

export const useWindowActivation = (id: string) => {
    const zIndex = useWindowZIndex(id);
    const { bringWindowToFront } = useWindowActions();

    useEffect(() => {
        bringWindowToFront(id);
    }, [ id, bringWindowToFront ]);

    return { zIndex, onPointerDown: () => bringWindowToFront(id) };
};

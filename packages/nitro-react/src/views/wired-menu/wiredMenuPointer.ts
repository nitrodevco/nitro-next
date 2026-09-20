/**
 * The click-away test of the wired menu's bubbles - Flash's `windowProcedure` on the tab's
 * container closes the "add variable" bubble on a click in the container that is neither in the
 * bubble nor on the button that opens it. A click in a popup that floats above the windows (the
 * variable picker's expanded list) never reaches the container, as it never reached Flash's.
 */
import { Container } from 'pixi.js';

/** Whether `target` is `container` or anything under it. */
export const isWithinContainer = (target: unknown, container: Container | null): boolean => {
    if (!container) return false;

    let node = (target instanceof Container) ? target : null;

    while (node) {
        if (node === container) return true;

        node = node.parent;
    }

    return false;
};

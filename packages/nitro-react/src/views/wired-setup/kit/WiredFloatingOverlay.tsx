/**
 * Draws `children` over a kit component without its window's content area clipping it - what a
 * Flash child window does when it reaches past its parent (illumina's `warning_display` above an
 * input is wider than many wired dialogs: "Enter a valid number or select an available variable."
 * in the WIN63-202610121624 Give Variable, which the official client draws past the window's
 * edges). Internal to the kit.
 *
 * As `FloatingPopup` does, the overlay's container is moved after mount onto the window desktop
 * (`getWindowLayer`; and handed back before unmount); unlike a popup it stays in its window's place
 * in the stack - its z-index is the window's, a hair above - so a window opened over the dialog
 * (the "Update failed" alert) covers it as it covers the dialog. Its position and z-index follow
 * the component every frame, through a drag or a refocus. It takes no pointer events.
 */
import { Container } from 'pixi.js';
import { ReactNode, useLayoutEffect, useRef } from 'react';

import { Box, getWindowLayer, isModalDialogContainer } from '#base/theme';

/** Whether the node and every ancestor are visible and rendered - the overlay hides with its component. */
const isShown = (node: Container): boolean => {
    for (let current: Container | null = node; current; current = current.parent) {
        if (!current.visible || !current.renderable) return false;
    }

    return true;
};

/** Above its own window, below the next one (window z-indices count up in whole steps). */
const ABOVE_WINDOW = 0.5;

export interface WiredFloatingOverlayProps {
    /** Laid out from the component's top left, at its width; what overflows is drawn anyway. */
    children: ReactNode;
}

export const WiredFloatingOverlay = ({ children }: WiredFloatingOverlayProps) => {
    const hostRef = useRef<Container>(null);
    const overlayRef = useRef<Container>(null);

    useLayoutEffect(() => {
        const host = hostRef.current;
        const overlay = overlayRef.current;

        if (!host || !overlay) return;

        // The window desktop, and the window the component is in (its child there); inside a modal
        // dialog, that dialog's container, as `FloatingPopup` does.
        const desktop = getWindowLayer();
        let windowRoot: Container = host;

        while (windowRoot.parent && (windowRoot.parent !== desktop) && !isModalDialogContainer(windowRoot.parent)) windowRoot = windowRoot.parent;

        const layer = windowRoot.parent;

        if (!layer) return;

        layer.addChild(overlay);

        let frame = 0;
        let placed = '';

        const follow = () => {
            if (!host.destroyed && !overlay.destroyed) {
                const position = host.getGlobalPosition();
                const origin = layer.getGlobalPosition();
                const left = Math.round(position.x - origin.x);
                const top = Math.round(position.y - origin.y);
                const width = Math.round(host.layout?.computedLayout?.width ?? host.width);
                const key = `${left},${top},${width}`;

                // The layer lays its children out, so the overlay is placed through its layout.
                if (key !== placed) {
                    placed = key;
                    overlay.layout = { position: 'absolute', left, top, width };
                }

                overlay.zIndex = windowRoot.zIndex + ABOVE_WINDOW;
                overlay.visible = isShown(host);
            }

            frame = requestAnimationFrame(follow);
        };

        follow();

        return () => {
            cancelAnimationFrame(frame);

            if (!host.destroyed && !overlay.destroyed) host.addChild(overlay);
        };
    }, []);

    return (
        <Box
            ref={hostRef}
            eventMode="none"
            layout={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }}
        >
            <Box
                ref={overlayRef}
                eventMode="none"
                layout={{ position: 'absolute', left: 0, top: 0, width: '100%' }}
            >
                {children}
            </Box>
        </Box>
    );
};

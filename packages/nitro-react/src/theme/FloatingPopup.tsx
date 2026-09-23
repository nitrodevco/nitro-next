/**
 * A popup that floats above every window - what Flash gets by adding a window to the desktop
 * instead of to its parent (a drop menu's expanded view, `NewVariablePicker`'s
 * `expanded_view_wrapper.desktop.addChild(...)`) and closes on `WE_DEACTIVATED`.
 *
 * A window's content area clips (`ContentArea` masks its overflow), and a drop menu's list or a
 * sub menu of the wired variable picker reaches past the window's edge, so the popup cannot stay
 * where React mounts it. `@pixi/react` has no portal, so the popup's container is moved, after
 * mount, into the screen-sized layer all windows live in (the ancestor right under the stage)
 * (or, inside a `ModalDialog`, into that modal's container) and handed back before React unmounts it; React only ever talks to the container itself
 * (`removeChild` destroys it wherever it is), never to its position in the display list.
 *
 * `x` / `y` are screen coordinates - take them from `getGlobalRect(anchor)` in the handler that
 * opens the popup. A pointer press anywhere outside the popup (its overflowing children
 * included) calls `onOutsideClick`.
 */
import { GetRenderer } from '@nitrodevco/nitro-renderer';
import { Container } from 'pixi.js';
import { ReactNode, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

import { Box, BoxLayout } from './Box';
import { useRevealWhenSettled } from './hooks';
import { isModalDialogContainer } from './utils';

/** Above every frame (their z-indices count up from 100), below the tooltip layer (100000). */
const POPUP_Z_INDEX = 90000;

export interface FloatingPopupProps {
    x: number;
    y: number;
    onOutsideClick: () => void;
    layout?: BoxLayout;
    children?: ReactNode;
}

/** Whether a native pointer event landed on the popup. */
const isInsidePopup = (node: Container, event: PointerEvent): boolean => {
    const canvas = GetRenderer().canvas;

    if (!canvas) return true;

    const rect = canvas.getBoundingClientRect();

    return node.getBounds().containsPoint(event.clientX - rect.left, event.clientY - rect.top);
};

export const FloatingPopup = ({ x, y, onOutsideClick, layout, children }: FloatingPopupProps) => {
    const hostRef = useRef<Container>(null);
    const popupRef = useRef<Container>(null);
    // The node as state as well, for `useRevealWhenSettled`: a ref cannot be read while rendering.
    const [ popupNode, setPopupNode ] = useState<Container | null>(null);
    const attachPopup = useCallback((node: Container | null) => {
        popupRef.current = node;

        // The whole drawn area, not the laid-out box `Box` gives it: the event boundary prunes a
        // container's children outside its `hitArea`, and a sub list of the variable picker is
        // positioned well outside the popup's own layout.
        if (node) node.hitArea = { contains: (x: number, y: number) => node.getLocalBounds().rectangle.contains(x, y) };

        setPopupNode(node);
    }, []);
    // Kept unrendered until its lists and scrollbars have been laid out, rather than drawn half built for a frame or two.
    const revealed = useRevealWhenSettled(popupNode);
    const onOutsideClickRef = useRef(onOutsideClick);

    useEffect(() => {
        onOutsideClickRef.current = onOutsideClick;
    }, [ onOutsideClick ]);

    useLayoutEffect(() => {
        const host = hostRef.current;
        const popup = popupRef.current;

        if (!host || !popup || !(host instanceof Container)) return;

        let layer: Container = host;

        // Inside a modal dialog the popup stays in that modal's container, over its dialog - which
        // is above the window layer's popups - as Flash adds it to context 3's own desktop.
        while (layer.parent?.parent && !isModalDialogContainer(layer)) layer = layer.parent;

        layer.addChild(popup);

        return () => {
            if (!host.destroyed && !popup.destroyed) host.addChild(popup);
        };
    }, []);

    useEffect(() => {
        const onPointerDown = (event: PointerEvent) => {
            const popup = popupRef.current;

            if (!popup || isInsidePopup(popup, event)) return;

            onOutsideClickRef.current();
        };

        window.addEventListener('pointerdown', onPointerDown);

        return () => window.removeEventListener('pointerdown', onPointerDown);
    }, []);

    const popup = (
        <Box
            ref={attachPopup}
            x={x}
            y={y}
            zIndex={POPUP_Z_INDEX}
            renderable={revealed}
            eventMode="static"
            layout={{ position: 'absolute', left: 0, top: 0, ...layout }}
        >
            {children}
        </Box>
    );

    return (
        <Box
            ref={hostRef}
            layout={{ position: 'absolute', left: 0, top: 0, width: 0, height: 0 }}
        >
            {popup}
        </Box>
    );
};

/**
 * The modal dialog - `com.sulake.habbo.window.utils.ModalDialog`, what
 * `HabboWindowManagerComponent.buildModalDialogFromXML` builds (`IModalDialog`).
 *
 * Flash builds the dialog in window context 3 (`MODAL_DIALOG_LAYER`), which is above every
 * other layer, inside one stage-sized container that holds a background bitmap and the dialog
 * for each open modal, in the order they were opened. `refresh()` hides the desktops of contexts
 * 0 to 2 and gives the newest background a snapshot of them drawn through
 * `ColorTransform(0.25, 0.25, 0.25)` - everything under the dialog darkened to a quarter, and,
 * with a modal already up, the previous dialog darkened the same way over the previous
 * background (which is already dark, and is not darkened twice). Only the newest background and
 * dialog stay visible (`visible = i >= numChildren - 2`). The background is a window, so it takes
 * every click that would have reached what it covers. The dialog is `center()`ed in the
 * stage-sized container - `x = parent.width / 2 - width / 2`, stored as an int - when it is
 * built, on every `refresh()`, and on a stage resize (`onResize`, then a `refresh()` two frames
 * later). `dispose()` removes the pair and refreshes: the previous modal comes back with its own
 * background, or with none left the lower desktops show again.
 *
 * Here the background is live rather than a snapshot: a black fill at alpha 0.75 over the stage.
 * Normal blending gives `c * (1 - 0.75) + 0 * 0.75 = 0.25c` on every channel, which is Flash's
 * colour transform (the canvas is transparent where nothing draws, over the page's black `body`,
 * and black is what Flash's opaque black snapshot has there). Only the newest modal draws its
 * background, over the older modals' dialogs, which reproduces the composite Flash bakes. What
 * differs is that Flash's snapshot is a still: the room and windows under it stop animating until
 * the next `refresh()`, where here they keep moving at a quarter of their brightness.
 *
 * A dialog that has been dragged stays at its drag offset from the centre on a stage resize (the
 * offset is the `Frame`'s own); Flash's `onResize` puts it back in the centre.
 *
 * `ModalLayer` is context 3: mount it once in the window layer, above every window and floating
 * popup and under the tooltip layer. A `ModalDialog` can be rendered anywhere (a room widget
 * included); its container is moved into that layer after mount, the way `FloatingPopup` moves
 * itself, and handed back before React unmounts it. A `FloatingPopup` opened from inside a
 * modal's dialog stays in that modal's container, above the dialog - Flash adds it to context 3's
 * own desktop.
 */
import { Container } from 'pixi.js';
import { ReactNode, useCallback, useEffect, useId, useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react';

import { Box } from './Box';
import { useChildBounds, useLayoutSize, useRevealWhenSettled } from './hooks';
import { ColorLayer } from './layer';
import { getModalLayer, getModalStack, markModalDialogContainer, pushModal, removeModal, setModalLayer, subscribeModalLayer } from './utils';

/** Above every frame (from 100 up) and floating popup (90000), below the tooltip layer (100000). */
const MODAL_Z_INDEX = 95000;

/** `ModalDialog.COLOR_TRANSFORM`'s multiplier of 0.25, as the alpha of a black fill over the stage. */
const BACKDROP_ALPHA = 1 - 0.25;

/**
 * Context 3's desktop: the full-screen layer `ModalDialog` puts its container in. Mount once, in
 * the window layer, after the windows it should cover.
 */
export const ModalLayer = () => {
    const attach = useCallback((node: Container | null) => {
        setModalLayer(node);
    }, []);

    return (
        <Box
            ref={attach}
            zIndex={MODAL_Z_INDEX}
            sortableChildren={true}
            eventMode="passive"
            layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
        />
    );
};

export interface ModalDialogProps {
    /** The dialog - the window Flash built from the layout, usually a `Frame`. It is centred, so give it no position. */
    children?: ReactNode;
}

export const ModalDialog = ({ children }: ModalDialogProps) => {
    const id = useId();
    const layer = useSyncExternalStore(subscribeModalLayer, getModalLayer);
    const stack = useSyncExternalStore(subscribeModalLayer, getModalStack);
    const hostRef = useRef<Container>(null);
    const modalRef = useRef<Container>(null);
    const [ dialogNode, setDialogNode ] = useState<Container | null>(null);
    const stage = useLayoutSize(layer);
    const dialog = useChildBounds(dialogNode);
    const order = stack.indexOf(id);
    const isNewest = (order >= 0) && (order === (stack.length - 1));
    // `WindowController.center()`: half the parent less half the window, truncated by the int `x`/`y`.
    const x = dialog ? Math.trunc((stage.width / 2) - (dialog.right / 2)) : 0;
    const y = dialog ? Math.trunc((stage.height / 2) - (dialog.bottom / 2)) : 0;
    // The pair shows once the dialog has been laid out and centred, the way Flash adds it built.
    const revealed = useRevealWhenSettled(dialogNode, () => {
        const computed = dialogNode?.layout?.computedLayout;

        return !!dialog && !!computed && (computed.left === x) && (computed.top === y);
    });

    useEffect(() => {
        pushModal(id);

        return () => removeModal(id);
    }, [ id ]);

    useLayoutEffect(() => {
        const host = hostRef.current;
        const modal = modalRef.current;

        if (!layer || !host || !modal) return;

        markModalDialogContainer(modal, true);
        layer.addChild(modal);

        return () => {
            markModalDialogContainer(modal, false);

            if (!host.destroyed && !modal.destroyed) host.addChild(modal);
        };
    }, [ layer ]);

    return (
        <Box
            ref={hostRef}
            layout={{ position: 'absolute', left: 0, top: 0, width: 0, height: 0 }}
        >
            <Box
                ref={modalRef}
                zIndex={Math.max(0, order)}
                sortableChildren={true}
                renderable={revealed}
                eventMode="passive"
                layout={{ position: 'absolute', left: 0, top: 0, width: stage.width, height: stage.height }}
            >
                <Box
                    visible={isNewest}
                    eventMode="static"
                    layout={{ position: 'absolute', left: 0, top: 0, width: stage.width, height: stage.height }}
                >
                    <ColorLayer
                        color="#000000"
                        alpha={BACKDROP_ALPHA}
                    />
                </Box>
                <Box
                    ref={setDialogNode}
                    eventMode="passive"
                    layout={{ position: 'absolute', left: x, top: y }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
};

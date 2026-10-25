/**
 * The arrow of `window/HintManager`: a `common_green_arrow_vertical` (style 1) or
 * `common_green_arrow_horizontal` bitmap pointing at the element registered under the active key,
 * following it every frame (`update`, an update receiver) and shown only while the element is.
 *
 * - Style 1 sits 10 above the element, centred on it, pointing down - or, without room above it
 *   (`y - height - 10 <= 0`), under it, mirrored to point up (`zoomY = -1`). It first slides in, 15 a
 *   frame, from 400 above (below) its spot, then bobs `5 * |sin(t * 0.003)|` away from the element.
 * - Any other style sits 10 left of an element in the desktop's right half, pointing right, or 10 right
 *   of one in the left half, mirrored (`zoomX = -1`), centred on it vertically, and bobs the same way.
 *
 * `showHint` with a start rectangle (`animateHint`) first flies the arrow from there, at 40% of its
 * size, to its spot as it is then (`getTargetRect`): `Combo(EaseOut(MoveTo, 1), ResizeTo)`, rate 1 being
 * linear, over `500 - |1 / distance * 100 * 500 * 0.5|` ms - shown whether or not the element is - and
 * only then starts following. An element at the desktop's very corner (0, 0) is taken as not placed
 * yet: the arrow is not moved that frame.
 *
 * Flash creates the arrow in the element's own window context (`_loc3_.window.context.create(..)`,
 * HintManager.as:88), on top of that context's desktop. So one is mounted per desktop: the window
 * layer's (context 1) draws it over every window, under the tooltips, for an element in that layer -
 * the toolbar, the purse, the chat input; the room's (context 0) draws it over the room and under
 * every window for an element there - the own name bubble of a room entry, which `ContextInfoView`
 * adds to `getDesktop(0)` (ContextInfoView.as:217). It is never a mouse target.
 */
import { GetTicker } from '@nitrodevco/nitro-renderer';
import { Container as PixiContainer, Sprite, Ticker } from 'pixi.js';
import { useEffect, useRef } from 'react';

import { HINT_STYLE_VERTICAL, useHintStore } from '#base/context/hints';
import { useViewportSize } from '#base/hooks';
import { Box, getGlobalRect, getWindowLayer, GlobalRect, LayoutImage, useLatest, useTextureFromUrl } from '#base/theme';

/** Over the frames (from 100), the floating popups (90000) and the modal layer (95000); under the tooltips (100000). */
const HINT_Z_INDEX = 99000;
/** The gap between the arrow and its element. */
const GAP = 10;
/** How far off the arrow starts sliding in from, and how far it slides a frame. */
const SLIDE_FROM = 400;
const SLIDE_STEP = 15;
/** The slide stops this close to the spot, `15 + 10`. */
const SLIDE_STOP = SLIDE_STEP + GAP;
/** The top a slide down may start from. */
const SLIDE_MIN_TOP = 15;
/** `animateHint`: the arrow flies in at 40% of its size. */
const START_SCALE = 0.4;

/** The bob: `5 * |sin(getTimer() * 0.003)|`. */
const bob = () => 5 * Math.abs(Math.sin(performance.now() * 0.003));

/** The window context whose desktop holds the element: the window layer's (1), or the room's (0) under it. */
const contextOf = (node: PixiContainer): number => {
    const layer = getWindowLayer();

    for (let current: PixiContainer | null = node; current; current = current.parent) {
        if (current === layer) return 1;
    }

    return 0;
};

/** `IWindow.visible` up the tree: a box that is not drawn, or one under a hidden one, does not show. */
const isShown = (node: PixiContainer): boolean => {
    for (let current: PixiContainer | null = node; current; current = current.parent) {
        if (!current.visible || !current.renderable) return false;
    }

    return true;
};

interface HintGeometry {
    x: number;
    y: number;
    width: number;
    height: number;
    zoomX: number;
    zoomY: number;
    visible: boolean;
}

export interface HintArrowViewProps {
    /** The window context whose desktop this arrow is drawn on: it shows only for an element there. */
    context: number;
}

export const HintArrowView = ({ context }: HintArrowViewProps) => {
    const activeHint = useHintStore(x => x.activeHint);
    const node = useHintStore(x => (x.activeHint ? x.nodes[x.activeHint.key] : undefined));
    const vertical = (activeHint?.style === HINT_STYLE_VERTICAL);
    const texture = useTextureFromUrl(activeHint ? LayoutImage(vertical ? 'habbo-window-manager-com/common_green_arrow_vertical.png' : 'habbo-window-manager-com/common_green_arrow_horizontal.png') : undefined);
    const viewport = useViewportSize();
    const spriteRef = useRef<Sprite>(null);

    const viewportRef = useLatest(viewport);
    const nodeRef = useLatest(node);

    useEffect(() => {
        if (!activeHint || !texture) return;

        // `fitSizeToContents`: the window is the bitmap's size; it starts hidden at the desktop's corner.
        const hint: HintGeometry = { x: 0, y: 0, width: texture.width, height: texture.height, zoomX: 1, zoomY: 1, visible: false };
        const target = () => {
            const current = nodeRef.current;

            return (current && !current.destroyed) ? current : undefined;
        };

        // `getTargetRect`: where the arrow comes to rest, without the bob.
        const targetRect = (element: GlobalRect): { x: number; y: number } => {
            if (vertical) {
                const y = ((element.y - hint.height - GAP) > 0) ? (element.y - hint.height - GAP) : (element.y + element.height + GAP);

                return { x: element.x + ((element.width - hint.width) / 2), y };
            }

            const x = ((element.x + (element.width / 2)) > (viewportRef.current.width / 2)) ? (element.x - hint.width - GAP) : (element.x + element.width + GAP);

            return { x, y: element.y + ((element.height - hint.height) / 2) };
        };

        // `update`.
        const follow = () => {
            const element = target();

            if (!element) {
                hint.visible = false;

                return;
            }

            const rect = getGlobalRect(element);
            const x = Math.trunc(rect.x);
            const y = Math.trunc(rect.y);

            if ((x === 0) && (y === 0)) return;

            if (vertical) {
                if ((y - hint.height - GAP) > 0) {
                    const top = y - hint.height;

                    if (hint.y === 0) hint.y = Math.max(top - SLIDE_FROM, SLIDE_MIN_TOP);

                    if ((top - hint.y) > SLIDE_STOP) hint.y += SLIDE_STEP;
                    else hint.y = Math.trunc(top - GAP - bob());

                    hint.zoomY = 1;
                } else {
                    const bottom = y + rect.height;

                    if (hint.y === 0) hint.y = Math.min(viewportRef.current.height - hint.height, hint.y + SLIDE_FROM);

                    if ((bottom - hint.y) > SLIDE_STOP) hint.y -= SLIDE_STEP;
                    else hint.y = Math.trunc(bottom + GAP + bob());

                    hint.zoomY = -1;
                }

                hint.x = Math.trunc(x + ((rect.width - hint.width) / 2));
            } else {
                if ((x + (rect.width / 2)) > (viewportRef.current.width / 2)) {
                    hint.x = Math.trunc(x - hint.width - GAP - bob());
                    hint.zoomX = 1;
                } else {
                    hint.x = Math.trunc(x + rect.width + GAP + bob());
                    hint.zoomX = -1;
                }

                hint.y = Math.trunc(y + ((rect.height - hint.height) / 2));
            }

            hint.visible = isShown(element) && (contextOf(element) === context);
        };

        // The bitmap mirrored by its zoom inside the window's rectangle.
        const draw = () => {
            const sprite = spriteRef.current;

            if (!sprite) return;

            sprite.visible = hint.visible;
            sprite.position.set(hint.x + (hint.width / 2), hint.y + (hint.height / 2));
            sprite.scale.set(hint.zoomX * (hint.width / texture.width), hint.zoomY * (hint.height / texture.height));
        };

        // `animateHint`: the flight in from the start rectangle, when there is one and somewhere to go.
        const start = activeHint.startRect;
        const element = target();
        let flight: { fromX: number; fromY: number; toX: number; toY: number; durationMs: number; elapsed: number } | undefined;

        if (start && element) {
            const to = targetRect(getGlobalRect(element));
            const deltaX = Math.trunc(start.x - to.x);
            const deltaY = Math.trunc(start.y - to.y);
            const distance = Math.sqrt((deltaX * deltaX) + (deltaY * deltaY));

            flight = {
                fromX: Math.trunc(start.x),
                fromY: Math.trunc(start.y),
                toX: Math.trunc(to.x),
                toY: Math.trunc(to.y),
                durationMs: (distance > 0) ? Math.trunc(500 - Math.abs(1 / distance * 100 * 500 * 0.5)) : 0,
                elapsed: 0,
            };
            hint.x = flight.fromX;
            hint.y = flight.fromY;
            hint.visible = contextOf(element) === context;
        }

        const tick = (ticker?: Ticker) => {
            if (flight) {
                flight.elapsed += ticker?.deltaMS ?? 0;

                const progress = (flight.durationMs > 0) ? Math.min(1, flight.elapsed / flight.durationMs) : 1;
                const scale = START_SCALE + ((1 - START_SCALE) * progress);

                hint.x = Math.trunc(flight.fromX + ((flight.toX - flight.fromX) * progress));
                hint.y = Math.trunc(flight.fromY + ((flight.toY - flight.fromY) * progress));
                hint.width = Math.trunc(texture.width * scale);
                hint.height = Math.trunc(texture.height * scale);

                // `motionComplete`: following from here on.
                if (progress >= 1) {
                    flight = undefined;
                    follow();
                }
            } else {
                follow();
            }

            draw();
        };

        tick();
        GetTicker().add(tick);

        return () => {
            GetTicker().remove(tick);
        };
    }, [ activeHint, texture, vertical, context ]);

    if (!activeHint || !texture) return null;

    return (
        <Box
            zIndex={(context === 1) ? HINT_Z_INDEX : undefined}
            eventMode="none"
            layout={{ position: 'absolute', left: 0, top: 0, width: 0, height: 0 }}
        >
            <pixiSprite
                ref={spriteRef}
                texture={texture}
                anchor={0.5}
                visible={false}
                eventMode="none"
            />
        </Box>
    );
};

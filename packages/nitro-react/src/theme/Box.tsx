import { Container, Graphics } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, JSX, ReactNode, RefAttributes, useCallback, useState } from 'react';

import { cursorForHandlers, resolveEventMode, wrapTextChildren } from './utils';

/**
 * The flex/positioning primitive: a thin typed wrapper around pixiContainer + @pixi/layout's
 * `layout` prop (flexDirection, justifyContent, alignItems, gap, padding, position:
 * 'absolute'/'relative', percentage sizing, ...). Views compose everything from Box.
 */
export type BoxProps = JSX.IntrinsicElements['pixiContainer'] & {
    /**
     * A box that answers no press of its own, the way a Flash window without
     * `input_event_processor` does: `MouseEventProcessor` builds its candidate list with
     * `groupParameterFilteredChildrenUnderPoint`, so a plain container is never a mouse target
     * and the press reaches whatever is drawn beneath it. Pixi is not that generous - its
     * `hitTestFn` reports a hit for ANY container that carries a `hitArea` once an ancestor is
     * interactive (`_isInteractive` is the mode inherited down the walk), and the empty path it
     * returns for a passive one still ends the parent's sibling loop. So a `hitArea`'d box that
     * covers a sibling swallows that sibling's presses: the `_CONTENT` of a frame with a zero top
     * margin lies over the header and stopped the avatar editor being dragged.
     *
     * Only for a box with no handlers of its own, and only where something else still bounds its
     * children - a clipping box prunes them through its mask (`StencilMask.containsPoint`), which
     * is what a box without a `hitArea` otherwise loses.
     */
    pointerTransparent?: boolean;
    /**
     * How far past its own box the clip reaches - `left, top, right, bottom`, each measured
     * outwards - for a box whose children are cropped somewhere other than its edges. See
     * `ContentArea`, which is the one box that needs it and only on one side.
     */
    clipOutset?: readonly [ number, number, number, number ];
};

/** The object-shaped half of the `layout` prop's type (it also allows boolean/null shorthand). */
export type BoxLayout = Extract<BoxProps['layout'], object>;

/**
 * A self-tracking fallback hit area. Per Pixi's own EventBoundary (hitPruneFn/hitTestFn), a
 * `static`/`dynamic` Container is only ever a hit target over the area its own `hitArea` (or,
 * absent one, `containsPoint`) reports - a plain Container has no shape of its own, so with no
 * `hitArea` set its clickable region silently shrinks to the union of whatever passive/
 * interactive children happen to sit under the pointer. Every themed background/overlay layer
 * (NineSliceLayer, SpriteLayer, ColorLayer, CompositePieceSprite, BlendOverlay) deliberately
 * sets `eventMode="none"` so the art doesn't shadow its own container's press handlers - which
 * means without this, a Button/CloseButton/ContainerButton/etc.'s real clickable area is
 * whatever's left over (usually just its text label), even though its rendered art fills the
 * whole box. `contains` re-reads the box's own yoga-computed size on every hit test (the same
 * `.layout?.computedLayout` @pixi/layout exposes that theme/utils/useFrameDrag.ts already
 * reads for its own sizing math), so it stays correct as content/padding resize the box across
 * renders without an effect keeping a baked Rectangle in sync.
 *
 * It is not unused on a passive Box, as this once claimed: `hitTestFn` returns a hit for any
 * container carrying a `hitArea`, and the mode it tests is the one inherited from the nearest
 * interactive ancestor, not the container's own. A passive Box therefore still ends its parent's
 * sibling walk over the area it covers - which is what bounds a container's children to its own
 * box, and what `pointerTransparent` opts out of where a box must let the press through instead.
 */
const attachDefaultHitArea = (node: Container) => {
    if (node.hitArea) return;

    node.hitArea = {
        contains: (x: number, y: number) => {
            const computed = node.layout?.computedLayout;
            const width = computed?.width ?? node.width;
            const height = computed?.height ?? node.height;

            return (x >= 0) && (x <= width) && (y >= 0) && (y <= height);
        },
    };
};

/**
 * @pixi/layout only implements `overflow: 'hidden'` / `'scroll'` clipping on its own specialised
 * `LayoutContainer`, never on the plain `pixiContainer` a Box wraps (confirmed in its source -
 * see utils/ScrollViewport.tsx, which worked around it for the scrollers). A CSS box clips, so
 * the Pixi Box does too: a rectangle Graphics that fills the box through the same fill-stretch
 * layout every background layer uses is added as the box's own child and assigned as its mask -
 * the child (not sibling) relationship is what pixi.js's mask bounds walk requires.
 */
const clipsOverflow = (layout: BoxProps['layout']): boolean => {
    if (!layout || typeof layout !== 'object') return false;

    const overflow = layout.overflow;

    return overflow === 'hidden' || overflow === 'scroll';
};

export const Box: ForwardRefExoticComponent<BoxProps & RefAttributes<Container>> = forwardRef<Container, BoxProps>(
    ({ children, eventMode, cursor, onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap, mask, pointerTransparent, clipOutset, ...props }, ref) => {
        const [ overflowMask, setOverflowMask ] = useState<Graphics | null>(null);
        const clips = clipsOverflow(props.layout);

        const setRef = useCallback((node: Container | null) => {
            if (node && !pointerTransparent) attachDefaultHitArea(node);

            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
        }, [ ref, pointerTransparent ]);

        const resolvedEventMode = resolveEventMode(eventMode, { onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap });

        return (
            <pixiContainer
                ref={setRef}
                eventMode={resolvedEventMode}
                cursor={cursor ?? cursorForHandlers(resolvedEventMode, { onPointerTap })}
                onPointerOver={onPointerOver}
                onPointerOut={onPointerOut}
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
                onPointerUpOutside={onPointerUpOutside}
                onPointerTap={onPointerTap}
                mask={mask ?? (clips ? (overflowMask ?? undefined) : undefined)}
                {...props}
            >
                {clips && !mask && (clipOutset
                    ? (
                            // The insets go on a plain container with the rectangle filling it:
                            // `@pixi/layout` sizes a Graphics from the geometry it holds unless its
                            // style states a size, so insets on the mask itself leave it the 1x1 it
                            // draws - and a 1x1 mask hides everything the box holds.
                            <pixiContainer
                                eventMode="none"
                                layout={{ position: 'absolute', left: -clipOutset[0], top: -clipOutset[1], right: -clipOutset[2], bottom: -clipOutset[3] }}
                            >
                                <pixiGraphics
                                    ref={setOverflowMask}
                                    eventMode="none"
                                    roundPixels
                                    layout={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }}
                                    draw={(g: Graphics) => { g.clear().rect(0, 0, 1, 1).fill(0xffffff); }}
                                />
                            </pixiContainer>
                        )
                    : (
                            <pixiGraphics
                                ref={setOverflowMask}
                                eventMode="none"
                                roundPixels
                                layout={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }}
                                draw={(g: Graphics) => { g.clear().rect(0, 0, 1, 1).fill(0xffffff); }}
                            />
                        ))}
                {wrapTextChildren(children as ReactNode)}
            </pixiContainer>
        );
    },
);

Box.displayName = 'Box';

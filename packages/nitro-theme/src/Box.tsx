import { Container, Graphics } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, JSX, ReactNode, RefAttributes, use, useCallback, useState } from 'react';

import { isTemplateInspecting, noteInspectTarget, TemplateInspectContext, TemplateInspectWindowContext } from './inspect';
import { attachBoxHitArea, cursorForHandlers, FillLayout, resolveEventMode, wrapTextChildren } from './utils';

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

/*
 * Every Box gets `attachBoxHitArea`'s self-tracking hit area. Every themed background/overlay layer
 * (`NineSliceLayer`, `SpriteLayer`, `ColorLayer`, a `CompositeLayer` piece) sets `eventMode="none"`
 * so the art doesn't shadow its own container's press handlers - so without a `hitArea` of its own a
 * Button's clickable area would be whatever is left over (usually just its label), though its art
 * fills the whole box.
 *
 * It is not unused on a passive Box: `hitTestFn` returns a hit for any container carrying a
 * `hitArea`, and the mode it tests is the one inherited from the nearest interactive ancestor, not
 * the container's own. A passive Box therefore still ends its parent's sibling walk over the area it
 * covers - which is what bounds a container's children to its own box, and what
 * `pointerTransparent` opts out of where a box must let the press through instead.
 */

/**
 * @pixi/layout only implements `overflow: 'hidden'` / `'scroll'` clipping on its own specialised
 * `LayoutContainer`, never on the plain `pixiContainer` a Box wraps (`ScrollViewport` works round
 * it the same way). So a Box that names an `overflow` clips itself: a rectangle Graphics filling the
 * box (`FillLayout`) is added as the box's own child and assigned as its mask - the child (not
 * sibling) relationship is what pixi.js's mask bounds walk requires.
 */
const clipsOverflow = (layout: BoxProps['layout']): boolean => {
    if (!layout || typeof layout !== 'object') return false;

    const overflow = layout.overflow;

    return overflow === 'hidden' || overflow === 'scroll';
};

/**
 * The flex/positioning primitive every themed component and view is built from: a `pixiContainer`
 * with @pixi/layout's `layout` prop, a hit area that follows its laid-out box, its own clip when its
 * layout names an `overflow`, and loose text children drawn as `ThemeText`.
 */
export const Box: ForwardRefExoticComponent<BoxProps & RefAttributes<Container>> = forwardRef<Container, BoxProps>(
    ({ children, eventMode, cursor, onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap, mask, pointerTransparent, clipOutset, ...props }, ref) => {
        const [ overflowMask, setOverflowMask ] = useState<Graphics | null>(null);
        const clips = clipsOverflow(props.layout);
        // The template element this box draws, for the extension inspector (`inspect`): read only while it is on.
        const inspectNode = isTemplateInspecting() ? use(TemplateInspectContext) : undefined;
        const inspectWindow = inspectNode ? use(TemplateInspectWindowContext) : undefined;

        const setRef = useCallback((node: Container | null) => {
            if (node && !pointerTransparent) attachBoxHitArea(node);
            if (node && inspectNode && inspectWindow) noteInspectTarget(node, { node: inspectNode, window: inspectWindow });

            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
        }, [ ref, pointerTransparent, inspectNode, inspectWindow ]);

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
                {clips && !mask && (
                    <pixiGraphics
                        ref={setOverflowMask}
                        eventMode="none"
                        roundPixels
                        // With an outset the mask reaches past the box by it on each side. Its size
                        // is stated as `'auto'` so Yoga takes it from the insets: left unstated it
                        // would be `@pixi/layout`'s leaf default, `'intrinsic'` - the 1x1 the
                        // rectangle draws - and a 1x1 mask hides everything the box holds.
                        layout={clipOutset
                            ? { position: 'absolute', left: -clipOutset[0], top: -clipOutset[1], right: -clipOutset[2], bottom: -clipOutset[3], width: 'auto', height: 'auto' }
                            : FillLayout}
                        draw={(g: Graphics) => { g.clear().rect(0, 0, 1, 1).fill(0xffffff); }}
                    />
                )}
                {wrapTextChildren(children as ReactNode)}
            </pixiContainer>
        );
    },
);

Box.displayName = 'Box';

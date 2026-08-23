import type { Container } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type JSX, type MouseEventHandler, type PointerEventHandler, type ReactNode, type Ref, type RefAttributes, useCallback } from 'react';

import { getRenderMode } from '#base/theme-core';

import { boxLayoutToStyle } from './dom/boxStyle';
import { wrapTextChildren } from './utils/wrapTextChildren';

/**
 * The flex/positioning primitive: a thin typed wrapper around pixiContainer + @pixi/layout's
 * `layout` prop (flexDirection, justifyContent, alignItems, gap, padding, position:
 * 'absolute'/'relative', percentage sizing, ...). Views compose everything from Box the way
 * they compose divs in the DOM theme package.
 */
export type BoxProps = JSX.IntrinsicElements['pixiContainer'];

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
 * `.layout?.computedLayout` @pixi/layout exposes that theme-pixi/utils/useFrameDrag.ts already
 * reads for its own sizing math), so it stays correct as content/padding resize the box across
 * renders without an effect keeping a baked Rectangle in sync. Harmless to set unconditionally -
 * Pixi only ever consults a container's own `hitArea` when that container's own `eventMode` is
 * `static`/`dynamic` (see `_isInteractive`/`isInteractive()` in EventBoundary/
 * FederatedEventTarget), so it's simply unused by the many plain layout Boxes that stay at the
 * default `passive` mode.
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

const BoxPixi = forwardRef<Container, BoxProps>(
    ({ children, ...props }, ref) => {
        const setRef = useCallback((node: Container | null) => {
            if (node) attachDefaultHitArea(node);

            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
        }, [ ref ]);

        return (
            <pixiContainer
                ref={setRef}
                {...props}
            >
                {wrapTextChildren(children as ReactNode)}
            </pixiContainer>
        );
    },
);

BoxPixi.displayName = 'BoxPixi';

/**
 * `BoxProps` is `JSX.IntrinsicElements['pixiContainer']` - the full Pixi Container prop
 * surface (filters, mask, hitArea, blendMode, ...). Only the subset actually exercised by the
 * dual-target components (layout, eventMode, cursor, the plain zero-arg pointer handlers
 * `useInteractionState` produces, x/y, zIndex, alpha) is translated to CSS/DOM event props
 * here; anything else (Frame's drop-shadow `filters`, `mask`, a custom `hitArea`) is a
 * Pixi-only concern that simply doesn't apply in DOM mode and is dropped rather than faked.
 */
const BoxDom = forwardRef<Container, BoxProps>(
    ({ children, layout, eventMode, cursor, x, y, zIndex, alpha, onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerTap }, ref) => {
        const style = boxLayoutToStyle(layout as BoxLayout | undefined);

        if (eventMode === 'none') style.pointerEvents = 'none';
        if (typeof cursor === 'string') style.cursor = cursor;
        if (typeof zIndex === 'number') style.zIndex = zIndex;
        if (typeof alpha === 'number') style.opacity = alpha;
        if (x || y) style.transform = `translate(${(x as number) || 0}px, ${(y as number) || 0}px)`;

        return (
            <div
                // DOM mode never runs the Pixi-specific ref consumers a caller might be holding
                // this for (measurement via `.layout.computedLayout`, drag/resize, hitArea
                // wiring) - none of that executes when getRenderMode() === 'dom', so redirecting
                // the incoming `Ref<Container>` at a plain HTMLDivElement here is safe in
                // practice even though the two element types don't structurally match.
                ref={ref as unknown as Ref<HTMLDivElement>}
                style={style}
                onPointerEnter={onPointerOver as unknown as PointerEventHandler}
                onPointerLeave={onPointerOut as unknown as PointerEventHandler}
                onPointerDown={onPointerDown as unknown as PointerEventHandler}
                onPointerUp={onPointerUp as unknown as PointerEventHandler}
                onClick={onPointerTap as unknown as MouseEventHandler}
            >
                {wrapTextChildren(children as ReactNode)}
            </div>
        );
    },
);

BoxDom.displayName = 'BoxDom';

export const Box: ForwardRefExoticComponent<BoxProps & RefAttributes<Container>> = forwardRef<Container, BoxProps>(
    (props, ref) => getRenderMode() === 'dom'
        ? (
                <BoxDom
                    ref={ref}
                    {...props}
                />
            )
        : (
                <BoxPixi
                    ref={ref}
                    {...props}
                />
            ),
);

Box.displayName = 'Box';

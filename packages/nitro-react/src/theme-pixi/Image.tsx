import { Container as PixiContainer, EventMode, FederatedPointerEvent, Rectangle, Texture } from 'pixi.js';
import { CSSProperties, forwardRef, MouseEventHandler, PointerEventHandler, useMemo } from 'react';

import { useConfigValue } from '#base/context';
import { getRenderMode } from '#base/theme-core';

import { Box, BoxLayout } from './Box';
import { useTextureFromUrl } from './utils/usePixiTexture';
import { SpriteFrame } from './utils/useSpriteFrameTexture';

export interface ImageProps {
    src: string | undefined;
    /** Crop a sub-region out of `src` (a shared spritesheet) instead of showing it whole. */
    frame?: SpriteFrame;
    /** Explicit render size - omit to use `frame`'s own size, or the resolved image's native size. */
    width?: number;
    height?: number;
    tint?: string;
    eventMode?: EventMode;
    cursor?: string;
    /**
     * Typed as taking Pixi's own event (accepting a caller who needs it, e.g. to
     * `.stopPropagation()`) - a plain zero-arg callback is still assignable here, and the DOM
     * branch passes through to the real PointerEvent/MouseEvent at runtime regardless of this
     * declared type, same cross-target cast Box.tsx's own handler props already rely on.
     */
    onPointerOver?: (event: FederatedPointerEvent) => void;
    onPointerOut?: (event: FederatedPointerEvent) => void;
    onPointerDown?: (event: FederatedPointerEvent) => void;
    onPointerUp?: (event: FederatedPointerEvent) => void;
    onPointerUpOutside?: (event: FederatedPointerEvent) => void;
    onPointerTap?: (event: FederatedPointerEvent) => void;
    /**
     * Falls back to `loading.icon.url` while `src` is resolving/erroring, instead of rendering
     * nothing. Only meaningful for whole-image (no `frame`) use - matches DOM's Image.tsx
     * loading-placeholder behavior. Left off by default: for a cropped UI-chrome sprite (an
     * icon, a button skin) a generic loading icon squeezed into that frame's size would look
     * broken, so those usages render nothing until their real art is ready, same as before.
     */
    showLoadingPlaceholder?: boolean;
    layout?: BoxLayout;
}

/**
 * The single dual-target sprite/image primitive - every themed icon, button skin, or loose
 * `<img>`-equivalent (whole image or cropped out of a shared spritesheet via `frame`) goes
 * through this rather than writing a raw `pixiSprite`/`<img>` directly, the same way `Box`/
 * `ColorLayer` are the sanctioned primitives for containers/solid fills. The one deliberate
 * exception is the `layer/` family (SpriteLayer, CompositePieceSprite, ...) - those stretch a
 * texture to exactly fill an arbitrary layout box (a `BackgroundLayerConfig` piece), a
 * fundamentally different contract from this component's "native/explicit pixel size, centered
 * in a positioning wrapper" one, so they keep their own internal pixiSprite exactly as
 * `ColorLayer` keeps its own internal pixiGraphics.
 *
 * `layout` sizes/positions an outer `Box` rather than the sprite/img itself - applying it
 * directly to the sprite instead (as this used to do) makes @pixi/layout stretch the texture to
 * fill it, distorting any icon whose native size doesn't already match. The sprite/img itself
 * renders at `frame`'s size, an explicit `width`/`height`, or the resolved image's own native
 * size, in that priority order, so @pixi/layout/CSS never has a smaller box to stretch it into
 * unless a caller actually asks for one.
 */
const ImagePixi = forwardRef<PixiContainer, ImageProps>(({
    src, frame, width, height, tint, eventMode, cursor,
    onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
    showLoadingPlaceholder, layout,
}, ref) => {
    const baseTexture = useTextureFromUrl(src);

    const loadingIconUrl = useConfigValue<string>('loading.icon.url') ?? '';
    const loadingTexture = useTextureFromUrl(showLoadingPlaceholder && !frame && !baseTexture ? (loadingIconUrl || undefined) : undefined);

    const resolvedBaseTexture = baseTexture ?? loadingTexture;

    const croppedTexture = useMemo(() => {
        if (!resolvedBaseTexture || !frame) return undefined;

        return new Texture({
            source: resolvedBaseTexture.source,
            frame: new Rectangle(resolvedBaseTexture.frame.x + frame.x, resolvedBaseTexture.frame.y + frame.y, frame.width, frame.height),
        });
    }, [ resolvedBaseTexture, frame?.x, frame?.y, frame?.width, frame?.height ]);

    const resolvedTexture = frame ? croppedTexture : resolvedBaseTexture;

    if (!resolvedTexture) return null;

    return (
        <Box
            ref={ref}
            layout={{ alignItems: 'center', justifyContent: 'center', ...layout }}
        >
            <pixiSprite
                texture={resolvedTexture}
                width={width ?? resolvedTexture.width}
                height={height ?? resolvedTexture.height}
                tint={tint}
                eventMode={eventMode}
                cursor={cursor}
                onPointerOver={onPointerOver}
                onPointerOut={onPointerOut}
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
                onPointerUpOutside={onPointerUpOutside}
                onPointerTap={onPointerTap}
                layout={{}}
            />
        </Box>
    );
});

ImagePixi.displayName = 'ImagePixi';

/**
 * A plain `<img>` (whole-image mode) or a `background-position`-cropped `<div>` (`frame` mode -
 * the same technique `dom/spriteFrameDom.ts` uses, operating on an already-resolved `src`
 * rather than a theme key). `width`/`height` are set as real attributes on the `<img>` (not
 * just CSS) so the browser reserves the correct box before the image has actually loaded, same
 * as Pixi's sprite getting its size up front rather than after the texture resolves. `tint` is
 * an overlay `<div>` using the same mask+`mix-blend-mode:multiply` technique BubblePointer.tsx
 * established, sized/positioned to match whichever of the two the base render is.
 */
const ImageDom = forwardRef<PixiContainer, ImageProps>(({
    src, frame, width, height, tint, eventMode, cursor,
    onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerTap,
    layout,
}, ref) => {
    if (!src) return null;

    const resolvedWidth = frame?.width ?? width;
    const resolvedHeight = frame?.height ?? height;

    const sharedStyle: CSSProperties = {
        cursor,
        pointerEvents: eventMode === 'none' ? 'none' : undefined,
    };
    const sharedHandlers = {
        onPointerEnter: onPointerOver as unknown as PointerEventHandler,
        onPointerLeave: onPointerOut as unknown as PointerEventHandler,
        onPointerDown: onPointerDown as unknown as PointerEventHandler,
        onPointerUp: onPointerUp as unknown as PointerEventHandler,
        onClick: onPointerTap as unknown as MouseEventHandler,
    };

    return (
        <Box
            ref={ref}
            layout={{ alignItems: 'center', justifyContent: 'center', ...layout }}
        >
            {frame
                ? (
                        <div
                            style={{
                                ...sharedStyle,
                                width: resolvedWidth,
                                height: resolvedHeight,
                                backgroundImage: `url(${src})`,
                                backgroundPosition: `-${frame.x}px -${frame.y}px`,
                                backgroundRepeat: 'no-repeat',
                                imageRendering: 'pixelated',
                            }}
                            {...sharedHandlers}
                        />
                    )
                : (
                        <img
                            src={src}
                            width={resolvedWidth}
                            height={resolvedHeight}
                            style={{ ...sharedStyle, display: 'block', imageRendering: 'pixelated' }}
                            {...sharedHandlers}
                        />
                    )}
            {tint && (
                <div style={{
                    position: 'absolute', top: 0, left: 0,
                    width: resolvedWidth ?? '100%',
                    height: resolvedHeight ?? '100%',
                    backgroundColor: tint,
                    mixBlendMode: 'multiply',
                    pointerEvents: 'none',
                    WebkitMaskImage: `url(${src})`,
                    maskImage: `url(${src})`,
                    WebkitMaskPosition: frame ? `-${frame.x}px -${frame.y}px` : '0 0',
                    maskPosition: frame ? `-${frame.x}px -${frame.y}px` : '0 0',
                    WebkitMaskSize: frame ? 'none' : (resolvedWidth && resolvedHeight ? `${resolvedWidth}px ${resolvedHeight}px` : 'auto'),
                    maskSize: frame ? 'none' : (resolvedWidth && resolvedHeight ? `${resolvedWidth}px ${resolvedHeight}px` : 'auto'),
                }}
                />
            )}
        </Box>
    );
});

ImageDom.displayName = 'ImageDom';

export const Image = forwardRef<PixiContainer, ImageProps>((props, ref) =>
    getRenderMode() === 'dom'
        ? (
                <ImageDom
                    ref={ref}
                    {...props}
                />
            )
        : (
                <ImagePixi
                    ref={ref}
                    {...props}
                />
            ));

Image.displayName = 'Image';

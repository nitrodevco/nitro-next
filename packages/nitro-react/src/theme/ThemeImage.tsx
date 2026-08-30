import { BLEND_MODES, Container as PixiContainer, EventMode, FederatedPointerEvent } from 'pixi.js';
import { CSSProperties, forwardRef, MouseEventHandler, PointerEventHandler } from 'react';

import { useConfigValue } from '#base/context';

import { Box, BoxLayout } from './Box';
import { getCroppedTexture, usePixiTexture, useTextureFromUrl, useThemeImageUrl } from './hooks';
import { getRenderMode, getThemeSprite, pointerEventsFromEventMode, resolveEventMode, SpriteFrame, ThemeLayoutMeta, themeSpriteNativeStyle } from './utils';

export interface ImageProps extends ThemeLayoutMeta {
    /** An arbitrary image URL (a layout bitmap, an avatar render). Ignored when `textureKey` is set. */
    src?: string | undefined;
    /** A theme asset key (`'icon-set-src'`) - drawn from the shared atlas, no image of its own. */
    textureKey?: string;
    /** Crop a sub-region out of `src` (a shared spritesheet) instead of showing it whole. */
    frame?: SpriteFrame;
    /** Explicit render size - omit to use `frame`'s own size, or the resolved image's native size. */
    width?: number;
    height?: number;
    tint?: string;
    alpha?: number;
    /** The Flash `BLEND_<mode>` tag on a bitmap. */
    blendMode?: BLEND_MODES;
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
    src, textureKey, frame, width, height, tint, alpha, blendMode, eventMode, cursor,
    onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
    showLoadingPlaceholder, layout, visible,
}, ref) => {
    const themeTexture = usePixiTexture(textureKey);
    const urlTexture = useTextureFromUrl(textureKey ? undefined : src);
    const baseTexture = themeTexture ?? urlTexture;

    const loadingIconUrl = useConfigValue<string>('loading.icon.url') ?? '';
    const loadingTexture = useTextureFromUrl(showLoadingPlaceholder && !frame && !baseTexture ? (loadingIconUrl || undefined) : undefined);

    const resolvedBaseTexture = baseTexture ?? loadingTexture;
    // Sub-frames are cached per source + rect (`getCroppedTexture`), so an icon remounting
    // never allocates a new Texture.
    const resolvedTexture = resolvedBaseTexture && frame ? getCroppedTexture(resolvedBaseTexture, frame) : resolvedBaseTexture;
    const resolvedEventMode = resolveEventMode(eventMode, { onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap });

    if (!resolvedTexture) return null;

    return (
        <Box
            ref={ref}
            visible={visible}
            layout={{ alignItems: 'center', justifyContent: 'center', ...layout }}
        >
            <pixiSprite
                texture={resolvedTexture}
                width={width ?? resolvedTexture.width}
                height={height ?? resolvedTexture.height}
                tint={tint}
                alpha={alpha}
                blendMode={blendMode}
                eventMode={resolvedEventMode}
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
 * A plain `<img>` (whole-image mode) or a `background-position`-cropped `<div>` (`frame` mode).
 * `width`/`height` are set as real attributes on the `<img>` (not
 * just CSS) so the browser reserves the correct box before the image has actually loaded, same
 * as Pixi's sprite getting its size up front rather than after the texture resolves. `tint` is
 * an overlay `<div>` using the same mask+`mix-blend-mode:multiply` technique BubblePointer.tsx
 * established, sized/positioned to match whichever of the two the base render is.
 */
const ImageDom = forwardRef<PixiContainer, ImageProps>(({
    src, textureKey, frame, width, height, tint, alpha, blendMode, eventMode, cursor,
    onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
    layout, visible,
}, ref) => {
    // A theme key draws out of the shared atlas: untinted straight from the atlas image, tinted
    // from a standalone recoloured slice (made once per key + colour). Either way the frame is
    // picked with `background-position`, and no `<img>` of its own is created.
    const sprite = getThemeSprite(textureKey);
    const tintedUrl = useThemeImageUrl(textureKey && tint ? textureKey : undefined, { kind: 'tint', color: tint ?? '' });
    const themeBackground: CSSProperties | undefined = textureKey
        ? (tint
                ? (tintedUrl ? { backgroundImage: `url(${tintedUrl})`, backgroundPosition: frame ? `-${frame.x}px -${frame.y}px` : '0 0', backgroundRepeat: 'no-repeat' } : undefined)
                : (sprite ? themeSpriteNativeStyle(sprite, frame) : undefined))
        : undefined;

    if (textureKey ? !themeBackground : !src) return null;

    const resolvedWidth = frame?.width ?? width ?? sprite?.width;
    const resolvedHeight = frame?.height ?? height ?? sprite?.height;
    const resolvedEventMode = resolveEventMode(eventMode, { onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap });

    // See Box.tsx's BoxDom for why 'static'/'dynamic' need an explicit 'auto' here (CSS
    // pointer-events is inherited, and #ui-container sets it to 'none' at its root).
    const sharedStyle: CSSProperties = {
        cursor,
        opacity: alpha,
        mixBlendMode: typeof blendMode === 'string' && blendMode !== 'normal' && blendMode !== 'inherit' ? (blendMode === 'add' ? 'screen' : blendMode) as CSSProperties['mixBlendMode'] : undefined,
        pointerEvents: pointerEventsFromEventMode(resolvedEventMode),
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
            visible={visible}
            layout={{ alignItems: 'center', justifyContent: 'center', ...layout }}
        >
            {themeBackground || frame
                ? (
                        <div
                            style={{
                                ...sharedStyle,
                                width: resolvedWidth,
                                height: resolvedHeight,
                                ...(themeBackground ?? {
                                    backgroundImage: `url(${src})`,
                                    backgroundPosition: `-${frame!.x}px -${frame!.y}px`,
                                    backgroundRepeat: 'no-repeat',
                                }),
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
            {tint && !textureKey && (
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

export const ThemeImage = forwardRef<PixiContainer, ImageProps>((props, ref) =>
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

ThemeImage.displayName = 'ThemeImage';

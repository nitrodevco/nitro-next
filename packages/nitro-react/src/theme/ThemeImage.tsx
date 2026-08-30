import { BLEND_MODES, Container as PixiContainer, EventMode, FederatedPointerEvent } from 'pixi.js';
import { CSSProperties, forwardRef, MouseEventHandler, PointerEventHandler, Ref } from 'react';

import { useConfigValue } from '#base/context';

import { BoxLayout } from './Box';
import { boxLayoutToStyle } from './dom/boxStyle';
import { getCroppedTexture, usePixiTexture, useTextureFromUrl, useThemeImageUrl } from './hooks';
import { getRenderMode, getThemeAtlas, getThemeSprite, pointerEventsFromEventMode, resolveEventMode, SpriteFrame, ThemeLayoutMeta } from './utils';

export interface ImageProps extends ThemeLayoutMeta {
    /** An arbitrary image URL (a layout bitmap, an avatar render). Ignored when `textureKey` is set. */
    src?: string | undefined;
    /** A theme asset key (`'icon-set-src'`) - drawn from the shared atlas, no image of its own. */
    textureKey?: string;
    /** Crop a sub-region out of the image (a shared spritesheet) instead of showing it whole. */
    frame?: SpriteFrame;
    /** Explicit render size - the image is stretched to it. Omit to render at `frame`'s size or the image's native size. */
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
     * nothing. Only meaningful for whole-image (no `frame`) use - for a cropped chrome sprite a
     * generic loading icon squeezed into that frame's size would look broken.
     */
    showLoadingPlaceholder?: boolean;
    /**
     * Sizes/positions the sprite's own box. A box larger than the image does not stretch it
     * (unless `width`/`height` ask for that): the image sits centred at its own size inside,
     * so a caller can still reserve room around an icon without a wrapper.
     */
    layout?: BoxLayout;
}

/**
 * The single dual-target sprite/image primitive - one `pixiSprite` or one `<img>`/`<div>`, no
 * wrapper container. Every themed icon, button skin, or loose image (whole, or cropped out of
 * a shared spritesheet via `frame`, or a theme atlas sprite via `textureKey`) goes through this
 * rather than writing a raw `pixiSprite`/`<img>` directly. The `layer/` family (SpriteLayer,
 * CompositePieceSprite, ...) is the deliberate exception: those stretch a texture to exactly
 * fill an arbitrary box, a different contract from this one's "native size, or the size you
 * asked for".
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
    const texture = resolvedBaseTexture && frame ? getCroppedTexture(resolvedBaseTexture, frame) : resolvedBaseTexture;
    const resolvedEventMode = resolveEventMode(eventMode, { onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap });

    if (!texture) return null;

    const explicitSize = width !== undefined || height !== undefined;
    // Same rule as `Box`: an image that handles pointer events reads as clickable unless the
    // caller sets its own cursor.
    const resolvedCursor = cursor ?? (resolvedEventMode === 'static' ? 'pointer' : undefined);

    return (
        <pixiSprite
            ref={ref as Ref<never>}
            texture={texture}
            visible={visible}
            tint={tint}
            alpha={alpha}
            blendMode={blendMode}
            eventMode={resolvedEventMode}
            cursor={resolvedCursor}
            onPointerOver={onPointerOver}
            onPointerOut={onPointerOut}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerUpOutside={onPointerUpOutside}
            onPointerTap={onPointerTap}
            // `objectFit: 'none'` keeps the texture at its own scale inside whatever box
            // `layout` sets (centred) - only an explicit `width`/`height` stretches it.
            layout={{
                width: width ?? texture.width,
                height: height ?? texture.height,
                flexShrink: 0,
                objectFit: explicitSize ? 'fill' : 'none',
                objectPosition: 'center',
                ...layout,
            }}
        />
    );
});

ImagePixi.displayName = 'ImagePixi';

/**
 * A single `<img>` (whole image) or a single `background-position`-cropped `<div>` (`frame` /
 * `textureKey`). `width`/`height` go on the `<img>` as real attributes so the browser reserves
 * the box before the image loads. The one case that still needs a second element is a tinted
 * non-theme image (an overlay masked to the image, multiplied over it) - theme sprites tint
 * through a pre-recoloured atlas slice instead, staying one element.
 */
const ImageDom = forwardRef<PixiContainer, ImageProps>(({
    src, textureKey, frame, width, height, tint, alpha, blendMode, eventMode, cursor,
    onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
    layout, visible,
}, ref) => {
    const sprite = getThemeSprite(textureKey);
    const tintedUrl = useThemeImageUrl(textureKey && tint ? textureKey : undefined, { kind: 'tint', color: tint ?? '' });
    const atlasUrl = getThemeAtlas()?.url;
    const sheetUrl = textureKey ? (tint ? tintedUrl : (sprite && atlasUrl)) : (frame ? src : undefined);

    if (textureKey ? !sheetUrl : !src) return null;

    const nativeWidth = frame?.width ?? sprite?.width;
    const nativeHeight = frame?.height ?? sprite?.height;
    const resolvedWidth = width ?? nativeWidth;
    const resolvedHeight = height ?? nativeHeight;
    const explicitSize = width !== undefined || height !== undefined;
    const resolvedEventMode = resolveEventMode(eventMode, { onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap });
    const layoutStyle = boxLayoutToStyle(layout);
    // See Box.tsx's BoxDom for why 'static'/'dynamic' need an explicit 'auto' here (CSS
    // pointer-events is inherited, and #ui-container sets it to 'none' at its root).
    const style: CSSProperties = {
        ...layoutStyle,
        width: layoutStyle.width ?? resolvedWidth,
        height: layoutStyle.height ?? resolvedHeight,
        display: visible === false ? 'none' : 'block',
        flexShrink: 0,
        cursor: cursor ?? (resolvedEventMode === 'static' ? 'pointer' : undefined),
        opacity: alpha,
        mixBlendMode: typeof blendMode === 'string' && blendMode !== 'normal' && blendMode !== 'inherit' ? (blendMode === 'add' ? 'screen' : blendMode) as CSSProperties['mixBlendMode'] : undefined,
        pointerEvents: pointerEventsFromEventMode(resolvedEventMode),
        imageRendering: 'pixelated',
    };
    const handlers = {
        onPointerEnter: onPointerOver as unknown as PointerEventHandler,
        onPointerLeave: onPointerOut as unknown as PointerEventHandler,
        onPointerDown: onPointerDown as unknown as PointerEventHandler,
        onPointerUp: onPointerUp as unknown as PointerEventHandler,
        onClick: onPointerTap as unknown as MouseEventHandler,
    };
    const elementRef = ref as unknown as Ref<never>;

    if (sheetUrl) {
        // A sheet crop: the div is the box, the background is positioned so the frame sits
        // centred in it (top-left when the box is the frame's own size). The atlas offset only
        // applies to the untinted atlas path - a tinted slice is the sprite alone.
        const sheetX = (textureKey && !tint && sprite ? sprite.x : 0) + (frame?.x ?? 0);
        const sheetY = (textureKey && !tint && sprite ? sprite.y : 0) + (frame?.y ?? 0);
        const boxWidth = typeof style.width === 'number' ? style.width : nativeWidth ?? 0;
        const boxHeight = typeof style.height === 'number' ? style.height : nativeHeight ?? 0;
        const dx = explicitSize ? 0 : Math.floor((boxWidth - (nativeWidth ?? boxWidth)) / 2);
        const dy = explicitSize ? 0 : Math.floor((boxHeight - (nativeHeight ?? boxHeight)) / 2);

        return (
            <div
                ref={elementRef}
                style={{
                    ...style,
                    backgroundImage: `url(${sheetUrl})`,
                    backgroundPosition: `${dx - sheetX}px ${dy - sheetY}px`,
                    backgroundRepeat: 'no-repeat',
                }}
                {...handlers}
            />
        );
    }

    const image = (
        <img
            ref={elementRef}
            src={src}
            width={resolvedWidth}
            height={resolvedHeight}
            style={{ ...style, objectFit: explicitSize ? 'fill' : 'none', objectPosition: 'center' }}
            {...handlers}
        />
    );

    if (!tint) return image;

    return (
        <div style={{ ...layoutStyle, position: layoutStyle.position ?? 'relative', width: style.width, height: style.height, display: style.display, flexShrink: 0 }}>
            {image}
            <div style={{
                position: 'absolute', inset: 0,
                backgroundColor: tint,
                mixBlendMode: 'multiply',
                pointerEvents: 'none',
                WebkitMaskImage: `url(${src})`,
                maskImage: `url(${src})`,
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskPosition: 'center',
                WebkitMaskSize: explicitSize ? '100% 100%' : 'auto',
                maskSize: explicitSize ? '100% 100%' : 'auto',
            }}
            />
        </div>
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

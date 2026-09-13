import { BLEND_MODES, Container as PixiContainer, EventMode, FederatedPointerEvent, Texture } from 'pixi.js';
import { CSSProperties, forwardRef, MouseEventHandler, PointerEventHandler, ReactNode, Ref } from 'react';

import { useConfigValue } from '#base/context';

import { BoxLayout } from './Box';
import { boxLayoutToStyle } from './dom/boxStyle';
import { useDynamicStyleEffect } from './dynamicstyle';
import { getCroppedTexture, getTextureGreyscale, getTextureSilhouette, usePixiTexture, useTextureFromUrl, useThemeImageUrl } from './hooks';
import { useTooltipHandlers } from './tooltip/useTooltipHandlers';
import { compose, DynamicStyleRole, getRenderMode, getThemeAtlas, getThemeSprite, insetStretchAxes, multiplyAlphas, multiplyTints, pointerEventsFromEventMode, resolveEventMode, SpriteFrame, ThemeLayoutMeta, themeSpriteFillStyle } from './utils';

export interface ImageProps extends ThemeLayoutMeta {
    /** An arbitrary image URL (a layout bitmap, an avatar render). Ignored when `textureKey` is set. */
    src?: string | undefined;
    /** A theme asset key (`'icon-set-src'`) - drawn from the shared atlas, no image of its own. */
    textureKey?: string;
    /**
     * A texture the caller already holds (an avatar or furni render) - Pixi draws it directly,
     * so the render is never read back into a base64 URL. Takes precedence over `textureKey`
     * and `src`. DOM has no way to show a texture and ignores it: pass `src` there.
     */
    texture?: Texture;
    /** Crop a sub-region out of the image (a shared spritesheet) instead of showing it whole. */
    frame?: SpriteFrame;
    /** Explicit render size - the image is stretched to it. Omit to render at `frame`'s size or the image's native size. */
    width?: number;
    height?: number;
    /** Fill whatever box `layout` resolves to (a chrome sprite skin) instead of keeping the image's own size. */
    stretch?: boolean;
    /** Zoom factor on the render size: `(width ?? native) * scale` - `scale={2}` doubles it, layout box included. */
    scale?: number;
    zIndex?: number;
    tint?: string;
    /** The Flash window `blend` of a bitmap - its opacity. */
    alpha?: number;
    /**
     * The bitmap's `greyscale` variable: drawn as its luminance (`BitmapDataRenderer`'s
     * `ColorMatrixFilter`, Rec. 709 weights), which `tint` then multiplies like the client's
     * matrix rows do.
     */
    greyscale?: boolean;
    /** The Flash `BLEND_<mode>` tag on a bitmap. */
    blendMode?: BLEND_MODES;
    /**
     * A `#icon` / `#bg` tag under a `dynamicStyle` host: the host's child rule for its current
     * state applies - the etching (a solid copy drawn under the bitmap at an offset), the
     * colour transform and the nudge. See utils/dynamicStyles.ts.
     */
    dynamicRole?: DynamicStyleRole;
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

const WHITE = '#ffffff';

/**
 * The single dual-target sprite/image primitive - one `pixiSprite` or one `<img>`/`<div>`, no
 * wrapper container. Every themed icon, button skin, or loose image (whole, or cropped out of
 * a shared spritesheet via `frame`, or a theme atlas sprite via `textureKey`) goes through this
 * rather than writing a raw `pixiSprite`/`<img>` directly. The `layer/` family (SpriteLayer,
 * CompositePieceSprite, ...) is the deliberate exception: those stretch a texture to exactly
 * fill an arbitrary box, a different contract from this one's "native size, or the size you
 * asked for".
 *
 * A dynamic style's etching and brightening are the two cases that do need a host container:
 * the etching is the bitmap's silhouette drawn under it, the `+77` brightening its white
 * silhouette added over it (`blendMode: 'add'` at the offset's fraction of white adds exactly
 * that flat amount, where a tint could only multiply).
 */
const ImagePixi = forwardRef<PixiContainer, ImageProps>(({
    src, textureKey, texture: ownTexture, frame, width, height, stretch, scale = 1, zIndex, tint, alpha, greyscale, blendMode, dynamicRole, tooltip, eventMode, cursor,
    onPointerOver: onPointerOverProp, onPointerOut: onPointerOutProp, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
    showLoadingPlaceholder, layout, visible,
}, ref) => {
    // A tooltip hovers like any handler would, but on its own it doesn't make the image read as clickable.
    const tooltipHandlers = useTooltipHandlers(tooltip);
    const clickable = !!(onPointerOverProp || onPointerOutProp || onPointerDown || onPointerUp || onPointerUpOutside || onPointerTap);
    const onPointerOver = compose(tooltipHandlers.onPointerOver, onPointerOverProp);
    const onPointerOut = compose(tooltipHandlers.onPointerOut, onPointerOutProp);
    const themeTexture = usePixiTexture(ownTexture ? undefined : textureKey);
    const urlTexture = useTextureFromUrl(ownTexture || textureKey ? undefined : src);
    const baseTexture = ownTexture ?? themeTexture ?? urlTexture;

    const loadingIconUrl = useConfigValue<string>('loading.icon.url') ?? '';
    const loadingTexture = useTextureFromUrl(showLoadingPlaceholder && !frame && !baseTexture ? (loadingIconUrl || undefined) : undefined);
    const effect = useDynamicStyleEffect(dynamicRole);

    const resolvedBaseTexture = baseTexture ?? loadingTexture;
    // Sub-frames are cached per source + rect (`getCroppedTexture`), so an icon remounting
    // never allocates a new Texture.
    const colourTexture = resolvedBaseTexture && frame ? getCroppedTexture(resolvedBaseTexture, frame) : resolvedBaseTexture;
    // Grey is baked once per texture (`getTextureGreyscale`); a source a canvas can't read stays in colour.
    const texture = colourTexture && greyscale ? (getTextureGreyscale(colourTexture) ?? colourTexture) : colourTexture;
    const resolvedEventMode = resolveEventMode(eventMode, { onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap });

    if (!texture) return null;

    // Silhouettes are alpha shapes, so they come from the colour source - one per texture,
    // whether or not the sprite is drawn grey.
    const etching = effect?.etching;
    const etchingTexture = etching && colourTexture ? getTextureSilhouette(colourTexture, etching.color) : undefined;
    const brightenTexture = effect?.brighten && colourTexture ? getTextureSilhouette(colourTexture, WHITE) : undefined;
    const resolvedTint = multiplyTints(tint, effect?.tint);
    const resolvedAlpha = multiplyAlphas(alpha, effect?.alpha);
    const nudge = effect ? { x: effect.x, y: effect.y } : {};

    // A non-1 `scale` needs the texture stretched into the scaled box, exactly like an explicit size.
    const explicitSize = width !== undefined || height !== undefined || !!stretch || scale !== 1;
    // Same rule as `Box`: an image that handles pointer events reads as clickable unless the
    // caller sets its own cursor.
    const resolvedCursor = cursor ?? (resolvedEventMode === 'static' ? (clickable ? 'pointer' : 'default') : undefined);
    const stretchAxes = insetStretchAxes(layout, width, height);
    const objectFit = explicitSize ? 'fill' : 'none';
    const renderWidth = (width ?? texture.width) * scale;
    const renderHeight = (height ?? texture.height) * scale;
    const sprite = (spriteLayout: typeof layout, nudged: boolean) => (
        <pixiSprite
            ref={ref as Ref<never>}
            texture={texture}
            visible={visible}
            zIndex={zIndex}
            tint={resolvedTint}
            alpha={resolvedAlpha}
            blendMode={blendMode}
            eventMode={resolvedEventMode}
            cursor={resolvedCursor}
            onPointerOver={onPointerOver}
            onPointerOut={onPointerOut}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerUpOutside={onPointerUpOutside}
            onPointerTap={onPointerTap}
            {...(nudged ? nudge : {})}
            // `objectFit: 'none'` keeps the texture at its own scale inside whatever box
            // `layout` sets (centred) - only an explicit `width`/`height`/`stretch` stretches it.
            layout={{
                width: renderWidth,
                height: renderHeight,
                objectFit,
                objectPosition: 'center',
                ...spriteLayout,
            }}
        />
    );

    // A layout that spans between insets needs a container to do the spanning - a Yoga leaf
    // keeps its intrinsic size (see `insetStretchAxes`). The sprite fills that host. The same
    // host carries an etching or brightening copy, positioned over the sprite's own box.
    if (stretchAxes.x || stretchAxes.y || etchingTexture || brightenTexture) {
        const size: { width: number | '100%'; height: number | '100%' } = { width: stretchAxes.x ? '100%' : renderWidth, height: stretchAxes.y ? '100%' : renderHeight };
        const copy = (copyTexture: Texture, left: number, top: number, copyAlpha: number, additive: boolean) => (
            <pixiSprite
                texture={copyTexture}
                alpha={copyAlpha}
                blendMode={additive ? 'add' : 'normal'}
                eventMode="none"
                layout={{ position: 'absolute', left, top, ...size, objectFit, objectPosition: 'center' }}
            />
        );

        // The host must itself be a layout node (`undefined` would drop it and its sprites out
        // of the Yoga tree, collapsing the parent to 0x0); without a caller layout it simply
        // wraps the sprite's own size.
        return (
            <pixiContainer
                eventMode="none"
                {...nudge}
                layout={layout ?? {}}
            >
                {etchingTexture && etching && copy(etchingTexture, etching.x, etching.y, etching.alpha * (alpha ?? 1), false)}
                {sprite(size, false)}
                {brightenTexture && effect?.brighten && copy(brightenTexture, 0, 0, effect.brighten, true)}
            </pixiContainer>
        );
    }

    return sprite(layout, true);
});

ImagePixi.displayName = 'ImagePixi';

interface DomCopy {
    style: CSSProperties;
}

/**
 * A single `<img>` (whole image) or a single `background-position`-cropped `<div>` (`frame` /
 * `textureKey`). `width`/`height` go on the `<img>` as real attributes so the browser reserves
 * the box before the image loads. A tinted non-theme image (an overlay masked to the image,
 * multiplied over it) and a dynamic style's etching/brightening copies (the same mask in a
 * flat colour, `plus-lighter` for the additive brightening) need a wrapper around it; theme
 * sprites recolour through a pre-recoloured atlas slice instead.
 */
const ImageDom = forwardRef<PixiContainer, ImageProps>(({
    src, textureKey, frame, width, height, stretch, scale = 1, zIndex, tint, alpha, greyscale, blendMode, dynamicRole, tooltip, eventMode, cursor,
    onPointerOver: onPointerOverProp, onPointerOut: onPointerOutProp, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
    layout, visible,
}, ref) => {
    const tooltipHandlers = useTooltipHandlers(tooltip);
    const clickable = !!(onPointerOverProp || onPointerOutProp || onPointerDown || onPointerUp || onPointerUpOutside || onPointerTap);
    const onPointerOver = compose(tooltipHandlers.onPointerOver, onPointerOverProp);
    const onPointerOut = compose(tooltipHandlers.onPointerOut, onPointerOutProp);
    const effect = useDynamicStyleEffect(dynamicRole);
    const etching = effect?.etching;
    const resolvedTint = multiplyTints(tint, effect?.tint);
    const resolvedAlpha = multiplyAlphas(alpha, effect?.alpha);
    const sprite = getThemeSprite(textureKey);
    const tintedUrl = useThemeImageUrl(textureKey && resolvedTint ? textureKey : undefined, { kind: 'tint', color: resolvedTint ?? '' });
    const etchingUrl = useThemeImageUrl(textureKey && etching ? textureKey : undefined, { kind: 'silhouette', color: etching?.color ?? '#000000' });
    const brightenUrl = useThemeImageUrl(textureKey && effect?.brighten ? textureKey : undefined, { kind: 'silhouette', color: WHITE });
    const atlasUrl = getThemeAtlas()?.url;
    const sheetUrl = textureKey ? (resolvedTint ? tintedUrl : (sprite && atlasUrl)) : (frame ? src : undefined);

    if (textureKey ? !sheetUrl : !src) return null;

    const nativeWidth = frame?.width ?? sprite?.width;
    const nativeHeight = frame?.height ?? sprite?.height;
    const resolvedWidth = width ?? nativeWidth;
    const resolvedHeight = height ?? nativeHeight;
    const explicitSize = width !== undefined || height !== undefined || !!stretch;
    const resolvedEventMode = resolveEventMode(eventMode, { onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap });
    const layoutStyle = boxLayoutToStyle(layout);
    const stretchAxes = insetStretchAxes(layout, width, height);

    // A replaced element (`<img>`) keeps its intrinsic size between two insets instead of
    // stretching; span it explicitly. The background `<div>` path isn't replaced, but gets the
    // same explicit span so both paths agree.
    if (stretchAxes.x && typeof layout?.left === 'number' && typeof layout.right === 'number') layoutStyle.width = `calc(100% - ${layout.left + layout.right}px)`;
    if (stretchAxes.y && typeof layout?.top === 'number' && typeof layout.bottom === 'number') layoutStyle.height = `calc(100% - ${layout.top + layout.bottom}px)`;
    // See Box.tsx's BoxDom for why 'static'/'dynamic' need an explicit 'auto' here (CSS
    // pointer-events is inherited, and #ui-container sets it to 'none' at its root).
    const style: CSSProperties = {
        ...layoutStyle,
        width: layoutStyle.width ?? resolvedWidth,
        height: layoutStyle.height ?? resolvedHeight,
        display: visible === false ? 'none' : 'block',
        // CSS `zoom` scales the element's layout box AND its content/background together -
        // the one DOM knob that scales a sheet-crop background and a plain <img> identically,
        // natural size known or not.
        zoom: scale !== 1 ? scale : undefined,
        zIndex,
        cursor: cursor ?? (resolvedEventMode === 'static' ? (clickable ? 'pointer' : 'default') : undefined),
        opacity: resolvedAlpha,
        mixBlendMode: typeof blendMode === 'string' && blendMode !== 'normal' && blendMode !== 'inherit' ? (blendMode === 'add' ? 'screen' : blendMode) as CSSProperties['mixBlendMode'] : undefined,
        pointerEvents: pointerEventsFromEventMode(resolvedEventMode),
        imageRendering: 'pixelated',
        // CSS `grayscale()` uses the same Rec. 709 luminance weights as the client's matrix.
        filter: greyscale ? 'grayscale(1)' : undefined,
        transform: effect && (effect.x || effect.y) ? `translate(${effect.x}px, ${effect.y}px)` : undefined,
        // The global stylesheet caps `img` at `max-width: 100%`, which would shrink the image to
        // its flex parent instead of keeping its own size - the image's size is authoritative.
        maxWidth: 'none',
        maxHeight: 'none',
    };
    const handlers = {
        onPointerEnter: onPointerOver as unknown as PointerEventHandler,
        onPointerLeave: onPointerOut as unknown as PointerEventHandler,
        onPointerDown: onPointerDown as unknown as PointerEventHandler,
        onPointerUp: onPointerUp as unknown as PointerEventHandler,
        onClick: onPointerTap as unknown as MouseEventHandler,
    };
    const elementRef = ref as unknown as Ref<never>;

    // The sheet crop: the div is the box, the background is positioned so the frame sits
    // centred in it (top-left when the box is the frame's own size). The atlas offset only
    // applies to the untinted atlas path - a recoloured slice is the sprite alone.
    const boxWidth = typeof style.width === 'number' ? style.width : nativeWidth ?? 0;
    const boxHeight = typeof style.height === 'number' ? style.height : nativeHeight ?? 0;
    const dx = explicitSize ? 0 : Math.floor((boxWidth - (nativeWidth ?? boxWidth)) / 2);
    const dy = explicitSize ? 0 : Math.floor((boxHeight - (nativeHeight ?? boxHeight)) / 2);
    const cropPosition = (standalone: boolean) => `${dx - (standalone ? 0 : (sprite?.x ?? 0)) - (frame?.x ?? 0)}px ${dy - (standalone ? 0 : (sprite?.y ?? 0)) - (frame?.y ?? 0)}px`;

    // The dynamic-style copies, as the same crop/mask in a flat colour.
    const copies: DomCopy[] = [];
    const copyStyle = (left: number, top: number, copyAlpha: number, additive: boolean): CSSProperties => ({
        position: 'absolute', left, top, width: '100%', height: '100%', pointerEvents: 'none', opacity: copyAlpha,
        mixBlendMode: additive ? 'plus-lighter' : undefined, imageRendering: 'pixelated',
    });
    const sheetCopy = (url: string | undefined, left: number, top: number, copyAlpha: number, additive: boolean) => {
        if (!url) return;

        copies.push({ style: { ...copyStyle(left, top, copyAlpha, additive), backgroundImage: `url(${url})`, backgroundRepeat: 'no-repeat', ...(stretch ? { backgroundSize: '100% 100%' } : { backgroundPosition: cropPosition(true) }) } });
    };
    const maskCopy = (color: string, left: number, top: number, copyAlpha: number, additive: boolean) => {
        if (!src || frame) return;

        const maskSize = explicitSize ? '100% 100%' : 'auto';

        copies.push({ style: { ...copyStyle(left, top, copyAlpha, additive), backgroundColor: color, WebkitMaskImage: `url(${src})`, maskImage: `url(${src})`, WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', WebkitMaskPosition: 'center', maskPosition: 'center', WebkitMaskSize: maskSize, maskSize } });
    };

    if (etching) {
        if (textureKey) sheetCopy(etchingUrl, etching.x, etching.y, etching.alpha * (alpha ?? 1), false);
        else maskCopy(etching.color, etching.x, etching.y, etching.alpha * (alpha ?? 1), false);
    }

    const brighten = effect?.brighten;
    // A tint on a plain image, or any dynamic-style copy, needs a wrapper the copies overlay.
    // The wrapper then owns the box (position, insets, nudge, zoom, stacking) and the element
    // sits in normal flow inside it, so a plain `<img>` with no known native size still gives
    // the wrapper its size - absolutely positioning it would collapse the wrapper to nothing.
    const wrapped = !!etching || !!brighten || (!!resolvedTint && !sheetUrl);
    const elementStyle: CSSProperties = wrapped
        ? { ...style, position: 'relative', left: undefined, top: undefined, right: undefined, bottom: undefined, transform: undefined, zoom: undefined, zIndex: undefined }
        : style;

    let base: ReactNode;
    let tintOverlay: ReactNode;

    if (sheetUrl && stretch) {
        // A skin sprite filling its box: out of the atlas with the percentage formula, or a
        // standalone (tinted / fallback) slice scaled to the box.
        const fill = textureKey && !resolvedTint && sprite ? themeSpriteFillStyle(sprite, frame) : undefined;

        base = (
            <div
                ref={elementRef}
                style={{
                    ...elementStyle,
                    ...(fill ?? { backgroundImage: `url(${sheetUrl})`, backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat' }),
                }}
                {...handlers}
            />
        );
    } else if (sheetUrl) {
        base = (
            <div
                ref={elementRef}
                style={{
                    ...elementStyle,
                    backgroundImage: `url(${sheetUrl})`,
                    backgroundPosition: cropPosition(!!(textureKey && resolvedTint)),
                    backgroundRepeat: 'no-repeat',
                }}
                {...handlers}
            />
        );
    } else {
        base = (
            <img
                ref={elementRef}
                src={src}
                width={resolvedWidth}
                height={resolvedHeight}
                style={{ ...elementStyle, objectFit: explicitSize ? 'fill' : 'none', objectPosition: 'center' }}
                {...handlers}
            />
        );

        if (resolvedTint) {
            tintOverlay = (
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundColor: resolvedTint,
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
            );
        }
    }

    if (brighten) {
        if (textureKey) sheetCopy(brightenUrl, 0, 0, brighten, true);
        else maskCopy(WHITE, 0, 0, brighten, true);
    }

    if (!wrapped) return base;

    // The wrapper takes the box and the nudge; the element in flow inside it gives it its size
    // when the layout didn't, and the copies overlay that size.
    return (
        <div style={{ ...layoutStyle, position: layoutStyle.position ?? 'relative', width: style.width, height: style.height, display: visible === false ? 'none' : 'inline-flex', flexShrink: 0, zoom: style.zoom, zIndex, transform: style.transform }}>
            {copies.slice(0, etching ? 1 : 0).map((copy, index) => (
                <div
                    key={`etching-${index}`}
                    style={copy.style}
                />
            ))}
            {base}
            {tintOverlay}
            {copies.slice(etching ? 1 : 0).map((copy, index) => (
                <div
                    key={`brighten-${index}`}
                    style={copy.style}
                />
            ))}
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

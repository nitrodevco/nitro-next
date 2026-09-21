import { BLEND_MODES, Container as PixiContainer, EventMode, FederatedPointerEvent, Texture } from 'pixi.js';
import { forwardRef, Ref } from 'react';

import { useConfigValue } from '#base/context/system';

import { BoxLayout } from './Box';
import { useDynamicStyleEffect } from './dynamicstyle';
import { getCroppedTexture, getMirroredTexture, getTextureGreyscale, getTextureSilhouette, usePixiTexture, useTextureFromUrl } from './hooks';
import { useTooltipHandlers } from './tooltip/useTooltipHandlers';
import { compose, cursorForHandlers, DynamicStyleRole, insetStretchAxes, multiplyAlphas, multiplyTints, resolveEventMode, SpriteFrame, ThemeLayoutMeta } from './utils';

export interface ImageProps extends ThemeLayoutMeta {
    /**
     * A bundled bitmap's asset name (`LayoutImage('room-ui/roomtools_gear.png')` ->
     * `room-ui-roomtools_gear`) or an arbitrary image URL (an avatar render, a room thumbnail,
     * a badge). Ignored when `textureKey` is set.
     */
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
    /**
     * Per-axis factors on top of `scale`. The magnitude scales that axis's render size; a
     * negative one mirrors the image along it (`scaleX={-1}` flips it left-to-right) inside the
     * same box, so a flipped image lays out exactly where the unflipped one would.
     */
    scaleX?: number;
    scaleY?: number;
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
 * The single sprite/image primitive - one `pixiSprite`, no wrapper container. Every themed icon, button skin, or loose image (whole, or cropped out of
 * a shared spritesheet via `frame`, or a theme atlas sprite via `textureKey`) goes through this
 * rather than writing a raw `pixiSprite` directly. The `layer/` family (SpriteLayer,
 * CompositePieceSprite, ...) is the deliberate exception: those stretch a texture to exactly
 * fill an arbitrary box, a different contract from this one's "native size, or the size you
 * asked for".
 *
 * A dynamic style's etching and brightening are the two cases that do need a host container:
 * the etching is the bitmap's silhouette drawn under it, the `+77` brightening its white
 * silhouette added over it (`blendMode: 'add'` at the offset's fraction of white adds exactly
 * that flat amount, where a tint could only multiply).
 */
export const ThemeImage = forwardRef<PixiContainer, ImageProps>(({
    src, textureKey, texture: ownTexture, frame, width, height, stretch, scale = 1, scaleX = 1, scaleY = 1, zIndex, tint, alpha, greyscale, blendMode, dynamicRole, tooltip, eventMode, cursor,
    onPointerOver: onPointerOverProp, onPointerOut: onPointerOutProp, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
    showLoadingPlaceholder, layout, visible,
}, ref) => {
    // A tooltip hovers like any handler would, but on its own it doesn't make the image read as clickable.
    const tooltipHandlers = useTooltipHandlers(tooltip);
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
    const shadedTexture = colourTexture && greyscale ? (getTextureGreyscale(colourTexture) ?? colourTexture) : colourTexture;
    // A negative axis mirrors the texture itself (see `getMirroredTexture`), last, so the
    // derivations above stay keyed on the unflipped source.
    const flipX = scaleX < 0;
    const flipY = scaleY < 0;
    const mirror = (source: Texture | undefined) => (source ? getMirroredTexture(source, flipX, flipY) : undefined);
    const texture = mirror(shadedTexture);
    const resolvedEventMode = resolveEventMode(eventMode, { onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap });

    if (!texture) return null;

    // Silhouettes are alpha shapes, so they come from the colour source - one per texture,
    // whether or not the sprite is drawn grey.
    const etching = effect?.etching;
    const etchingTexture = mirror(etching && colourTexture ? getTextureSilhouette(colourTexture, etching.color) : undefined);
    const brightenTexture = mirror(effect?.brighten && colourTexture ? getTextureSilhouette(colourTexture, WHITE) : undefined);
    const resolvedTint = multiplyTints(tint, effect?.tint);
    const resolvedAlpha = multiplyAlphas(alpha, effect?.alpha);
    const nudge = effect ? { x: effect.x, y: effect.y } : {};

    // A non-1 `scale` needs the texture stretched into the scaled box, exactly like an explicit size.
    const explicitSize = width !== undefined || height !== undefined || !!stretch || scale !== 1 || Math.abs(scaleX) !== 1 || Math.abs(scaleY) !== 1;
    // Same rule as `Box`: the pointer follows the click handlers, never the event mode, unless
    // the caller names a cursor of its own.
    const resolvedCursor = cursor ?? cursorForHandlers(resolvedEventMode, { onPointerTap });
    const stretchAxes = insetStretchAxes(layout, width, height);
    const objectFit = explicitSize ? 'fill' : 'none';
    const renderWidth = (width ?? texture.width) * scale * Math.abs(scaleX);
    const renderHeight = (height ?? texture.height) * scale * Math.abs(scaleY);
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
    const amplify = effect?.amplify;

    if (stretchAxes.x || stretchAxes.y || etchingTexture || brightenTexture || amplify) {
        const size: { width: number | '100%'; height: number | '100%' } = { width: stretchAxes.x ? '100%' : renderWidth, height: stretchAxes.y ? '100%' : renderHeight };
        const copy = (copyTexture: Texture, left: number, top: number, copyAlpha: number, additive: boolean, copyTint?: string) => (
            <pixiSprite
                texture={copyTexture}
                tint={copyTint}
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
                {amplify && copy(texture, 0, 0, amplify * (resolvedAlpha ?? 1), true, resolvedTint)}
                {brightenTexture && effect?.brighten && copy(brightenTexture, 0, 0, effect.brighten, true)}
            </pixiContainer>
        );
    }

    return sprite(layout, true);
});

ThemeImage.displayName = 'ThemeImage';

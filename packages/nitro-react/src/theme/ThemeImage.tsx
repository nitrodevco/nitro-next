import { BLEND_MODES, Container as PixiContainer, EventMode, FederatedPointerEvent, Texture } from 'pixi.js';
import { forwardRef, Ref } from 'react';

import { useConfigValue } from '#base/context/system';

import { BoxLayout } from './Box';
import { useDragTrigger } from './drag/useDragTrigger';
import { useDynamicStyleEffect } from './dynamicstyle';
import { FlashBitmap } from './FlashBitmap';
import { alphaAt, getCroppedTexture, getMirroredTexture, getTextureAlpha, getTextureGreyscale, getTextureSilhouette, usePixiTexture, useTextureFromUrl } from './hooks';
import { useTooltipHandlers } from './tooltip/useTooltipHandlers';
import { compose, cursorForHandlers, DynamicStyleRole, FlashBitmapVars, insetStretchAxes, multiplyAlphas, multiplyTints, resolveEventMode, SpriteFrame, ThemeLayoutMeta } from './utils';

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
     * Draw this as a Flash bitmap window (`static_bitmap` / `bitmap`) with these variables:
     * `layout` is the window's box, and the image is placed, scaled, tiled, mirrored, turned,
     * etched and clipped inside it exactly as `BitmapDataRenderer.draw` does - see `FlashBitmap`.
     * An omitted variable is the client's default, so `bitmap={{}}` stretches the image over its
     * box. `width`, `height`, `stretch`, `scale*` and `showLoadingPlaceholder` do not apply.
     */
    bitmap?: FlashBitmapVars;
    /**
     * A `#icon` / `#bg` tag under a `dynamicStyle` host: the host's child rule for its current
     * state applies - the etching (a solid copy drawn under the bitmap at an offset), the
     * colour transform and the nudge. See utils/dynamicStyles.ts.
     */
    dynamicRole?: DynamicStyleRole;
    /**
     * The window's `mouseThreshold` (0-255, `WindowController.testLocalPointHitAgainstAlpha`):
     * above 0 a point hits only where the drawn pixel's alpha is at least this much, so a
     * press on the transparent part of an icon falls through to what is behind it. 0 or absent
     * is the plain box.
     */
    hitThreshold?: number;
    /**
     * The `mouse_dragging_trigger` flag (257): pressing the image drags the nearest enclosing
     * `Region` with `dragTarget` - see theme/drag.
     */
    dragTrigger?: boolean;
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
    src, textureKey, texture: ownTexture, frame, width, height, stretch, scale = 1, scaleX = 1, scaleY = 1, zIndex, tint, alpha, greyscale, blendMode, bitmap, dynamicRole, hitThreshold: hitThresholdProp = 0, dragTrigger = false, tooltip, tooltipDelay, eventMode, cursor,
    onPointerOver: onPointerOverProp, onPointerOut: onPointerOutProp, onPointerDown: onPointerDownProp, onPointerUp, onPointerUpOutside, onPointerTap,
    showLoadingPlaceholder, layout, visible,
}, ref) => {
    // A tooltip hovers like any handler would, but on its own it doesn't make the image read as clickable.
    const tooltipHandlers = useTooltipHandlers(tooltip, tooltipDelay);
    const onPointerOver = compose(tooltipHandlers.onPointerOver, onPointerOverProp);
    const onPointerOut = compose(tooltipHandlers.onPointerOut, onPointerOutProp);
    const startDrag = useDragTrigger(dragTrigger);
    const onPointerDown = compose(onPointerDownProp, startDrag);
    // `set mouseThreshold` caps it at 255.
    const hitThreshold = Math.min(255, hitThresholdProp);
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

    if (!texture || !shadedTexture) return null;

    if (bitmap) {
        return (
            <FlashBitmap
                ref={ref}
                texture={shadedTexture}
                vars={bitmap}
                tint={tint}
                greyscale={greyscale}
                alpha={alpha}
                blendMode={blendMode}
                effect={effect}
                layout={layout}
                visible={visible}
                zIndex={zIndex}
                hitThreshold={hitThreshold}
                eventMode={resolvedEventMode}
                cursor={cursor ?? cursorForHandlers(resolvedEventMode, { onPointerTap })}
                onPointerOver={onPointerOver}
                onPointerOut={onPointerOut}
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
                onPointerUpOutside={onPointerUpOutside}
                onPointerTap={onPointerTap}
            />
        );
    }

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
    // The sprite's local space is its texture's (the layout scales the sprite, not the texture),
    // so a point is a texel of the drawn - possibly mirrored - texture; its alpha is read off the
    // unmirrored one, whose alpha the grey copy shares. Outside the texture nothing hits, as
    // `BitmapData.hitTest` finds nothing off its bitmap; a source a canvas can't read keeps the
    // sprite's own rect.
    const sourceAlpha = (hitThreshold > 0 && colourTexture) ? getTextureAlpha(colourTexture) : undefined;
    const hitArea = sourceAlpha && {
        contains: (x: number, y: number): boolean => {
            if (x < 0 || y < 0 || x >= texture.width || y >= texture.height) return false;

            const u = flipX ? (texture.width - x) : x;
            const v = flipY ? (texture.height - y) : y;

            return alphaAt(sourceAlpha, u, v) >= hitThreshold;
        },
    };
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
            hitArea={hitArea || undefined}
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

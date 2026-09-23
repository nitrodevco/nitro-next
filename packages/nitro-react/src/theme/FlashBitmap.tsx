import { BLEND_MODES, Container as PixiContainer, EventMode, FederatedPointerEvent, Graphics as PixiGraphics, Rectangle, Texture } from 'pixi.js';
import { forwardRef, Fragment, useState } from 'react';

import { BoxLayout } from './Box';
import { alphaAt, getTextureAlpha, getTextureRotated, getTextureSilhouette, useLayoutSize } from './hooks';
import { DynamicStyleEffect, FlashBitmapVars, isHitTarget, multiplyAlphas, multiplyTints, PIVOT_POINTS } from './utils';

export interface FlashBitmapProps {
    /** The bitmap, already cropped and greyed as the window asked. */
    texture: Texture;
    vars: FlashBitmapVars;
    /** The window's `color` - a multiply over the bitmap (`#000000` draws a black silhouette). */
    tint?: string;
    /** `greyscale` - the etching is filtered with the bitmap, so it goes grey too. */
    greyscale?: boolean;
    alpha?: number;
    blendMode?: BLEND_MODES;
    effect?: DynamicStyleEffect;
    layout?: BoxLayout;
    visible?: boolean;
    zIndex?: number;
    /**
     * The window's `mouseThreshold` (0-255): above 0 a point hits only where the drawn buffer's
     * alpha is at least this much - `WindowController.testLocalPointHitAgainstAlpha`. 0 or
     * absent is the plain box.
     */
    hitThreshold?: number;
    eventMode?: EventMode;
    cursor?: string;
    onPointerOver?: (event: FederatedPointerEvent) => void;
    onPointerOut?: (event: FederatedPointerEvent) => void;
    onPointerDown?: (event: FederatedPointerEvent) => void;
    onPointerUp?: (event: FederatedPointerEvent) => void;
    onPointerUpOutside?: (event: FederatedPointerEvent) => void;
    onPointerTap?: (event: FederatedPointerEvent) => void;
}

/** `BitmapDataController._etchingPoint`: one pixel up, unless a dynamic style moves it. */
const ETCHING_POINT = { x: 0, y: -1 };

/** The point `applyDynamicStyleByState` leaves when a state's rule has no etching: `[0, 0, 1]`. */
const STYLED_ETCHING_POINT = { x: 0, y: 1 };

const hex = (rgb: number): string => `#${(rgb & 0xFFFFFF).toString(16).padStart(6, '0')}`;

/**
 * The etching's colour. Drawn with the colour transform `(0, 0, 0, a, r, g, b)` it is the etching
 * colour itself, untouched by the window's; on the greyscale path the filter runs over the whole
 * buffer afterwards, so it becomes the luminance of that colour times the window colour.
 */
const etchingTint = (argb: number, greyscale: boolean, tint: string | undefined): string => {
    if (!greyscale) return hex(argb);

    const r = (argb >> 16) & 0xFF;
    const g = (argb >> 8) & 0xFF;
    const b = argb & 0xFF;
    const grey = Math.round((r * 0.212671) + (g * 0.71516) + (b * 0.072169));
    const window = parseInt((tint ?? '#ffffff').slice(1), 16);
    const channel = (shift: number) => Math.round(grey * (((window >> shift) & 0xFF) / 255));

    return hex((channel(16) << 16) | (channel(8) << 8) | channel(0));
};

interface Tile { x: number; y: number }

/**
 * Where the first tile starts on one axis: by the pivot's column (or row) - 0 near, 1 centre,
 * 2 far - offset by the drawn size when mirrored, since a mirrored draw runs back from there.
 * With `wrap` it then steps back a tile at a time until it is at or before the near edge.
 */
const placeTile = (pivotPlace: number, window: number, drawn: number, flip: boolean, wrap: boolean): number => {
    const mirror = flip ? drawn : 0;
    let start = window - drawn + mirror;

    if (pivotPlace === 0) start = mirror;
    else if (pivotPlace === 1) start = Math.trunc((window - drawn) / 2) + mirror;

    while (wrap && drawn > 0 && start > 0) start -= drawn;

    return start;
};

/**
 * A bitmap window drawn the way the client's `BitmapDataRenderer.draw` draws one into its
 * buffer, for a box of `width` x `height`:
 *
 * - the drawn size is `int((stretched ? window : bitmap) * zoom)` per axis - truncated, as the
 *   client's `int` locals do - and a negative zoom or a flip mirrors it;
 * - an unstretched bitmap sits at its pivot: left/top at 0, right/bottom against the far edge,
 *   centre at `int((window - drawn) / 2)` (truncated toward zero, so one wider than its window
 *   hangs out by the same amount on both sides, rounded left);
 * - `wrap` tiles it from the pivot position back past the near edge and on to the far one;
 * - everything is clipped to the window's buffer, which is the box grown by the etching
 *   point's reach (`WindowModel.renderingWidth/Height`) - never scaled down to fit it;
 * - no smoothing anywhere (the textures are `nearest`).
 *
 * `FlashBitmap` is what `ThemeImage` renders when it is given `bitmap` vars; see there.
 */
export const FlashBitmap = forwardRef<PixiContainer, FlashBitmapProps>(({
    texture, vars, tint, greyscale = false, alpha, blendMode, effect, layout, visible, zIndex, hitThreshold: hitThresholdProp = 0, eventMode, cursor,
    onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
}, ref) => {
    const [ host, setHost ] = useState<PixiContainer | null>(null);
    const [ mask, setMask ] = useState<PixiGraphics | null>(null);
    const measured = useLayoutSize(host);
    const zoomX = vars.zoomX ?? 1;
    const zoomY = vars.zoomY ?? 1;
    const source = vars.rotation ? (getTextureRotated(texture, vars.rotation) ?? texture) : texture;
    const fitWidth = vars.fitSizeToContents ? Math.trunc(Math.abs(texture.width * zoomX)) : undefined;
    const fitHeight = vars.fitSizeToContents ? Math.trunc(Math.abs(texture.height * zoomY)) : undefined;
    const ownLayout: BoxLayout = { ...layout, ...(fitWidth !== undefined && { width: fitWidth }), ...(fitHeight !== undefined && { height: fitHeight }) };
    // A size the layout states is known before Yoga runs; one it spans between insets is read back.
    const width = (typeof ownLayout.width === 'number') ? ownLayout.width : measured.width;
    const height = (typeof ownLayout.height === 'number') ? ownLayout.height : measured.height;

    const flipX = (zoomX < 0) !== !!vars.flipX;
    const flipY = (zoomY < 0) !== !!vars.flipY;
    const drawnWidth = Math.abs(Math.trunc(((vars.stretchedX ?? true) ? width : source.width) * zoomX));
    const drawnHeight = Math.abs(Math.trunc(((vars.stretchedY ?? true) ? height : source.height) * zoomY));
    const pivot = Math.max(0, PIVOT_POINTS.indexOf(vars.pivot ?? 'top left'));
    const column = pivot % 3;
    const row = Math.floor(pivot / 3);

    const tiles: Tile[] = [];

    if (drawnWidth > 0 && drawnHeight > 0 && width > 0 && height > 0) {
        const startX = placeTile(column, width, drawnWidth, flipX, !!vars.wrapX);
        const startY = placeTile(row, height, drawnHeight, flipY, !!vars.wrapY);
        const countX = vars.wrapX ? Math.trunc((width / drawnWidth) + 2) : 1;
        const countY = vars.wrapY ? Math.trunc((height / drawnHeight) + 2) : 1;

        for (let j = 0; j < countY; j++) {
            for (let i = 0; i < countX; i++) tiles.push({ x: startX + (i * drawnWidth), y: startY + (j * drawnHeight) });
        }
    }

    const scaleX = (drawnWidth / source.width) * (flipX ? -1 : 1);
    const scaleY = (drawnHeight / source.height) * (flipY ? -1 : 1);
    // A dynamic style that reaches this bitmap replaces its etching in every state
    // (`applyDynamicStyleByState`): the rule's own, or `[0, 0, 1]` - none, one pixel down -
    // when the rule has no etching point. Only a bitmap no style reaches keeps its `etching_color`.
    const etchingPoint = effect ? (effect.etching ? { x: effect.etching.x, y: effect.etching.y } : STYLED_ETCHING_POINT) : ETCHING_POINT;
    const etchingAlpha = effect ? (effect.etching?.alpha ?? 0) : (((vars.etchingColor ?? 0) >>> 24) & 0xFF) / 255;
    const etchingColor = effect ? (effect.etching?.color ?? '#000000') : etchingTint(vars.etchingColor ?? 0, greyscale, tint);
    const etchingTexture = (etchingAlpha >= 0.001) ? getTextureSilhouette(source, etchingColor) : undefined;
    const brightenTexture = effect?.brighten ? getTextureSilhouette(source, '#ffffff') : undefined;
    const resolvedTint = multiplyTints(tint, greyscale ? undefined : effect?.tint);
    const resolvedAlpha = multiplyAlphas(alpha, effect?.alpha);
    const bufferWidth = width + Math.abs(etchingPoint.x);
    const bufferHeight = height + Math.abs(etchingPoint.y);
    // The pixels a tile covers, mirrored or not: [left, right) x [top, bottom).
    const spans = (tile: Tile, dx = 0, dy = 0) => ({
        left: tile.x + dx - (flipX ? drawnWidth : 0),
        top: tile.y + dy - (flipY ? drawnHeight : 0),
    });
    // Only a bitmap that reaches past its buffer needs the clip, and most sit inside theirs.
    const overflows = tiles.some((tile) => {
        const own = spans(tile);
        const etched = spans(tile, etchingPoint.x, etchingPoint.y);

        return [ own, ...(etchingTexture ? [ etched ] : []) ].some(({ left, top }) => left < 0 || top < 0 || (left + drawnWidth) > bufferWidth || (top + drawnHeight) > bufferHeight);
    });

    // The buffer's alpha at a pixel, rebuilt from what was drawn into it: the etching (the
    // silhouette of the same source, so the same alpha, at its point and opacity) with the bitmap
    // over it, each tile mapped back to the source texel under the pixel's centre.
    // `set mouseThreshold` caps it at 255.
    const hitThreshold = Math.min(255, hitThresholdProp);
    const sourceAlpha = (hitThreshold > 0) ? getTextureAlpha(source) : undefined;
    const drawnAlpha = (px: number, py: number): number => {
        if (!sourceAlpha) return 0;

        for (const tile of tiles) {
            const u = ((px + 0.5) - tile.x) / scaleX;
            const v = ((py + 0.5) - tile.y) / scaleY;

            if (u >= 0 && v >= 0 && u < source.width && v < source.height) return alphaAt(sourceAlpha, u, v) / 255;
        }

        return 0;
    };
    const bufferAlphaAt = (px: number, py: number): number => {
        const own = drawnAlpha(px, py);
        const etched = etchingTexture ? (drawnAlpha(px - etchingPoint.x, py - etchingPoint.y) * etchingAlpha) : 0;

        return Math.round((own + (etched * (1 - own))) * 255);
    };
    /*
     * `testLocalPointHitAgainstAlpha`: nothing hits an empty window; with a threshold the point
     * has to be inside the window (`x <= width`, `y <= height`) and on a buffer pixel whose alpha
     * is at least the threshold (`BitmapData.hitTest`); a buffer that can't be read keeps the box.
     *
     * A bitmap that is not a mouse target gets no hit area at all. Flash's `static_bitmap` carries
     * `input_event_processor` only where its layout says so (the wardrobe toggle's `wardrobe_icon`
     * is `params="16"` - none), and `MouseEventProcessor` never considers a window without it, so
     * the press reaches the button drawn underneath. Pixi is the other way round: `hitTestFn`
     * reports a hit for ANY container carrying a `hitArea` once the mode inherited down the walk
     * is interactive - which inside a frame it always is, the frame itself being draggable - and
     * the empty path it returns for a passive one still ends the parent's sibling loop. So an
     * unconditional rectangle here made every decorative bitmap swallow the presses of whatever
     * it was drawn over: the avatar editor's wardrobe button could not be clicked at all. Same
     * rule, and same reason, as `Box`'s `pointerTransparent`.
     */
    const hitArea = (hitThreshold > 0 && sourceAlpha)
        ? {
                contains: (x: number, y: number): boolean => {
                    if (width < 1 || height < 1 || x < 0 || y < 0 || x > width || y > height) return false;

                    const px = Math.floor(x);
                    const py = Math.floor(y);

                    if (px >= bufferWidth || py >= bufferHeight) return false;

                    return bufferAlphaAt(px, py) >= hitThreshold;
                },
            }
        : (isHitTarget(eventMode) ? new Rectangle(0, 0, width, height) : undefined);

    const sprite = (key: string, spriteTexture: Texture, x: number, y: number, props: { tint?: string; alpha?: number; blendMode?: BLEND_MODES }) => (
        <pixiSprite
            key={key}
            texture={spriteTexture}
            x={x}
            y={y}
            scale={{ x: scaleX, y: scaleY }}
            eventMode="none"
            {...props}
        />
    );

    return (
        <pixiContainer
            ref={(node) => {
                setHost(node);

                if (typeof ref === 'function') ref(node);
                else if (ref) (ref as { current: PixiContainer | null }).current = node;
            }}
            visible={visible}
            zIndex={zIndex}
            alpha={resolvedAlpha}
            blendMode={blendMode}
            x={effect?.x}
            y={effect?.y}
            mask={(overflows && mask) ? mask : undefined}
            hitArea={hitArea}
            eventMode={eventMode}
            cursor={cursor}
            onPointerOver={onPointerOver}
            onPointerOut={onPointerOut}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerUpOutside={onPointerUpOutside}
            onPointerTap={onPointerTap}
            layout={ownLayout}
        >
            {overflows && (
                <pixiGraphics
                    ref={setMask}
                    eventMode="none"
                    draw={(g) => {
                        g.clear().rect(0, 0, bufferWidth, bufferHeight).fill(0xFFFFFF);
                    }}
                />
            )}
            {tiles.map((tile, index) => (
                <Fragment key={index}>
                    {etchingTexture && sprite('etch', etchingTexture, tile.x + etchingPoint.x, tile.y + etchingPoint.y, { alpha: etchingAlpha })}
                    {sprite('bitmap', source, tile.x, tile.y, { tint: resolvedTint })}
                    {effect?.amplify && sprite('amplify', source, tile.x, tile.y, { tint: resolvedTint, alpha: effect.amplify, blendMode: 'add' })}
                    {brightenTexture && effect?.brighten && sprite('brighten', brightenTexture, tile.x, tile.y, { alpha: effect.brighten, blendMode: 'add' })}
                </Fragment>
            ))}
        </pixiContainer>
    );
});

FlashBitmap.displayName = 'FlashBitmap';

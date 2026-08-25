import { Color, ColorSource } from 'pixi.js';
import { useEffect, useMemo, useRef } from 'react';

import { GetPixelRatio } from '#base/utils';

import { BoxLayout } from '../Box';
import type { BitmapFont } from '../font/textAtlas';
import { layoutBitmapText } from '../font/textAtlas';
import { boxLayoutToStyle } from './boxStyle';

export interface BitmapTextDomDropShadow {
    alpha: number;
    angle: number;
    distance: number;
    color: ColorSource;
}

export interface BitmapTextDomProps {
    font: BitmapFont;
    text: string;
    color: string;
    dropShadow?: BitmapTextDomDropShadow;
    layout?: BoxLayout;
    wordWrap?: boolean;
    wordWrapWidth?: number;
    breakWords?: boolean;
}

/** Source rect (`glyph.x/y/width/height`) is physical - the atlas is baked at
 *  `font.atlasScale`x for retina crispness (see `build-text-atlas.ts`'s docblock on
 *  `ATLAS_SCALE`); the destination size divides that back down to logical pixels,
 *  matching `xOffset`/`yOffset`/`xAdvance`/`lineHeight`, which are already logical.
 *
 *  truffle's "advanced" engine bakes sub-pixel-precise metrics (most `xOffset`/
 *  `yOffset`/`xAdvance` values in the manifest aren't whole numbers) - `x`/`y` keep
 *  accumulating those exact fractional advances so error doesn't compound line to
 *  line, but each glyph's *destination* rect is rounded right before the draw call.
 *  With `imageSmoothingEnabled = false` (nearest-neighbor), an unrounded fractional
 *  destination gets silently snapped by the browser's own rasterizer instead - not
 *  wrong exactly, but not *consistent* either, and two glyphs on the same baseline
 *  landing on different sides of that snap is exactly what reads as neighboring
 *  letters sitting one physical pixel higher or lower than each other. Rounding
 *  here ourselves makes that snap deterministic and shared by both renderers. */
const drawLines = (ctx: CanvasRenderingContext2D, font: BitmapFont, lines: { text: string }[]): void => {
    let y = 0;

    for (const line of lines) {
        let x = 0;

        for (const ch of line.text) {
            const glyph = font.chars[ch];

            if (glyph && glyph.width > 0 && glyph.height > 0) {
                ctx.drawImage(
                    font.image,
                    glyph.x,
                    glyph.y,
                    glyph.width,
                    glyph.height,
                    Math.round(x + glyph.xOffset),
                    Math.round(y + glyph.yOffset),
                    Math.round(glyph.width / font.atlasScale),
                    Math.round(glyph.height / font.atlasScale),
                );
            }

            x += glyph?.xAdvance ?? font.chars[' ']?.xAdvance ?? 0;
        }

        y += font.lineHeight;
    }
};

/** Tints via `source-in` (cheap, GPU-accelerated in Canvas2D) instead of baking a
 *  color into the atlas - the same tint-not-bake choice `BitmapTextPixi` makes with
 *  Pixi's `tint` prop, so one atlas serves every color a caller asks for. */
const tint = (ctx: CanvasRenderingContext2D, color: string, width: number, height: number): void => {
    ctx.globalCompositeOperation = 'source-in';
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'source-over';
};

/** Renders the glyph run onto its own device-pixel-resolution canvas and tints it -
 *  used once for a plain draw, and twice (shadow color/alpha, then real color) when a
 *  drop shadow is requested, since two differently-tinted passes can't share one target
 *  without the second `source-in` fill wiping out the first pass's pixels. Sized and
 *  scaled by `dpr` (not left at logical size) so the atlas's own physical resolution
 *  survives all the way to the final canvas - drawing this pass onto a plain
 *  logical-size intermediate first, then upscaling *that* to device pixels on
 *  composite, would throw the retina baking away in this exact step. */
const renderTintedPass = (font: BitmapFont, lines: { text: string }[], width: number, height: number, dpr: number, color: string): HTMLCanvasElement => {
    const canvas = document.createElement('canvas');

    canvas.width = Math.max(1, Math.ceil(width * dpr));
    canvas.height = Math.max(1, Math.ceil(height * dpr));

    const ctx = canvas.getContext('2d');

    if (ctx) {
        ctx.imageSmoothingEnabled = false;
        ctx.scale(dpr, dpr);
        drawLines(ctx, font, lines);
        tint(ctx, color, width, height);
    }

    return canvas;
};

/** Same measure-and-blit contract on every render target - `layoutBitmapText` (shared with
 *  `BitmapTextPixi`) decides line breaks and the box size; this component only blits already-
 *  decoded glyph bitmaps, no per-frame text shaping or DOM font rasterization involved. */
export const BitmapTextDom = ({ font, text, color, dropShadow, layout, wordWrap, wordWrapWidth, breakWords }: BitmapTextDomProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { lines, width, height } = useMemo(
        () => layoutBitmapText(text, font, { wordWrap, wordWrapWidth, breakWords }),
        [ text, font, wordWrap, wordWrapWidth, breakWords ],
    );

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) return;

        const dpr = GetPixelRatio();
        const w = Math.max(1, Math.ceil(width));
        const h = Math.max(1, Math.ceil(height));

        canvas.width = Math.ceil(w * dpr);
        canvas.height = Math.ceil(h * dpr);
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;

        const ctx = canvas.getContext('2d');

        if (!ctx) return;

        // Everything below composites in device-pixel space directly (no ctx transform) -
        // renderTintedPass's own canvases are already device-pixel resolution, so a 1:1
        // (or, for the shadow offset, dpr-scaled) drawImage here is a straight copy, not
        // a resample - that's what keeps the atlas's retina baking intact end to end.
        ctx.imageSmoothingEnabled = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (dropShadow) {
            const shadowPass = renderTintedPass(font, lines, w, h, dpr, new Color(dropShadow.color).toHex());
            const dx = Math.cos(dropShadow.angle) * dropShadow.distance * dpr;
            const dy = Math.sin(dropShadow.angle) * dropShadow.distance * dpr;

            ctx.globalAlpha = dropShadow.alpha;
            ctx.drawImage(shadowPass, dx, dy);
            ctx.globalAlpha = 1;
        }

        const mainPass = renderTintedPass(font, lines, w, h, dpr, color);

        ctx.drawImage(mainPass, 0, 0);

        if (font.underline) {
            ctx.fillStyle = color;
            lines.forEach((line, i) => ctx.fillRect(0, ((i + 1) * font.lineHeight - 1) * dpr, line.width * dpr, dpr));
        }
    }, [ font, lines, width, height, color, dropShadow ]);

    if (!text?.length) return null;

    return (
        <canvas
            ref={canvasRef}
            style={{ ...boxLayoutToStyle(layout), imageRendering: 'pixelated' }}
        />
    );
};

BitmapTextDom.displayName = 'BitmapTextDom';

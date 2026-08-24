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

const drawLines = (ctx: CanvasRenderingContext2D, font: BitmapFont, lines: { text: string }[]): void => {
    let y = 0;

    for (const line of lines) {
        let x = 0;

        for (const ch of line.text) {
            const glyph = font.chars[ch];

            if (glyph && glyph.width > 0 && glyph.height > 0) {
                ctx.drawImage(font.image, glyph.x, glyph.y, glyph.width, glyph.height, x + glyph.xOffset, y + glyph.yOffset, glyph.width, glyph.height);
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

/** Renders the glyph run onto its own logical-size (not device-pixel) canvas and tints
 *  it - used once for a plain draw, and twice (shadow color/alpha, then real color) when
 *  a drop shadow is requested, since two differently-tinted passes can't share one target
 *  without the second `source-in` fill wiping out the first pass's pixels. */
const renderTintedPass = (font: BitmapFont, lines: { text: string }[], width: number, height: number, color: string): HTMLCanvasElement => {
    const canvas = document.createElement('canvas');

    canvas.width = Math.max(1, Math.ceil(width));
    canvas.height = Math.max(1, Math.ceil(height));

    const ctx = canvas.getContext('2d');

    if (ctx) {
        ctx.imageSmoothingEnabled = false;
        drawLines(ctx, font, lines);
        tint(ctx, color, canvas.width, canvas.height);
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

        ctx.imageSmoothingEnabled = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.scale(dpr, dpr);

        if (dropShadow) {
            const shadowPass = renderTintedPass(font, lines, w, h, new Color(dropShadow.color).toHex());
            const dx = Math.cos(dropShadow.angle) * dropShadow.distance;
            const dy = Math.sin(dropShadow.angle) * dropShadow.distance;

            ctx.globalAlpha = dropShadow.alpha;
            ctx.drawImage(shadowPass, dx, dy);
            ctx.globalAlpha = 1;
        }

        const mainPass = renderTintedPass(font, lines, w, h, color);

        ctx.drawImage(mainPass, 0, 0);

        if (font.underline) {
            ctx.fillStyle = color;
            lines.forEach((line, i) => ctx.fillRect(0, (i + 1) * font.lineHeight - 1, line.width, 1));
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

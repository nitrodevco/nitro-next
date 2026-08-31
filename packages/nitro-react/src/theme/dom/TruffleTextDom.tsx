import { Color, TextDropShadow } from 'pixi.js';
import { CSSProperties, useLayoutEffect, useMemo, useRef } from 'react';

import { BoxLayout } from '../Box';
import { colorStringToNumber, drawBufferToCanvas, HabboStyleKey, renderTruffleText, renderTruffleTextBlock } from '../font/truffle';
import { boxLayoutToStyle } from './boxStyle';

export interface TruffleTextDomProps {
    habboKey: HabboStyleKey;
    text: string;
    color?: string;
    dropShadow?: TextDropShadow;
    layout?: BoxLayout;
    wordWrap?: boolean;
    wordWrapWidth?: number;
    visible?: boolean;
    /** Explicit line advance in px for multi-line text (composed per line, like `TruffleTextPixi`). */
    lineHeight?: number;
    /** Where the rendered text sits inside a box larger than it (`object-position` keywords). */
    objectPosition?: string;
}

/**
 * DOM counterpart to `TruffleTextPixi` - same single whole-string `renderToBuffer` call, blitted
 * directly onto this component's own canvas via `drawBufferToCanvas`. The canvas's `width`/
 * `height` attributes (its intrinsic pixel size) are set to the buffer's own dimensions and its
 * inline style pins the CSS display size to match exactly, so nothing resamples truffle's own
 * rasterization at the CSS-pixel level - matches the reference integration this was ported from
 * (github.com/iSetht/nitro-react-rose's `TruffleTextView.tsx`). Truffle always renders at the
 * *logical* font size (not `dpr`-multiplied - baking at a higher size and displaying smaller
 * would re-trigger the same size-dependent grid-fitting mismatch this project already hit once
 * with the bitmap atlas this replaced), so on a retina display the browser still has to upscale
 * this canvas's fixed-resolution backing store to fill the extra physical pixels - `imageRendering:
 * 'pixelated'` is what keeps that upscale a crisp nearest-neighbor blow-up instead of blurring it,
 * the same choice `TruffleTextPixi` makes via its texture's `scaleMode: 'nearest'`.
 *
 * `dropShadow` has no truffle equivalent (there's no shadow field in `RenderOptions`), so it's
 * rendered as a second, independently-colored `renderToBuffer` call for the shadow, drawn offset
 * and alpha-blended underneath the real pass - `TruffleTextPixi` gets the same effect for free
 * via Pixi's GPU `DropShadowFilter`, which has no DOM equivalent this cheap.
 */
/**
 * A `<canvas>` is a replaced element: with both insets set and no width it keeps its intrinsic
 * size instead of stretching, so a `left`+`right` (or `top`+`bottom`) box is sized explicitly.
 */
const replacedBoxSize = (style: CSSProperties, buffer: { width: number; height: number }): { width: string | number; height: string | number } => {
    const span = (size: CSSProperties['width'], start: CSSProperties['left'], end: CSSProperties['right'], intrinsic: number): string | number => {
        if (size !== undefined) return size;
        if (typeof start === 'number' && typeof end === 'number') return `calc(100% - ${start + end}px)`;

        return intrinsic;
    };

    return { width: span(style.width, style.left, style.right, buffer.width), height: span(style.height, style.top, style.bottom, buffer.height) };
};

export const TruffleTextDom = ({ habboKey, text, color, dropShadow, layout, wordWrap, wordWrapWidth, visible, objectPosition, lineHeight }: TruffleTextDomProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const options = useMemo(() => ({
        wordWrap,
        width: wordWrap ? wordWrapWidth : undefined,
    }), [ wordWrap, wordWrapWidth ]);

    const useBlock = !!lineHeight && !wordWrap && text.includes('\n');
    const buffer = useMemo(() => {
        if (!text?.length) return undefined;

        return renderTruffleText(text, habboKey, { ...options, ...(color ? { color: colorStringToNumber(color) } : {}) });
    }, [ text, habboKey, color, options ]);

    // The composed multi-line block (explicit `lineHeight`) - see `renderTruffleTextBlock`.
    const blockCanvas = useMemo(() => {
        if (!useBlock || !text?.length) return undefined;

        const shadow = dropShadow ? { angle: dropShadow.angle, distance: dropShadow.distance, alpha: dropShadow.alpha, colorValue: new Color(dropShadow.color).toNumber() } : undefined;

        return renderTruffleTextBlock(text, habboKey, { ...options, ...(color ? { color: colorStringToNumber(color) } : {}) }, lineHeight, shadow);
    }, [ useBlock, text, habboKey, color, options, lineHeight, dropShadow ]);

    const shadowBuffer = useMemo(() => {
        if (!text?.length || !dropShadow) return undefined;

        return renderTruffleText(text, habboKey, { ...options, color: new Color(dropShadow.color).toNumber() });
    }, [ text, habboKey, dropShadow, options ]);

    useLayoutEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas || !buffer) return;

        const ctx = canvas.getContext('2d');

        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (blockCanvas) {
            ctx.drawImage(blockCanvas, 0, 0);

            return;
        }

        if (dropShadow && shadowBuffer) {
            const dx = Math.cos(dropShadow.angle) * dropShadow.distance;
            const dy = Math.sin(dropShadow.angle) * dropShadow.distance;

            ctx.globalAlpha = dropShadow.alpha;
            ctx.putImageData(new ImageData(new Uint8ClampedArray(shadowBuffer.data), shadowBuffer.width, shadowBuffer.height), dx, dy);
            ctx.globalAlpha = 1;
        }

        drawBufferToCanvas(canvas, buffer);
    }, [ buffer, shadowBuffer, dropShadow, blockCanvas ]);

    if (!buffer) return null;

    const layoutStyle = boxLayoutToStyle(layout);
    const size = blockCanvas ?? buffer;

    return (
        <canvas
            ref={canvasRef}
            width={size.width}
            height={size.height}
            style={{
                ...layoutStyle,
                ...replacedBoxSize(layoutStyle, size),
                display: visible === false ? 'none' : 'block',
                flexShrink: 0,
                maxWidth: 'none',
                objectFit: 'none',
                objectPosition: objectPosition ?? 'left center',
                imageRendering: 'pixelated',
            }}
        />
    );
};

TruffleTextDom.displayName = 'TruffleTextDom';

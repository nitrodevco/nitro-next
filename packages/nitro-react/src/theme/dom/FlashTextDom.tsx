import { CSSProperties, useLayoutEffect, useRef } from 'react';

import { BoxLayout } from '../Box';
import { FlashTextCanvas } from '../font/flash-text';
import { boxLayoutToStyle } from './boxStyle';

export interface FlashTextDomProps {
    /** The rasterised text - see `useFlashTextCanvas`. */
    rendered: FlashTextCanvas;
    layout?: BoxLayout;
    visible?: boolean;
    /** Where the rendered text sits inside a box larger than it (`object-position` keywords). */
    objectPosition?: string;
    alpha?: number;
    /** A pixel nudge on top of the layout position (a dynamic style's `offsetX`/`offsetY`). */
    x?: number;
    y?: number;
}

/**
 * A `<canvas>` is a replaced element: with both insets set and no width it keeps its intrinsic
 * size instead of stretching, so a `left`+`right` (or `top`+`bottom`) box is sized explicitly.
 */
const replacedBoxSize = (style: CSSProperties, intrinsic: { width: number; height: number }): { width: string | number; height: string | number } => {
    const span = (size: CSSProperties['width'], start: CSSProperties['left'], end: CSSProperties['right'], fallback: number): string | number => {
        if (size !== undefined) return size;

        if (typeof start === 'number' && typeof end === 'number') return `calc(100% - ${start + end}px)`;

        return fallback;
    };

    return { width: span(style.width, style.left, style.right, intrinsic.width), height: span(style.height, style.top, style.bottom, intrinsic.height) };
};

/**
 * DOM counterpart to `FlashTextPixi`: the same rasterised bitmap, drawn onto this component's
 * own canvas. The canvas's intrinsic size is the bitmap's and its CSS size is pinned to match,
 * so nothing resamples the glyphs; on a high-density display the browser still has to upscale
 * the backing store, and `imageRendering: 'pixelated'` keeps that a crisp nearest-neighbour
 * blow-up - the choice `FlashTextPixi` makes with its texture's `scaleMode`.
 */
export const FlashTextDom = ({ rendered, layout, visible, objectPosition, alpha, x, y }: FlashTextDomProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useLayoutEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');

        if (!canvas || !context) return;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(rendered.canvas, 0, 0);
    }, [ rendered ]);

    const layoutStyle = boxLayoutToStyle(layout);

    return (
        <canvas
            ref={canvasRef}
            width={rendered.width}
            height={rendered.height}
            style={{
                ...layoutStyle,
                ...replacedBoxSize(layoutStyle, rendered),
                display: visible === false ? 'none' : 'block',
                flexShrink: 0,
                maxWidth: 'none',
                objectFit: 'none',
                objectPosition: objectPosition ?? 'left center',
                imageRendering: 'pixelated',
                opacity: alpha,
                transform: (x || y) ? `translate(${x ?? 0}px, ${y ?? 0}px)` : undefined,
            }}
        />
    );
};

FlashTextDom.displayName = 'FlashTextDom';

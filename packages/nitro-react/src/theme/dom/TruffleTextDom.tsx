import { Color, TextDropShadow } from 'pixi.js';
import { useLayoutEffect, useMemo, useRef } from 'react';

import { BoxLayout } from '../Box';
import { colorStringToNumber, drawBufferToCanvas, HabboStyleKey, renderTruffleText } from '../font/truffle';
import { boxLayoutToStyle } from './boxStyle';

export interface TruffleTextDomProps {
    habboKey: HabboStyleKey;
    text: string;
    color?: string;
    dropShadow?: TextDropShadow;
    layout?: BoxLayout;
    wordWrap?: boolean;
    wordWrapWidth?: number;
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
export const TruffleTextDom = ({ habboKey, text, color, dropShadow, layout, wordWrap, wordWrapWidth }: TruffleTextDomProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const options = useMemo(() => ({
        wordWrap,
        width: wordWrap ? wordWrapWidth : undefined,
    }), [ wordWrap, wordWrapWidth ]);

    const buffer = useMemo(() => {
        if (!text?.length) return undefined;

        return renderTruffleText(text, habboKey, { ...options, ...(color ? { color: colorStringToNumber(color) } : {}) });
    }, [ text, habboKey, color, options ]);

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

        if (dropShadow && shadowBuffer) {
            const dx = Math.cos(dropShadow.angle) * dropShadow.distance;
            const dy = Math.sin(dropShadow.angle) * dropShadow.distance;

            ctx.globalAlpha = dropShadow.alpha;
            ctx.putImageData(new ImageData(new Uint8ClampedArray(shadowBuffer.data), shadowBuffer.width, shadowBuffer.height), dx, dy);
            ctx.globalAlpha = 1;
        }

        drawBufferToCanvas(canvas, buffer);
    }, [ buffer, shadowBuffer, dropShadow ]);

    if (!buffer) return null;

    return (
        <canvas
            ref={canvasRef}
            width={buffer.width}
            height={buffer.height}
            style={{
                ...boxLayoutToStyle(layout),
                width: `${buffer.width}px`,
                height: `${buffer.height}px`,
                maxWidth: 'none',
                imageRendering: 'pixelated',
            }}
        />
    );
};

TruffleTextDom.displayName = 'TruffleTextDom';

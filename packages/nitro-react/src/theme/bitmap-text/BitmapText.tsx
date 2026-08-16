import { useLayoutEffect, useRef } from 'react';

import { loadBitmapFont } from './bitmapFontRegistry';
import { layoutBitmapText } from './bitmapTextLayout';
import {
    paintBitmapTextMask,
    tintBitmapTextMask,
} from './bitmapTextRenderer';
import type { BitmapTextProps, LoadedBitmapFont } from './types';

export const BitmapText = (props: BitmapTextProps) => {
    const {
        children,
        recipe,
        color,
        align = 'left',
        autoWidth = false,
        shadowColor,
        shadowX = 0,
        shadowY = 0,
        className = '',
    } = props;
    const text = String(children ?? '');
    const containerRef = useRef<HTMLSpanElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const scratchRef = useRef<HTMLCanvasElement>(null);

    useLayoutEffect(() => {
        let active = true;
        let font: LoadedBitmapFont | null = null;

        const draw = () => {
            const container = containerRef.current;
            const canvas = canvasRef.current;

            if (!active || !font || !container || !canvas) return;

            const width = autoWidth
                ? Math.ceil(
                      layoutBitmapText(font.metrics, text).width +
                          (font.metrics.fieldGutterX ?? 0) * 2,
                  )
                : Math.floor(container.clientWidth);
            const height = Math.floor(container.clientHeight);

            if (autoWidth) container.style.width = `${width}px`;
            else container.style.removeProperty('width');

            if (width <= 0 || height <= 0) return;

            canvas.width = width;
            canvas.height = height;
            // Bitmap glyphs require a 1:1 mapping between canvas and CSS pixels.
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            const context = canvas.getContext('2d', { alpha: true });
            const scratch = scratchRef.current ?? document.createElement('canvas');

            if (!context) return;

            scratchRef.current = scratch;
            scratch.width = width;
            scratch.height = height;

            const scratchContext = scratch.getContext('2d', { alpha: true });

            if (!scratchContext) return;

            context.clearRect(0, 0, width, height);
            context.imageSmoothingEnabled = false;
            paintBitmapTextMask(scratchContext, font, text, width, height, align);

            if (shadowColor) {
                tintBitmapTextMask(scratchContext, width, height, shadowColor);
                context.drawImage(scratch, shadowX, shadowY);
                paintBitmapTextMask(scratchContext, font, text, width, height, align);
            }

            tintBitmapTextMask(scratchContext, width, height, color);
            context.drawImage(scratch, 0, 0);
            canvas.dataset.bitmapStatus = 'ready';
        };

        const observer =
            typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(draw);

        if (containerRef.current) observer?.observe(containerRef.current);

        loadBitmapFont(recipe)
            .then(loaded => {
                font = loaded;
                draw();
            })
            .catch(error => {
                if (!active) return;
                if (canvasRef.current) canvasRef.current.dataset.bitmapStatus = 'error';
                console.error(error);
            });

        return () => {
            active = false;
            observer?.disconnect();
        };
    }, [align, autoWidth, color, recipe, shadowColor, shadowX, shadowY, text]);

    return (
        <span ref={containerRef} className={className}>
            <canvas
                ref={canvasRef}
                aria-hidden="true"
                data-bitmap-status="loading"
                className="pointer-events-none absolute top-0 left-0 block pixel-art"
            />
            <span className="sr-only">{text}</span>
        </span>
    );
};

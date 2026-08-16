import { useLayoutEffect, useRef } from 'react';

export type BitmapTextRecipe = 'bold-12' | 'bold-italic-12';

type BitmapGlyph = {
    x: number;
    y: number;
    width: number;
    height: number;
    xOffset?: number;
    yOffset?: number;
    xAdvance?: number;
    advanceTwips?: number;
    fieldTop?: number;
    phases?: BitmapGlyph[];
};

type BitmapFontMetrics = {
    ascent: number;
    descent: number;
    lineHeight: number;
    coordinateMode?: string;
    phaseCount?: number;
    glyphs: Record<string, BitmapGlyph>;
    kernings?: Record<string, number>;
};

type LoadedBitmapFont = {
    image: HTMLImageElement;
    metrics: BitmapFontMetrics;
};

type BitmapTextProps = {
    children?: string | number;
    recipe: BitmapTextRecipe;
    color: string;
    shadowColor?: string;
    shadowX?: number;
    shadowY?: number;
    className?: string;
};

const FONT_SOURCES: Record<BitmapTextRecipe, { image: string; metrics: string }> = {
    'bold-12': {
        image: '/assets/flash/fonts/bold-12.png',
        metrics: '/assets/flash/fonts/bold-12.json',
    },
    'bold-italic-12': {
        image: '/assets/flash/fonts/bold-italic-12.png',
        metrics: '/assets/flash/fonts/bold-italic-12.json',
    },
};

const FONT_CACHE = new Map<BitmapTextRecipe, Promise<LoadedBitmapFont>>();
const FLASH_TWIPS_PER_PIXEL = 20;

const loadImage = (url: string) =>
    new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image();

        image.onload = () => resolve(image);
        image.onerror = () =>
            reject(new Error(`Unable to load bitmap font atlas: ${url}`));
        image.src = url;
    });

const loadBitmapFont = (recipe: BitmapTextRecipe) => {
    const cached = FONT_CACHE.get(recipe);

    if (cached) return cached;

    const source = FONT_SOURCES[recipe];
    const request = Promise.all([
        fetch(source.metrics).then(response => {
            if (!response.ok)
                throw new Error(
                    `Unable to load bitmap font metrics: ${source.metrics}`,
                );

            return response.json() as Promise<BitmapFontMetrics>;
        }),
        loadImage(source.image),
    ])
        .then(([metrics, image]) => ({ metrics, image }))
        .catch(error => {
            FONT_CACHE.delete(recipe);
            throw error;
        });

    FONT_CACHE.set(recipe, request);

    return request;
};

const getGlyph = (metrics: BitmapFontMetrics, character: string) =>
    metrics.glyphs[character] ?? metrics.glyphs['?'];

const layoutGlyphs = (metrics: BitmapFontMetrics, text: string) => {
    // Flash carries the 12px bold advance in twips and selects a phase-specific glyph raster.
    if (
        metrics.coordinateMode === 'flash-text-field' &&
        metrics.phaseCount === FLASH_TWIPS_PER_PIXEL
    ) {
        let cursorTwips = 0;

        return Array.from(text).flatMap(character => {
            const sourceGlyph = getGlyph(metrics, character);

            if (!sourceGlyph) return [];

            const phase =
                ((cursorTwips % FLASH_TWIPS_PER_PIXEL) + FLASH_TWIPS_PER_PIXEL) %
                FLASH_TWIPS_PER_PIXEL;
            const glyph = sourceGlyph.phases?.[phase] ?? sourceGlyph;
            const positioned = {
                glyph,
                x:
                    Math.floor(cursorTwips / FLASH_TWIPS_PER_PIXEL) +
                    (glyph.xOffset ?? 0),
            };

            cursorTwips +=
                glyph.advanceTwips ??
                sourceGlyph.advanceTwips ??
                Math.round((sourceGlyph.xAdvance ?? 0) * FLASH_TWIPS_PER_PIXEL);

            return [positioned];
        });
    }

    let cursor = 0;
    let previous = '';

    return Array.from(text).flatMap(character => {
        const glyph = getGlyph(metrics, character);

        if (!glyph) return [];
        if (previous) cursor += metrics.kernings?.[previous + character] ?? 0;

        const positioned = { glyph, x: cursor + (glyph.xOffset ?? 0) };

        cursor += glyph.xAdvance ?? 0;
        previous = character;

        return [positioned];
    });
};

const paintMask = (
    context: CanvasRenderingContext2D,
    font: LoadedBitmapFont,
    text: string,
    width: number,
    height: number,
) => {
    const { image, metrics } = font;
    const usesFlashCoordinates = metrics.coordinateMode === 'flash-text-field';
    const baseline =
        Math.round((height - metrics.ascent - metrics.descent) / 2) +
        Math.floor(
            Math.max(0, metrics.lineHeight - metrics.ascent - metrics.descent) / 2,
        ) +
        metrics.ascent;

    context.clearRect(0, 0, width, height);
    context.imageSmoothingEnabled = false;

    for (const { glyph, x } of layoutGlyphs(metrics, text)) {
        if (glyph.width <= 0 || glyph.height <= 0) continue;

        const destinationY =
            usesFlashCoordinates && Number.isFinite(glyph.fieldTop)
                ? Number(glyph.fieldTop)
                : baseline + (glyph.yOffset ?? 0);

        context.drawImage(
            image,
            glyph.x,
            glyph.y,
            glyph.width,
            glyph.height,
            usesFlashCoordinates ? x : Math.round(x),
            usesFlashCoordinates ? destinationY : Math.round(destinationY),
            glyph.width,
            glyph.height,
        );
    }
};

const tintMask = (
    context: CanvasRenderingContext2D,
    width: number,
    height: number,
    color: string,
) => {
    context.globalCompositeOperation = 'source-in';
    context.fillStyle = color;
    context.fillRect(0, 0, width, height);
    context.globalCompositeOperation = 'source-over';
};

export const BitmapText = (props: BitmapTextProps) => {
    const {
        children,
        recipe,
        color,
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

            const width = Math.floor(container.clientWidth);
            const height = Math.floor(container.clientHeight);

            if (width <= 0 || height <= 0) return;

            canvas.width = width;
            canvas.height = height;

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
            paintMask(scratchContext, font, text, width, height);

            if (shadowColor) {
                tintMask(scratchContext, width, height, shadowColor);
                context.drawImage(scratch, shadowX, shadowY);
                paintMask(scratchContext, font, text, width, height);
            }

            tintMask(scratchContext, width, height, color);
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
    }, [color, recipe, shadowColor, shadowX, shadowY, text]);

    return (
        <span ref={containerRef} className={className}>
            <canvas
                ref={canvasRef}
                aria-hidden="true"
                data-bitmap-status="loading"
                className="pointer-events-none absolute inset-0 block size-full pixel-art"
            />
            <span className="sr-only">{text}</span>
        </span>
    );
};

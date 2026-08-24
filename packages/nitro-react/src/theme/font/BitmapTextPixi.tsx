import { BitmapFont as PixiBitmapFont, Cache, TextDropShadow, Texture } from 'pixi.js';
import { DropShadowFilter } from 'pixi-filters';
import { useMemo } from 'react';

import { GetPixelRatio } from '#base/utils';

import { BoxLayout } from '../Box';
import type { BitmapFont } from './textAtlas';
import { layoutBitmapText } from './textAtlas';

/**
 * Registers a baked `BitmapFont` (see `textAtlas.ts`) into Pixi's own bitmap font
 * cache the first time it's used, so every later `<pixiBitmapText>` referencing the
 * same combo reuses the same GPU texture/font data instead of re-registering it.
 * Direct construction (not `BitmapFont.install`, which *generates* a bitmap font
 * from a regular canvas-rendered style) - our glyph bitmaps already exist.
 */
const installedFontKeys = new Set<string>();

const ensureInstalled = (font: BitmapFont): string => {
    const cacheKey = `habbo-${font.key}`;

    if (installedFontKeys.has(cacheKey)) return cacheKey;

    const chars: Record<string, {
        id: number; page: number; letter: string; kerning: Record<string, number>;
        x: number; y: number; width: number; height: number; xOffset: number; yOffset: number; xAdvance: number;
    }> = {};

    for (const [ ch, g ] of Object.entries(font.chars)) {
        chars[ch] = {
            id: ch.codePointAt(0) ?? 0, page: 0, letter: ch, kerning: {},
            x: g.x, y: g.y, width: g.width, height: g.height, xOffset: g.xOffset, yOffset: g.yOffset, xAdvance: g.xAdvance,
        };
    }

    const pixiFont = new PixiBitmapFont({
        data: {
            pages: [ { id: 0, file: font.file } ],
            chars,
            fontSize: font.fontSize,
            lineHeight: font.lineHeight,
            baseLineOffset: font.baseLineOffset,
            fontFamily: cacheKey,
            distanceField: { type: 'none', range: 0 },
        },
        textures: [ Texture.from(font.image) ],
    });

    Cache.set(`${cacheKey}-bitmap`, pixiFont);
    installedFontKeys.add(cacheKey);

    return cacheKey;
};

export interface BitmapTextPixiProps {
    font: BitmapFont;
    text: string;
    color: string;
    dropShadow?: TextDropShadow;
    layout?: BoxLayout;
    wordWrap?: boolean;
    wordWrapWidth?: number;
    breakWords?: boolean;
}

/** Same sizing contract `TextPixi` (`ThemeText.tsx`) uses for native text - a
 *  self-measured `width`/`height` feeds Yoga since a bitmap text leaf has no
 *  measure function of its own either, `objectFit:'none'`/`flexShrink:0` pin it
 *  to that natural size instead of Yoga stretching/shrinking the glyphs. */
export const BitmapTextPixi = ({ font, text, color, dropShadow, layout, wordWrap, wordWrapWidth, breakWords }: BitmapTextPixiProps) => {
    const cacheKey = useMemo(() => ensureInstalled(font), [ font ]);
    const { composedText, width, height, underlines } = useMemo(() => {
        const { lines, width: w, height: h } = layoutBitmapText(text, font, { wordWrap, wordWrapWidth, breakWords });

        return {
            composedText: lines.map(l => l.text).join('\n'),
            width: w,
            height: h,
            underlines: font.underline ? lines.map((l, i) => ({ y: (i + 1) * font.lineHeight - 1, width: l.width })) : [],
        };
    }, [ text, font, wordWrap, wordWrapWidth, breakWords ]);
    const filters = useMemo(() => (dropShadow
        ? [ new DropShadowFilter({
                offset: { x: Math.cos(dropShadow.angle) * dropShadow.distance, y: Math.sin(dropShadow.angle) * dropShadow.distance },
                blur: dropShadow.blur,
                color: dropShadow.color,
                alpha: dropShadow.alpha,
                resolution: GetPixelRatio(),
            }) ]
        : undefined), [ dropShadow ]);

    if (!text?.length) return null;

    const bitmapText = (
        <pixiBitmapText
            text={composedText}
            style={{ fontFamily: cacheKey, fontSize: font.fontSize }}
            tint={color}
            filters={underlines.length ? undefined : filters}
            resolution={GetPixelRatio()}
            layout={underlines.length
                ? { position: 'absolute', top: 0, left: 0 }
                : {
                        width: Math.ceil(width),
                        height: Math.ceil(height),
                        objectFit: 'none',
                        flexShrink: 0,
                        ...layout,
                    }}
        />
    );

    if (!underlines.length) return bitmapText;

    return (
        <pixiContainer
            filters={filters}
            layout={{
                width: Math.ceil(width),
                height: Math.ceil(height),
                objectFit: 'none',
                flexShrink: 0,
                ...layout,
            }}
        >
            {bitmapText}
            <pixiGraphics
                tint={color}
                layout={{ position: 'absolute', top: 0, left: 0 }}
                draw={(g) => {
                    g.clear();

                    for (const line of underlines) g.rect(0, line.y, line.width, 1).fill(0xFFFFFF);
                }}
            />
        </pixiContainer>
    );
};

BitmapTextPixi.displayName = 'BitmapTextPixi';

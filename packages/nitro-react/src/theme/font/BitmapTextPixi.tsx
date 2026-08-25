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

    // Pixi's bitmap-text renderer draws each glyph's texture at its stored width/height
    // (physical, unscaled here - see `textAtlas.ts`'s `BitmapGlyph` docblock on
    // `atlasScale`) positioned by `baseLineOffset + yOffset`, all inside one uniform
    // `context.scale(style.fontSize / data.fontSize, ...)` transform - so xOffset/
    // yOffset/xAdvance/lineHeight/baseLineOffset must share the SAME (physical) unit
    // space as width/height for that single scale factor to shrink everything back to
    // the right logical size together. `textAtlas.ts`'s manifest keeps those logical
    // (what `layoutBitmapText`/`BitmapTextDom` want), so this is the one place they get
    // re-expanded to physical - by setting `data.fontSize` to the atlas's own physical
    // size (`font.fontSize * font.atlasScale`) while `style.fontSize` below stays
    // logical, Pixi's own `scale = style.fontSize / data.fontSize` comes out to
    // `1 / atlasScale`, exactly undoing the expansion uniformly.
    const chars: Record<string, {
        id: number; page: number; letter: string; kerning: Record<string, number>;
        x: number; y: number; width: number; height: number; xOffset: number; yOffset: number; xAdvance: number;
    }> = {};

    // truffle's "advanced" engine bakes sub-pixel-precise metrics (most manifest
    // xOffset/yOffset values aren't whole numbers) - rounded to the nearest physical
    // pixel here, the same reasoning `BitmapTextDom.tsx`'s `drawLines` rounds its own
    // destination rect: leaving a glyph's vertex offset at an arbitrary fractional
    // position is what two glyphs on the same baseline landing at inconsistent
    // sub-pixel offsets from each other reads as visually - one glyph sampled a
    // half-pixel off from its neighbor, not obviously "wrong" on its own but
    // blurrier or shifted relative to it. `xAdvance` is deliberately NOT rounded -
    // Pixi's own bitmap-text pipe sums it glyph-to-glyph internally (no hook to
    // round only the final per-glyph position the way `drawLines`'s explicit
    // `x`/`y` accumulator does), so rounding each one here would compound into
    // real cumulative width drift over a line - and would drift Pixi's rendered
    // width away from `layoutBitmapText`'s (unrounded) measurement, which both
    // renderers otherwise agree on exactly.
    for (const [ ch, g ] of Object.entries(font.chars)) {
        chars[ch] = {
            id: ch.codePointAt(0) ?? 0, page: 0, letter: ch, kerning: {},
            x: g.x, y: g.y, width: g.width, height: g.height,
            xOffset: Math.round(g.xOffset * font.atlasScale),
            // Pixi's own renderer positions each glyph at `baseLineOffset + yOffset` (see
            // AbstractBitmapTextPipe._updateContext, `currentY = bitmapFont.baseLineOffset`
            // for the first line) - i.e. it expects yOffset relative to the *baseline*,
            // unlike the manifest's line-top-relative convention - converted here too.
            yOffset: Math.round((g.yOffset - font.baseLineOffset) * font.atlasScale),
            xAdvance: g.xAdvance * font.atlasScale,
        };
    }

    const pixiFont = new PixiBitmapFont({
        data: {
            pages: [ { id: 0, file: font.file } ],
            chars,
            fontSize: font.fontSize * font.atlasScale,
            lineHeight: font.lineHeight * font.atlasScale,
            baseLineOffset: font.baseLineOffset * font.atlasScale,
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
            roundPixels
            filters={underlines.length ? undefined : filters}
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
                roundPixels
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

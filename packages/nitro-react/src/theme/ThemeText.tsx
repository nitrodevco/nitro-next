import { CanvasTextMetrics, TextStyleOptions } from 'pixi.js';
import { useMemo } from 'react';

import { GetPixelRatio } from '#base/utils';

import { BoxLayout } from './Box';
import { boxLayoutToStyle, getDomTextStyle } from './dom';
import { getPixiTextStyle, getRenderMode, TextStyleKey } from './utils';

export type TextConfig = {
    text: string;
    textStyle?: TextStyleKey;
    textOptions?: TextStyleOptions;
    layout?: BoxLayout;
};

/**
 * Unlike the DOM target - where a `<span>` naturally reports its own rendered size to its flex
 * parent - `@pixi/layout`'s Yoga integration only *positions* a `pixiText` leaf within a size
 * Yoga already computed for it (see `@pixi/layout`'s `TextMixin.computeLayoutData`, which does
 * `objectFit`/`objectPosition` math but registers no Yoga measure function); left with no
 * `layout.width`/`height` of its own, a text leaf collapses to 0x0, so a box sized only by its
 * text content (a tab button growing to fit its label, several text rows stacking in a column)
 * gets no width/height to grow around and every row overlaps at the same origin instead of
 * flowing. Measuring the text ourselves via the same synchronous canvas measurement Pixi's own
 * `Text` uses internally, and feeding that in as the leaf's own Yoga size, is what restores
 * that "size grows from content" behavior to parity with the DOM target's native span sizing.
 * A caller-supplied `layout.width`/`height` still wins per-axis (e.g. an explicit fixed-size or
 * `wordWrapWidth`-driven label) - this only fills in the axes nobody already sized.
 *
 * `objectFit: 'none'` pins the text to its own natural scale (1:1, never stretched/shrunk to
 * fill whatever box Yoga ends up assigning it - see `@pixi/layout`'s `calculateObjectFit`).
 * Without it, the default `'scale-down'` rescales the glyphs any time Yoga's computed box for
 * this leaf doesn't exactly equal our measured size to the pixel - which happens constantly
 * (flex-shrink squeezing a column of rows shorter than their content, sub-pixel rounding), and
 * reads as text randomly shrinking mid-list rather than the DOM target's actual behavior of
 * letting overflowing text simply overflow.
 *
 * `flexShrink: 0` is the other half of that same parity gap: Yoga's default `flexShrink: 1`
 * (see `Layout.defaultStyle.shared`) has no accompanying min-content floor the way a CSS flex
 * item does (a `<span>` refuses to shrink below the size its own text demands even with
 * `flex-shrink: 1`, per the browser's implicit `min-width/height: auto`) - so a column of text
 * rows taller than its container silently compresses every row instead of overflowing it, and
 * the result is the exact same unreadable overlap `objectFit: 'none'` alone doesn't prevent
 * (a shrunk box, drawn at natural scale, just overlaps its neighbors). Pinning text to its
 * natural size on both axes is what makes it overflow a too-small container instead - matching
 * a `<span>`'s real floor, and matching what the DOM target already does with no extra code.
 */
const TextPixi = ({ text, textStyle, textOptions, layout, ...props }: TextConfig) => {
    const style = useMemo(() => getPixiTextStyle(textStyle ?? 'text-style-regular', textOptions), [ textStyle, textOptions ]);
    const metrics = useMemo(() => (text?.length ? CanvasTextMetrics.measureText(text, style) : undefined), [ text, style ]);

    if (!text?.length || !metrics) return null;

    return (
        <pixiText
            text={text}
            style={style}
            resolution={GetPixelRatio()}
            layout={{
                width: Math.ceil(metrics.width),
                height: Math.ceil(metrics.height),
                objectFit: 'none',
                flexShrink: 0,
                ...layout,
            }}
            {...props}
        />
    );
};

/** `textOptions` is Pixi's own `TextStyleOptions` - only the handful of fields views actually
 *  pass (`fill`, `fontSize`, and the word-wrap trio) are translated; anything else Pixi-specific
 *  in there has no DOM equivalent and is left unused. */
const TextDom = ({ text, textStyle, textOptions, layout }: TextConfig) => {
    const fill = typeof textOptions?.fill === 'string' ? textOptions.fill : undefined;
    const fontSize = typeof textOptions?.fontSize === 'number' ? textOptions.fontSize : undefined;

    const style = {
        ...boxLayoutToStyle(layout),
        ...getDomTextStyle(textStyle ?? 'text-style-regular', { fill, fontSize }),
        display: 'inline-block',
    };

    if (textOptions?.wordWrap) {
        style.whiteSpace = 'normal';
        style.overflowWrap = textOptions.breakWords ? 'anywhere' : 'break-word';

        if (typeof textOptions.wordWrapWidth === 'number') style.width = textOptions.wordWrapWidth;
    }

    return <span style={style}>{text}</span>;
};

export const ThemeText = (props: TextConfig) => getRenderMode() === 'dom' ? <TextDom {...props} /> : <TextPixi {...props} />;

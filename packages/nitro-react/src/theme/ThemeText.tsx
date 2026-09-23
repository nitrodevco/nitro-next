import { CanvasTextMetrics, TextDropShadow, TextStyleOptions } from 'pixi.js';
import { useMemo } from 'react';

import { GetPixelRatio } from '#base/utils';

import { BoxLayout } from './Box';
import { useDynamicStyleEffect } from './dynamicstyle';
import { DEFAULT_FLASH_TEXT_FORMAT, FlashTextFieldOverrides, parseFlashTextMarkup } from './font/flash-text';
import { FlashText } from './font/FlashText';
import { FlashTextCanvasConfig, FlashTextOverflowReplace, useFlashTextCanvas } from './hooks/useFlashTextCanvas';
import { browserFaceOverride, DEFAULT_TEXT_STYLE, DynamicStyleRole, flashFaceOverride, getPixiTextStyle, insetStretchAxes, resolveFlashStyle, TEXT_DROP_SHADOW, TEXT_STYLES, textObjectPosition, TextStyleKey, TextVerticalAlign, ThemeLayoutMeta, transformColor } from './utils';

export type TextConfig = {
    text: string;
    textStyle?: TextStyleKey;
    textOptions?: TextStyleOptions;
    /**
     * The text's own box. When it is larger than the rendered text (a ported layout's text
     * element box), the text keeps its size and sits inside it: horizontally per
     * `textOptions.align`, vertically per `verticalAlign` - no wrapping container needed.
     */
    layout?: BoxLayout;
    verticalAlign?: TextVerticalAlign;
    /** The Flash window `blend` of a text field (its own graphic context): the text's opacity. */
    alpha?: number;
    /** A `#icon` tag under a `dynamicStyle` host: the host's child rule recolours and nudges the text. */
    dynamicRole?: DynamicStyleRole;
    /**
     * The `TextField` vars a Flash `<text>` layout declares over its style - `antialias_type`,
     * `grid_fit_type`, `sharpness`, `thickness`, `kerning`. Pixi's `TextStyleOptions` has no room
     * for them, and without them a field whose layout turns advanced anti-aliasing on over a
     * Volter style (the chat input's flood warning) cannot render exactly. `font_face`,
     * `font_size` and `text_color` are `textOptions.fontFamily` / `fontSize` / `fill`.
     */
    flashFormat?: FlashTextFieldOverrides;
    /**
     * The text is Flash `htmlText` - a `formatted_text` / `html` window, whose
     * `FormattedTextController` / `HTMLTextController` set `field.htmlText` - and renders its
     * `<b>`, `<i>`, `<u>`, `<font>`, `<br>` and `<p>` (see `parseFlashTextMarkup`). The browser
     * fallback shows the text with its tags stripped.
     */
    markup?: boolean;
    /**
     * With `markup`: a click on an `<a href>`'s glyphs, and only there, calls this with the link -
     * the href, an `event:` link's without its prefix (`HTMLTextController.immediateClickHandler`'s
     * `WindowLinkEvent.link`; an in-client link goes on to `openClientLink`). Exact rendering only:
     * the browser fallback draws the text without its links.
     */
    onLink?: (link: string) => void;
    /**
     * A Flash `auto_size="none"` field: `TextController.refreshTextImage` forces it to the box
     * its window has, so the rendered text is cut off at `layout`'s numeric `width` / `height`
     * instead of overflowing them. Exact rendering only - the browser fallback is not cropped.
     */
    clip?: boolean;
    /** The window's `overflow_replace` truncation - see `FlashTextOverflowReplace`. Exact rendering only. */
    overflowReplace?: FlashTextOverflowReplace;
} & ThemeLayoutMeta;

/** The resolved config the renderers take: the effect already folded into colour, opacity and offset. */
type TextRenderConfig = TextConfig & { x?: number; y?: number };

/** `TextStyleOptions.dropShadow` is `boolean | Partial<TextDropShadow>` (Pixi's own native
 *  `pixiText` fills in its defaults internally) - the Flash text renderer needs a complete config
 *  up front, so `true` resolves to `TEXT_DROP_SHADOW`'s defaults and a partial config is
 *  layered on top of them. */
const resolveDropShadow = (dropShadow: TextStyleOptions['dropShadow']): TextDropShadow | undefined => {
    if (!dropShadow) return undefined;

    return dropShadow === true ? TEXT_DROP_SHADOW : { ...TEXT_DROP_SHADOW, ...dropShadow };
};

/** The colour a text renders in before any effect: its own `fill`, else its style's, else the client's black default. */
const baseFill = (textStyle: TextStyleKey | undefined, textOptions: TextStyleOptions | undefined): string => {
    if (typeof textOptions?.fill === 'string') return textOptions.fill;

    const styleColor = TEXT_STYLES[textStyle ?? DEFAULT_TEXT_STYLE].color;

    return styleColor ?? '#000000';
};

/**
 * Unlike a CSS `<span>`, which naturally reports its own rendered size to its flex parent,
 * `@pixi/layout`'s Yoga integration only *positions* a `pixiText` leaf within a size
 * Yoga already computed for it (see `@pixi/layout`'s `TextMixin.computeLayoutData`, which does
 * `objectFit`/`objectPosition` math but registers no Yoga measure function); left with no
 * `layout.width`/`height` of its own, a text leaf collapses to 0x0, so a box sized only by its
 * text content (a tab button growing to fit its label, several text rows stacking in a column)
 * gets no width/height to grow around and every row overlaps at the same origin instead of
 * flowing. Measuring the text ourselves via the same synchronous canvas measurement Pixi's own
 * `Text` uses internally, and feeding that in as the leaf's own Yoga size, is what restores
 * that "size grows from content" behavior, the way a browser sizes a span.
 * A caller-supplied `layout.width`/`height` still wins per-axis (e.g. an explicit fixed-size or
 * `wordWrapWidth`-driven label) - this only fills in the axes nobody already sized.
 *
 * `objectFit: 'none'` pins the text to its own natural scale (1:1, never stretched/shrunk to
 * fill whatever box Yoga ends up assigning it - see `@pixi/layout`'s `calculateObjectFit`).
 * Without it, the default `'scale-down'` rescales the glyphs any time Yoga's computed box for
 * this leaf doesn't exactly equal our measured size to the pixel - which happens constantly
 * (flex-shrink squeezing a column of rows shorter than their content, sub-pixel rounding), and
 * reads as text randomly shrinking mid-list rather than letting overflowing text simply overflow.
 *
 * `flexShrink: 0` is the other half of that same parity gap: Yoga's default `flexShrink: 1`
 * (see `Layout.defaultStyle.shared`) has no accompanying min-content floor the way a CSS flex
 * item does (a `<span>` refuses to shrink below the size its own text demands even with
 * `flex-shrink: 1`, per the browser's implicit `min-width/height: auto`) - so a column of text
 * rows taller than its container silently compresses every row instead of overflowing it, and
 * the result is the exact same unreadable overlap `objectFit: 'none'` alone doesn't prevent
 * (a shrunk box, drawn at natural scale, just overlaps its neighbors). Pinning text to its
 * natural size on both axes is what makes it overflow a too-small container instead, matching
 * a `<span>`'s real floor.
 */
const NativeText = ({ text: source, markup, textStyle, textOptions, flashFormat, layout, verticalAlign, visible, alpha, x, y }: TextRenderConfig) => {
    // Markup the exact renderer could not take shows as its text alone.
    const text = useMemo(() => (markup ? parseFlashTextMarkup(source, DEFAULT_FLASH_TEXT_FORMAT).map(run => run.text).join('') : source), [ markup, source ]);
    // The layout's `font_face`/`bold`/`italic` vars again, in the face names Pixi's canvas text
    // knows - `fontFamily` alone would leave a `bold` var out of the fallback.
    const style = useMemo(() => getPixiTextStyle(textStyle ?? DEFAULT_TEXT_STYLE, {
        ...textOptions,
        ...browserFaceOverride(textStyle ?? DEFAULT_TEXT_STYLE, flashFaceOverride(textOptions?.fontFamily), flashFormat),
    }), [ textStyle, textOptions, flashFormat ]);
    const metrics = useMemo(() => (text?.length ? CanvasTextMetrics.measureText(text, style) : undefined), [ text, style ]);

    if (!text?.length || !metrics) return null;

    const stretchAxes = insetStretchAxes(layout);
    const objectPosition = textObjectPosition(textOptions?.align, verticalAlign);
    const label = (labelLayout: BoxLayout | undefined, nudge: boolean) => (
        <pixiText
            text={text}
            style={style}
            resolution={GetPixelRatio()}
            visible={visible}
            alpha={alpha}
            x={nudge ? x : undefined}
            y={nudge ? y : undefined}
            layout={{
                width: Math.ceil(metrics.width),
                height: Math.ceil(metrics.height),
                objectFit: 'none',
                objectPosition,
                flexShrink: 0,
                ...labelLayout,
            }}
        />
    );

    // Same leaf/inset rule as `FlashText`: a leaf keeps its intrinsic size between two
    // insets, so a container host does the spanning and the text fills it.
    if (stretchAxes.x || stretchAxes.y) {
        return (
            <pixiContainer
                eventMode="none"
                x={x}
                y={y}
                layout={layout}
            >
                {label({ objectPosition, width: stretchAxes.x ? '100%' : undefined, height: stretchAxes.y ? '100%' : undefined }, false)}
            </pixiContainer>
        );
    }

    return label(layout, true);
};

/** What `useFlashTextCanvas` needs from a text's config. */
const flashTextConfig = (textOptions: TextStyleOptions | undefined, flashFormat: FlashTextFieldOverrides | undefined, markup: boolean | undefined, overflowReplace: FlashTextOverflowReplace | undefined): FlashTextCanvasConfig => ({
    color: (typeof textOptions?.fill === 'string') ? textOptions.fill : undefined,
    fontSize: (typeof textOptions?.fontSize === 'number') ? textOptions.fontSize : undefined,
    face: flashFaceOverride(textOptions?.fontFamily),
    field: flashFormat,
    dropShadow: resolveDropShadow(textOptions?.dropShadow),
    align: (textOptions?.align === 'center' || textOptions?.align === 'right') ? textOptions.align : 'left',
    wordWrap: textOptions?.wordWrap,
    wordWrapWidth: (typeof textOptions?.wordWrapWidth === 'number') ? textOptions.wordWrapWidth : undefined,
    breakWords: textOptions?.breakWords,
    lineHeight: (typeof textOptions?.lineHeight === 'number') ? textOptions.lineHeight : undefined,
    markup,
    overflowReplace,
});

/**
 * Prefers the Flash-exact rendering of this named style (see `theme/font/flash-text`), the
 * call site's `fontFamily`/`fontSize` override folded into its format; falls back to
 * `NativeText`'s canvas text for a face the captured fonts do not have and for a string with a
 * character they do not carry, so no call site ever goes blank.
 */
const RenderedText = (props: TextRenderConfig) => {
    const { text, textStyle, textOptions, flashFormat, layout, verticalAlign, visible, alpha, x, y, markup, clip, overflowReplace, onLink } = props;
    const rendered = useFlashTextCanvas(text, resolveFlashStyle(textStyle, textOptions), flashTextConfig(textOptions, flashFormat, markup, overflowReplace));

    if (rendered) {
        return (
            <FlashText
                rendered={rendered}
                visible={visible}
                alpha={alpha}
                x={x}
                y={y}
                clipWidth={(clip && typeof layout?.width === 'number') ? layout.width : undefined}
                clipHeight={(clip && typeof layout?.height === 'number') ? layout.height : undefined}
                clip={clip}
                onLink={onLink}
                layout={{ objectPosition: textObjectPosition(textOptions?.align, verticalAlign), ...layout }}
            />
        );
    }

    return <NativeText {...props} />;
};

/**
 * A text field. Under a `dynamicStyle` host, a `dynamicRole` text takes the host's child rule
 * the way the client's `TextFieldController` did - it has its own graphic context, so the
 * rule's `ColorTransform` lands on the whole field (its colour brightened or darkened, its
 * alpha scaled) and the `offsetX`/`offsetY` nudge moves it.
 */
export const ThemeText = (props: TextConfig) => {
    const { textStyle, textOptions, alpha, dynamicRole } = props;
    const effect = useDynamicStyleEffect(dynamicRole);
    const resolved = useMemo<TextRenderConfig>(() => {
        if (!effect) return props;

        const fill = transformColor(baseFill(textStyle, textOptions), effect);
        const effectAlpha = (alpha === undefined) ? effect.alpha : (alpha * (effect.alpha ?? 1));

        return { ...props, textOptions: { ...textOptions, fill }, alpha: effectAlpha, x: effect.x, y: effect.y };
    }, [ props, effect, textStyle, textOptions, alpha ]);

    if (!props.text?.length) return null;

    return <RenderedText {...resolved} />;
};

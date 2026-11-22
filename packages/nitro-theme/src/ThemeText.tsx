import { CanvasTextMetrics, FederatedPointerEvent, fontStringFromTextStyle, Graphics, TextDropShadow, TextStyle, TextStyleOptions } from 'pixi.js';
import { useMemo } from 'react';

import { BoxLayout } from './Box';
import { useDynamicStyleEffect } from './dynamicstyle';
import { flashLinkText, FlashTextFieldOverrides, FlashTextStyleSheet } from './font/flash-text';
import { FlashText } from './font/FlashText';
import { FlashTextCanvasConfig, FlashTextOverflowReplace, useFlashTextCanvas } from './hooks/useFlashTextCanvas';
import { browserFaceOverride, DEFAULT_TEXT_STYLE, DynamicStyleRole, flashFaceOverride, getPixiTextStyle, insetStretchAxes, resolveFlashStyle, TEXT_DROP_SHADOW, TEXT_STYLES, textObjectPosition, TextStyleKey, TextVerticalAlign, ThemeLayoutMeta, transformColor } from './utils';
import { GetPixelRatio } from './utils/GetPixelRatio';
import { NATIVE_LINK, NATIVE_UNDERLINE, nativeMarkup } from './utils/nativeTextMarkup';

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
     * fallback keeps each run's bold, italic, underline, colour and size (`nativeMarkup`).
     */
    markup?: boolean;
    /** With `markup`: the field's `TextField.styleSheet` (`parseFlashStyleSheet`). Exact rendering only. */
    styleSheet?: FlashTextStyleSheet;
    /**
     * With `markup`: a click on an `<a href>`'s glyphs, and only there, calls this with the link -
     * the href, an `event:` link's without its prefix (`HTMLTextController.immediateClickHandler`'s
     * `WindowLinkEvent.link`; an in-client link goes on to `openClientLink`). The browser fallback
     * takes a click on a link's runs alike (`nativeMarkup`'s `links`).
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
    /** `TextCropper.crop` to a field this wide: cut with `...` near its right edge. Exact rendering only. */
    crop?: number;
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

/** The colour a canvas run is drawn in, as a number for its underline. */
const runColor = (style: TextStyle): number => {
    const fill = style.fill;

    if (typeof fill === 'number') return fill;
    if (typeof fill === 'string' && fill.startsWith('#')) return Number.parseInt(fill.slice(1, 7), 16);

    return 0;
};

/** A run's advance as Pixi's tagged canvas text moves its pen by it (`CanvasTextGenerator._renderTaggedTextToCanvas`). */
const runAdvance = (text: string, style: TextStyle): number => {
    const context = CanvasTextMetrics._context;

    context.font = fontStringFromTextStyle(style);

    return CanvasTextMetrics._measureText(text, style.letterSpacing, context);
};

type UnderlineRect = { x: number; y: number; width: number; color: number };
type LinkRect = { x: number; y: number; width: number; height: number; link: number };

const NO_MARKS: { underlines: UnderlineRect[]; links: LinkRect[] } = { underlines: [], links: [] };

/**
 * Where the marked runs of a tagged canvas text are: the underlined ones' lines, one pixel under
 * their baseline (Pixi draws no underline, so `NativeText` draws these over its text), and the
 * boxes of a link's runs, which take its clicks. Each run is placed as Pixi's tagged renderer places
 * it - its pen moved by each run's advance, each line by the text's `align` - so a mark stays on its glyphs.
 */
const markedRunRects = (metrics: CanvasTextMetrics, style: TextStyle): { underlines: UnderlineRect[]; links: LinkRect[] } => {
    const lines = metrics.runsByLine;

    if (!lines) return NO_MARKS;

    const rects: UnderlineRect[] = [];
    const links: LinkRect[] = [];
    const halfStroke = (style.stroke ? (style._stroke?.width ?? 0) : 0) / 2;
    let top = halfStroke;

    lines.forEach((runs, index) => {
        const lineWidth = metrics.lineWidths[index] ?? 0;
        const free = metrics.maxLineWidth - lineWidth;
        let left = halfStroke + ((style.align === 'center') ? free / 2 : (style.align === 'right') ? free : 0);
        const ascent = metrics.lineAscents?.[index] ?? metrics.fontProperties.ascent;

        const lineHeight = metrics.lineHeights?.[index] ?? metrics.lineHeight;

        for (const run of runs) {
            const width = runAdvance(run.text, run.style);
            const marks = run.style as unknown as Record<string, unknown>;

            if (marks[NATIVE_UNDERLINE]) rects.push({ x: Math.round(left), y: Math.round(top + ascent + 1), width: Math.round(width), color: runColor(run.style) });
            if (typeof marks[NATIVE_LINK] === 'number') links.push({ x: left, y: top, width, height: lineHeight, link: marks[NATIVE_LINK] });

            left += width;
        }

        top += lineHeight;
    });

    return { underlines: rects, links };
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
/** An `objectPosition`'s place as a row's flex placement: what puts a box of the text's size where the plain text's `objectPosition` puts its glyphs. */
const flexPlacement = (position: ReturnType<typeof textObjectPosition>) => {
    const [ horizontal, vertical ] = position.split(' ');
    const place = (side: string) => ((side === 'center') ? 'center' : (side === 'right' || side === 'bottom') ? 'flex-end' : 'flex-start');

    return { justifyContent: place(horizontal), alignItems: place(vertical) } as const;
};

const NativeText = ({ text: source, markup, textStyle, textOptions, flashFormat, layout, verticalAlign, visible, alpha, x, y, onLink }: TextRenderConfig) => {
    // Markup the exact renderer could not take: its runs as the canvas text's tags (`nativeMarkup`).
    const rich = useMemo(() => (markup ? nativeMarkup(source) : undefined), [ markup, source ]);
    const text = rich ? rich.text : source;
    // The layout's `font_face`/`bold`/`italic` vars again, in the face names Pixi's canvas text
    // knows - `fontFamily` alone would leave a `bold` var out of the fallback. A family none of the
    // captured faces covers (the floor plan map's `Courier`) is the very reason for falling back,
    // so it is kept rather than swapped for the style's own face.
    const style = useMemo(() => {
        const face = flashFaceOverride(textOptions?.fontFamily);
        const keepsFamily = !face && (typeof textOptions?.fontFamily === 'string');

        const base = getPixiTextStyle(textStyle ?? DEFAULT_TEXT_STYLE, {
            ...textOptions,
            ...(keepsFamily ? {} : browserFaceOverride(textStyle ?? DEFAULT_TEXT_STYLE, face, flashFormat)),
        });

        if (!rich || !Object.keys(rich.tagStyles).length) return base;

        // A style of its own: the plain one is shared through the style cache.
        const tagged = base.clone();

        tagged.tagStyles = rich.tagStyles;

        return tagged;
    }, [ textStyle, textOptions, flashFormat, rich ]);
    const metrics = useMemo(() => (text?.length ? CanvasTextMetrics.measureText(text, style) : undefined), [ text, style ]);
    const marks = useMemo(() => (metrics ? markedRunRects(metrics, style) : NO_MARKS), [ metrics, style ]);
    const underlines = marks.underlines;
    const hrefs = rich?.links;
    // As the exact renderer's: only a field with links takes the pointer, and only a link's glyphs take a click.
    const linked = !!onLink && !!hrefs && (marks.links.length > 0);

    if (!text?.length || !metrics) return null;

    const linkAt = (event: FederatedPointerEvent) => {
        const point = event.getLocalPosition(event.currentTarget);
        const hit = marks.links.find(rect => point.x >= rect.x && point.x < rect.x + rect.width && point.y >= rect.y && point.y < rect.y + rect.height);

        return hit ? hrefs?.[hit.link] : undefined;
    };
    const onLinkTap = (event: FederatedPointerEvent) => {
        const href = linkAt(event);

        if (href === undefined) return;

        event.stopPropagation();
        onLink?.(flashLinkText(href));
    };
    const onLinkHover = (event: FederatedPointerEvent) => {
        event.currentTarget.cursor = (linkAt(event) === undefined) ? 'default' : 'pointer';
    };
    const linkEvents = linked ? { eventMode: 'static' as const, onPointerTap: onLinkTap, onPointerMove: onLinkHover } : {};

    const stretchAxes = insetStretchAxes(layout);
    const objectPosition = textObjectPosition(textOptions?.align, verticalAlign);
    const label = (labelLayout: BoxLayout | undefined, nudge: boolean) => ((underlines.length || linked)
        ? (
                // The text and its marks at the text's own size, placed in a box the caller sized (a
                // paragraph's width) by the text's `align`, as the plain text's `objectPosition` places it.
                <pixiContainer
                    eventMode={linked ? 'passive' : 'none'}
                    visible={visible}
                    alpha={alpha}
                    x={nudge ? x : undefined}
                    y={nudge ? y : undefined}
                    layout={{ width: Math.ceil(metrics.width), height: Math.ceil(metrics.height), flexShrink: 0, ...labelLayout, flexDirection: 'row', ...flexPlacement(objectPosition) }}
                >
                    <pixiContainer
                        eventMode={linked ? 'passive' : 'none'}
                        layout={{ width: Math.ceil(metrics.width), height: Math.ceil(metrics.height), flexShrink: 0 }}
                    >
                        <pixiText
                            text={text}
                            style={style}
                            resolution={GetPixelRatio()}
                            {...linkEvents}
                            layout={{ position: 'absolute', left: 0, top: 0, width: Math.ceil(metrics.width), height: Math.ceil(metrics.height), objectFit: 'none', objectPosition: 'left top' }}
                        />
                        {/* No layout of its own: a laid-out leaf is moved so its bounds start at its box, which would put every line at x 0. */}
                        <pixiGraphics
                            eventMode="none"
                            draw={(g: Graphics) => {
                                g.clear();

                                for (const line of underlines) g.rect(line.x, line.y, line.width, 1).fill(line.color);
                            }}
                        />
                    </pixiContainer>
                </pixiContainer>
            )
        : (
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
            ));

    // Same leaf/inset rule as `FlashText`: a leaf keeps its intrinsic size between two
    // insets, so a container host does the spanning and the text fills it.
    if (stretchAxes.x || stretchAxes.y) {
        return (
            <pixiContainer
                eventMode={linked ? 'passive' : 'none'}
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
const flashTextConfig = (textOptions: TextStyleOptions | undefined, flashFormat: FlashTextFieldOverrides | undefined, markup: boolean | undefined, styleSheet: FlashTextStyleSheet | undefined, overflowReplace: FlashTextOverflowReplace | undefined, crop: number | undefined): FlashTextCanvasConfig => ({
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
    styleSheet,
    overflowReplace,
    crop,
});

/**
 * Prefers the Flash-exact rendering of this named style (see `theme/font/flash-text`), the
 * call site's `fontFamily`/`fontSize` override folded into its format; falls back to
 * `NativeText`'s canvas text for a face the captured fonts do not have and for a string with a
 * character they do not carry, so no call site ever goes blank.
 */
const RenderedText = (props: TextRenderConfig) => {
    const { text, textStyle, textOptions, flashFormat, layout, verticalAlign, visible, alpha, x, y, markup, styleSheet, clip, overflowReplace, crop, onLink } = props;
    const rendered = useFlashTextCanvas(text, resolveFlashStyle(textStyle, textOptions), flashTextConfig(textOptions, flashFormat, markup, styleSheet, overflowReplace, crop));

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
                clipAlign={(textOptions?.align === 'center' || textOptions?.align === 'right') ? textOptions.align : undefined}
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

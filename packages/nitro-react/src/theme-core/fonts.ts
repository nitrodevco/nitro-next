/** Every `font-family` declared in `fonts.css`, kept in sync with it by hand (there's no way to
 *  introspect `@font-face` rules from a stylesheet at runtime without walking `document.styleSheets`,
 *  which is more fragile than a literal list here). */
const FONT_FAMILIES = [
    'Ubuntu', 'GameUbuntu', 'Goldfish', 'GoldfishBold',
    'UbuntuItalics', 'UbuntuItalicsBold', 'UbuntuBold', 'UbuntuMedium',
];

/**
 * A bare `@font-face` rule only makes the browser fetch that font once something actually
 * renders text with it - a DOM element with a matching `font-family` triggers this naturally,
 * but Pixi's canvas-based text (`Text.tsx`'s `TextPixi`, and the `CanvasTextMetrics.measureText`
 * call used to size its Yoga box) draws to an offscreen canvas via the Canvas2D API, which does
 * *not* block on or await a still-loading web font - it silently substitutes the browser's
 * default font for that one draw, then never redraws once the real font finishes loading (unlike
 * a DOM `<span>`, which reflows automatically when its `@font-face` swaps in). The result: text
 * in Pixi mode gets stuck permanently rendered (and measured, since the same substitution affects
 * `CanvasTextMetrics` too) in the wrong typeface whenever the real font hadn't finished loading
 * yet at that first draw - a race that `document.fonts.ready` alone doesn't close, since nothing
 * has actually *requested* any of these fonts before Pixi's first draw triggers it.
 *
 * Explicitly loading every themed font up front - and awaiting that alongside `.ready` before
 * mounting anything - closes the race: every font is already resolved by the time either render
 * target's first paint asks for it.
 */
export const loadThemeFonts = (): Promise<unknown> => Promise.all(
    FONT_FAMILIES.map(family => document.fonts.load(`10px "${family}"`)),
);

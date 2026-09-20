import { Composite, CompositeLayerPieceProps, CompositePiece, NineSlice } from '../layer';
import { ThemeWithStatesVariant } from '.';

export type ButtonVariant = ThemeWithStatesVariant;

/*
 * The illumina button (style 100) as the client's `illumina_light_skin_button` skin assembles
 * it, on a 50x50 layout:
 *
 * - `glow_*`: a 19/12/19 nine-slice covering the whole box, `colorize="true"` (it takes the
 *   button's tint). The default state's glow entities are 1x1 transparent regions - there is
 *   no glow until the button is hovered; the hovering and pressed states both cut the same
 *   50x50 glow (`100-hovering.png`), which is why there is no `100-pressed` glow sheet.
 * - `button_*`: the face - a 6/1/4 x 8/12/8 nine-slice (`100-<state>-button-*.png`) inset 11px
 *   inside the glow, `colorize="false"` (never tinted). The default and hovering states share
 *   the default face; pressed has its own darker cut.
 * - `button_center_left_curve` / `..._right_curve`: 3x5 decorations at x 12 from either side,
 *   vertically centred (`vertical="center"`), on the default/hovering face only - the pressed
 *   template maps them to 1x1 transparent regions.
 */
const illuminaButtonFace = (state: 'default' | 'pressed'): CompositeLayerPieceProps[] => {
    const prefix = `button-100-${state}-button`;

    return [
        CompositePiece(`${prefix}-top-left-src`, 11, 11, undefined, undefined, 6, 8),
        CompositePiece(`${prefix}-top-center-src`, 11, 17, 15, undefined, undefined, 8),
        CompositePiece(`${prefix}-top-right-src`, 11, undefined, 11, undefined, 4, 8),
        CompositePiece(`${prefix}-center-left-src`, 19, 11, undefined, 19, 6),
        CompositePiece(`${prefix}-center-center-src`, 19, 17, 15, 19),
        CompositePiece(`${prefix}-center-right-src`, 19, undefined, 11, 19, 4),
        CompositePiece(`${prefix}-bottom-left-src`, undefined, 11, undefined, 11, 6, 8),
        CompositePiece(`${prefix}-bottom-center-src`, undefined, 17, 15, 11, undefined, 8),
        CompositePiece(`${prefix}-bottom-right-src`, undefined, undefined, 11, 11, 4, 8),
    ];
};

/**
 * The `button_center_*_curve` patches every illumina button skin puts on its left and right edges
 * at `inset` from either, carrying the face's light-to-dark transition down the outer edge. They
 * are `vertical="center"`: the client places them halfway up the *rendered* button, not where
 * their layout rect sits, which is a placement a nine-sliced sheet cannot hold at more than one
 * height. So they are cut as pieces (`extract-skin-assets.ts`'s `exclude`) and centred here.
 * Baked at the layout rect, the segmented picker's patch landed on the rounded bottom corner and
 * squared it off - the same `#e2e2e2` as the face, so invisible on an unselected segment and a
 * hard block on the tinted one. The pressed templates map the patches to 1x1 transparent regions,
 * so the pressed pieces draw nothing, exactly as Flash does.
 */
const illuminaButtonCurves = (prefix: string, state: string, inset: number): CompositeLayerPieceProps[] => [
    CompositePiece(`${prefix}-${state}-button-center-left-curve-src`, undefined, inset, undefined, undefined, 3, 5, 'center'),
    CompositePiece(`${prefix}-${state}-button-center-right-curve-src`, undefined, undefined, inset, undefined, 3, 5, 'center'),
];

/** The tinted hover/press glow around the face (`100-hovering.png`, the only glow sheet the skin has). */
const BUTTON_100_GLOW = NineSlice('button-100-hovering-src', 19, 19, 19, 19);

const BUTTON_100_DEFAULT_OVERLAY = Composite([ ...illuminaButtonFace('default'), ...illuminaButtonCurves('button-100', 'default', 12) ]);
const BUTTON_100_PRESSED_OVERLAY = Composite(illuminaButtonFace('pressed'));

/**
 * `illumina_light_skin_button_unetched` (style 103) is the one plain illumina button with no job
 * of its own - its art is a hand-cut 11x28 strip - so it borrows style 100's curve pieces, which
 * are the same 3x5 art. Every other plain button draws its own (`buttonPlainVariant`'s `prefix`).
 */
const BUTTON_CURVE_OVERLAY = Composite(illuminaButtonCurves('button-100', 'default', 1));
const BUTTON_CURVE_PRESSED_OVERLAY = Composite([]);

export const classicButtonVariant = (prefix: string, textColor?: string): ThemeWithStatesVariant => ({
    states: {
        default: NineSlice(`${prefix}-default-src`, 3, 3, 3, 3),
        hovering: NineSlice(`${prefix}-hovering-src`, 3, 3, 3, 3),
        pressed: NineSlice(`${prefix}-pressed-src`, 3, 3, 3, 3),
        disabled: NineSlice(`${prefix}-disabled-src`, 3, 3, 3, 3),
    },
    textStyle: 'text-style-button-regular',
    textColor,
});

export const shinyButtonVariant = (prefix: string, textColor?: string): ThemeWithStatesVariant => ({
    states: {
        default: NineSlice(`${prefix}-default-src`, 5, 5, 5, 5),
        hovering: NineSlice(`${prefix}-hovering-src`, 5, 5, 5, 5),
        pressed: NineSlice(`${prefix}-pressed-src`, 5, 5, 5, 5),
        disabled: NineSlice(`${prefix}-disabled-src`, 5, 5, 5, 5),
    },
    textStyle: 'text-style-button-shiny-regular',
    textColor,
});

export const roundedButtonVariant = (prefix: string, textColor?: string): ThemeWithStatesVariant => ({
    states: {
        default: NineSlice(`${prefix}-default-src`, 6, 6, 6, 7),
        hovering: NineSlice(`${prefix}-hovering-src`, 6, 6, 6, 7),
        pressed: NineSlice(`${prefix}-pressed-src`, 6, 6, 6, 7),
        disabled: NineSlice(`${prefix}-disabled-src`, 6, 6, 6, 7),
    },
    textStyle: 'text-style-button-shiny-regular',
    textColor,
});

/**
 * A plain (non-glowing) illumina button: the face as a 6/8/4/8 nine-slice with the side curves
 * centred over it. `ownCurves` draws the skin's own curve pieces per state; only style 103, whose
 * art is hand-cut and has no pieces, falls back to style 100's.
 */
export const buttonPlainVariant = (prefix: string, hasHover: boolean, textColor?: string, ownCurves = false): ButtonVariant => ({
    states: {
        default: NineSlice(`${prefix}-default-src`, 6, 8, 4, 8),
        ...(hasHover && { hovering: NineSlice(`${prefix}-hovering-src`, 6, 8, 4, 8) }),
        pressed: NineSlice(`${prefix}-pressed-src`, 6, 8, 4, 8),
    },
    overlays: ownCurves
        ? {
                default: Composite(illuminaButtonCurves(prefix, 'default', 1)),
                ...(hasHover && { hovering: Composite(illuminaButtonCurves(prefix, 'hovering', 1)) }),
                pressed: Composite(illuminaButtonCurves(prefix, 'pressed', 1)),
            }
        : { default: BUTTON_CURVE_OVERLAY, pressed: BUTTON_CURVE_PRESSED_OVERLAY },
    textStyle: 'text-style-il-button',
    textColor,
});

/**
 * `illumina_light_skin_button_plain` (button / container_button style 102). Its face is the
 * 6/8/4/8 nine-slice; over it, untinted and at their own size, the two `*_curve` decorations the
 * layout centres vertically and the three `button_etching_*` pieces the layout pins to the bottom
 * edge. The etch is `colorize="false"` - a white line at alpha 196 that softens the lower corners
 * - and flattening it into the sheet gave every stepper and dialog button a hard white rim.
 * The pressed template maps the curves to 1x1 transparent regions, as Flash does.
 */
const illuminaPlainButtonOverlay = (state: 'default' | 'pressed') => Composite([
    ...illuminaButtonCurves('button-102', state, 1),
    CompositePiece(`button-102-${state}-button-etching-left-src`, undefined, 0, undefined, 0, 6, 5),
    CompositePiece(`button-102-${state}-button-etching-center-src`, undefined, 6, 4, 0, undefined, 5),
    CompositePiece(`button-102-${state}-button-etching-right-src`, undefined, undefined, 0, 0, 4, 5),
]);

export const BUTTON_102_VARIANT: ButtonVariant = {
    states: {
        default: NineSlice('button-102-default-src', 6, 8, 4, 8),
        pressed: NineSlice('button-102-pressed-src', 6, 8, 4, 8),
    },
    overlays: { default: illuminaPlainButtonOverlay('default'), pressed: illuminaPlainButtonOverlay('pressed') },
    textStyle: 'text-style-il-button',
};

export const BUTTON_100_VARIANT: ButtonVariant = {
    // The glow is the (tinted) state layer; the face and curves are the (untinted) overlay.
    states: {
        default: Composite([]),
        hovering: BUTTON_100_GLOW,
        pressed: BUTTON_100_GLOW,
    },
    overlays: { default: BUTTON_100_DEFAULT_OVERLAY, pressed: BUTTON_100_PRESSED_OVERLAY },
    textStyle: 'text-style-il-button',
};

/**
 * `illumina_purple_skin_button` - the same shape as the light button (style 100): a colorizing
 * 19/19/19/19 glow with the face inset 11px inside it, all of it `colorize="false"`, drawn as the
 * untinted `-plain` sheet over the tinted glow. Its two side curves ride in that sheet rather
 * than being pieces: they are untintable, so nothing can bleed through them, and an overlay is
 * one layer - a nine-sliced face and centred pieces cannot share it. See the job's
 * `centeredInSheet` for what that approximates.
 */
export const BUTTON_104_VARIANT: ButtonVariant = {
    states: {
        default: NineSlice('button-104-default-src', 19, 19, 19, 19),
        hovering: NineSlice('button-104-hovering-src', 19, 19, 19, 19),
        pressed: NineSlice('button-104-pressed-src', 19, 19, 19, 19),
    },
    overlays: {
        default: NineSlice('button-104-default-plain-src', 19, 19, 19, 19),
        hovering: NineSlice('button-104-hovering-plain-src', 19, 19, 19, 19),
        pressed: NineSlice('button-104-pressed-plain-src', 19, 19, 19, 19),
    },
    textStyle: 'text-style-il-button-white',
};

/** `illumina_purple_skin_button_plain`: every entity is `colorize="false"`, so nothing tints it. */
export const BUTTON_105_VARIANT: ButtonVariant = { ...buttonPlainVariant('button-105', true, undefined, true), colorize: false };
export const BUTTON_106_VARIANT = buttonPlainVariant('button-106', true, undefined, true);

/** `illumina_dark_skin_button`: the skin defines only its default state, and never colorizes. */
export const BUTTON_200_VARIANT: ButtonVariant = {
    states: {
        default: NineSlice('button-200-default-src', 4, 4, 4, 5),
    },
    colorize: false,
    textStyle: 'text-style-id-button',
};

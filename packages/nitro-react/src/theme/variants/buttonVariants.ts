import { Composite, CompositeLayerPieceProps, CompositePiece, NineSlice } from '../layer';
import { ThemeBase, ThemeWithStatesVariant } from '../utils';

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

/** The side curves at `inset` from either edge, vertically centred. */
const illuminaButtonCurves = (inset: number): CompositeLayerPieceProps[] => [
    CompositePiece('button-100-default-button-center-left-curve-src', undefined, inset, undefined, undefined, 3, 5, 'center'),
    CompositePiece('button-100-default-button-center-right-curve-src', undefined, undefined, inset, undefined, 3, 5, 'center'),
];

/** The tinted hover/press glow around the face (`100-hovering.png`, the only glow sheet the skin has). */
const BUTTON_100_GLOW = NineSlice('button-100-hovering-src', 19, 19, 19, 19);

const BUTTON_100_DEFAULT_OVERLAY = Composite([ ...illuminaButtonFace('default'), ...illuminaButtonCurves(12) ]);
const BUTTON_100_PRESSED_OVERLAY = Composite(illuminaButtonFace('pressed'));

/** The plain (non-glowing) illumina buttons draw their face as a nine-slice and only add the curves. */
const BUTTON_CURVE_OVERLAY = Composite(illuminaButtonCurves(1));
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

export const shinyButtonBoldVariant = (prefix: string, textColor?: string): ThemeWithStatesVariant => ({
    ...makeTextStyleBold(shinyButtonVariant(prefix, textColor)),
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

export const buttonPlainVariant = (prefix: string, hasHover: boolean, textColor?: string): ButtonVariant => ({
    states: {
        default: NineSlice(`${prefix}-default-src`, 6, 8, 4, 8),
        ...(hasHover && { hovering: NineSlice(`${prefix}-hovering-src`, 6, 8, 4, 8) }),
        pressed: NineSlice(`${prefix}-pressed-src`, 6, 8, 4, 8),
    },
    overlays: { default: BUTTON_CURVE_OVERLAY, pressed: BUTTON_CURVE_PRESSED_OVERLAY },
    layout: {
        paddingLeft: 13, paddingTop: 3, paddingRight: 13, paddingBottom: 3,
        minWidth: 28, minHeight: 28,
    },
    textStyle: 'text-style-il-button',
    textColor,
});

export const makeTextStyleBold = <T extends ThemeBase>(variant: T): T => {
    let textStyle = variant.textStyle as string;

    if (textStyle?.length) {
        if (textStyle.endsWith('-regular')) textStyle.replace('-regular', '-bold');
        else textStyle = `${textStyle}-bold`;
    }

    return { ...variant, textStyle };
};

export const withoutLayout = <T extends ThemeBase>({ layout: _layout, ...variant }: T): T => ({ ...variant }) as T;

export const BUTTON_100_VARIANT: ButtonVariant = {
    // The glow is the (tinted) state layer; the face and curves are the (untinted) overlay.
    states: {
        default: Composite([]),
        hovering: BUTTON_100_GLOW,
        pressed: BUTTON_100_GLOW,
    },
    overlays: { default: BUTTON_100_DEFAULT_OVERLAY, pressed: BUTTON_100_PRESSED_OVERLAY },
    layout: {
        paddingLeft: 24, paddingTop: 14, paddingRight: 24, paddingBottom: 14,
        minWidth: 48, minHeight: 48,
    },
    textStyle: 'text-style-il-button',
};

export const BUTTON_104_VARIANT: ButtonVariant = {
    states: {
        default: NineSlice('button-104-default-src', 19, 19, 19, 19),
        hovering: NineSlice('button-104-hovering-src', 19, 19, 19, 19),
        pressed: NineSlice('button-104-pressed-src', 19, 19, 19, 19),
    },
    layout: {
        paddingLeft: 24, paddingTop: 14, paddingRight: 24, paddingBottom: 14,
        minWidth: 48, minHeight: 48,
    },
    textStyle: 'text-style-il-button', textColor: '#ffffff',
};

export const BUTTON_105_VARIANT = buttonPlainVariant('button-105', true);
export const BUTTON_106_VARIANT = buttonPlainVariant('button-106', true);

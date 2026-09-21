import { InteractionState } from '../hooks/useInteractionState';

/**
 * Port of the client's `com.sulake.core.window.dynamicstyle` - the hover/press effects a layout
 * names through `dynamic_style="..."`, all five of them, transcribed from
 * `DynamicStyleManager.fillStyleTable()` (and matching `flash-js`'s `DynamicStyleManager.js`):
 * `lifted_hover` (toolbar icons, friend bar buttons), `brightness_and_shadow_under` (room tool
 * buttons), `brightness_and_shadow_under_gentle`, `reward_track_item` and `button`.
 *
 * A style is a rule per window state for the host window itself, plus rules for children
 * tagged `#icon` / `#bg`. `WindowController` picks the state (disabled > pressed > hovering >
 * default), applies the host rule to itself, then walks every descendant and applies the
 * matching child rule to each tagged one. A rule nudges the window (`offsetX`/`offsetY` are
 * added to its position), multiplies/offsets its colours (`colorTransform`, the
 * `flash.geom.ColorTransform` constructor order) and, for bitmaps, draws an *etching* - a
 * solid-colour copy of the bitmap at `etchingPoint` underneath it, `etchingColor` being ARGB
 * so its top byte is the copy's opacity (`BitmapDataRenderer.draw`).
 *
 * Every `DynamicStyle` starts with a disabled rule of alpha 0.5 (`DynamicStyle`'s constructor),
 * and an unknown style name, or a tagged child under a style that has no rule for its tag,
 * resolves to that bare default - so a disabled dynamic-style host always fades.
 */
/**
 * The `dynamic_style="..."` names the client's `DynamicStyleManager` knows - `DynamicStyle`'s
 * `STYLE_LIFTED_HOVER`, `BRIGHTNESS_AND_SHADOW_UNDER`, `BRIGHTNESS_AND_SHADOW_UNDER_GENTLE`,
 * `REWARD_TRACK_ITEM` and `BUTTON` (obfuscated `§_-N1X§` in the AS3).
 */
export type DynamicStyleName = 'lifted_hover' | 'brightness_and_shadow_under' | 'brightness_and_shadow_under_gentle' | 'reward_track_item' | 'button';

/** The child tags a style has rules for (`#icon` / `#bg`). */
export type DynamicStyleRole = 'icon' | 'bg';

export interface DynamicStyleRule {
    offsetX?: number;
    offsetY?: number;
    /** `ColorTransform(rM, gM, bM, aM, rO, gO, bO, aO)`. */
    colorTransform?: readonly [ number, number, number, number, number, number, number, number ];
    /** ARGB. */
    etchingColor?: number;
    etchingPoint?: readonly [ number, number ];
}

type DynamicStyleRules = Partial<Record<InteractionState, DynamicStyleRule>>;

interface DynamicStyleDefinition {
    host: DynamicStyleRules;
    children: Partial<Record<DynamicStyleRole, DynamicStyleRules>>;
}

const EMPTY_RULE: DynamicStyleRule = {};
/** `DynamicStyle`'s constructor default for `disabledStyles` - the same in the AS3 and `flash-js`. */
const DISABLED_RULE: DynamicStyleRule = { colorTransform: [ 1, 1, 1, 0.5, 0, 0, 0, 0 ] };

const LIFTED_HOVER: DynamicStyleDefinition = {
    host: {
        pressed: { offsetX: 1, colorTransform: [ 1, 0.7, 0.7, 0.7, 0, 0, 0, 0 ] },
        hovering: { offsetY: -1, offsetX: -1 },
    },
    children: {
        icon: {
            default: { etchingColor: 0x48000000, etchingPoint: [ 1, 1 ] },
            hovering: { etchingColor: 0x80000000, etchingPoint: [ 2, 2 ] },
            pressed: { etchingColor: 0x48000000, etchingPoint: [ -1, -1 ] },
        },
    },
};

const BRIGHTNESS_AND_SHADOW_UNDER: DynamicStyleDefinition = {
    host: {},
    children: {
        icon: {
            default: { etchingColor: 0x48000000, etchingPoint: [ 0, 1 ] },
            pressed: { etchingColor: 0x80000000, etchingPoint: [ 0, -1 ], offsetY: 1, colorTransform: [ 0.7, 0.7, 0.7, 1, 0, 0, 0, 0 ] },
            hovering: { etchingColor: 0x48000000, etchingPoint: [ 0, 1 ], colorTransform: [ 1, 1, 1, 1, 77, 77, 77, 0 ] },
        },
        bg: {
            default: { etchingColor: 0x48000000, etchingPoint: [ 0, 1 ] },
            pressed: { etchingColor: 0x80000000, etchingPoint: [ 0, 0 ], colorTransform: [ 0.9, 0.9, 0.9, 1, 0, 0, 0, 0 ] },
            hovering: { etchingColor: 0x48000000, etchingPoint: [ 0, 1 ], colorTransform: [ 1, 1, 1, 1, 77, 77, 77, 0 ] },
            disabled: { colorTransform: [ 0.5, 0.5, 0.5, 0.7, 0, 0, 0, 0 ] },
        },
    },
};

const BRIGHTNESS_AND_SHADOW_UNDER_GENTLE: DynamicStyleDefinition = {
    host: {},
    children: {
        icon: {
            default: { etchingColor: 0x48000000, etchingPoint: [ 0, 1 ] },
            pressed: { etchingColor: 0x80000000, etchingPoint: [ 0, -1 ], offsetY: 1, colorTransform: [ 0.8, 0.8, 0.8, 1, 0, 0, 0, 0 ] },
            hovering: { etchingColor: 0x48000000, etchingPoint: [ 0, 1 ], colorTransform: [ 1.1, 1.1, 1.1, 1, 30, 30, 30, 0 ] },
        },
    },
};

const REWARD_TRACK_ITEM: DynamicStyleDefinition = {
    host: {},
    children: {
        icon: {
            default: { etchingColor: 0x48000000, etchingPoint: [ 0, 1 ] },
            pressed: { etchingColor: 0x80000000, etchingPoint: [ 0, -1 ], offsetY: 1, colorTransform: [ 0.8, 0.8, 0.8, 1, 0, 0, 0, 0 ] },
            hovering: { etchingColor: 0x48000000, etchingPoint: [ 0, 1 ], colorTransform: [ 1.1, 1.1, 1.1, 1, 15, 15, 15, 0 ] },
            disabled: { colorTransform: [ 0.75, 0.75, 0.75, 0.8, 0, 0, 0, 0 ] },
        },
    },
};

/** The etching sits exactly under the icon (`[0, 0]`), so it only shows where the art is translucent. */
const BUTTON: DynamicStyleDefinition = {
    host: {},
    children: {
        icon: {
            default: { etchingColor: 0x48000000, etchingPoint: [ 0, 0 ] },
            pressed: { etchingColor: 0x80000000, etchingPoint: [ 0, 0 ], offsetY: 1, colorTransform: [ 0.8, 0.8, 0.8, 1, 0, 0, 0, 0 ] },
            hovering: { etchingColor: 0x48000000, etchingPoint: [ 0, 0 ], colorTransform: [ 1.1, 1.1, 1.1, 1, 15, 15, 15, 0 ] },
        },
    },
};

export const DYNAMIC_STYLES: Record<DynamicStyleName, DynamicStyleDefinition> = {
    lifted_hover: LIFTED_HOVER,
    brightness_and_shadow_under: BRIGHTNESS_AND_SHADOW_UNDER,
    brightness_and_shadow_under_gentle: BRIGHTNESS_AND_SHADOW_UNDER_GENTLE,
    reward_track_item: REWARD_TRACK_ITEM,
    button: BUTTON,
};

/** `DynamicStyle.getStyleByWindowState` for the host (`role` undefined) or a tagged child. */
export const resolveDynamicStyleRule = (name: DynamicStyleName, role: DynamicStyleRole | undefined, state: InteractionState): DynamicStyleRule => {
    const definition = DYNAMIC_STYLES[name] as DynamicStyleDefinition | undefined;
    const rules = role ? definition?.children[role] : definition?.host;

    if (state === 'disabled') return rules?.disabled ?? DISABLED_RULE;

    return rules?.[state] ?? EMPTY_RULE;
};

/**
 * A rule as render terms: the position nudge, the colour multipliers as a `tint`, the alpha
 * multiplier, a flat additive brightening (the `+77` channel offsets, as a fraction of white)
 * and the etching's colour, opacity and offset.
 *
 * A multiply tint can only darken, and the `_gentle` / `reward_track_item` / `button` hovers
 * multiply by 1.1. `in * m` is `in + in * (m - 1)`, so the part above 1 is `amplify`: the art
 * drawn again over itself, additively, at that opacity. That is exact, where folding it into the
 * tint would either drop the brightening (clamped) or spill into the next channel (unclamped).
 */
export interface DynamicStyleEffect {
    x: number;
    y: number;
    tint?: string;
    alpha?: number;
    brighten?: number;
    amplify?: number;
    etching?: { color: string; alpha: number; x: number; y: number };
}

const byte = (value: number): number => Math.max(0, Math.min(255, Math.round(value)));
const toHex = (r: number, g: number, b: number): string => `#${((byte(r) << 16) | (byte(g) << 8) | byte(b)).toString(16).padStart(6, '0')}`;

export const dynamicStyleEffect = (rule: DynamicStyleRule): DynamicStyleEffect => {
    const effect: DynamicStyleEffect = { x: rule.offsetX ?? 0, y: rule.offsetY ?? 0 };
    const transform = rule.colorTransform;

    if (transform) {
        const [ rM, gM, bM, aM, rO, gO, bO ] = transform;
        // Up to 1 a channel multiplies through the tint; above 1 the excess is `amplify`, one
        // factor for all three - the client's own tables only ever scale the channels together.
        const amplify = Math.max(rM, gM, bM) - 1;
        const scale = (amplify > 0) ? 1 + amplify : 1;

        if (rM !== scale || gM !== scale || bM !== scale) effect.tint = toHex((rM / scale) * 255, (gM / scale) * 255, (bM / scale) * 255);
        if (amplify > 0) effect.amplify = amplify;
        if (aM !== 1) effect.alpha = aM;

        const offset = (rO + gO + bO) / 3;

        if (offset > 0) effect.brighten = Math.min(1, offset / 255);
    }

    const etchingAlpha = rule.etchingColor === undefined ? 0 : ((rule.etchingColor >>> 24) & 0xff) / 255;

    if (etchingAlpha > 0 && rule.etchingPoint) {
        const rgb = (rule.etchingColor ?? 0) & 0xffffff;

        effect.etching = { color: `#${rgb.toString(16).padStart(6, '0')}`, alpha: etchingAlpha, x: rule.etchingPoint[0], y: rule.etchingPoint[1] };
    }

    return effect;
};

/** Parses `#rgb` / `#rrggbb` into 0..255 channels (white for anything unparsable). */
const parseHex = (color: string): [ number, number, number ] => {
    let hex = color.trim().replace(/^#/, '');

    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');

    const value = Number.parseInt(hex, 16);

    if (Number.isNaN(value)) return [ 255, 255, 255 ];

    return [ (value >> 16) & 0xff, (value >> 8) & 0xff, value & 0xff ];
};

/** Two multiply tints stacked (`undefined` = white). */
export const multiplyTints = (a: string | undefined, b: string | undefined): string | undefined => {
    if (!a) return b;
    if (!b) return a;

    const [ ar, ag, ab ] = parseHex(a);
    const [ br, bg, bb ] = parseHex(b);

    return toHex((ar * br) / 255, (ag * bg) / 255, (ab * bb) / 255);
};

/** Two alpha multipliers stacked (`undefined` = 1); `undefined` when neither is set. */
export const multiplyAlphas = (a: number | undefined, b: number | undefined): number | undefined => {
    if (a === undefined) return b;
    if (b === undefined) return a;

    return a * b;
};

/** A colour through an effect's `ColorTransform` - multiplied by `tint`, then `brighten` of white added, clamped (what the client's transform does to a text colour). */
export const transformColor = (color: string, effect: DynamicStyleEffect | undefined): string => {
    if (!effect || (!effect.tint && !effect.brighten && !effect.amplify)) return color;

    const [ r, g, b ] = parseHex(color);
    const [ tr, tg, tb ] = effect.tint ? parseHex(effect.tint) : [ 255, 255, 255 ];
    const add = (effect.brighten ?? 0) * 255;
    const scale = 1 + (effect.amplify ?? 0);
    const channel = (value: number, mul: number): number => Math.min(255, (((value * mul) / 255) * scale) + add);

    return toHex(channel(r, tr), channel(g, tg), channel(b, tb));
};

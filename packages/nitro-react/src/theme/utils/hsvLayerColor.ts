/**
 * Port of the client's `com.sulake.core.window.graphics.renderer.HsvLayerColor`: the tint a
 * `colorizeMethod="hsv_layer"` skin piece is multiplied by is *derived* from the window colour
 * per layer - a grey tint simply loses `shade` of its value; a coloured tint gains `shade` of
 * saturation and loses half of `shade` in value. Pre-darkening the artwork instead (a plain
 * multiply) only matches for a white tint, which is why tinted recolourable borders looked
 * lighter than the SWF.
 */

const clamp01 = (value: number): number => (Number.isNaN(value) || value < 0) ? 0 : (value > 1 ? 1 : value);

const rgbToHsv = (r: number, g: number, b: number): { h: number; s: number; v: number } => {
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;
    const s = (max === 0) ? 0 : (delta / max);
    let h = 0;

    if (delta !== 0) {
        if (max === r) {
            h = (g - b) / delta;

            if (g < b) h += 6;
        } else if (max === g) {
            h = ((b - r) / delta) + 2;
        } else {
            h = ((r - g) / delta) + 4;
        }

        h /= 6;
    }

    return { h, s, v: max };
};

const hsvToRgb = (h: number, s: number, v: number): [ number, number, number ] => {
    h -= Math.floor(h);

    if (s === 0) return [ v, v, v ];

    const sector = h * 6;
    const index = Math.floor(sector);
    const fraction = sector - index;
    const p = v * (1 - s);
    const q = v * (1 - (s * fraction));
    const t = v * (1 - (s * (1 - fraction)));

    switch (index % 6) {
        case 0: return [ v, t, p ];
        case 1: return [ q, v, p ];
        case 2: return [ p, v, t ];
        case 3: return [ p, q, v ];
        case 4: return [ t, p, v ];
        default: return [ v, p, q ];
    }
};

const toByte = (value: number): number => Math.round(clamp01(value) * 255);

/** Parses `#rgb` / `#rrggbb` (the theme's tint strings) into 0..1 channels. */
const parseHexColor = (color: string): [ number, number, number ] => {
    let hex = color.trim().replace(/^#/, '');

    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');

    const value = Number.parseInt(hex, 16);

    if (Number.isNaN(value)) return [ 1, 1, 1 ];

    return [ ((value >> 16) & 0xff) / 255, ((value >> 8) & 0xff) / 255, (value & 0xff) / 255 ];
};

/** `HsvLayerColor.deriveColor`: the multiply tint for one shade layer of a recolourable skin, as a CSS hex colour. */
export const deriveHsvLayerColor = (color: string | undefined, shade: number): string => {
    const [ r, g, b ] = parseHexColor(color ?? '#ffffff');
    const hsv = rgbToHsv(r, g, b);

    if (Number.isNaN(shade)) shade = 0;

    if (hsv.s === 0) {
        hsv.v -= shade;
    } else {
        hsv.s = clamp01(hsv.s + shade);
        hsv.v = clamp01(hsv.v - (shade / 2));
    }

    const [ outR, outG, outB ] = hsvToRgb(hsv.h, hsv.s, hsv.v);

    return `#${((toByte(outR) << 16) | (toByte(outG) << 8) | toByte(outB)).toString(16).padStart(6, '0')}`;
};

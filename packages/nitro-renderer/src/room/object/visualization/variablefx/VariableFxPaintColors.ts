import { resolveRgbFromHueSection } from './rendering/VariableFxColorUtils';

export interface VariableFxPaintColor {
    typeName: string;
    rgb: number;
    isMetallic: boolean;
    /** Set for DYNAMIC_RED_TO_GREEN: which of the three bands `rgb` belongs to (0 red, 1 yellow, 2 green). */
    dynamicBandIndex?: number;
    /** Set for the delegated/levelling colours: the colour changes without a fade. */
    snapTransition?: boolean;
}

const DYNAMIC_LEVELLING_START_HUE = 115;
const DYNAMIC_LEVELLING_END_HUE = 360;
const DYNAMIC_LEVELLING_SATURATION = 0.85;
const DYNAMIC_LEVELLING_VALUE = 0.8;
const DYNAMIC_RED_TO_GREEN_BAND_RGBS = [ 15672088, 16554256, 904478 ];

const color = (typeName: string, rgb: number, isMetallic: boolean): VariableFxPaintColor => ({ typeName, rgb: rgb & 0xffffff, isMetallic });

const NAMED_COLORS: Record<string, VariableFxPaintColor> = {
    GREEN: color('GREEN', 3584586, false),
    LIME_GREEN: color('LIME_GREEN', 9296949, false),
    YELLOW: color('YELLOW', 16767037, false),
    ORANGE: color('ORANGE', 16752420, false),
    RED: color('RED', 14625054, false),
    CYAN: color('CYAN', 4379880, false),
    BLUE: color('BLUE', 3898851, false),
    PURPLE: color('PURPLE', 8868305, false),
    PINK: color('PINK', 16740275, false),
    BROWN: color('BROWN', 9065274, false),
    BEIGE: color('BEIGE', 14074508, false),
    TEAL: color('TEAL', 3127208, false),
    INDIGO: color('INDIGO', 5069783, false),
    MAGENTA: color('MAGENTA', 14044097, false),
    LIGHT_BLUE: color('LIGHT_BLUE', 8572927, false),
    FIRE_ORANGE: color('FIRE_ORANGE', 16734751, false),
    DARK_GREEN: color('DARK_GREEN', 2060090, false),
    DARK_BLUE: color('DARK_BLUE', 2047375, false),
    WHITE: color('WHITE', 14211288, false),
    BRONZE: color('BRONZE', 13467442, true),
    SILVER: color('SILVER', 12632256, true),
    GOLD: color('GOLD', 16762941, true),
    DIAMOND: color('DIAMOND', 9366271, true),
    EMERALD: color('EMERALD', 2606187, true),
    DYNAMIC_RED_TO_GREEN: color('DYNAMIC_RED_TO_GREEN', 14625054, false),
    DYNAMIC_LEVELLING: color('DYNAMIC_LEVELLING', 3001374, false),
    DYNAMIC_TEAM_COLOR: color('DYNAMIC_TEAM_COLOR', 14211288, false),
    DYNAMIC_DELEGATED: color('DYNAMIC_DELEGATED', 16777215, false),
};

const rgbFromHsv = (hue: number, saturation: number, value: number): number => {
    const normalizedHue = ((hue % 360) + 360) % 360;
    const chroma = value * saturation;
    const section = normalizedHue / 60;
    const x = chroma * (1 - Math.abs((section % 2) - 1));
    const m = value - chroma;
    const [ r, g, b ] = resolveRgbFromHueSection(section, chroma, x);

    return ((Math.floor((r + m) * 255) << 16) | (Math.floor((g + m) * 255) << 8) | Math.floor((b + m) * 255)) >>> 0;
};

const parseExtraNumber = (value: string | undefined): number | undefined => {
    if (value === undefined) return undefined;

    const parsed = Number(value);

    return Number.isFinite(parsed) ? parsed : undefined;
};

const parseExtraBoolean = (value: string | undefined): boolean | undefined => {
    switch ((value ?? '').toLowerCase()) {
        case 'true':
            return true;
        case 'false':
            return false;
        default:
            return undefined;
    }
};

const parseExtraColor = (value: string | undefined): number | undefined => {
    if (value === undefined) return undefined;

    const hex = value.replace(/^\s+|\s+$/g, '').replace(/^#/, '').replace(/^0x/i, '');

    if (!/^[0-9a-f]{6}$/i.test(hex)) return undefined;

    return parseInt(hex, 16) & 0xffffff;
};

/** Port of the Flash client's Variable FX paint colour table and dynamic colour resolution. */
export class VariableFxPaintColors {
    public static NOT_APPLICABLE: string = 'NOT_APPLICABLE';
    public static DYNAMIC_DELEGATED: string = 'DYNAMIC_DELEGATED';
    public static DYNAMIC_RED_TO_GREEN: string = 'DYNAMIC_RED_TO_GREEN';
    public static DYNAMIC_LEVELLING: string = 'DYNAMIC_LEVELLING';
    public static DYNAMIC_TEAM_COLOR: string = 'DYNAMIC_TEAM_COLOR';

    public static resolve(name: string): VariableFxPaintColor {
        const named = NAMED_COLORS[name];

        if (named) return { ...named };

        return color(VariableFxPaintColors.NOT_APPLICABLE, 16777215, false);
    }

    /** The static paint colour: the named colour, overridden by the config's `color` / `metallic` extras. */
    public static resolvePaintColor(name: string, extra?: Map<string, string>): VariableFxPaintColor {
        const base = VariableFxPaintColors.resolve(name);
        const metallic = parseExtraBoolean(VariableFxPaintColors.readExtra(extra, 'metallic'));
        const rgb = parseExtraColor(VariableFxPaintColors.readExtra(extra, 'color'));

        return {
            typeName: base.typeName,
            rgb: rgb === undefined ? base.rgb : rgb,
            isMetallic: metallic === undefined ? base.isMetallic : metallic,
        };
    }

    /** The colour a bar should currently be heading toward, resolving the dynamic colour types from progress / status extras. */
    public static resolveTargetPaintColor(name: string, extra?: Map<string, string>, progress: number = 0, statusExtra?: Map<string, string>): VariableFxPaintColor {
        const base = VariableFxPaintColors.resolve(name);

        if (base.typeName === VariableFxPaintColors.DYNAMIC_RED_TO_GREEN) {
            const band = VariableFxPaintColors.resolveDynamicRedToGreenBand(progress);

            return {
                typeName: base.typeName,
                rgb: band.rgb,
                isMetallic: false,
                dynamicBandIndex: band.index,
            };
        }

        if (base.typeName === VariableFxPaintColors.DYNAMIC_LEVELLING) {
            return {
                typeName: base.typeName,
                rgb: VariableFxPaintColors.resolveDynamicLevellingRgb(statusExtra),
                isMetallic: false,
                snapTransition: true,
            };
        }

        if (base.typeName === VariableFxPaintColors.DYNAMIC_DELEGATED || base.typeName === VariableFxPaintColors.DYNAMIC_TEAM_COLOR) {
            const delegated = parseExtraColor(VariableFxPaintColors.readExtra(statusExtra, 'delegated_color'));

            return {
                typeName: base.typeName,
                rgb: delegated === undefined ? base.rgb : delegated,
                isMetallic: false,
                snapTransition: true,
            };
        }

        return VariableFxPaintColors.resolvePaintColor(name, extra);
    }

    public static resolveDynamicPaintBandRgb(name: string, bandIndex: number): number | undefined {
        if (VariableFxPaintColors.resolve(name).typeName !== VariableFxPaintColors.DYNAMIC_RED_TO_GREEN) return undefined;

        return DYNAMIC_RED_TO_GREEN_BAND_RGBS[Math.max(0, Math.min(2, bandIndex))];
    }

    public static isDynamicPaintColor(name: string): boolean {
        return VariableFxPaintColors.resolve(name).typeName.indexOf('DYNAMIC_') === 0;
    }

    public static parseRgbColor(value: string | undefined): number | undefined {
        return parseExtraColor(value);
    }

    public static readExtra(extra: Map<string, string> | undefined, key: string): string | undefined {
        const value = extra?.get(key);

        if (value === undefined || value === null) return undefined;

        return value.replace(/^\s+|\s+$/g, '');
    }

    private static resolveDynamicRedToGreenBand(progress: number): { index: number; rgb: number } {
        const clamped = Number.isFinite(progress) ? Math.max(0, Math.min(1, progress)) : 0;

        if (clamped < 1 / 3) return { index: 0, rgb: DYNAMIC_RED_TO_GREEN_BAND_RGBS[0] };
        if (clamped < 2 / 3) return { index: 1, rgb: DYNAMIC_RED_TO_GREEN_BAND_RGBS[1] };

        return { index: 2, rgb: DYNAMIC_RED_TO_GREEN_BAND_RGBS[2] };
    }

    private static resolveDynamicLevellingRgb(statusExtra?: Map<string, string>): number {
        const maxLevelValue = parseExtraNumber(VariableFxPaintColors.readExtra(statusExtra, 'max_level'));
        const maxLevel = maxLevelValue === undefined ? 0 : Math.trunc(maxLevelValue);
        const isMaxed = (VariableFxPaintColors.readExtra(statusExtra, 'is_maxed') ?? '').toLowerCase() === 'true';

        if (maxLevel <= 1) {
            return isMaxed
                ? rgbFromHsv(DYNAMIC_LEVELLING_END_HUE, DYNAMIC_LEVELLING_SATURATION, DYNAMIC_LEVELLING_VALUE)
                : rgbFromHsv(DYNAMIC_LEVELLING_START_HUE, DYNAMIC_LEVELLING_SATURATION, DYNAMIC_LEVELLING_VALUE);
        }

        const currentLevelValue = parseExtraNumber(VariableFxPaintColors.readExtra(statusExtra, 'current_level'));
        const currentLevel = currentLevelValue === undefined ? 0 : Math.trunc(currentLevelValue);
        const ratio = Math.max(0, Math.min(1, (currentLevel - 1) / (maxLevel - 1)));
        const hue = DYNAMIC_LEVELLING_START_HUE + (DYNAMIC_LEVELLING_END_HUE - DYNAMIC_LEVELLING_START_HUE) * ratio;

        return rgbFromHsv(hue, DYNAMIC_LEVELLING_SATURATION, DYNAMIC_LEVELLING_VALUE);
    }
}

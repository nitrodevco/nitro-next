import { ColorMatrixFilter, Filter } from 'pixi.js';

import { createFlashGlowFilter } from '#renderer/utils';

/** `STRENGTH_STEP`: strengths are drawn in steps of 5 so a pulse or an easing reuses a few cached filter lists. */
const STRENGTH_STEP = 5;

const colorMatrix = (matrix: number[]): ColorMatrixFilter => {
    const filter = new ColorMatrixFilter();

    // Flash's offsets are 0-255, Pixi's 0-1.
    filter.matrix = matrix.map((value, index) => ((index % 5) === 4 ? value / 255 : value)) as ColorMatrixFilter['matrix'];

    return filter;
};

/**
 * Port of the Flash class `room/object/visualization/furniture/_-S2n` (WIN63-202610201032, unnamed in the build):
 * the filters of a WIRED Set Highlight, shared by `FurnitureVisualization` and `AvatarVisualization`. The glows
 * (types 0 Outline, 1 Soft glow, 5 Neon aura) are knockout glows drawn round the object's whole silhouette
 * (`FurnitureHighlightComposite`); the colour matrices (2 Darken, 3 Color tint, 4 Brighten) go on every layer.
 */
export class FurnitureHighlightFilters {
    /** `quantizeStrength`: 0 is off, anything else 5 to 100 in steps of 5. */
    public static quantizeStrength(strength: number): number {
        if (isNaN(strength) || strength <= 0) return 0;
        if (strength >= 100) return 100;

        return Math.max(STRENGTH_STEP, Math.round(strength / STRENGTH_STEP) * STRENGTH_STEP);
    }

    /** `usesCompositeSilhouette`. */
    public static usesCompositeSilhouette(highlightType: number): boolean {
        return highlightType === 0 || highlightType === 1 || highlightType === 5;
    }

    /** `create`: the filters for a type, colour and quantized strength, or undefined when there are none. */
    public static create(highlightType: number, color: number, strength: number): Filter[] | undefined {
        if (strength <= 0) return undefined;

        const level = Math.min(100, strength) / 100;
        const rgb = color & 0xFFFFFF;

        switch (highlightType) {
            case 0:
                return [ createFlashGlowFilter(rgb, level, 2 + 2 * level, 2 + 2 * level, 2 + 5 * level, 1, false, true) ];
            case 1:
                return [ createFlashGlowFilter(rgb, 0.75 * level, 6 + 6 * level, 6 + 6 * level, 1.5 + 1.5 * level, 1, false, true) ];
            case 2:
                return [ FurnitureHighlightFilters.createDarkenFilter(level) ];
            case 3:
                return [ FurnitureHighlightFilters.createColorTintFilter(rgb, level * (rgb === 0 ? 1 : 1.35)) ];
            case 4:
                return [ FurnitureHighlightFilters.createBrightenFilter(level) ];
            case 5:
                return [
                    createFlashGlowFilter(rgb, 0.55 * level, 14 + 10 * level, 14 + 10 * level, 1.5 + 1.5 * level, 1, false, true),
                    createFlashGlowFilter(0xFFFFFF, 0.9 * level, 2, 2, 6 + 6 * level, 1, false, true),
                ];
            default:
                return undefined;
        }
    }

    private static createColorTintFilter(color: number, amount: number): ColorMatrixFilter {
        const r = ((color >> 16) & 0xFF) / 255;
        const g = ((color >> 8) & 0xFF) / 255;
        const b = (color & 0xFF) / 255;
        const mix = 0.65 * amount;
        const cross = mix * 0.05;
        const offset = 35 * amount;

        return colorMatrix([
            1 - mix + mix * r, cross * g, cross * b, 0, r * offset,
            cross * r, 1 - mix + mix * g, cross * b, 0, g * offset,
            cross * r, cross * g, 1 - mix + mix * b, 0, b * offset,
            0, 0, 0, 1, 0,
        ]);
    }

    private static createDarkenFilter(level: number): ColorMatrixFilter {
        const scale = 1 - 0.65 * level;

        return colorMatrix([ scale, 0, 0, 0, 0, 0, scale, 0, 0, 0, 0, 0, scale, 0, 0, 0, 0, 0, 1, 0 ]);
    }

    private static createBrightenFilter(level: number): ColorMatrixFilter {
        const scale = 1 + 0.78 * level;
        const offset = 36 * level;

        return colorMatrix([ scale, 0, 0, 0, offset, 0, scale, 0, 0, offset, 0, 0, scale, 0, offset, 0, 0, 0, 1, 0 ]);
    }
}

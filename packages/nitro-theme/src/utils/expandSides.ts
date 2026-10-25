/**
 * Expands a layout's `padding` / `margin` / `inset` shorthands into the four sides they stand for,
 * so that spreading one layout over another means what it reads as.
 *
 * Yoga keeps an edge's value per edge and resolves the most specific one first - `Left` beats
 * `Horizontal` beats `All` - and `@pixi/layout`'s `applyStyle` just walks the style object calling
 * a setter per key. So `{ ...config.layout, ...layout }` does NOT let a caller's `padding: 0`
 * clear a variant's `paddingLeft: 8`: both reach Yoga, and the more specific one wins whatever
 * order they arrived in. The inventory's tab strip asked for no padding and got the tab context's
 * 8 anyway, on top of the 8 its own layout already placed it at.
 *
 * Expanding first leaves only same-specificity keys, so the later layer simply wins. A longhand
 * the same layer also states keeps its place over the shorthand, as it would in CSS.
 */
import { BoxLayout } from '../Box';

const GROUPS = [
    { shorthand: 'padding', inline: 'paddingInline', block: 'paddingBlock', sides: [ 'paddingLeft', 'paddingTop', 'paddingRight', 'paddingBottom' ] },
    { shorthand: 'margin', inline: 'marginInline', block: 'marginBlock', sides: [ 'marginLeft', 'marginTop', 'marginRight', 'marginBottom' ] },
    { shorthand: 'inset', inline: 'insetInline', block: 'insetBlock', sides: [ 'left', 'top', 'right', 'bottom' ] },
] as const;

export const expandSides = (layout: BoxLayout | undefined): BoxLayout | undefined => {
    if (!layout) return layout;

    const source = layout as Record<string, unknown>;

    if (!GROUPS.some(group => (source[group.shorthand] !== undefined) || (source[group.inline] !== undefined) || (source[group.block] !== undefined))) return layout;

    const result: Record<string, unknown> = { ...source };

    for (const { shorthand, inline, block, sides } of GROUPS) {
        const [ left, top, right, bottom ] = sides;
        const all = source[shorthand];
        const horizontal = (source[inline] !== undefined) ? source[inline] : all;
        const vertical = (source[block] !== undefined) ? source[block] : all;

        for (const [ side, value ] of [ [ left, horizontal ], [ right, horizontal ], [ top, vertical ], [ bottom, vertical ] ] as const) {
            if ((value !== undefined) && (source[side] === undefined)) result[side] = value;
        }

        delete result[shorthand];
        delete result[inline];
        delete result[block];
    }

    return result;
};

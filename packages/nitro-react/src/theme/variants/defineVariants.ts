import { AnyThemeVariant, ThemeVariants } from '../utils/ThemeVariant';
import { ELEMENT_VARIANTS } from './elements';

/**
 * Builds a component's variant table: every Flash `style` the element description knows for
 * `element` (its view template and default colour, see ./elements.ts) merged with the art
 * layers written by hand per style. A style only the description names still gets its view;
 * a style only the art names is kept as written; where both exist the hand-written fields win.
 */
export const defineVariants = <T extends AnyThemeVariant>(element: string | undefined, art: ThemeVariants<T>): ThemeVariants<T> => {
    const described = element ? ELEMENT_VARIANTS[element] ?? {} : {};
    const variants: ThemeVariants<T> = {};

    for (const style of new Set([ ...Object.keys(described), ...Object.keys(art) ])) {
        const { view, tintColor } = described[style] ?? {};

        variants[style] = { ...(view && { view }), ...(tintColor && { tintColor }), ...art[style] };
    }

    return variants;
};

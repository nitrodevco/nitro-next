import { BoxLayout } from '../Box';
import { FillLayout } from '../utils';

/** A flat colour filling its parent's box - a window's `background` fill under its skin. */
export const ColorLayer = ({ color, alpha, layout }: {
    color?: string;
    /** Opacity of the fill (the alpha byte of a Flash window colour). */
    alpha?: number;
    layout?: BoxLayout;
}) => {
    if (!color?.length) return null;

    return (
        <pixiGraphics
            eventMode="none"
            alpha={alpha}
            layout={layout ?? FillLayout}
            draw={(g) => {
                g.clear().rect(0, 0, 1, 1).fill(color);
            }}
        />
    );
};

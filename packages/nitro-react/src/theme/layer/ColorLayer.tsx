import { BoxLayout } from '../Box';
import { boxLayoutToStyle } from '../dom';
import { FillLayout, getRenderMode } from '../utils';

export const ColorLayer = ({ color, alpha, layout }: {
    color?: string;
    /** Opacity of the fill (the alpha byte of a Flash window colour). */
    alpha?: number;
    layout?: BoxLayout;
}) => {
    if (!color?.length) return null;

    if (getRenderMode() === 'dom') {
        return <div style={{ ...boxLayoutToStyle(layout ?? FillLayout), backgroundColor: color, opacity: alpha }} />;
    }

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

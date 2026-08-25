import { BoxLayout } from '../Box';
import { boxLayoutToStyle } from '../dom';
import { FillLayout, getRenderMode } from '../utils';

export const ColorLayer = ({ color, layout }: {
    color: string | undefined;
    layout?: BoxLayout;
}) => {
    if (!color) return null;

    if (getRenderMode() === 'dom') {
        return <div style={{ ...boxLayoutToStyle(layout ?? FillLayout), backgroundColor: color }} />;
    }

    return (
        <pixiGraphics
            eventMode="none"
            layout={layout ?? FillLayout}
            draw={(g) => { g.clear().rect(0, 0, 1, 1).fill(color); }}
        />
    );
};

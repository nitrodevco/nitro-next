import { getRenderMode } from '#base/theme-core';

import { BoxLayout } from '../Box';
import { boxLayoutToStyle } from '../dom/boxStyle';
import { FillLayout } from '../utils/FillLayout';

export interface ColorLayerProps {
    color: string | undefined;
    layout?: BoxLayout;
}

export const ColorLayer = ({ color, layout }: ColorLayerProps) => {
    if (!color) return null;

    if (getRenderMode() === 'dom') {
        return <div style={{ ...boxLayoutToStyle(layout ?? FillLayout), backgroundColor: color }} />;
    }

    return (
        <pixiGraphics
            eventMode="none"
            layout={layout ?? FillLayout}
            draw={(g) => { g.clear(); g.rect(0, 0, 1, 1).fill(color); }}
        />
    );
};

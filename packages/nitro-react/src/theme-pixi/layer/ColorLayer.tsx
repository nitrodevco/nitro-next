import { BoxLayout } from "../Box";
import { FillLayout } from "../utils/FillLayout";

export interface ColorLayerProps {
    color: string | undefined;
    layout?: BoxLayout;
}

export const ColorLayer = ({ color, layout }: ColorLayerProps) => {
    if (!color) return null;

    return <pixiGraphics eventMode="none" layout={layout ?? FillLayout} draw={g => { g.clear(); g.rect(0, 0, 1, 1).fill(color); }} />;
};
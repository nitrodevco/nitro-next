import { BoxLayout } from '../Box';
import { FillLayout } from '../utils/FillLayout';
import { usePixiTexture } from '../utils/usePixiTexture';

export interface NineSliceLayerProps {
    textureKey: string | undefined;
    leftWidth: number;
    topHeight: number;
    rightWidth: number;
    bottomHeight: number;
    tintColor?: string;
    layout?: BoxLayout;
}

export const NineSliceLayer = ({ textureKey, leftWidth, topHeight, rightWidth, bottomHeight, tintColor, layout }: NineSliceLayerProps) => {
    const texture = usePixiTexture(textureKey);

    if (!texture) return null;

    return (
        <pixiNineSliceSprite
            texture={texture}
            leftWidth={leftWidth}
            topHeight={topHeight}
            rightWidth={rightWidth}
            bottomHeight={bottomHeight}
            tint={tintColor}
            eventMode="none"
            layout={layout ?? FillLayout}
        />
    );
};

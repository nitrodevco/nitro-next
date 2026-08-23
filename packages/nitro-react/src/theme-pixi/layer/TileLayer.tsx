import { getRenderMode } from '#base/theme-core';

import { BoxLayout } from '../Box';
import { BackgroundLayerDom } from '../dom/BackgroundLayerDom';
import { boxLayoutToStyle } from '../dom/boxStyle';
import { FillLayout } from '../utils/FillLayout';
import { usePixiTexture } from '../utils/usePixiTexture';

export interface TileLayerProps {
    textureKey: string | undefined;
    tintColor?: string;
    layout?: BoxLayout;
}

const TileLayerPixi = ({ textureKey, tintColor, layout }: TileLayerProps) => {
    const texture = usePixiTexture(textureKey);

    if (!texture) return null;

    return (
        <pixiTilingSprite
            texture={texture}
            tint={tintColor}
            eventMode="none"
            layout={layout ?? FillLayout}
        />
    );
};

const TileLayerDom = ({ textureKey, tintColor, layout }: TileLayerProps) => {
    if (!textureKey) return null;

    return (
        <BackgroundLayerDom
            layer={{ kind: 'tile', textureKey }}
            tintColor={tintColor}
            style={layout ? boxLayoutToStyle(layout) : undefined}
        />
    );
};

/** See NineSliceLayer.tsx's docblock - same reasoning, a repeating texture instead of a 9-slice. */
export const TileLayer = (props: TileLayerProps) => getRenderMode() === 'dom'
    ? <TileLayerDom {...props} />
    : <TileLayerPixi {...props} />;

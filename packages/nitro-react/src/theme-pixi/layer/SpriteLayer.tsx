import { getRenderMode } from '#base/theme-core';

import { BoxLayout } from '../Box';
import { BackgroundLayerDom } from '../dom/BackgroundLayerDom';
import { boxLayoutToStyle } from '../dom/boxStyle';
import { FillLayout } from '../utils/FillLayout';
import { usePixiTexture } from '../utils/usePixiTexture';

export interface SpriteLayerProps {
    textureKey: string | undefined;
    tintColor?: string;
    layout?: BoxLayout;
}

const SpriteLayerPixi = ({ textureKey, tintColor, layout }: SpriteLayerProps) => {
    const texture = usePixiTexture(textureKey);

    if (!texture) return null;

    return (
        <pixiSprite
            texture={texture}
            tint={tintColor}
            eventMode="none"
            layout={layout ?? FillLayout}
        />
    );
};

const SpriteLayerDom = ({ textureKey, tintColor, layout }: SpriteLayerProps) => {
    if (!textureKey) return null;

    return (
        <BackgroundLayerDom
            layer={{ kind: 'sprite', textureKey }}
            tintColor={tintColor}
            style={layout ? boxLayoutToStyle(layout) : undefined}
        />
    );
};

/** See NineSliceLayer.tsx's docblock - same reasoning, one texture instead of a 9-slice. */
export const SpriteLayer = (props: SpriteLayerProps) => getRenderMode() === 'dom'
    ? <SpriteLayerDom {...props} />
    : <SpriteLayerPixi {...props} />;

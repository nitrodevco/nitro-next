import { Ref } from 'react';

import { BoxLayout } from '../Box';
import { usePixiTexture } from '../hooks';
import { FillLayout } from '../utils';
import { LayerNodeProps } from './layerLayout';

export interface TileLayerProps extends LayerNodeProps {
    textureKey: string | undefined;
    tintColor?: string;
    layout?: BoxLayout;
}

/** One theme sprite repeated over its parent's box - a `tiled` skin entity. */
export const TileLayer = ({ textureKey, tintColor, layout, ref, alpha, visible }: TileLayerProps) => {
    // `TilingSprite` can't wrap a region of the atlas - it needs a texture that is its own
    // source (see `getStandaloneThemeTexture`), cut out of the atlas once per key.
    const texture = usePixiTexture(textureKey, { standalone: true });

    if (!texture) return null;

    return (
        <pixiTilingSprite
            ref={ref as Ref<never>}
            texture={texture}
            tint={tintColor}
            alpha={alpha}
            visible={visible}
            eventMode="none"
            layout={layout ?? FillLayout}
        />
    );
};

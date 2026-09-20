import { BoxLayout } from '../Box';
import { usePixiTexture } from '../hooks';
import { FillLayout } from '../utils';
import { BackgroundLayerConfig } from './BackgroundLayer';

export interface TileLayerProps {
    textureKey: string | undefined;
    tintColor?: string;
    layout?: BoxLayout;
}

const TileLayer = ({ textureKey, tintColor, layout }: TileLayerProps) => {
    // `TilingSprite` can't wrap a region of the atlas - it needs a texture that is its own
    // source (see `getStandaloneThemeTexture`), cut out of the atlas once per key.
    const texture = usePixiTexture(textureKey, { standalone: true });

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
export interface TileInsets {
    left?: number;
    top?: number;
    right?: number;
    bottom?: number;
    width?: number;
    height?: number;
}

const Tiled = (textureKey: string, insets?: TileInsets): BackgroundLayerConfig => ({ kind: 'tile', textureKey, ...insets });
export { Tiled, TileLayer };

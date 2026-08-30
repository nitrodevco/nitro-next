import { BoxLayout } from '../Box';
import { BackgroundLayerDom, boxLayoutToStyle } from '../dom';
import { usePixiTexture } from '../hooks';
import { FillLayout, getRenderMode } from '../utils';
import { BackgroundLayerConfig } from './BackgroundLayer';

export interface TileLayerProps {
    textureKey: string | undefined;
    tintColor?: string;
    layout?: BoxLayout;
}

const TileLayerPixi = ({ textureKey, tintColor, layout }: TileLayerProps) => {
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

/** Where a tiled strip sits inside its host box; omit everything to fill the box. */
export interface TileInsets {
    left?: number;
    top?: number;
    right?: number;
    bottom?: number;
    width?: number;
    height?: number;
}

const Tiled = (textureKey: string, insets?: TileInsets): BackgroundLayerConfig => ({ kind: 'tile', textureKey, ...insets });

const TileLayer = (props: TileLayerProps) => getRenderMode() === 'dom'
    ? <TileLayerDom {...props} />
    : <TileLayerPixi {...props} />;

export { Tiled, TileLayer };

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

const Tiled = (textureKey: string): BackgroundLayerConfig => ({ kind: 'tile', textureKey });

const TileLayer = (props: TileLayerProps) => getRenderMode() === 'dom'
    ? <TileLayerDom {...props} />
    : <TileLayerPixi {...props} />;

export { Tiled, TileLayer };

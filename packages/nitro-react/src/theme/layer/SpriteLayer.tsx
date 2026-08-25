import { BoxLayout } from '../Box';
import { BackgroundLayerDom, boxLayoutToStyle } from '../dom';
import { usePixiTexture } from '../hooks';
import { FillLayout, getRenderMode } from '../utils';
import { BackgroundLayerConfig } from './BackgroundLayer';

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

const Stretch = (textureKey: string): BackgroundLayerConfig => ({ kind: 'sprite', textureKey });

const SpriteLayer = (props: SpriteLayerProps) => getRenderMode() === 'dom'
    ? <SpriteLayerDom {...props} />
    : <SpriteLayerPixi {...props} />;

export { SpriteLayer, Stretch };

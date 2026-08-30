import { BoxLayout } from '../Box';
import { BackgroundLayerDom, boxLayoutToStyle } from '../dom';
import { getCroppedTexture, usePixiTexture } from '../hooks';
import { FillLayout, getRenderMode, SpriteFrame, spriteLayoutFromFrame } from '../utils';
import { BackgroundLayerConfig } from './BackgroundLayer';

export interface SpriteLayerProps {
    textureKey: string | undefined;
    /** Crop a sub-region out of the texture (a shared spritesheet) instead of showing it whole -
     *  the same cutout `ThemeImage`/`BubblePointer` already do their own way, exposed here so a
     *  themed component's variant table can declare it directly through `BackgroundLayerConfig`
     *  instead of reaching for a separate `<ThemeImage>` on the side. */
    frame?: SpriteFrame;
    tintColor?: string;
    layout?: BoxLayout;
}

const SpriteLayerPixi = ({ textureKey, frame, tintColor, layout }: SpriteLayerProps) => {
    const baseTexture = usePixiTexture(textureKey);
    // A sub-frame shares the base's source; `getCroppedTexture` hands back the same Texture
    // object for the same rect every time, so remounts allocate nothing.
    const texture = baseTexture && frame ? getCroppedTexture(baseTexture, frame) : baseTexture;

    if (!texture) return null;

    return (
        <pixiSprite
            texture={texture}
            tint={tintColor}
            eventMode="none"
            layout={spriteLayoutFromFrame(frame, layout) ?? FillLayout}
        />
    );
};

const SpriteLayerDom = ({ textureKey, frame, tintColor, layout }: SpriteLayerProps) => {
    if (!textureKey) return null;

    const resolvedLayout = spriteLayoutFromFrame(frame, layout);

    return (
        <BackgroundLayerDom
            layer={{ kind: 'sprite', textureKey, frame }}
            tintColor={tintColor}
            style={resolvedLayout ? boxLayoutToStyle(resolvedLayout) : undefined}
        />
    );
};

const Stretch = (textureKey: string, frame?: SpriteFrame): BackgroundLayerConfig => ({ kind: 'sprite', textureKey, frame });

const SpriteLayer = (props: SpriteLayerProps) => getRenderMode() === 'dom'
    ? <SpriteLayerDom {...props} />
    : <SpriteLayerPixi {...props} />;

export { SpriteLayer, Stretch };

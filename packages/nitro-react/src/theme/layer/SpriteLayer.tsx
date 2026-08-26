import { Rectangle, Texture } from 'pixi.js';
import { useMemo } from 'react';

import { BoxLayout } from '../Box';
import { BackgroundLayerDom, boxLayoutToStyle } from '../dom';
import { usePixiTexture } from '../hooks';
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

    const croppedTexture = useMemo(() => {
        if (!baseTexture || !frame) return undefined;

        return new Texture({
            source: baseTexture.source,
            frame: new Rectangle(baseTexture.frame.x + frame.x, baseTexture.frame.y + frame.y, frame.width, frame.height),
        });
    }, [ baseTexture, frame?.x, frame?.y, frame?.width, frame?.height ]);

    const texture = frame ? croppedTexture : baseTexture;

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

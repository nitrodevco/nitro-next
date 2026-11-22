import { Ref } from 'react';

import { BoxLayout } from '../Box';
import { getCroppedTexture, tintedLayerTexture, usePixiTexture } from '../hooks';
import { FillLayout, SpriteFrame, spriteLayoutFromFrame, ThemeTintMode } from '../utils';
import { LayerNodeProps } from './layerLayout';

export interface SpriteLayerProps extends LayerNodeProps {
    textureKey: string | undefined;
    /** Crop a sub-region out of the texture (a shared spritesheet) instead of showing it whole -
     *  the same cutout `ThemeImage`/`BubblePointer` already do their own way, exposed here so a
     *  themed component's variant table can declare it directly through `BackgroundLayerConfig`
     *  instead of reaching for a separate `<ThemeImage>` on the side. */
    frame?: SpriteFrame;
    tintColor?: string;
    /** How `tintColor` colours it (`ThemeTintMode`): multiply unless `subtract`. */
    tintMode?: ThemeTintMode;
    layout?: BoxLayout;
}

/** One theme sprite (or a `frame` of it) filling its parent's box, or at the frame's own size. */
export const SpriteLayer = ({ textureKey, frame, tintColor, tintMode, layout, ref, alpha, visible }: SpriteLayerProps) => {
    const baseTexture = usePixiTexture(textureKey);
    // A sub-frame shares the base's source; `getCroppedTexture` hands back the same Texture
    // object for the same rect every time, so remounts allocate nothing.
    const texture = baseTexture && frame ? getCroppedTexture(baseTexture, frame) : baseTexture;

    if (!texture) return null;

    const drawn = tintedLayerTexture(texture, tintColor, tintMode);

    return (
        <pixiSprite
            ref={ref as Ref<never>}
            texture={drawn.texture}
            tint={drawn.tint}
            alpha={alpha}
            visible={visible}
            eventMode="none"
            layout={spriteLayoutFromFrame(frame, layout) ?? FillLayout}
        />
    );
};

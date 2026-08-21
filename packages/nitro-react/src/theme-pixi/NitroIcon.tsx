import './utils/pixiElements';

import type { Sprite as PixiSprite } from 'pixi.js';
import { forwardRef } from 'react';

import { type IconKey, useIconTexture } from './utils/useIconTexture';

export interface NitroIconProps {
    icon: IconKey;
}

export const NitroIcon = forwardRef<PixiSprite, NitroIconProps>(({ icon }, ref) => {
    const { texture, width, height } = useIconTexture(icon);

    if (!texture) return null;

    return <pixiSprite ref={ref} texture={texture} width={width} height={height} />;
});

NitroIcon.displayName = 'NitroIcon';

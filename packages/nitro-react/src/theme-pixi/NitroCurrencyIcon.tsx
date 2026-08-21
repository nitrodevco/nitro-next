import './utils/pixiElements';

import type { Sprite as PixiSprite } from 'pixi.js';
import { forwardRef } from 'react';

import { useConfigValue } from '#base/context';

import { useTextureFromUrl } from './utils/usePixiTexture';

export interface NitroCurrencyIconProps {
    type: string;
    mini?: boolean;
    small?: boolean;
}

export const NitroCurrencyIcon = forwardRef<PixiSprite, NitroCurrencyIconProps>(
    ({ type, mini = false, small = false }, ref) => {
        const iconUrlTemplate = useConfigValue<string>('currency.icon.url') ?? '';
        const size = mini ? 'mini' : (small ? 'small' : 'big');
        const iconUrl = iconUrlTemplate.replace('%type%', type).replace('%size%', size);
        const texture = useTextureFromUrl(iconUrl || undefined);

        if (!texture) return null;

        return <pixiSprite ref={ref} texture={texture} />;
    }
);

NitroCurrencyIcon.displayName = 'NitroCurrencyIcon';

import './utils/pixiElements';

import type { Sprite as PixiSprite } from 'pixi.js';
import { forwardRef } from 'react';

import { useConfigValue } from '#base/context';

import type { BoxLayout } from './Box';
import { useTextureFromUrl } from './utils/usePixiTexture';

export interface NitroCurrencyIconProps {
    type: string;
    mini?: boolean;
    small?: boolean;
    layout?: BoxLayout;
}

/** See NitroIcon.tsx for why `layout` always defaults to `{}` here. */
export const NitroCurrencyIcon = forwardRef<PixiSprite, NitroCurrencyIconProps>(
    ({ type, mini = false, small = false, layout }, ref) => {
        const iconUrlTemplate = useConfigValue<string>('currency.icon.url') ?? '';
        const size = mini ? 'mini' : (small ? 'small' : 'big');
        const iconUrl = iconUrlTemplate.replace('%type%', type).replace('%size%', size);
        const texture = useTextureFromUrl(iconUrl || undefined);

        if (!texture) return null;

        return <pixiSprite ref={ref} texture={texture} layout={layout ?? {}} />;
    }
);

NitroCurrencyIcon.displayName = 'NitroCurrencyIcon';

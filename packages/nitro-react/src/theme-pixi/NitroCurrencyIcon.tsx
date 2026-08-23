

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

/**
 * See NitroIcon.tsx for why `layout` always defaults to `{}` here.
 *
 * theme/Image.tsx (which theme/NitroCurrencyIcon.tsx renders through) shows a
 * `loading.icon.url` placeholder centered under the real `<img>` while it loads, and - since
 * it only ever removes the real `<img>` on error, never the placeholder underneath - keeps
 * showing that placeholder forever if the real image errors too. Pixi textures have no
 * distinct "errored" state the way a DOM `<img onError>` does, so "real texture still
 * undefined" stands in for both loading and errored here, converging on the same end visual
 * state DOM does: the loading icon, indefinitely, whenever the real currency icon never
 * resolves.
 */
export const NitroCurrencyIcon = forwardRef<PixiSprite, NitroCurrencyIconProps>(
    ({ type, mini = false, small = false, layout }, ref) => {
        const iconUrlTemplate = useConfigValue<string>('currency.icon.url') ?? '';
        const size = mini ? 'mini' : (small ? 'small' : 'big');
        const iconUrl = iconUrlTemplate.replace('%type%', type).replace('%size%', size);
        const texture = useTextureFromUrl(iconUrl || undefined);

        const loadingIconUrl = useConfigValue<string>('loading.icon.url') ?? '';
        const loadingTexture = useTextureFromUrl(!texture ? (loadingIconUrl || undefined) : undefined);

        const resolvedTexture = texture ?? loadingTexture;

        if (!resolvedTexture) return null;

        return (
            <pixiSprite
                ref={ref}
                texture={resolvedTexture}
                layout={layout ?? {}}
            />
        );
    },
);

NitroCurrencyIcon.displayName = 'NitroCurrencyIcon';

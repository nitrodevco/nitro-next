import { Container as PixiContainer } from 'pixi.js';
import { forwardRef } from 'react';

import { useConfigValue } from '#base/context';

import { BoxLayout } from './Box';
import { ThemeImage } from './ThemeImage';

export interface NitroCurrencyIconProps {
    type: string;
    mini?: boolean;
    small?: boolean;
    layout?: BoxLayout;
}

/**
 * See NitroIcon.tsx for why `layout` always defaults to `{}` here. `showLoadingPlaceholder`
 * mirrors DOM's theme/Image.tsx (which theme/NitroCurrencyIcon.tsx renders through): a
 * `loading.icon.url` placeholder shown while the real icon loads, and - since a Pixi texture
 * has no distinct "errored" state the way a DOM `<img onError>` does - left showing
 * indefinitely if the real currency icon never resolves, same as DOM converges on.
 */
export const NitroCurrencyIcon = forwardRef<PixiContainer, NitroCurrencyIconProps>(
    ({ type, mini = false, small = false, layout }, ref) => {
        const iconUrlTemplate = useConfigValue<string>('currency.icon.url') ?? '';
        const size = mini ? 'mini' : (small ? 'small' : 'big');
        const iconUrl = iconUrlTemplate.replace('%type%', type).replace('%size%', size);

        return (
            <ThemeImage
                ref={ref}
                src={iconUrl || undefined}
                showLoadingPlaceholder
                layout={layout ?? {}}
            />
        );
    },
);

NitroCurrencyIcon.displayName = 'NitroCurrencyIcon';

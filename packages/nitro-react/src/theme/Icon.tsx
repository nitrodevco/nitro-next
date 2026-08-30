import { Container as PixiContainer } from 'pixi.js';
import { forwardRef } from 'react';

import { BoxLayout } from './Box';
import { ThemeImage } from './ThemeImage';
import { ICON_SET_FRAMES, ThemeLayoutMeta } from './utils';

export interface IconProps extends ThemeLayoutMeta {
    /** The `icon_set` template number (`<icon style="N">`). */
    variant: string | number;
    tintColor?: string;
    layout?: BoxLayout;
}

export const Icon = forwardRef<PixiContainer, IconProps>(({ variant, tintColor, layout }, ref) => {
    const frame = ICON_SET_FRAMES[String(variant)];

    if (!frame) return null;

    return (
        <ThemeImage
            ref={ref}
            textureKey="icon-set-src"
            frame={frame}
            tint={tintColor}
            layout={layout ?? {}}
        />
    );
});

Icon.displayName = 'Icon';

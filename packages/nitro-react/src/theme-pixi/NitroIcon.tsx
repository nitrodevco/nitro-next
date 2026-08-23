import type { Sprite as PixiSprite } from 'pixi.js';
import { forwardRef } from 'react';

import type { BoxLayout } from './Box';
import { type IconKey, useIconTexture } from './utils/useIconTexture';

export interface NitroIconProps {
    icon: IconKey;
    layout?: BoxLayout;
}

/**
 * A `layout` prop is always applied (defaulting to `{}`) even when the caller doesn't pass
 * one - without it, this sprite is invisible to @pixi/layout's yoga tree (see Layout.getRoot
 * in @pixi/layout/dist/core/Layout.mjs: an object with no `.layout` set is skipped entirely,
 * staying at Pixi's raw default position instead of being placed by its flex parent).
 */
export const NitroIcon = forwardRef<PixiSprite, NitroIconProps>(({ icon, layout }, ref) => {
    const { texture, width, height } = useIconTexture(icon);

    if (!texture) return null;

    return (
        <pixiSprite
            ref={ref}
            texture={texture}
            width={width}
            height={height}
            layout={layout ?? {}}
        />
    );
});

NitroIcon.displayName = 'NitroIcon';

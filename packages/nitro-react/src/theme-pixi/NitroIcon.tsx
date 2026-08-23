import { Container as PixiContainer } from 'pixi.js';
import { forwardRef } from 'react';

import { BoxLayout } from './Box';
import { Image } from './Image';
import { IconKey, resolveIconAsset } from './utils/iconAssets';

export interface NitroIconProps {
    icon: IconKey;
    layout?: BoxLayout;
}

/**
 * A `layout` prop is always applied (defaulting to `{}`) even when the caller doesn't pass
 * one - without it, this is invisible to @pixi/layout's yoga tree in Pixi mode (see
 * Layout.getRoot in @pixi/layout/dist/core/Layout.mjs: an object with no `.layout` set is
 * skipped entirely, staying at Pixi's raw default position instead of being placed by its
 * flex parent).
 */
export const NitroIcon = forwardRef<PixiContainer, NitroIconProps>(({ icon, layout }, ref) => {
    const { src, frame, width, height } = resolveIconAsset(icon);

    return (
        <Image
            ref={ref}
            src={src}
            frame={frame}
            width={width}
            height={height}
            layout={layout ?? {}}
        />
    );
});

NitroIcon.displayName = 'NitroIcon';

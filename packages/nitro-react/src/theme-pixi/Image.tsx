import type { Container as PixiContainer } from 'pixi.js';
import { forwardRef } from 'react';

import { useConfigValue } from '#base/context';
import { getRenderMode } from '#base/theme-core';

import { Box, type BoxLayout } from './Box';
import { useTextureFromUrl } from './utils/usePixiTexture';

export interface ImageProps {
    src: string | undefined;
    layout?: BoxLayout;
}

/**
 * Pixi port of theme/Image.tsx, generalizing the same loading-placeholder pattern
 * NitroCurrencyIcon.tsx already established for its own `src` (see that file's own docblock for
 * the full reasoning): DOM shows a `loading.icon.url` placeholder under the real `<img>` until
 * it loads, and never removes that placeholder on error - only ever the real `<img>` disappears.
 * Pixi textures have no distinct "errored" state, so "the real texture is still undefined"
 * stands in for both loading and errored, converging on the same end visual DOM does (the
 * loading icon shown indefinitely) whenever `src` never resolves.
 *
 * `layout` sizes/positions an outer `Box` (matching DOM's `wrapperClassName`, e.g. catalog grid
 * items' `min-w-[32px] min-h-[32px] max-w-[32px] max-h-[32px]`) rather than the sprite itself -
 * DOM's actual `<img>` never has its own width/height set, so it always renders at its natural
 * resolution and is simply centered inside that wrapper by `flex items-center justify-center`.
 * Applying `layout`'s min/max constraints straight to the sprite instead (as this used to do)
 * makes @pixi/layout stretch the sprite's texture to exactly fill them, distorting any icon
 * whose native size doesn't already match - the "icon is zoomed in" bug this fixes. The sprite
 * itself gets an explicit `width`/`height` equal to the texture's own size (the same
 * intrinsic-sizing pattern NitroIcon.tsx already uses), so it renders at native resolution and
 * @pixi/layout has no smaller layout box to stretch it into.
 */
const ImagePixi = forwardRef<PixiContainer, ImageProps>(({ src, layout }, ref) => {
    const texture = useTextureFromUrl(src);

    const loadingIconUrl = useConfigValue<string>('loading.icon.url') ?? '';
    const loadingTexture = useTextureFromUrl(!texture ? (loadingIconUrl || undefined) : undefined);

    const resolvedTexture = texture ?? loadingTexture;

    if (!resolvedTexture) return null;

    return (
        <Box
            ref={ref}
            layout={{ alignItems: 'center', justifyContent: 'center', ...layout }}
        >
            <pixiSprite
                texture={resolvedTexture}
                width={resolvedTexture.width}
                height={resolvedTexture.height}
                layout={{}}
            />
        </Box>
    );
});

ImagePixi.displayName = 'ImagePixi';

/**
 * A plain `<img>` at its natural resolution, centered in the same `Box` wrapper the Pixi
 * branch uses (see the docblock above for why - the wrapper sizes/centers, the image itself
 * never gets forced dimensions). No Pixi asset-manager preload/placeholder-swap dance needed
 * here - the browser's own `<img>` loading already covers that, and `Box` alone is enough to
 * reserve the layout space while it loads.
 */
const ImageDom = forwardRef<PixiContainer, ImageProps>(({ src, layout }, ref) => (
    <Box
        ref={ref}
        layout={{ alignItems: 'center', justifyContent: 'center', ...layout }}
    >
        {src && (
            <img
                src={src}
                style={{ display: 'block', imageRendering: 'pixelated' }}
            />
        )}
    </Box>
));

ImageDom.displayName = 'ImageDom';

export const Image = forwardRef<PixiContainer, ImageProps>((props, ref) =>
    getRenderMode() === 'dom'
        ? (
                <ImageDom
                    ref={ref}
                    {...props}
                />
            )
        : (
                <ImagePixi
                    ref={ref}
                    {...props}
                />
            ));

Image.displayName = 'Image';

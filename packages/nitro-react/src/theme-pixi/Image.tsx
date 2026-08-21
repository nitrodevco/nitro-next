import './utils/pixiElements';

import type { Sprite as PixiSprite } from 'pixi.js';
import { forwardRef } from 'react';

import { useConfigValue } from '#base/context';

import type { BoxLayout } from './Box';
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
 */
export const Image = forwardRef<PixiSprite, ImageProps>(({ src, layout }, ref) => {
    const texture = useTextureFromUrl(src);

    const loadingIconUrl = useConfigValue<string>('loading.icon.url') ?? '';
    const loadingTexture = useTextureFromUrl(!texture ? (loadingIconUrl || undefined) : undefined);

    const resolvedTexture = texture ?? loadingTexture;

    if (!resolvedTexture) return null;

    return <pixiSprite ref={ref} texture={resolvedTexture} layout={layout ?? {}} />;
});

Image.displayName = 'Image';

import type { CSSProperties } from 'react';

import { THEME_URLS } from '#base/theme-core';

import type { SpriteFrame } from '../utils/useSpriteFrameTexture';

/**
 * DOM counterpart to `useSpriteFrameTexture` - slices the same sub-region out of a shared
 * spritesheet (e.g. closebutton.png, packing default/hovering/pressed states side by side) via
 * `background-position`, the exact technique that hook's own docblock already names as the DOM
 * equivalent. No `background-size` is needed: the sheet renders at its native resolution and
 * `background-position` is a plain pixel offset into it, so the frame's own `width`/`height`
 * become the element's size and the rest is just a matter of hiding everything else in the sheet.
 */
export const spriteFrameToStyle = (textureKey: string | undefined, frame: SpriteFrame | undefined): CSSProperties | undefined => {
    if (!textureKey || !frame) return undefined;

    const url = THEME_URLS[textureKey];

    if (!url) return undefined;

    return {
        width: frame.width,
        height: frame.height,
        backgroundImage: `url(${url})`,
        backgroundPosition: `-${frame.x}px -${frame.y}px`,
        backgroundRepeat: 'no-repeat',
        imageRendering: 'pixelated',
    };
};

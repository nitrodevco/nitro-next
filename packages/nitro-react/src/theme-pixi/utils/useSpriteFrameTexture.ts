import { Rectangle, Texture } from 'pixi.js';
import { useMemo } from 'react';

import { usePixiTexture } from './usePixiTexture';

export interface SpriteFrame {
    x: number;
    y: number;
    width: number;
    height: number;
}

/**
 * Slices a sub-region out of a shared spritesheet texture (e.g. closebutton.png, which packs
 * default/hovering/pressed states side by side and is addressed via CSS background-position
 * in the DOM theme package). Mirrors that offset/size pair as a Pixi Texture frame instead.
 */
export const useSpriteFrameTexture = (themeKey: string | undefined, frame: SpriteFrame | undefined): Texture | undefined => {
    const baseTexture = usePixiTexture(themeKey);

    return useMemo(() => {
        if (!baseTexture || !frame) return undefined;

        return new Texture({
            source: baseTexture.source,
            frame: new Rectangle(baseTexture.frame.x + frame.x, baseTexture.frame.y + frame.y, frame.width, frame.height),
        });
    }, [baseTexture, frame?.x, frame?.y, frame?.width, frame?.height]);
};

import { Texture } from 'pixi.js';
import { useLayoutEffect, useMemo } from 'react';

import { IChatStyle } from '#base/chat';

/**
 * A style's background tinted with `color`, held while the component shows it: the tinted ones are
 * a capped cache, which otherwise destroyed the least recently used colour under a bubble still on
 * screen once enough speakers' colours had come by.
 */
export const useChatBackgroundTexture = (style: IChatStyle | undefined, color: number): Texture | undefined => {
    const texture = useMemo(() => style?.getBackgroundTexture(color), [ style, color ]);

    useLayoutEffect(() => {
        if (!style || !texture) return;

        style.retainBackgroundTexture(texture);

        return () => style.releaseBackgroundTexture(texture);
    }, [ style, texture ]);

    return texture;
};

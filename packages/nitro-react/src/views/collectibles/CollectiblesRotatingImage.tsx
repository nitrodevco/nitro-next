/**
 * A `static_bitmap` the collectibles windows turn every frame - the `bg_star` behind a preview and
 * the reward box's `rotating_star` (20 degrees a second, `BG_STAR_ROTATE_SPEED`), and the
 * `loading_icon` of a tab that is waiting (90 degrees a second, `§_-S2D§`). Flash adds the angle in
 * the tab's `update` and redraws the bitmap turned about its centre (`BitmapDataRenderer`'s
 * `rotation`); here the sprite is turned by the ticker directly, so nothing re-renders and no
 * texture is made per angle.
 *
 * `stretched` is the bitmap's `stretched_x` / `stretched_y`: the image fills the box, or sits at
 * its own size in the middle of it (`pivot_point` center).
 */
import { GetTicker } from '@nitrodevco/nitro-renderer';
import { Sprite, Ticker } from 'pixi.js';
import { useEffect, useRef } from 'react';

import { Box, BoxLayout, useTextureFromUrl } from '#base/theme';

export interface CollectiblesRotatingImageProps {
    /** The bitmap's asset name (`LayoutImage(...)`). */
    src: string;
    /** Degrees a second. */
    speed: number;
    /** The tab's `update` turns it only in this state (the star while ready, the loading icon while not). */
    active: boolean;
    stretched: boolean;
    alpha?: number;
    tint?: string;
    left: number;
    top: number;
    width: number;
    height: number;
    layout?: BoxLayout;
}

export const CollectiblesRotatingImage = ({ src, speed, active, stretched, alpha = 1, tint, left, top, width, height, layout }: CollectiblesRotatingImageProps) => {
    const texture = useTextureFromUrl(src);
    const spriteRef = useRef<Sprite | null>(null);

    useEffect(() => {
        if (!active) return;

        const tick = (ticker: Ticker) => {
            const sprite = spriteRef.current;

            if (!sprite) return;

            // `rotation += speed * (deltaTime / 1000); rotation %= 360`.
            sprite.angle = (sprite.angle + (speed * (ticker.deltaMS / 1000))) % 360;
        };

        GetTicker().add(tick);

        return () => {
            GetTicker().remove(tick);
        };
    }, [ active, speed ]);

    return (
        <Box layout={{ position: 'absolute', left, top, width, height, ...layout }}>
            {texture && (
                <pixiSprite
                    ref={spriteRef}
                    texture={texture}
                    anchor={0.5}
                    x={width / 2}
                    y={height / 2}
                    width={stretched ? width : texture.width}
                    height={stretched ? height : texture.height}
                    alpha={alpha}
                    tint={tint ?? 0xffffff}
                    eventMode="none"
                />
            )}
        </Box>
    );
};

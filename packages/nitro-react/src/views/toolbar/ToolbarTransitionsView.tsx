/**
 * The `ToolBarTransition` windows `BottomBarLeft.animateToIcon` puts on desktop 2: each picture,
 * with Flash's thin white `GlowFilter(0xFFFFFF, 1, 2, 2, 255)` round it, leaps along
 * `JumpBy(window, duration, dx, dy, 100, 1)` - straight across by `dx` / `dy` while it rises 100 px
 * and falls again (`-100 * |sin(t * PI)|`) - and is disposed when it lands (`Dispose`). Over every
 * window, under the tooltips, and never a mouse target.
 */
import { createFlashGlowFilter, GetTicker } from '@nitrodevco/nitro-renderer';
import { Sprite, Ticker } from 'pixi.js';
import { useEffect, useRef, useState } from 'react';

import { ToolbarTransition, useSystemActions, useSystemStore } from '#base/context/system';
import { Box } from '#base/theme';
import { destroyOwnedTexture } from '#base/utils';

/** Over the frames (from 100), the floating popups (90000) and the modal layer (95000); under the tooltips (100000). */
const TRANSITIONS_Z_INDEX = 99000;
/** `JumpBy`'s height and jump count. */
const JUMP_HEIGHT = 100;
const JUMP_COUNT = 1;

const ToolbarTransitionSprite = ({ transition }: { transition: ToolbarTransition }) => {
    const { removeToolbarTransition } = useSystemActions();
    const spriteRef = useRef<Sprite>(null);
    const [ filters ] = useState(() => [ createFlashGlowFilter(0xFFFFFF, 1, 2, 2, 255, 1, false, false) ]);

    useEffect(() => {
        const { id, x, y, deltaX, deltaY, durationMs } = transition;
        let elapsed = 0;

        // `JumpBy.update(t)`; `Interval.tick` lands it on 1 once the duration has passed.
        const place = (progress: number) => {
            const sprite = spriteRef.current;

            if (!sprite) return;

            sprite.x = Math.trunc(x + (deltaX * progress));
            sprite.y = Math.trunc(y - (JUMP_HEIGHT * Math.abs(Math.sin(progress * Math.PI * JUMP_COUNT))) + (deltaY * progress));
        };

        const tick = (ticker: Ticker) => {
            elapsed += ticker.deltaMS;

            if (elapsed < durationMs) {
                place(elapsed / durationMs);

                return;
            }

            place(1);
            removeToolbarTransition(id);
        };

        place(0);
        GetTicker().add(tick);

        return () => {
            GetTicker().remove(tick);
        };
    }, [ transition, removeToolbarTransition ]);

    // `disposesBitmap`: the picture goes once React has taken the sprite down.
    useEffect(() => () => {
        if (transition.ownsTexture) destroyOwnedTexture(transition.texture);

        filters.forEach(filter => filter.destroy());
    }, [ transition, filters ]);

    return (
        <pixiSprite
            ref={spriteRef}
            texture={transition.texture}
            filters={filters}
            eventMode="none"
        />
    );
};

export const ToolbarTransitionsView = () => {
    const transitions = useSystemStore(x => x.toolbarTransitions);

    if (!transitions.length) return null;

    return (
        <Box
            zIndex={TRANSITIONS_Z_INDEX}
            eventMode="none"
            layout={{ position: 'absolute', left: 0, top: 0, width: 0, height: 0 }}
        >
            {transitions.map(transition => (
                <ToolbarTransitionSprite
                    key={transition.id}
                    transition={transition}
                />
            ))}
        </Box>
    );
};

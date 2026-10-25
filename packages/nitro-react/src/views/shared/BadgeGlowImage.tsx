import { Filter } from 'pixi.js';
import { useEffect, useRef } from 'react';

import { BoxLayout, FlashBitmap, FlashBitmapProps, useTextureFromUrl } from '#base/theme';

import { useBadgeGlow } from './useBadgeGlow';

const NO_FILTERS: Filter[] = [];

/**
 * The `badge_<n>` widgets of `user_view` and `new_extended_profile`: `badge_image:stretched_x` and
 * `stretched_y` false, `pivot_point` `center`. `BitmapDataRenderer.draw` puts an unstretched bitmap at
 * its own size at `int((window - bitmap) / 2)` into the window's buffer, so a badge larger than the
 * 42x42 widget (FAN_HHUK is 50x50) is cropped, never shrunk.
 */
const BADGE_IMAGE_VARS: FlashBitmapProps['vars'] = { stretchedX: false, stretchedY: false, pivot: 'center' };

export interface BadgeGlowImageProps {
    url: string | undefined;
    /** The slot's `glowColor`: -1 (the default) for a badge that never glows. */
    glowColor?: number;
    /**
     * What has its code call `playGlow(glowColor)`: each new value plays the glow once, for a badge
     * with a glow colour. Undefined plays nothing.
     */
    glowSignal?: string | number;
    layout?: BoxLayout;
}

/**
 * A `badge_image` widget's badge at its own size, centred and cropped to the widget's box, glowing as `BadgeImageWidget.playGlow` makes it
 * (`useBadgeGlow`). Setting the glow colour to -1 clears a glow under way (`set glowColor`).
 */
export const BadgeGlowImage = ({ url, glowColor = -1, glowSignal, layout }: BadgeGlowImageProps) => {
    const texture = useTextureFromUrl(url);
    const { filters, playGlow, clearGlow } = useBadgeGlow(url, !!texture);
    const playedSignal = useRef<string | number | undefined>(undefined);

    useEffect(() => {
        if (glowColor < 0) {
            clearGlow();

            return;
        }

        if ((glowSignal === undefined) || (glowSignal === playedSignal.current)) return;

        playedSignal.current = glowSignal;

        if (url) playGlow(glowColor);
    }, [ url, glowColor, glowSignal, playGlow, clearGlow ]);

    if (!texture) return null;

    return (
        <pixiContainer
            filters={filters ?? NO_FILTERS}
            eventMode="none"
            layout={{ width: '100%', height: '100%', ...layout }}
        >
            <FlashBitmap
                texture={texture}
                vars={BADGE_IMAGE_VARS}
                eventMode="none"
                layout={{ width: '100%', height: '100%' }}
            />
        </pixiContainer>
    );
};

import { NineSlice, Stretch } from '../layer';
import { ThemeVariant, ThemeVariants } from '../utils';

/** `Bubble` variants - the Flash `style` ids it draws. */
export type PointerDirection = 'up' | 'down' | 'left' | 'right';

export type BubbleVariant = ThemeVariant;

export const BUBBLE_VARIANTS: ThemeVariants<BubbleVariant> = {
    0: { layer: NineSlice('bubble-0-default-src', 5, 5, 5, 6), layout: { minWidth: 21, minHeight: 21 } },
    // ubuntu/habbo-style: plain stretch sprite, no nine-slice, no overlay.
    7: { layer: Stretch('bubble-7-default-src'), layout: { minWidth: 27, minHeight: 38 } },
};

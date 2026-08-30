import { NineSlice, Tiled } from '../layer';
import { ThemeVariants, ThemeWithStatesVariant } from '../utils';

/** `ScrollbarSliderBarVertical` variants - the Flash `style` ids it draws. */
export type ScrollbarSliderBarVerticalVariant = ThemeWithStatesVariant;

export const SCROLLBAR_SLIDER_BAR_VERTICAL_VARIANTS: ThemeVariants<ScrollbarSliderBarVerticalVariant> = {
    0: {
        states: {
            default: NineSlice('scrollbarsliderbarvertical-0-default-src', 0, 2, 0, 2),
            hovering: NineSlice('scrollbarsliderbarvertical-0-default-src', 0, 2, 0, 2),
            pressed: NineSlice('scrollbarsliderbarvertical-0-pressed-src', 0, 2, 0, 2),
        },
        // Matches the old CSS reference exactly: the draggable bar itself fills its container
        // (border-image-slice applied to the full-width nine-slice-border div); only the grip
        // *pattern* inside it is a non-repeating-horizontally 7px column, positioned 5px from
        // the bar's own left edge via background-position (`bg-position-[left_5px_top_0px]
        // bg-size-[7px_10px] bg-repeat-y` on a `inset-x-0 top-1 bottom-1` wrapper).
        overlays: {
            default: Tiled('scrollbarsliderbarvertical-0-default-grd-src', 5, 4, 4, 7),
            pressed: Tiled('scrollbarsliderbarvertical-0-pressed-grd-src', 5, 4, 4, 7),
        },
    },
    1: {
        states: {
            default: NineSlice('scrollbarsliderbarvertical-1-default-src', 0, 2, 0, 2),
            hovering: NineSlice('scrollbarsliderbarvertical-1-default-src', 0, 2, 0, 2),
            pressed: NineSlice('scrollbarsliderbarvertical-1-default-src', 0, 2, 0, 2),
        },
        overlays: {
            default: Tiled('scrollbarsliderbarvertical-1-default-grd-src', 5, 4, 4, 7),
            pressed: Tiled('scrollbarsliderbarvertical-1-pressed-grd-src', 5, 4, 4, 7),
        },
    },
    3: {
        states: {
            default: NineSlice('scrollbarsliderbarvertical-3-default-src', 0, 5, 0, 5, undefined, 'y'),
            hovering: NineSlice('scrollbarsliderbarvertical-3-hovering-src', 0, 5, 0, 5, undefined, 'y'),
            pressed: NineSlice('scrollbarsliderbarvertical-3-pressed-src', 0, 5, 0, 5, undefined, 'y'),
        },
    },
    100: {
        states: {
            default: NineSlice('scrollbarsliderbarvertical-100-default-src', 0, 4, 0, 4),
            hovering: NineSlice('scrollbarsliderbarvertical-100-default-src', 0, 4, 0, 4),
            pressed: NineSlice('scrollbarsliderbarvertical-100-default-src', 0, 4, 0, 4),
        },
    },
    200: {
        states: {
            default: NineSlice('scrollbarsliderbarvertical-200-default-src', 0, 4, 0, 4),
            hovering: NineSlice('scrollbarsliderbarvertical-200-default-src', 0, 4, 0, 4),
            pressed: NineSlice('scrollbarsliderbarvertical-200-default-src', 0, 4, 0, 4),
        },
    },
};

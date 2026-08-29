import { NineSlice, Stretch } from '../layer';
import { ThemeVariants, ThemeWithStatesVariant } from '../utils';
import { defineVariants } from './defineVariants';

/**
 * `ScrollbarSliderTrackVertical` variants - the Flash `style` ids of `scrollbar_slider_track_vertical` elements: the element description's view/colour
 * (see ./elements.ts) merged with the art layers drawn here.
 */
export type ScrollbarSliderTrackVerticalVariant = ThemeWithStatesVariant;

export const SCROLLBAR_SLIDER_TRACK_VERTICAL_VARIANTS: ThemeVariants<ScrollbarSliderTrackVerticalVariant> = defineVariants<ScrollbarSliderTrackVerticalVariant>('scrollbar_slider_track_vertical', {
    0: {
        states: {
            default: Stretch('scrollbarslidertrackvertical-0-default-src'),
        },
        layout: {
            minWidth: 17, minHeight: 1,
        },
    },
    1: {
        states: {
            default: Stretch('scrollbarslidertrackvertical-1-default-src'),
        },
        layout: {
            minWidth: 17, minHeight: 1,
        },
    },
    3: {
        states: {
            default: Stretch('scrollbarslidertrackvertical-3-default-src'),
            disabled: Stretch('scrollbarslidertrackvertical-3-disabled-src'),
        },
        layout: {
            minWidth: 17, minHeight: 2,
        },
    },
    100: {
        states: {
            default: NineSlice('scrollbarslidertrackhorizontal-100-default-src', 0, 2, 0, 2),
        },
        layout: {
            minWidth: 10, minHeight: 1,
        },
    },
    200: {
        states: {
            default: NineSlice('scrollbarslidertrackhorizontal-200-default-src', 0, 3, 0, 3),
        },
        layout: {
            minWidth: 8, minHeight: 1,
        },
    },
});

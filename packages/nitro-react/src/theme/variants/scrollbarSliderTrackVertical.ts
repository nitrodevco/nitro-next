import { NineSlice, Stretch } from '../layer';
import { ThemeVariants, ThemeWithStatesVariant } from '../utils';

/** `ScrollbarSliderTrackVertical` variants - the Flash `style` ids it draws. */
export type ScrollbarSliderTrackVerticalVariant = ThemeWithStatesVariant;

export const SCROLLBAR_SLIDER_TRACK_VERTICAL_VARIANTS: ThemeVariants<ScrollbarSliderTrackVerticalVariant> = {
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
};

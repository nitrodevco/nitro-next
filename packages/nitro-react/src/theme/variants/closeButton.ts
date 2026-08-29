import { Stretch } from '../layer';
import { ThemeVariants, ThemeWithStatesVariant } from '../utils';
import { defineVariants } from './defineVariants';

/**
 * `CloseButton` variants - the Flash `style` ids of `closebutton` elements: the element description's view/colour
 * (see ./elements.ts) merged with the art layers drawn here.
 */
export type CloseButtonVariant = ThemeWithStatesVariant;

export const CLOSE_BUTTON_VARIANTS: ThemeVariants<CloseButtonVariant> = defineVariants<CloseButtonVariant>('closebutton', {
    0: {
        states: {
            default: Stretch('closebutton-src', { x: 114, y: 0, width: 15, height: 15 }),
            hovering: Stretch('closebutton-src', { x: 129, y: 0, width: 15, height: 15 }),
            pressed: Stretch('closebutton-src', { x: 144, y: 0, width: 15, height: 15 }),
        },
    },
    1: {
        states: {
            default: Stretch('closebutton-src', { x: 159, y: 0, width: 15, height: 15 }),
            hovering: Stretch('closebutton-src', { x: 159, y: 0, width: 15, height: 15 }),
            pressed: Stretch('closebutton-src', { x: 159, y: 0, width: 15, height: 15 }),
        },
    },
    2: {
        states: {
            default: Stretch('closebutton-src', { x: 174, y: 0, width: 15, height: 15 }),
            hovering: Stretch('closebutton-src', { x: 174, y: 0, width: 15, height: 15 }),
            pressed: Stretch('closebutton-src', { x: 174, y: 0, width: 15, height: 15 }),
        },
    },
    3: {
        states: {
            default: Stretch('closebutton-src', { x: 0, y: 0, width: 19, height: 20 }),
            hovering: Stretch('closebutton-src', { x: 19, y: 0, width: 19, height: 20 }),
            pressed: Stretch('closebutton-src', { x: 38, y: 0, width: 19, height: 20 }),
        },
    },
    4: {
        states: {
            default: Stretch('closebutton-src', { x: 57, y: 0, width: 19, height: 20 }),
            hovering: Stretch('closebutton-src', { x: 76, y: 0, width: 19, height: 20 }),
            pressed: Stretch('closebutton-src', { x: 95, y: 0, width: 19, height: 20 }),
        },
    },
    // habbo_skin "menu" (button_menu) - the hamburger-style frame button
    5: {
        states: {
            default: Stretch('closebutton-5-default-src'),
            hovering: Stretch('closebutton-5-hovering-src'),
            pressed: Stretch('closebutton-5-pressed-src'),
        },
    },
    // Separate, smaller texture - the whole texture is the frame, no hover/press states.
    100: {
        states: {
            default: Stretch('closebutton-100-src'),
            hovering: Stretch('closebutton-100-src'),
            pressed: Stretch('closebutton-100-src'),
        },
    },
    // illumina frame "menu" button
    101: {
        states: {
            default: Stretch('closebutton-101-default-src'),
            hovering: Stretch('closebutton-101-hovering-src'),
            pressed: Stretch('closebutton-101-pressed-src'),
        },
    },
    // illumina purple frame close
    103: {
        states: {
            default: Stretch('closebutton-103-default-src'),
            hovering: Stretch('closebutton-103-hovering-src'),
            pressed: Stretch('closebutton-103-pressed-src'),
        },
    },
    // leaderboard frames (10000-10007 all share this close button)
    10000: {
        states: {
            default: Stretch('closebutton-10000-default-src'),
            hovering: Stretch('closebutton-10000-hovering-src'),
            pressed: Stretch('closebutton-10000-pressed-src'),
        },
    },
});

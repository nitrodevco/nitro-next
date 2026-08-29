import { NineSlice, Stretch, Tiled } from '../layer';
import { ThemeVariant, ThemeVariants } from '../utils';
import { defineVariants } from './defineVariants';

/**
 * `Header` variants - the Flash `style` ids of `header` elements: the element description's view/colour
 * (see ./elements.ts) merged with the art layers drawn here.
 */
export type HeaderVariant = ThemeVariant & {
    needsBgChip?: boolean;
};

const HEADER_0_VARIANT: HeaderVariant = {
    layer: Tiled('header-0-default-src'),
    overlay: Tiled('header-0-default-shine-src'),
    textStyle: 'text-style-frame-title',
    needsBgChip: true,
};

export const HEADER_VARIANTS: ThemeVariants<HeaderVariant> = defineVariants<HeaderVariant>('header', {
    0: {
        ...HEADER_0_VARIANT,
        tintColor: '#418db0',
        textColor: '#ffffff',
    },
    1: {
        ...HEADER_0_VARIANT,
        tintColor: '#4c4c4c',
        textColor: '#ffffff',
    },
    2: {
        ...HEADER_0_VARIANT,
        tintColor: '#fac200',
        textColor: '#ffffff',
    },
    3: {
        textStyle: 'text-style-u-frame-title',
        textColor: '#ffffff',
    },
    4: {
        layer: Stretch('header-3-default-src'),
        textStyle: 'text-style-u-frame-title',
        textColor: '#ffffff',
    },
    7: {
        textStyle: 'text-style-u-frame-title',
        textColor: '#000000',
    },
    100: {
        textStyle: 'text-style-il-frame-title',
        textColor: '#000000',
    },
    // illumina purple - the light frame's header geometry with a white title
    103: {
        textStyle: 'text-style-il-frame-title',
        textColor: '#ffffff',
    },
    // leaderboard frames - the title sits in the frame art's own 87px top band
    10000: {
        textStyle: 'text-style-il-frame-modal-title',
        textColor: '#ffffff',
    },
    200: {
        layer: NineSlice('border-200-default-src', 3, 3, 3, 3),
        textStyle: 'text-style-u-frame-title',
        textColor: '#ffffff',
    },
});

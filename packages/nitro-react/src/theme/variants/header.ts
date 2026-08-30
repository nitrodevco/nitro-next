import { NineSlice, Stretch, Tiled } from '../layer';
import { ThemeVariant, ThemeVariants } from '../utils';

/** `Header` variants - the Flash `style` ids it draws. */
export type HeaderVariant = ThemeVariant & {
    needsBgChip?: boolean;
};

const HEADER_0_VARIANT: HeaderVariant = {
    layer: Tiled('header-0-default-src'),
    overlay: Tiled('header-0-default-shine-src'),
    layout: {
        minHeight: 15,
        margin: 6,
        padding: 0,
    },
    textStyle: 'text-style-frame-title',
    needsBgChip: true,
};

export const HEADER_VARIANTS: ThemeVariants<HeaderVariant> = {
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
        layout: {
            minHeight: 33,
            paddingLeft: 6,
            paddingTop: 0,
            paddingRight: 6,
            paddingBottom: 0,
        },
        textStyle: 'text-style-u-frame-title',
        textColor: '#ffffff',
    },
    4: {
        layer: Stretch('header-3-default-src'),
        layout: {
            minHeight: 20,
            paddingLeft: 8,
            paddingTop: 1,
            paddingRight: 8,
            paddingBottom: 1,
        },
        textStyle: 'text-style-u-frame-title',
        textColor: '#ffffff',
    },
    7: {
        layout: {
            minHeight: 33,
            paddingLeft: 8,
            paddingTop: 4,
            paddingRight: 8,
            paddingBottom: 4,
        },
        textStyle: 'text-style-u-frame-title',
        textColor: '#000000',
    },
    100: {
        layout: {
            minHeight: 30,
            padding: 0,
        },
        textStyle: 'text-style-il-frame-title',
        textColor: '#000000',
    },
    // illumina purple - the light frame's header geometry with a white title
    103: {
        layout: {
            minHeight: 30,
            padding: 0,
        },
        textStyle: 'text-style-il-frame-title',
        textColor: '#ffffff',
    },
    // leaderboard frames - the title sits in the frame art's own 87px top band
    10000: {
        layout: {
            minHeight: 40,
            paddingLeft: 8,
            paddingRight: 8,
        },
        textStyle: 'text-style-il-frame-modal-title',
        textColor: '#ffffff',
    },
    200: {
        layer: NineSlice('border-200-default-src', 3, 3, 3, 3),
        layout: {
            minHeight: 30,
            padding: 0,
        },
        textStyle: 'text-style-u-frame-title',
        textColor: '#ffffff',
    },
};

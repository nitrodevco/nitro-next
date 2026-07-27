export const OverflowType = {
    all: {
        auto: 'overflow-auto',
        hidden: 'overflow-hidden',
        visible: 'overflow-visible',
        scroll: 'overflow-scroll'
    },
    x: {
        auto: 'overflow-x-auto',
        hidden: 'overflow-x-hidden',
        visible: 'overflow-x-visible',
        scroll: 'overflow-x-scroll'
    },
    y: {
        auto: 'overflow-y-auto',
        hidden: 'overflow-y-hidden',
        visible: 'overflow-y-visible',
        scroll: 'overflow-y-scroll'
    }
};

export type OverflowType = keyof typeof OverflowType.all;

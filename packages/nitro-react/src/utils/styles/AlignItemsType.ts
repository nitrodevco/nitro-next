export const AlignItemsType = {
    start: 'items-start',
    end: 'items-end',
    center: 'items-center',
    baseline: 'items-baseline',
    stretch: 'items-stretch'
};

export type AlignItemsType = keyof typeof AlignItemsType;

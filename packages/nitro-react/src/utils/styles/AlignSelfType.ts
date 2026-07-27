export const AlignSelfType = {
    auto: 'self-auto',
    start: 'self-start',
    end: 'self-end',
    center: 'self-center',
    baseline: 'self-baseline',
    stretch: 'self-stretch'
};

export type AlignSelfType = keyof typeof AlignSelfType;

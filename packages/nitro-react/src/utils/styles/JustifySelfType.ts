export const JustifySelfType = {
    auto: 'justify-self-auto',
    start: 'justify-self-start',
    end: 'justify-self-end',
    center: 'justify-self-center',
    stretch: 'justify-self-stretch'
};

export type JustifySelfType = keyof typeof JustifySelfType;

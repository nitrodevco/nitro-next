export const JustifyContentType = {
    start: 'justify-start',
    end: 'justify-end',
    center: 'justify-center',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
    stretch: 'justify-stretch',
    normal: 'justify-normal'
};

export type JustifyContentType = keyof typeof JustifyContentType;

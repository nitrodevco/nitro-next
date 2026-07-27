export const AlignContentType = {
    start: 'content-start',
    end: 'content-end',
    center: 'content-center',
    between: 'content-between',
    around: 'content-around',
    evenly: 'content-evenly',
    stretch: 'content-stretch',
    baseline: 'content-baseline'
};

export type AlignContentType = keyof typeof AlignContentType;

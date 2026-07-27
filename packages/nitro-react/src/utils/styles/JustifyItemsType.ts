export const JustifyItemsType = {
    start: 'justify-items-start',
    end: 'justify-items-end',
    center: 'justify-items-center',
    stretch: 'justify-items-stretch',
    normal: 'justify-items-normal'
};

export type JustifyItemsType = keyof typeof JustifyItemsType;

export const FlexDirectionType = {
    row: 'flex-row',
    rowReverse: 'flex-row-reverse',
    col: 'flex-col',
    colReverse: 'flex-col-reverse'
};

export type FlexDirectionType = keyof typeof FlexDirectionType;

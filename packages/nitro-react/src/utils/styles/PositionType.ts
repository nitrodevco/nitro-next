export const PositionType = {
    static: 'static',
    relative: 'relative',
    absolute: 'absolute',
    fixed: 'fixed',
    sticky: 'sticky'
};

export type PositionType = keyof typeof PositionType;

export const DisplayType = {
    block: 'block',
    inlineBlock: 'inline-block',
    inline: 'inline',
    flex: 'flex',
    inlineFlex: 'inline-flex',
    grid: 'grid',
    inlineGrid: 'inline-grid',
    contents: 'contents',
    none: 'hidden'
};

export type DisplayType = keyof typeof DisplayType;

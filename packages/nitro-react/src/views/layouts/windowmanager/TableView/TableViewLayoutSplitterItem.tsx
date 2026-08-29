import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `splitter` of TableViewLayout - pass real rows through its `items…` slot. */
export interface TableViewLayoutSplitterItemProps {
    layout?: BoxLayout;
    splitter?: ReactNode;
}

export const TableViewLayoutSplitterItem = ({ layout, splitter }: TableViewLayoutSplitterItemProps) => {
    return (
        <Region
            name="splitter"
            backgroundColor="#000000"
            layout={{ width: 440, height: 1, flexShrink: 0, ...layout }}
        >
            {splitter}
        </Region>
    );
};

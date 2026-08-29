import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `splitter` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutSplitterItemProps {
    layout?: BoxLayout;
    splitter?: ReactNode;
}

export const ChestGenericLayoutSplitterItem = ({ layout, splitter }: ChestGenericLayoutSplitterItemProps) => {
    return (
        <Region
            name="splitter"
            backgroundColor="#b0b0b0"
            layout={{ width: 429, height: 1, flexShrink: 0, ...layout }}
        >
            {splitter}
        </Region>
    );
};

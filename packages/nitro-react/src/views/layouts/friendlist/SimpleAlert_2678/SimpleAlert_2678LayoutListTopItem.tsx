import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { SimpleAlert_2678LayoutMessageItem } from './SimpleAlert_2678LayoutMessageItem';
import { SimpleAlert_2678LayoutSubtitleItem } from './SimpleAlert_2678LayoutSubtitleItem';

/** Row template `list_top` of SimpleAlert_2678Layout - pass real rows through its `items…` slot. */
export interface SimpleAlert_2678LayoutListTopItemProps {
    itemsListTop?: ReactNode;
    layout?: BoxLayout;
}

export const SimpleAlert_2678LayoutListTopItem = ({ itemsListTop, layout }: SimpleAlert_2678LayoutListTopItemProps) => {
    return (
        <Region
            name="list_top"
            layout={{ flexShrink: 0, flexDirection: 'column', ...layout }}
        >
            {itemsListTop ?? (
                <>
                    <SimpleAlert_2678LayoutSubtitleItem />
                    <SimpleAlert_2678LayoutMessageItem />
                </>
            )}
        </Region>
    );
};

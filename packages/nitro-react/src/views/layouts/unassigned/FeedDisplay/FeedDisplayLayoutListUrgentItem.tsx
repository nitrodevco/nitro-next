import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `list_urgent` of FeedDisplayLayout - pass real rows through its `items…` slot. */
export interface FeedDisplayLayoutListUrgentItemProps {
    itemsListUrgent?: ReactNode;
    layout?: BoxLayout;
}

export const FeedDisplayLayoutListUrgentItem = ({ itemsListUrgent, layout }: FeedDisplayLayoutListUrgentItemProps) => {
    return (
        <Region
            name="list_urgent"
            layout={{ flexShrink: 0, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsListUrgent}
        </Region>
    );
};

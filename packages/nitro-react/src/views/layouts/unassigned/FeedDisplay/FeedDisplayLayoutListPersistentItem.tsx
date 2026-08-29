import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `list_persistent` of FeedDisplayLayout - pass real rows through its `items…` slot. */
export interface FeedDisplayLayoutListPersistentItemProps {
    itemsListPersistent?: ReactNode;
    layout?: BoxLayout;
}

export const FeedDisplayLayoutListPersistentItem = ({ itemsListPersistent, layout }: FeedDisplayLayoutListPersistentItemProps) => {
    return (
        <Region
            name="list_persistent"
            layout={{ flexShrink: 0, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsListPersistent}
        </Region>
    );
};

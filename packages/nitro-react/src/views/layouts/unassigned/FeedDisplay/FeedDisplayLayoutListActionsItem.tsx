import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `list_actions` of FeedDisplayLayout - pass real rows through its `items…` slot. */
export interface FeedDisplayLayoutListActionsItemProps {
    itemsListActions?: ReactNode;
    layout?: BoxLayout;
}

export const FeedDisplayLayoutListActionsItem = ({ itemsListActions, layout }: FeedDisplayLayoutListActionsItemProps) => {
    return (
        <Region
            name="list_actions"
            layout={{ flexShrink: 0, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsListActions}
        </Region>
    );
};

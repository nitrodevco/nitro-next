import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `list_notifications` of FeedDisplayLayout - pass real rows through its `items…` slot. */
export interface FeedDisplayLayoutListNotificationsItemProps {
    itemsListNotifications?: ReactNode;
    layout?: BoxLayout;
}

export const FeedDisplayLayoutListNotificationsItem = ({ itemsListNotifications, layout }: FeedDisplayLayoutListNotificationsItemProps) => {
    return (
        <Region
            name="list_notifications"
            layout={{ flexShrink: 0, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsListNotifications}
        </Region>
    );
};

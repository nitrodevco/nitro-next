import { ReactNode } from 'react';

import { BoxLayout, Region, ScrollArea } from '#base/theme';

import { FeedDisplayLayoutListActionsItem } from './FeedDisplayLayoutListActionsItem';
import { FeedDisplayLayoutListNotificationsItem } from './FeedDisplayLayoutListNotificationsItem';
import { FeedDisplayLayoutListPersistentItem } from './FeedDisplayLayoutListPersistentItem';
import { FeedDisplayLayoutListUrgentItem } from './FeedDisplayLayoutListUrgentItem';

/** Named region `pane_feeds` of FeedDisplayLayout - configured through the parent's `paneFeeds` prop. */
export interface FeedDisplayLayoutPaneFeedsProps {
    itemsList?: ReactNode;
    itemsList2?: ReactNode;
    layout?: BoxLayout;
}

export const FeedDisplayLayoutPaneFeeds = ({ itemsList, itemsList2, layout }: FeedDisplayLayoutPaneFeedsProps) => {
    return (
        <Region
            name="pane_feeds"
            layout={{ position: 'absolute', left: 0, right: 0, top: 25, bottom: 50, ...layout }}
        >
            <Region
                name="pane_notifications"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 6, right: 19, top: 0, bottom: 0 }}
                >
                    <Region
                        name="list"
                        layout={{ flexDirection: 'column', width: '100%' }}
                    >
                        {itemsList ?? (
                            <>
                                <FeedDisplayLayoutListUrgentItem />
                                <FeedDisplayLayoutListActionsItem />
                                <FeedDisplayLayoutListPersistentItem />
                                <FeedDisplayLayoutListNotificationsItem />
                            </>
                        )}
                    </Region>
                </ScrollArea>
                {/* <scrollbar_vertical> for list - rendered by that list's ScrollArea */}
            </Region>
            <Region
                name="pane_stream"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 6, right: 19, top: 0, bottom: 0 }}
                >
                    <Region
                        name="list"
                        layout={{ flexDirection: 'column', width: '100%' }}
                    >
                        {itemsList2}
                    </Region>
                </ScrollArea>
                {/* <scrollbar_vertical> for list - rendered by that list's ScrollArea */}
            </Region>
        </Region>
    );
};

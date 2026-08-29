import { BoxLayout, Region } from '#base/theme';

import { FeedDisplayLayoutNotifications, FeedDisplayLayoutNotificationsProps } from './FeedDisplayLayoutNotifications';

/** Generated from `2968_feed_display_xml` (layout "feed_display", 300x510) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface FeedDisplayLayoutProps {
    layout?: BoxLayout;
    notifications?: FeedDisplayLayoutNotificationsProps;
}

export const FeedDisplayLayout = ({ layout, notifications }: FeedDisplayLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 300, height: 510, ...layout }}>
            <FeedDisplayLayoutNotifications {...notifications} />
        </Region>
    );
};

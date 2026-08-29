import { BoxLayout, Region } from '#base/theme';

import { FriendRequestsFooterLayoutFooter, FriendRequestsFooterLayoutFooterProps } from './FriendRequestsFooterLayoutFooter';

/** Generated from `1497_friend_requests_footer_xml` (layout "friend_requests_footer", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface FriendRequestsFooterLayoutProps {
    footer?: FriendRequestsFooterLayoutFooterProps;
    layout?: BoxLayout;
}

export const FriendRequestsFooterLayout = ({ footer, layout }: FriendRequestsFooterLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 20, ...layout }}>
            <FriendRequestsFooterLayoutFooter {...footer} />
        </Region>
    );
};

import { BoxLayout, Region } from '#base/theme';

import { FriendsFooterLayoutFooter, FriendsFooterLayoutFooterProps } from './FriendsFooterLayoutFooter';

/** Generated from `1527_friends_footer_xml` (layout "friends_footer", 223x41) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface FriendsFooterLayoutProps {
    footer?: FriendsFooterLayoutFooterProps;
    layout?: BoxLayout;
}

export const FriendsFooterLayout = ({ footer, layout }: FriendsFooterLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 223, height: 41, ...layout }}>
            <FriendsFooterLayoutFooter {...footer} />
        </Region>
    );
};

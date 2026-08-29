import { BoxLayout, Region } from '#base/theme';

import { FriendEntryLayoutBg, FriendEntryLayoutBgProps } from './FriendEntryLayoutBg';

/** Generated from `1526_friend_entry_xml` (layout "friend_entry", 102x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface FriendEntryLayoutProps {
    bg?: FriendEntryLayoutBgProps;
    layout?: BoxLayout;
}

export const FriendEntryLayout = ({ bg, layout }: FriendEntryLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 102, height: 20, ...layout }}>
            <FriendEntryLayoutBg {...bg} />
        </Region>
    );
};

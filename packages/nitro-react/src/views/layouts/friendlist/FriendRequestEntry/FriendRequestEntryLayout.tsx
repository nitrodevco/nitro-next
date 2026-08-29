import { BoxLayout, Region } from '#base/theme';

import { FriendRequestEntryLayoutCont26981, FriendRequestEntryLayoutCont26981Props } from './FriendRequestEntryLayoutCont26981';

/** Generated from `1509_friend_request_entry_xml` (layout "friend_request_entry", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface FriendRequestEntryLayoutProps {
    cont26981?: FriendRequestEntryLayoutCont26981Props;
    layout?: BoxLayout;
}

export const FriendRequestEntryLayout = ({ cont26981, layout }: FriendRequestEntryLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 20, ...layout }}>
            <FriendRequestEntryLayoutCont26981 {...cont26981} />
        </Region>
    );
};

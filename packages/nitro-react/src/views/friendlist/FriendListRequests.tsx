import { useFriendRequests } from '#base/context/user';
import { ScrollArea } from '#base/theme';

import { FriendListRequestsFooter } from './footers/FriendListRequestsFooter';
import { FRIEND_LIST_CONTENT_LAYOUT, FRIEND_LIST_SCROLL_LAYOUT, FRIEND_LIST_SCROLLBAR_LAYOUT } from './friendListLayout';
import { FriendListTab } from './FriendListTab';
import { FriendListRequestItem } from './items/FriendListRequestItem';

export interface FriendListRequestsProps {
    value: string;
}

/**
 * The friend requests tab (tab 2, `FriendRequestsView`), shown only while there are requests
 * (`FriendListTabsView.isTabVisible`): `hdr_friend_requests`, `0xf6f6f6` caption text, a white
 * `tab_content`. `FriendRequests.refreshShading` starts the shading on an even (`0xffeeeeee`) row.
 */
export const FriendListRequests = ({ value }: FriendListRequestsProps) => {
    const requests = useFriendRequests();
    const list = Object.values(requests);

    if (!list.length) return null;

    return (
        <FriendListTab
            value={value}
            caption="friendlist.tab.friendrequests"
            count={list.length}
            headerColors={[ '#ff9302', '#ea8000', '#914c00' ]}
            textColor="#f6f6f6"
            contentBackgroundColor="#ffffff"
            tooltip="friendlist.tip.tab.2"
        >
            <ScrollArea
                layout={FRIEND_LIST_SCROLL_LAYOUT}
                scrollbarLayout={FRIEND_LIST_SCROLLBAR_LAYOUT}
                contentLayout={FRIEND_LIST_CONTENT_LAYOUT}
            >
                {list.map((request, i) => (
                    <FriendListRequestItem
                        key={request.playerId}
                        request={request}
                        zebraColor={i % 2 === 0 ? '#eeeeee' : '#ffffff'}
                    />
                ))}
            </ScrollArea>
            <FriendListRequestsFooter />
        </FriendListTab>
    );
};

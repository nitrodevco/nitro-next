import { IMessengerFriend } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { useFriendsStore } from '#base/context/friend';
import { useConfigValue, useTranslation } from '#base/context/system';
import { useOfflineFriends, useOnlineFriends } from '#base/context/user';
import { Accordion, ScrollArea } from '#base/theme';

import { FriendListGroup } from './components/FriendListGroup';
import { FRIEND_LIST_PAGE_SIZE, FriendListPager } from './components/FriendListPager';
import { FriendListFriendsFooter } from './footers/FriendListFriendsFooter';
import { FRIEND_LIST_CONTENT_LAYOUT, FRIEND_LIST_SCROLL_LAYOUT, FRIEND_LIST_SCROLLBAR_LAYOUT } from './friendListLayout';
import { FriendListTab } from './FriendListTab';
import { FriendListFriendItem } from './items/FriendListFriendItem';

/** `FriendListLaf.getRowShadingColor(1, odd)`: white on odd rows, `0xffeeeeee` on even ones. */
const rowShading = (index: number) => ((index % 2) === 1 ? '#ffffff' : '#eeeeee');

export interface FriendListFriendsProps {
    value: string;
}

/**
 * The friends tab (tab 1, `FriendsView`): `hdr_friends`, black caption text, a white
 * `tab_content`. `refreshList` numbers every row of the list - the category rows and the friends
 * of the open categories - and shades each by that number, so the numbering runs across groups.
 * A friend's chat button shows while they are online, or while offline when the hotel keeps
 * messages for them (`isMessagesPersisted` and `persistedMessageUser` / `pocketHabboUser`); the
 * follow button only where following is allowed (`refreshFriendEntry`). A category lists a
 * hundred friends at a time, with a pager of the pages under its caption (`FriendCategory`,
 * `FriendsView.refreshPager`).
 */
export const FriendListFriends = ({ value }: FriendListFriendsProps) => {
    const filterValue = useFriendsStore(x => x.filterValue);
    const onlineFriends = useOnlineFriends();
    const offlineFriends = useOfflineFriends();
    const [ openGroups, setOpenGroups ] = useState<string[]>([ 'online' ]);
    /** `FriendCategory.pageIndex`, per category. */
    const [ pageIndexes, setPageIndexes ] = useState<Record<string, number>>({});
    const messagesPersisted = useConfigValue<boolean>('friend_list.persistent_message_status.enabled') === true;
    const t = useTranslation();

    const groups = [
        { value: 'online', caption: 'friendlist.friends', friends: onlineFriends },
        { value: 'offline', caption: 'friendlist.friends.offlinecaption', friends: offlineFriends },
    ].map((group) => {
        const friends = !filterValue ? group.friends : group.friends.filter((friend: IMessengerFriend) => friend.name.toLowerCase().includes(filterValue));
        // `FriendCategory.getPageCount` / `checkPageIndex`: a page past the end falls back to the last one.
        const pageCount = Math.ceil(friends.length / FRIEND_LIST_PAGE_SIZE);
        const pageIndex = Math.max(0, Math.min(pageIndexes[group.value] ?? 0, pageCount - 1));

        return {
            ...group,
            friends,
            pageCount,
            pageIndex,
            // `getStartFriendIndex` / `getEndFriendIndex`: only the current page's friends are listed.
            shown: friends.slice(pageIndex * FRIEND_LIST_PAGE_SIZE, (pageIndex + 1) * FRIEND_LIST_PAGE_SIZE),
        };
    });

    const rows: (typeof groups[number] & { captionIndex: number; firstFriendIndex: number })[] = [];

    for (const group of groups) {
        const previous = rows[rows.length - 1];
        const captionIndex = previous ? (previous.firstFriendIndex + (openGroups.includes(previous.value) ? previous.shown.length : 0)) : 0;

        rows.push({ ...group, captionIndex, firstFriendIndex: captionIndex + 1 });
    }

    return (
        <FriendListTab
            value={value}
            caption="friendlist.friends"
            headerColors={[ '#8adaff', '#59bfff', '#295f82' ]}
            textColor="#000000"
            contentBackgroundColor="#ffffff"
            tooltip="friendlist.tip.tab.1"
            blackArrows
        >
            <ScrollArea
                layout={FRIEND_LIST_SCROLL_LAYOUT}
                scrollbarLayout={FRIEND_LIST_SCROLLBAR_LAYOUT}
                contentLayout={FRIEND_LIST_CONTENT_LAYOUT}
            >
                <Accordion
                    unwrapped
                    type="multiple"
                    value={openGroups}
                    onValueChange={setOpenGroups}
                >
                    {rows.map(group => (
                        <FriendListGroup
                            key={group.value}
                            value={group.value}
                            color={rowShading(group.captionIndex)}
                            caption={t(group.caption) + ` (${group.friends.length})`}
                        >
                            {/* `FriendsView.refreshPager`: under an open category, from two pages on. */}
                            {(group.pageCount > 1) && (
                                <FriendListPager
                                    pageCount={group.pageCount}
                                    pageIndex={group.pageIndex}
                                    color={rowShading(group.captionIndex)}
                                    onSelectPage={page => setPageIndexes(x => ({ ...x, [group.value]: page }))}
                                />
                            )}
                            {group.shown.map((friend: IMessengerFriend, i: number) => (
                                <FriendListFriendItem
                                    key={friend.playerId}
                                    friend={friend}
                                    showFollowIcon={friend.canFollow}
                                    showMessageIcon={friend.isOnline || (messagesPersisted && (friend.persistedUser || friend.pocketHabboUser))}
                                    zebraColor={rowShading(group.firstFriendIndex + i)}
                                />
                            ))}
                        </FriendListGroup>
                    ))}
                </Accordion>
            </ScrollArea>
            <FriendListFriendsFooter />
        </FriendListTab>
    );
};

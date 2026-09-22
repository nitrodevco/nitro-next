import { IMessengerFriend } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { useFriendsStore } from '#base/context/friend';
import { useTranslation } from '#base/context/system';
import { useOfflineFriends, useOnlineFriends } from '#base/context/user';
import { Accordion, ScrollArea } from '#base/theme';

import { FriendListGroup } from './components/FriendListGroup';
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
 * A friend's chat button shows only while they are online and the follow button only where
 * following is allowed (`refreshFriendEntry`).
 */
export const FriendListFriends = ({ value }: FriendListFriendsProps) => {
    const filterValue = useFriendsStore(x => x.filterValue);
    const onlineFriends = useOnlineFriends();
    const offlineFriends = useOfflineFriends();
    const [ openGroups, setOpenGroups ] = useState<string[]>([ 'online' ]);
    const t = useTranslation();

    const groups = [
        { value: 'online', caption: 'friendlist.friends', friends: onlineFriends },
        { value: 'offline', caption: 'friendlist.friends.offlinecaption', friends: offlineFriends },
    ].map(group => ({
        ...group,
        friends: !filterValue ? group.friends : group.friends.filter((friend: IMessengerFriend) => friend.name.toLowerCase().includes(filterValue)),
    }));

    const rows: (typeof groups[number] & { captionIndex: number; firstFriendIndex: number })[] = [];

    for (const group of groups) {
        const previous = rows[rows.length - 1];
        const captionIndex = previous ? (previous.firstFriendIndex + (openGroups.includes(previous.value) ? previous.friends.length : 0)) : 0;

        rows.push({ ...group, captionIndex, firstFriendIndex: captionIndex + 1 });
    }

    return (
        <FriendListTab
            value={value}
            caption="friendlist.friends"
            count={onlineFriends.length}
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
                            {group.friends.map((friend: IMessengerFriend, i: number) => (
                                <FriendListFriendItem
                                    key={friend.playerId}
                                    friend={friend}
                                    showFollowIcon={friend.canFollow}
                                    showMessageIcon={friend.isOnline}
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

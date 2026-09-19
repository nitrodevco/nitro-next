import { IMessengerFriend } from '@nitrodevco/nitro-packets';

import { useFriendsStore } from '#base/context/friend';
import { useTranslation } from '#base/context/system';
import { useOfflineFriends, useOnlineFriends } from '#base/context/user';
import { Accordion, ScrollArea } from '#base/theme';

import { FriendListGroup } from './components/FriendListGroup';
import { FriendListFriendsFooter } from './footers/FriendListFriendsFooter';
import { FriendListTab } from './FriendListTab';
import { FriendListFriendItem } from './items/FriendListFriendItem';

export interface FriendListFriendsPixiProps {
    value: string;
}

/** Pixi port of views/friendlist/FriendListFriends.tsx. */
export const FriendListFriends = ({ value }: FriendListFriendsPixiProps) => {
    const filterValue = useFriendsStore(x => x.filterValue);
    const onlineFriends = useOnlineFriends();
    const offlineFriends = useOfflineFriends();
    const t = useTranslation();

    const groups = [
        { value: 'online', caption: 'friendlist.friends', friends: onlineFriends },
        { value: 'offline', caption: 'friendlist.friends.offlinecaption', friends: offlineFriends },
    ].map(group => ({
        ...group,
        friends: !filterValue ? group.friends : group.friends.filter((friend: IMessengerFriend) => friend.name.toLowerCase().includes(filterValue)),
    }));

    return (
        <FriendListTab
            value={value}
            caption="friendlist.friends"
            gradientColors={[ '#8adaff', '#59bfff' ]}
            tooltip="friendlist.tip.tab.1"
        >
            <ScrollArea layout={{ flex: 1 }}>
                <Accordion
                    unwrapped
                    type="multiple"
                    defaultValue={[ 'online' ]}
                >
                    {groups.map(group => (
                        <FriendListGroup
                            key={group.value}
                            value={group.value}
                            caption={t(group.caption) + ` (${group.friends.length})`}
                        >
                            {group.friends.map((friend: IMessengerFriend, i: number) => (
                                <FriendListFriendItem
                                    key={friend.playerId}
                                    friend={friend}
                                    zebraColor={i % 2 === 0 ? '#eeeeee' : '#ffffff'}
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

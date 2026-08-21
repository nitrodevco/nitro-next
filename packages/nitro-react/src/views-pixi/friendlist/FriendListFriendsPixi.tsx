import type { IMessengerFriend } from '@nitrodevco/nitro-packets';

import { useFriendsSelectors, useTranslation } from '#base/context';
import { useOfflineFriendsSelector, useOnlineFriendsSelector } from '#base/context/user';
import { Accordion, ScrollArea } from '#base/theme-pixi';

import { FriendListGroupPixi } from './components/FriendListGroupPixi';
import { FriendListFriendsFooterPixi } from './footers/FriendListFriendsFooterPixi';
import { FriendListTabPixi } from './FriendListTabPixi';
import { FriendListFriendItemPixi } from './items/FriendListFriendItemPixi';

export interface FriendListFriendsPixiProps {
    value: string;
}

/** Pixi port of views/friendlist/FriendListFriends.tsx. */
export const FriendListFriendsPixi = ({ value }: FriendListFriendsPixiProps) => {
    const { filterValue } = useFriendsSelectors();
    const onlineFriends = useOnlineFriendsSelector();
    const offlineFriends = useOfflineFriendsSelector();
    const t = useTranslation();

    const groups = [
        { value: 'online', caption: 'friendlist.friends', friends: onlineFriends },
        { value: 'offline', caption: 'friendlist.friends.offlinecaption', friends: offlineFriends },
    ].map(group => ({
        ...group,
        friends: !filterValue ? group.friends : group.friends.filter((friend: IMessengerFriend) => friend.name.toLowerCase().includes(filterValue)),
    }));

    return (
        <FriendListTabPixi value={value} caption="friendlist.friends" gradientColors={['#8adaff', '#59bfff']} tooltip="friendlist.tip.tab.1">
            <ScrollArea layout={{ flex: 1 }}>
                <Accordion unwrapped type="multiple" defaultValue={['online']}>
                    {groups.map(group => (
                        <FriendListGroupPixi key={group.value} value={group.value} caption={t(group.caption) + ` (${group.friends.length})`}>
                            {group.friends.map((friend: IMessengerFriend, i: number) => (
                                <FriendListFriendItemPixi key={friend.playerId} friend={friend} zebraColor={i % 2 === 0 ? '#eeeeee' : '#ffffff'} />
                            ))}
                        </FriendListGroupPixi>
                    ))}
                </Accordion>
            </ScrollArea>
            <FriendListFriendsFooterPixi />
        </FriendListTabPixi>
    );
};

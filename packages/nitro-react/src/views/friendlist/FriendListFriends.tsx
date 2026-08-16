import { IMessengerFriend } from "@nitrodevco/nitro-packets";

import { useFriendsSelectors, useTranslation } from "#base/context";
import { useOfflineFriendsSelector, useOnlineFriendsSelector } from "#base/context/user";
import { Accordion, ScrollArea } from "#base/theme";

import { FriendListGroup } from "./components/FriendListGroup";
import { FriendListFriendsFooter } from "./footers/FriendListFriendsFooter";
import { FriendListTab } from "./FriendListTab";
import { FriendListFriendItem } from "./items/FriendListFriendItem";

interface FriendListFriendsProps {
    value: string;
}

export const FriendListFriends = (props: FriendListFriendsProps) => {
    const { value } = props;
    const { filterValue } = useFriendsSelectors();
    const onlineFriends = useOnlineFriendsSelector();
    const offlineFriends = useOfflineFriendsSelector();
    const t = useTranslation();

    const groups = [
        {
            value: 'online',
            caption: 'friendlist.friends',
            friends: onlineFriends
        },
        {
            value: 'offline',
            caption: 'friendlist.friends.offlinecaption',
            friends: offlineFriends
        }
    ].map(group => ({
        ...group,
        friends: !filterValue ? group.friends : group.friends.filter(
            (friend: IMessengerFriend) => friend.name.toLowerCase().includes(filterValue)
        )
    }));

    return (
        <FriendListTab
            value={value}
            caption="friendlist.friends"
            triggerClassName="from-[#8adaff] to-[#59bfff]"
            tooltip="friendlist.tip.tab.1"
        >
            <ScrollArea
                className="flex-1 min-h-0 p-1 gap-1 text-[0.68rem]"
                contentClassName="flex flex-col [&>*:nth-child(odd)]:bg-[#eee] [&>*:nth-child(even)]:bg-white"
            >
                <Accordion unwrapped type="multiple" defaultValue={['online']}>
                    {groups.map(group => (
                        <FriendListGroup key={group.value} value={group.value} caption={t(group.caption) + ` (${group.friends.length})`}>
                            {group.friends.map((friend: IMessengerFriend) => <FriendListFriendItem key={friend.playerId} friend={friend} />)}
                        </FriendListGroup>
                    ))}
                </Accordion>
            </ScrollArea>
            <FriendListFriendsFooter />
        </FriendListTab>
    );
}

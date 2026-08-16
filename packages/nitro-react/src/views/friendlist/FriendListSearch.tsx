import { IMessengerSearchResult } from "@nitrodevco/nitro-packets";

import { useFriendsSelector, useTranslation } from "#base/context";
import { Accordion, ScrollArea } from "#base/theme";

import { FriendListGroup } from "./components/FriendListGroup";
import { FriendListSearchFooter } from "./footers/FriendListSearchFooter";
import { FriendListTab } from "./FriendListTab";
import { FriendListSearchItem } from "./items/FriendListSearchItem";

interface FriendListSearchProps {
    value: string;
}

interface FriendListSearchGroupData {
    value: string;
    caption: string;
    emptyCaption: string;
    results: IMessengerSearchResult[];
}

export const FriendListSearch = (props: FriendListSearchProps) => {
    const friends = useFriendsSelector();
    const t = useTranslation();

    const groups = [
        {
            value: 'friends',
            caption: 'friendlist.search.friendscaption',
            emptyCaption: 'friendlist.search.nofriendsfound',
            results: []
        },
        {
            value: 'others',
            caption: 'friendlist.search.otherscaption',
            emptyCaption: 'friendlist.search.noothersfound',
            results: []
        }
    ] as FriendListSearchGroupData[];

    const getCaption = (group: FriendListSearchGroupData) => group.results.length < 1 ? group.emptyCaption : group.caption;
    const isFriend = (result: IMessengerSearchResult) => !!Object.values(friends).find(friend => friend.playerId === result.playerId);

    return (
        <FriendListTab
            darkHeader
            value={props.value}
            caption="people.search.title"
            triggerClassName="from-[#6b6b6b] to-[#555555]"
            contentClassName="bg-[#b6b6b6]"
            tooltip="friendlist.tip.tab.3"
        >
            <ScrollArea
                className="flex-1 min-h-0 p-1 gap-1 text-[0.68rem]"
                contentClassName="flex flex-col [&>*:nth-child(odd)]:bg-[#9f9f9f]"
            >
                <Accordion type="multiple" unwrapped alwaysOpen>
                    {groups.map(group => (
                        <FriendListGroup key={group.value} value={group.value} caption={t(getCaption(group), '', { 'cnt': group.results.length.toString() })} showArrows={false}>
                            {group.results.map((result: IMessengerSearchResult) => <FriendListSearchItem key={result.playerId} isFriend={isFriend(result)} showAvatarHead={isFriend(result) && result.isOnline} result={result} />)}
                        </FriendListGroup>
                    ))}
                </Accordion>
            </ScrollArea>
            <FriendListSearchFooter />
        </FriendListTab>
    );
}

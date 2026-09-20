import { IMessengerSearchResult } from '@nitrodevco/nitro-packets';

import { useTranslation } from '#base/context/system';
import { useFriends } from '#base/context/user';
import { Accordion, ScrollArea } from '#base/theme';

import { FriendListGroup } from './components/FriendListGroup';
import { FriendListSearchFooter } from './footers/FriendListSearchFooter';
import { FriendListTab } from './FriendListTab';
import { FriendListSearchItem } from './items/FriendListSearchItem';

export interface FriendListSearchProps {
    value: string;
}

interface FriendListSearchGroupData {
    value: string;
    caption: string;
    emptyCaption: string;
    results: IMessengerSearchResult[];
}

/** Pixi port of views/friendlist/FriendListSearch.tsx. */
export const FriendListSearch = ({ value }: FriendListSearchProps) => {
    const friends = useFriends();
    const t = useTranslation();

    const groups = [
        { value: 'friends', caption: 'friendlist.search.friendscaption', emptyCaption: 'friendlist.search.nofriendsfound', results: [] },
        { value: 'others', caption: 'friendlist.search.otherscaption', emptyCaption: 'friendlist.search.noothersfound', results: [] },
    ] as FriendListSearchGroupData[];

    const getCaption = (group: FriendListSearchGroupData) => (group.results.length < 1 ? group.emptyCaption : group.caption);
    const isFriend = (result: IMessengerSearchResult) => !!Object.values(friends).find(friend => friend.playerId === result.playerId);

    return (
        <FriendListTab
            darkHeader
            value={value}
            caption="people.search.title"
            gradientColors={[ '#6b6b6b', '#555555' ]}
            contentBackgroundColor="#b6b6b6"
            tooltip="friendlist.tip.tab.3"
        >
            <ScrollArea layout={{ flex: 1 }}>
                <Accordion
                    type="multiple"
                    unwrapped
                    alwaysOpen
                >
                    {groups.map(group => (
                        <FriendListGroup
                            key={group.value}
                            value={group.value}
                            caption={t(getCaption(group), '', { cnt: group.results.length.toString() })}
                            showArrows={false}
                        >
                            {group.results.map((result: IMessengerSearchResult, i: number) => (
                                <FriendListSearchItem
                                    key={result.playerId}
                                    isFriend={isFriend(result)}
                                    showAvatarHead={isFriend(result) && result.isOnline}
                                    result={result}
                                    zebraColor={i % 2 === 0 ? '#9f9f9f' : undefined}
                                />
                            ))}
                        </FriendListGroup>
                    ))}
                </Accordion>
            </ScrollArea>
            <FriendListSearchFooter />
        </FriendListTab>
    );
};

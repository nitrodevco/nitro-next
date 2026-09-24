import { IMessengerSearchResult } from '@nitrodevco/nitro-packets';

import { askForAFriend, openProfile, showFriendLimitReachedAlert, showFriendRequestSentAlert } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useConfigValue, useTranslation } from '#base/context/system';
import { useOwnUserId, useUserStore } from '#base/context/user';
import { Accordion, ScrollArea } from '#base/theme';

import { FriendListGroup } from './components/FriendListGroup';
import { FriendListSearchFooter } from './footers/FriendListSearchFooter';
import { FRIEND_LIST_CONTENT_LAYOUT, FRIEND_LIST_SCROLL_LAYOUT, FRIEND_LIST_SCROLLBAR_LAYOUT } from './friendListLayout';
import { FriendListTab } from './FriendListTab';
import { FriendListSearchItem } from './items/FriendListSearchItem';

/** `FriendListLaf.getRowShadingColor(3, odd)`: `0xffb6b6b6` on odd rows, `0xff9f9f9f` on even ones. */
const rowShading = (index: number) => ((index % 2) === 1 ? '#b6b6b6' : '#9f9f9f');

export interface FriendListSearchProps {
    value: string;
}

interface FriendListSearchGroupData {
    value: 'friends' | 'others';
    caption: string;
    emptyCaption: string;
    results: IMessengerSearchResult[];
}

/**
 * The search tab (tab 3, `SearchView`): `hdr_search`, `0xefefef` caption text, a `0xb6b6b6`
 * `tab_content`, and one list of the friends caption, the friends found, the others caption and
 * the others found (`refreshList`, from the last `HabboSearchResultMessage` -
 * `AvatarSearchResults`), shaded by their index in it (`SearchView.refreshShading`). The tab is
 * named `${generic.search}` (`FriendListTabs`).
 *
 * A friend found gets the chat button while online, or always where the hotel keeps messages
 * (`isMessagesPersisted`); anyone else found gets the ask-for-friend button unless it is the user or
 * someone already asked. Asking goes through `askForAFriend` and answers with its alert
 * (`onAskForFriendButtonClick`); a row opens the extended profile (`onSearchEntry`). The chat
 * button starts a conversation in Flash's messenger, which is not ported, so it does nothing.
 */
export const FriendListSearch = ({ value }: FriendListSearchProps) => {
    const searchFriends = useUserStore(x => x.searchFriends);
    const searchOthers = useUserStore(x => x.searchOthers);
    const sentFriendRequestIds = useUserStore(x => x.sentFriendRequestIds);
    const ownUserId = useOwnUserId();
    const messagesPersisted = useConfigValue<boolean>('friend_list.persistent_message_status.enabled') === true;
    const { send } = useWebSocketContext();
    const t = useTranslation();

    const groups: FriendListSearchGroupData[] = [
        { value: 'friends', caption: 'friendlist.search.friendscaption', emptyCaption: 'friendlist.search.nofriendsfound', results: searchFriends },
        { value: 'others', caption: 'friendlist.search.otherscaption', emptyCaption: 'friendlist.search.noothersfound', results: searchOthers },
    ];

    const getCaption = (group: FriendListSearchGroupData) => (group.results.length < 1 ? group.emptyCaption : group.caption);
    const captionIndex = (groupIndex: number) => (groupIndex === 0 ? 0 : groups[0].results.length + 1);

    const askForFriend = (result: IMessengerSearchResult) => {
        if (askForAFriend(send, result.playerId, result.name)) showFriendRequestSentAlert(result.name);
        else showFriendLimitReachedAlert();
    };

    return (
        <FriendListTab
            value={value}
            caption="generic.search"
            count={groups[0].results.length + groups[1].results.length}
            headerColors={[ '#6b6b6b', '#555555', '#333333' ]}
            textColor="#efefef"
            contentBackgroundColor="#b6b6b6"
            tooltip="friendlist.tip.tab.3"
        >
            <ScrollArea
                layout={FRIEND_LIST_SCROLL_LAYOUT}
                scrollbarLayout={FRIEND_LIST_SCROLLBAR_LAYOUT}
                contentLayout={FRIEND_LIST_CONTENT_LAYOUT}
            >
                <Accordion
                    type="multiple"
                    unwrapped
                    alwaysOpen
                >
                    {groups.map((group, groupIndex) => (
                        <FriendListGroup
                            key={group.value}
                            value={group.value}
                            color={rowShading(captionIndex(groupIndex))}
                            caption={t(getCaption(group), '', { cnt: group.results.length.toString() })}
                            showArrows={false}
                        >
                            {group.results.map((result: IMessengerSearchResult, i: number) => (
                                <FriendListSearchItem
                                    key={result.playerId}
                                    result={result}
                                    showStartChat={(group.value === 'friends') && (result.isOnline || messagesPersisted)}
                                    showAskForFriend={(group.value === 'others') && (result.playerId !== ownUserId) && !sentFriendRequestIds.includes(result.playerId)}
                                    onAskForFriend={() => askForFriend(result)}
                                    onPress={() => openProfile(send, result.playerId)}
                                    zebraColor={rowShading(captionIndex(groupIndex) + 1 + i)}
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

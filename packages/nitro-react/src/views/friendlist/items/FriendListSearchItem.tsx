import { IMessengerSearchResult } from '@nitrodevco/nitro-packets';

import { useFriendsActions } from '#base/context/friend';
import { LayoutImage, ThemeImage } from '#base/theme';

import { FriendListItem } from '../components/FriendListItem';

export interface FriendListSearchItemProps {
    result: IMessengerSearchResult;
    isFriend: boolean;
    showAvatarHead: boolean;
    zebraColor?: string;
}

/**
 * A result's `search_entry` row (`SearchView.refreshEntry`). `SearchView` fills the row's two
 * `<bitmap>` slots from the friend list's asset library - `start_chat_png` (right 4, y 3) for
 * someone who is already a friend, `ask_for_friend_png` (right 5, y 2) otherwise. Neither is an
 * icon-set style.
 */
export const FriendListSearchItem = ({ result, isFriend, showAvatarHead, zebraColor }: FriendListSearchItemProps) => {
    const { tooltipHandlers } = useFriendsActions();
    const hover = tooltipHandlers(isFriend ? 'friendlist.tip.im' : 'friendlist.tip.addfriend');

    return (
        <FriendListItem
            entry="search_entry"
            user={result}
            showAvatarHead={showAvatarHead}
            zebraColor={zebraColor}
        >
            {isFriend
                ? (
                        <ThemeImage
                            name="start_chat"
                            src={LayoutImage('friend-list/friendlist_start_chat.png')}
                            bitmap={{}}
                            hitThreshold={10}
                            cursor="pointer"
                            onPointerOver={hover.onMouseEnter}
                            onPointerOut={hover.onMouseLeave}
                            layout={{ position: 'absolute', right: 4, top: 3, width: 16, height: 14 }}
                        />
                    )
                : (
                        <ThemeImage
                            name="ask_for_friend"
                            src={LayoutImage('friend-list/friendlist_ask_for_friend.png')}
                            bitmap={{}}
                            hitThreshold={10}
                            cursor="pointer"
                            onPointerOver={hover.onMouseEnter}
                            onPointerOut={hover.onMouseLeave}
                            layout={{ position: 'absolute', right: 5, top: 2, width: 17, height: 16 }}
                        />
                    )}
        </FriendListItem>
    );
};

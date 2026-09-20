import { IMessengerSearchResult } from '@nitrodevco/nitro-packets';

import { useFriendsActions } from '#base/context/friend';
import { Box, LayoutImage, ThemeImage } from '#base/theme';

import { FriendListItem } from '../components/FriendListItem';

export interface FriendListSearchItemPixiProps {
    result: IMessengerSearchResult;
    isFriend: boolean;
    showAvatarHead: boolean;
    zebraColor?: string;
}

/**
 * Pixi port of views/friendlist/items/FriendListSearchItem.tsx. `SearchView` fills the
 * `search_entry` row's two `<bitmap>` slots from the friend list's asset library - `start_chat_png`
 * for someone who is already a friend, `ask_for_friend_png` otherwise. Neither is an icon-set style.
 */
export const FriendListSearchItem = ({ result, isFriend, showAvatarHead, zebraColor }: FriendListSearchItemPixiProps) => {
    const { tooltipHandlers } = useFriendsActions();
    const hover = tooltipHandlers(isFriend ? 'friendlist.tip.im' : 'friendlist.tip.addfriend');

    return (
        <FriendListItem
            user={result}
            showAvatarHead={showAvatarHead}
            zebraColor={zebraColor}
        >
            <Box
                cursor="pointer"
                onPointerOver={hover.onMouseEnter}
                onPointerOut={hover.onMouseLeave}
                layout={{ marginLeft: 'auto' }}
            >
                <ThemeImage
                    name={isFriend ? 'start_chat' : 'ask_for_friend'}
                    src={LayoutImage(isFriend ? 'friend-list/friendlist_start_chat.png' : 'friend-list/friendlist_ask_for_friend.png')}
                    layout={{}}
                />
            </Box>
        </FriendListItem>
    );
};

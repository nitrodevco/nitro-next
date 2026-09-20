import { IFriendRequest } from '@nitrodevco/nitro-packets';

import { useFriendsActions } from '#base/context/friend';
import { Box, Icon } from '#base/theme';

import { FriendListItem } from '../components/FriendListItem';

export interface FriendListRequestItemProps {
    request: IFriendRequest;
    zebraColor?: string;
}

/**
 * Pixi port of views/friendlist/items/FriendListRequestItem.tsx. `friend_request_entry`'s
 * `accept` / `reject` containers hold icon-set styles 8 and 9, tinted `0x33cc00` and `0xff3333` -
 * the same pair the requests footer's accept-all / dismiss-all buttons use.
 */
export const FriendListRequestItem = ({ request, zebraColor }: FriendListRequestItemProps) => {
    const { tooltipHandlers } = useFriendsActions();
    const acceptHover = tooltipHandlers('friendlist.tip.accept');
    const declineHover = tooltipHandlers('friendlist.tip.decline');

    return (
        <FriendListItem
            user={request}
            hideAvatarElement
            zebraColor={zebraColor}
        >
            <Box
                cursor="pointer"
                onPointerOver={acceptHover.onMouseEnter}
                onPointerOut={acceptHover.onMouseLeave}
                layout={{}}
            >
                <Icon
                    name="accept"
                    variant={8}
                    tintColor="#33cc00"
                />
            </Box>
            <Box
                cursor="pointer"
                onPointerOver={declineHover.onMouseEnter}
                onPointerOut={declineHover.onMouseLeave}
                layout={{}}
            >
                <Icon
                    name="reject"
                    variant={9}
                    tintColor="#ff3333"
                />
            </Box>
        </FriendListItem>
    );
};

import { IFriendRequest } from '@nitrodevco/nitro-packets';

import { useFriendsActions } from '#base/context/friend';
import { Icon, Region } from '#base/theme';

import { FriendListItem } from '../components/FriendListItem';

export interface FriendListRequestItemProps {
    request: IFriendRequest;
    zebraColor?: string;
}

/**
 * A request's `friend_request_entry` row (`FriendRequestsView.refreshRequestEntry`): the eye at
 * x 0, the requester's name at x 17 and, for an open request, the `accept` / `reject` containers
 * at right 25 / right 0 holding icon-set styles 8 and 9, tinted `0x33cc00` and `0xff3333` - the
 * same pair the requests footer's accept-all / dismiss-all buttons use. The `info_text` a
 * handled request shows instead is not drawn: the port keeps no per-request state.
 */
export const FriendListRequestItem = ({ request, zebraColor }: FriendListRequestItemProps) => {
    const { tooltipHandlers } = useFriendsActions();
    const acceptHover = tooltipHandlers('friendlist.tip.accept');
    const declineHover = tooltipHandlers('friendlist.tip.decline');

    return (
        <FriendListItem
            entry="friend_request_entry"
            user={request}
            hideAvatarElement
            zebraColor={zebraColor}
        >
            <Region
                cursor="pointer"
                onPointerOver={acceptHover.onMouseEnter}
                onPointerOut={acceptHover.onMouseLeave}
                layout={{ position: 'absolute', right: 25, top: 4, width: 16, height: 14 }}
            >
                <Icon
                    name="icon"
                    variant={8}
                    tintColor="#33cc00"
                    layout={{ position: 'absolute', left: 0, top: 0, width: 16, height: 14 }}
                />
            </Region>
            <Region
                cursor="pointer"
                onPointerOver={declineHover.onMouseEnter}
                onPointerOut={declineHover.onMouseLeave}
                layout={{ position: 'absolute', right: 0, top: 4, width: 16, height: 14 }}
            >
                <Icon
                    name="icon"
                    variant={9}
                    tintColor="#ff3333"
                    layout={{ position: 'absolute', left: 0, top: 0, width: 16, height: 14 }}
                />
            </Region>
        </FriendListItem>
    );
};

import type { IFriendRequest } from '@nitrodevco/nitro-packets';

import { useFriendsActions } from '#base/context';
import { Box, NitroIcon } from '#base/theme-pixi';

import { FriendListItemPixi } from '../components/FriendListItemPixi';

export interface FriendListRequestItemPixiProps {
    request: IFriendRequest;
    zebraColor?: string;
}

/** Pixi port of views/friendlist/items/FriendListRequestItem.tsx. */
export const FriendListRequestItemPixi = ({ request, zebraColor }: FriendListRequestItemPixiProps) => {
    const { tooltipHandlers } = useFriendsActions();
    const acceptHover = tooltipHandlers('friendlist.tip.accept');
    const declineHover = tooltipHandlers('friendlist.tip.decline');

    return (
        <FriendListItemPixi user={request} hideAvatarElement zebraColor={zebraColor}>
            <Box eventMode="static" cursor="pointer" onPointerOver={acceptHover.onMouseEnter} onPointerOut={acceptHover.onMouseLeave} layout={{}}>
                <NitroIcon icon="icon-accept-check" layout={{}} />
            </Box>
            <Box eventMode="static" cursor="pointer" onPointerOver={declineHover.onMouseEnter} onPointerOut={declineHover.onMouseLeave} layout={{}}>
                <NitroIcon icon="icon-decline-x" layout={{}} />
            </Box>
        </FriendListItemPixi>
    );
};

import type { IMessengerSearchResult } from '@nitrodevco/nitro-packets';

import { useFriendsActions } from '#base/context';
import { Box, NitroIcon } from '#base/theme-pixi';

import { FriendListItemPixi } from '../components/FriendListItemPixi';

export interface FriendListSearchItemPixiProps {
    result: IMessengerSearchResult;
    isFriend: boolean;
    showAvatarHead: boolean;
    zebraColor?: string;
}

/** Pixi port of views/friendlist/items/FriendListSearchItem.tsx. */
export const FriendListSearchItemPixi = ({ result, isFriend, showAvatarHead, zebraColor }: FriendListSearchItemPixiProps) => {
    const { tooltipHandlers } = useFriendsActions();
    const hover = tooltipHandlers(isFriend ? 'friendlist.tip.im' : 'friendlist.tip.addfriend');

    return (
        <FriendListItemPixi user={result} showAvatarHead={showAvatarHead} zebraColor={zebraColor}>
            <Box eventMode="static" cursor="pointer" onPointerOver={hover.onMouseEnter} onPointerOut={hover.onMouseLeave} layout={{ marginLeft: 'auto' }}>
                <NitroIcon icon={isFriend ? 'icon-message-small' : 'icon-add'} layout={{}} />
            </Box>
        </FriendListItemPixi>
    );
};

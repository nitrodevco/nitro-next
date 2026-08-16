import { IMessengerSearchResult } from "@nitrodevco/nitro-packets";
import { memo } from "react";

import { useFriendsActions } from "#base/context";
import { NitroIcon } from "#base/theme";

import { FriendListItem } from "../components/FriendListItem";

interface FriendListSearchItemProps {
    result: IMessengerSearchResult;
    isFriend: boolean;
    showAvatarHead: boolean;
}

export const FriendListSearchItem = memo((props: FriendListSearchItemProps) => {
    const { result, isFriend, showAvatarHead } = props;

    const { tooltipHandlers } = useFriendsActions();

    return (
        <FriendListItem user={result} showAvatarHead={showAvatarHead}>
            {isFriend
                ? <NitroIcon className="cursor-pointer ml-auto mr-1" icon="icon-message-small" {...tooltipHandlers('friendlist.tip.im')} />
                : <NitroIcon className="cursor-pointer ml-auto mr-1" icon="icon-add" {...tooltipHandlers('friendlist.tip.addfriend')} />
            }
        </FriendListItem>
    );
});

FriendListSearchItem.displayName = 'FriendListSearchItem';

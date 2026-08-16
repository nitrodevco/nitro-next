import { IFriendRequest } from "@nitrodevco/nitro-packets";

import { useFriendsActions } from "#base/context";
import { NitroIcon } from "#base/theme";

import { FriendListItem } from "../components/FriendListItem";

interface FriendListRequestItemProps {
    request: IFriendRequest;
}

export const FriendListRequestItem = (props: FriendListRequestItemProps) => {
    const { request } = props;
    const { tooltipHandlers } = useFriendsActions();

    return (
        <FriendListItem user={request} hideAvatarElement={true}>
            <NitroIcon className="cursor-pointer" icon="icon-accept-check" {...tooltipHandlers('friendlist.tip.accept')} />
            <NitroIcon className="cursor-pointer" icon="icon-decline-x" {...tooltipHandlers('friendlist.tip.decline')} />
        </FriendListItem>
    );
};

FriendListRequestItem.displayName = 'FriendListRequestItem';

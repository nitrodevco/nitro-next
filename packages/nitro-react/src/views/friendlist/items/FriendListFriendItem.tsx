import { IMessengerFriend } from "@nitrodevco/nitro-packets";
import { memo, useRef } from "react";

import { useFriendsActions, useFriendsSelectors } from "#base/context";
import { useOutsideClick } from "#base/hooks";
import { Border, NitroIcon } from "#base/theme";

import { FriendListItem } from "../components/FriendListItem";

interface FriendListFriendItemProps {
    friend: IMessengerFriend;
    showRelationshipIcon?: boolean;
    showFollowIcon?: boolean;
    showMessageIcon?: boolean;
}

export const FriendListFriendItem = memo((props: FriendListFriendItemProps) => {
    const { friend, showRelationshipIcon = true, showFollowIcon = true, showMessageIcon = true } = props;

    const dropdownRef = useRef<HTMLDivElement>(null);

    const { relationshipDropdownId, selectedFriendIds } = useFriendsSelectors();
    const { setRelationshipDropdownId, toggleSelectedFriendId, tooltipHandlers } = useFriendsActions();

    const isSelected = selectedFriendIds.indexOf(friend.playerId) >= 0;
    const isDropdownVisible = relationshipDropdownId === friend.playerId;

    useOutsideClick(dropdownRef, () => setRelationshipDropdownId(0), isDropdownVisible);

    return (
        <FriendListItem user={friend} selected={isSelected} showAvatarHead={friend.isOnline} onClicked={() => toggleSelectedFriendId(friend.playerId)}>
            <div ref={dropdownRef} className="w-4 h-1.25 shrink-0 relative flex items-center justify-end">
                {showRelationshipIcon && <>
                    <NitroIcon className="cursor-pointer w-3.5! h-4!" icon="icon-arrow-down-black" onClick={() => setRelationshipDropdownId(isDropdownVisible ? 0 : friend.playerId)} {...tooltipHandlers('friendlist.tip.relationship')} />
                    {isDropdownVisible && <Border variant="100" className="w-7.5 p-0.5 absolute right-0 -top-1.25 bg-white rounded-lg [&>*:nth-child(odd)]:bg-[#eee]!" onClick={() => setRelationshipDropdownId(0)}>
                        <div className="cursor-pointer h-3.5"></div>
                        <div className="cursor-pointer"><NitroIcon className="cursor-pointer" icon="icon-heart-relationship" /></div>
                        <div className="cursor-pointer"><NitroIcon className="cursor-pointer" icon="icon-smile-relationship" /></div>
                        <div className="cursor-pointer"><NitroIcon className="cursor-pointer" icon="icon-bobba-relationship" /></div>
                    </Border>}
                </>}
            </div>
            <div className="w-4 h-3.5 shrink-0">
                {showFollowIcon && <NitroIcon className="cursor-pointer" icon="icon-follow" {...tooltipHandlers('friendlist.tip.follow')} />}
            </div>
            <div className="w-4 h-3.5 shrink-0">
                {showMessageIcon && <NitroIcon className="cursor-pointer" icon="icon-message-small" {...tooltipHandlers('friendlist.tip.im')} />}
            </div>
        </FriendListItem>
    );
});

FriendListFriendItem.displayName = 'FriendListFriendItem';

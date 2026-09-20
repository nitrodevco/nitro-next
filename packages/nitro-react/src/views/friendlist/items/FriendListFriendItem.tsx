import { IMessengerFriend } from '@nitrodevco/nitro-packets';
import { Container as PixiContainer } from 'pixi.js';
import { memo, useRef } from 'react';

import { useFriendsActions, useFriendsStore } from '#base/context/friend';
import { Border, Box, Icon, LayoutImage, ThemeImage, useOutsideClick } from '#base/theme';

import { FriendListItem } from '../components/FriendListItem';

/**
 * `HabboFriendList.refreshRelationshipRegion`: the `relationship_status` bitmap is one of the
 * four `relationship_status_*` library assets, picked by `relationshipStatus - 1`.
 */
const RELATIONSHIP_IMAGES = {
    heart: LayoutImage('shared/relationship_status_heart.png'),
    smile: LayoutImage('shared/relationship_status_smile.png'),
    bobba: LayoutImage('shared/relationship_status_bobba.png'),
} as const;

export interface FriendListFriendItemPixiProps {
    friend: IMessengerFriend;
    showRelationshipIcon?: boolean;
    showFollowIcon?: boolean;
    showMessageIcon?: boolean;
    zebraColor?: string;
}

/** Pixi port of views/friendlist/items/FriendListFriendItem.tsx. */
export const FriendListFriendItem = memo(({ friend, showRelationshipIcon = true, showFollowIcon = true, showMessageIcon = true, zebraColor }: FriendListFriendItemPixiProps) => {
    const dropdownRef = useRef<PixiContainer | null>(null);

    const relationshipDropdownId = useFriendsStore(x => x.relationshipDropdownId);
    const selectedFriendIds = useFriendsStore(x => x.selectedFriendIds);
    const { setRelationshipDropdownId, toggleSelectedFriendId, tooltipHandlers } = useFriendsActions();

    const isSelected = selectedFriendIds.indexOf(friend.playerId) >= 0;
    const isDropdownVisible = relationshipDropdownId === friend.playerId;

    useOutsideClick(dropdownRef, () => setRelationshipDropdownId(0), isDropdownVisible);

    const relationshipHover = tooltipHandlers('friendlist.tip.relationship');
    const followHover = tooltipHandlers('friendlist.tip.follow');
    const messageHover = tooltipHandlers('friendlist.tip.im');

    return (
        <FriendListItem
            user={friend}
            selected={isSelected}
            showAvatarHead={friend.isOnline}
            zebraColor={zebraColor}
            onPress={() => toggleSelectedFriendId(friend.playerId)}
        >
            <Box
                ref={dropdownRef}
                layout={{ position: 'relative', width: 16, height: 5, flexShrink: 0, alignItems: 'flex-end', justifyContent: 'center' }}
            >
                {showRelationshipIcon && (
                    <>
                        <Box
                            cursor="pointer"
                            onPointerTap={() => setRelationshipDropdownId(isDropdownVisible ? 0 : friend.playerId)}
                            onPointerOver={relationshipHover.onMouseEnter}
                            onPointerOut={relationshipHover.onMouseLeave}
                            layout={{}}
                        >
                            {/* `friend_entry`'s `relationship_status` > `drop`:
                                `<icon style="7" color="0x00">`, the icon set's 10x5 triangle. */}
                            <Icon
                                name="drop"
                                variant={7}
                                tintColor="#000000"
                            />
                        </Box>
                        {isDropdownVisible && (
                            <Box
                                onPointerTap={() => setRelationshipDropdownId(0)}
                                layout={{ position: 'absolute', right: 0, top: -46, width: 30 }}
                            >
                                <Border
                                    variant="100"
                                    layout={{ padding: 2, flexDirection: 'column', gap: 2 }}
                                >
                                    <Box layout={{ height: 14 }} />
                                    <Box
                                        eventMode="static"
                                        cursor="pointer"
                                        layout={{}}
                                    >
                                        <ThemeImage
                                            src={RELATIONSHIP_IMAGES.heart}
                                            layout={{}}
                                        />
                                    </Box>
                                    <Box
                                        eventMode="static"
                                        cursor="pointer"
                                        layout={{}}
                                    >
                                        <ThemeImage
                                            src={RELATIONSHIP_IMAGES.smile}
                                            layout={{}}
                                        />
                                    </Box>
                                    <Box
                                        eventMode="static"
                                        cursor="pointer"
                                        layout={{}}
                                    >
                                        <ThemeImage
                                            src={RELATIONSHIP_IMAGES.bobba}
                                            layout={{}}
                                        />
                                    </Box>
                                </Border>
                            </Box>
                        )}
                    </>
                )}
            </Box>
            <Box layout={{ width: 16, height: 14, flexShrink: 0 }}>
                {showFollowIcon && (
                    <Box
                        cursor="pointer"
                        onPointerOver={followHover.onMouseEnter}
                        onPointerOut={followHover.onMouseLeave}
                        layout={{}}
                    >
                        {/* `FriendsView.refreshFriendEntry` -> `refreshButton(_, "follow_friend")`:
                            the friend list's `follow_friend_png` library bitmap. */}
                        <ThemeImage
                            name="follow_friend"
                            src={LayoutImage('friend-list/friendlist_follow_friend.png')}
                            layout={{}}
                        />
                    </Box>
                )}
            </Box>
            <Box layout={{ width: 16, height: 14, flexShrink: 0 }}>
                {showMessageIcon && (
                    <Box
                        cursor="pointer"
                        onPointerOver={messageHover.onMouseEnter}
                        onPointerOut={messageHover.onMouseLeave}
                        layout={{}}
                    >
                        {/* `refreshButton(_, "start_chat")`: the `start_chat_png` speech bubble. */}
                        <ThemeImage
                            name="start_chat"
                            src={LayoutImage('friend-list/friendlist_start_chat.png')}
                            layout={{}}
                        />
                    </Box>
                )}
            </Box>
        </FriendListItem>
    );
});

FriendListFriendItem.displayName = 'FriendListFriendItem';

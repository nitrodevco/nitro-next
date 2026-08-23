import { IMessengerFriend } from '@nitrodevco/nitro-packets';
import { Container as PixiContainer } from 'pixi.js';
import { memo, useRef } from 'react';

import { useFriendsActions, useFriendsSelectors } from '#base/context';
import { Border, Box, NitroIcon, useOutsideClick } from '#base/theme-pixi';

import { FriendListItemPixi } from '../components/FriendListItemPixi';

export interface FriendListFriendItemPixiProps {
    friend: IMessengerFriend;
    showRelationshipIcon?: boolean;
    showFollowIcon?: boolean;
    showMessageIcon?: boolean;
    zebraColor?: string;
}

/** Pixi port of views/friendlist/items/FriendListFriendItem.tsx. */
export const FriendListFriendItemPixi = memo(({ friend, showRelationshipIcon = true, showFollowIcon = true, showMessageIcon = true, zebraColor }: FriendListFriendItemPixiProps) => {
    const dropdownRef = useRef<PixiContainer | null>(null);

    const { relationshipDropdownId, selectedFriendIds } = useFriendsSelectors();
    const { setRelationshipDropdownId, toggleSelectedFriendId, tooltipHandlers } = useFriendsActions();

    const isSelected = selectedFriendIds.indexOf(friend.playerId) >= 0;
    const isDropdownVisible = relationshipDropdownId === friend.playerId;

    useOutsideClick(dropdownRef, () => setRelationshipDropdownId(0), isDropdownVisible);

    const relationshipHover = tooltipHandlers('friendlist.tip.relationship');
    const followHover = tooltipHandlers('friendlist.tip.follow');
    const messageHover = tooltipHandlers('friendlist.tip.im');

    return (
        <FriendListItemPixi
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
                            eventMode="static"
                            cursor="pointer"
                            onPointerTap={() => setRelationshipDropdownId(isDropdownVisible ? 0 : friend.playerId)}
                            onPointerOver={relationshipHover.onMouseEnter}
                            onPointerOut={relationshipHover.onMouseLeave}
                            layout={{}}
                        >
                            <NitroIcon
                                icon="icon-arrow-down-black"
                                layout={{}}
                            />
                        </Box>
                        {isDropdownVisible && (
                            <Box
                                eventMode="static"
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
                                        <NitroIcon
                                            icon="icon-heart-relationship"
                                            layout={{}}
                                        />
                                    </Box>
                                    <Box
                                        eventMode="static"
                                        cursor="pointer"
                                        layout={{}}
                                    >
                                        <NitroIcon
                                            icon="icon-smile-relationship"
                                            layout={{}}
                                        />
                                    </Box>
                                    <Box
                                        eventMode="static"
                                        cursor="pointer"
                                        layout={{}}
                                    >
                                        <NitroIcon
                                            icon="icon-bobba-relationship"
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
                        eventMode="static"
                        cursor="pointer"
                        onPointerOver={followHover.onMouseEnter}
                        onPointerOut={followHover.onMouseLeave}
                        layout={{}}
                    >
                        <NitroIcon
                            icon="icon-follow"
                            layout={{}}
                        />
                    </Box>
                )}
            </Box>
            <Box layout={{ width: 16, height: 14, flexShrink: 0 }}>
                {showMessageIcon && (
                    <Box
                        eventMode="static"
                        cursor="pointer"
                        onPointerOver={messageHover.onMouseEnter}
                        onPointerOut={messageHover.onMouseLeave}
                        layout={{}}
                    >
                        <NitroIcon
                            icon="icon-message-small"
                            layout={{}}
                        />
                    </Box>
                )}
            </Box>
        </FriendListItemPixi>
    );
});

FriendListFriendItemPixi.displayName = 'FriendListFriendItemPixi';

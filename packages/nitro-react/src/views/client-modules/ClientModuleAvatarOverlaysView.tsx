/**
 * Not Flash's: what client modules draw over the avatars in the room (`room.avatarOverlay`) - for
 * each user's avatar, each overlay's drawing, placed over the head every room frame the way the
 * object menu and the wired value bubbles are (`useRoomObjectBubblePlacement`: the avatar's 10 px
 * gap, rising at once and sinking a few pixels a frame). Several overlays over one avatar stack
 * upwards in the order they were added. Pets and bots get none.
 *
 * The drawings sit under every window, over the room, and take no pointer.
 */
import { RoomObjectCategoryEnum, RoomObjectUserType } from '@nitrodevco/nitro-api';
import { Container as PixiContainer } from 'pixi.js';
import { ReactNode, useRef } from 'react';

import { ClientModuleAvatar, ClientModuleAvatarOverlay, useClientModulesStore } from '#base/context/client-modules';
import { useRoom, useRoomStore } from '#base/context/room';
import { useOwnUserId } from '#base/context/user';
import { useRoomObjectBubblePlacement } from '#base/hooks';
import { Box } from '#base/theme';
import { ViewErrorBoundary } from '#base/views/system/ViewErrorBoundary';

/** The heights the placement takes its maximum over: the object menu's. */
const LOCATION_STACK_SIZE = 18;

const AvatarOverlay = ({ roomIndex, children }: { roomIndex: number; children: ReactNode }) => {
    const ref = useRef<PixiContainer>(null);

    useRoomObjectBubblePlacement(ref, {
        objectId: roomIndex,
        category: RoomObjectCategoryEnum.Unit,
        isAvatar: true,
        stackSize: LOCATION_STACK_SIZE,
        onRendered: (placed) => {
            if (ref.current) ref.current.alpha = placed ? 1 : 0;
        },
    });

    return (
        <Box
            ref={ref}
            eventMode="none"
            layout={{ position: 'absolute', left: 0, top: 0, flexDirection: 'column', alignItems: 'center' }}
        >
            {children}
        </Box>
    );
};

/** One overlay's drawing, made in its own render so that its boundary catches what the module throws. */
const AvatarOverlayDrawing = ({ overlay, avatar }: { overlay: ClientModuleAvatarOverlay; avatar: ClientModuleAvatar }) => overlay.render(avatar);

export const ClientModuleAvatarOverlaysView = () => {
    const overlays = useClientModulesStore(x => x.avatarOverlays);
    const users = useRoomStore(x => x.usersByRoomObjectId);
    const ownUserId = useOwnUserId();
    const room = useRoom();

    if (!room || !overlays.length) return null;

    return (
        <>
            {Object.values(users).map((user) => {
                if (user.userType !== RoomObjectUserType.User) return null;

                const avatar: ClientModuleAvatar = { roomIndex: user.objectId, userId: user.webID, name: user.name, isOwnUser: user.webID === ownUserId };

                return (
                    <AvatarOverlay
                        key={user.objectId}
                        roomIndex={user.objectId}
                    >
                        {/* Reversed: the column's last child sits on the head, so the first overlay added is lowest. */}
                        {[ ...overlays ].reverse().map(overlay => (
                            <ViewErrorBoundary key={overlay.key}>
                                <AvatarOverlayDrawing
                                    overlay={overlay}
                                    avatar={avatar}
                                />
                            </ViewErrorBoundary>
                        ))}
                    </AvatarOverlay>
                );
            })}
        </>
    );
};

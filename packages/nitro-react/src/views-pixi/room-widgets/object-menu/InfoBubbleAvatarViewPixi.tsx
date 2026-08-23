import type { ISimpleRoomObjectData } from '@nitrodevco/nitro-api';
import { RoomControllerLevelEnum } from '@nitrodevco/nitro-api';
import { AmbassadorAlertComposer, AssignRightsComposer, BanUserWithDurationComposer, IgnoreUserComposer, KickUserComposer, MuteUserComposer, RemoveRightsComposer, SetRelationshipStatusComposer, UnignoreUserComposer } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { useOwnIsAmbassador, useOwnRespectData, useOwnRoomObjectId, useRoomPermissionsSelector, useRoomSelector, useRoomSettingsSelector, useTranslation, useWebSocketContext } from '#base/context';
import { useRoomUserData } from '#base/hooks';
import { Box, Bubble, Button, NitroIcon, Text } from '#base/theme-pixi';

export interface InfoBubbleAvatarViewPixiProps {
    objectData: ISimpleRoomObjectData;
    onClose: () => void;
}

const MODE_NORMAL = 0;
const MODE_MODERATE = 1;
const MODE_MODERATE_BAN = 2;
const MODE_MODERATE_MUTE = 3;
const MODE_AMBASSADOR = 4;
// Declared but never referenced by name in DOM's own source either: MODE_BUTTONS[5]'s only
// button (action 'ambassador_mute') isn't a handled processAction case, so nothing ever calls
// setMode(MODE_AMBASSADOR_MUTE). Kept as dead code to match DOM exactly rather than removed.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MODE_AMBASSADOR_MUTE = 5;
const MODE_RELATIONSHIP = 6;

/**
 * Pixi port of views/room-widgets/object-menu/InfoBubbleAvatarView.tsx. DOM's own
 * `MODE_BUTTONS` table has no entry for `MODE_RELATIONSHIP` (6) - the one action that sets it
 * (`relationship`) is gated behind `!canRequestFriend`, which is always false since
 * `canRequestFriend` is hardcoded `true`, so that mode is unreachable in practice. Preserved
 * exactly (including the same `MODE_BUTTONS[6]` being missing) rather than "fixed" with an
 * entry DOM itself never defines. Similarly, mode 5 (`MODE_AMBASSADOR_MUTE`) has a
 * `MODE_BUTTONS[5]` entry but is never navigated into either - see the comment above.
 */
export const InfoBubbleAvatarViewPixi = ({ objectData, onClose }: InfoBubbleAvatarViewPixiProps) => {
    const { objectId } = objectData;
    const room = useRoomSelector();
    const ownObjectId = useOwnRoomObjectId();
    const userData = useRoomUserData(objectId);
    const ownUserData = useRoomUserData(ownObjectId);
    const [ mode, setMode ] = useState<number>(MODE_NORMAL);
    const [ collapsed, setCollapsed ] = useState<boolean>(false);
    const { isRoomOwner } = useRoomPermissionsSelector();
    const { isGuildRoom } = useRoomSettingsSelector();
    const { respectLeft } = useOwnRespectData();
    const isAmbassador = useOwnIsAmbassador();
    const t = useTranslation();
    const { send } = useWebSocketContext();

    if (!room || !userData) return null;

    const processAction = (action: string) => {
        let hideMenu = true;

        switch (action) {
            case 'back':
                hideMenu = false;
                setMode(MODE_NORMAL);
                break;
            case 'moderate':
                hideMenu = false;
                setMode(MODE_MODERATE);
                break;
            case 'ban':
                hideMenu = false;
                setMode(MODE_MODERATE_BAN);
                break;
            case 'mute':
                hideMenu = false;
                setMode(MODE_MODERATE_MUTE);
                break;
            case 'ambassador':
                hideMenu = false;
                setMode(MODE_AMBASSADOR);
                break;
            case 'relationship':
                hideMenu = false;
                setMode(MODE_RELATIONSHIP);
                break;
            case 'friend':
                break;
            case 'trade':
                break;
            case 'whisper':
                break;
            case 'ignore':
                send(new IgnoreUserComposer({ userId: userData.webId }));
                break;
            case 'unignore':
                send(new UnignoreUserComposer({ name: userData.name }));
                break;
            case 'report':
                break;
            case 'kick':
            case 'ambassador_kick':
                send(new KickUserComposer({ userId: userData.webId }));
                break;
            case 'give_rights':
                send(new AssignRightsComposer({ userId: userData.webId }));
                break;
            case 'remove_rights':
                send(new RemoveRightsComposer({ userIds: [ userData.webId ] }));
                break;
            case 'ban_hour':
                send(new BanUserWithDurationComposer({ userId: userData.webId, roomId: room.roomId, banType: 'RWUAM_BAN_USER_HOUR' }));
                break;
            case 'ban_day':
                send(new BanUserWithDurationComposer({ userId: userData.webId, roomId: room.roomId, banType: 'RWUAM_BAN_USER_DAY' }));
                break;
            case 'perm_ban':
                send(new BanUserWithDurationComposer({ userId: userData.webId, roomId: room.roomId, banType: 'RWUAM_BAN_USER_PERM' }));
                break;
            case 'mute_2min':
            case 'ambassador_mute_2min':
                send(new MuteUserComposer({ userId: userData.webId, roomId: room.roomId, durationInMinutes: 2 }));
                break;
            case 'mute_5min':
                send(new MuteUserComposer({ userId: userData.webId, roomId: room.roomId, durationInMinutes: 5 }));
                break;
            case 'mute_10min':
            case 'ambassador_mute_10min':
                send(new MuteUserComposer({ userId: userData.webId, roomId: room.roomId, durationInMinutes: 10 }));
                break;
            case 'ambassador_mute_60min':
                send(new MuteUserComposer({ userId: userData.webId, roomId: room.roomId, durationInMinutes: 60 }));
                break;
            case 'ambassador_mute_18hour':
                send(new MuteUserComposer({ userId: userData.webId, roomId: room.roomId, durationInMinutes: 1080 }));
                break;
            case 'ambassador_alert':
                send(new AmbassadorAlertComposer({ userId: userData.webId }));
                break;
            case 'rship_heart':
                send(new SetRelationshipStatusComposer({ playerId: userData.webId, relationshipType: 1 }));
                break;
            case 'rship_smile':
                send(new SetRelationshipStatusComposer({ playerId: userData.webId, relationshipType: 2 }));
                break;
            case 'rship_bobba':
                send(new SetRelationshipStatusComposer({ playerId: userData.webId, relationshipType: 3 }));
                break;
            case 'rship_none':
                send(new SetRelationshipStatusComposer({ playerId: userData.webId, relationshipType: 0 }));
                break;
        }

        if (hideMenu && onClose) onClose();
    };

    const canRequestFriend = true;
    const canGiveRights = isRoomOwner && userData.controllerLevel < RoomControllerLevelEnum.Guest && !isGuildRoom;
    const canRemoveRights = isRoomOwner && userData.controllerLevel === RoomControllerLevelEnum.Guest && !isGuildRoom;
    const canModerate = userData.canBeKicked || userData.canBeBanned || userData.canBeMuted || canGiveRights || canRemoveRights;

    const MODE_BUTTONS: Record<number, { visible: unknown; caption: string; action: string }[]> = {
        0: [
            { visible: canRequestFriend, caption: 'infostand.button.friend', action: 'friend' },
            { visible: true, caption: 'infostand.button.trade', action: 'trade' },
            { visible: true, caption: 'infostand.button.whisper', action: 'whisper' },
            { visible: respectLeft > 0, caption: t('infostand.button.respect', '', { count: respectLeft.toString() }), action: 'respect' },
            { visible: !canRequestFriend, caption: 'infostand.link.relationship', action: 'relationship' },
            { visible: !userData.isIgnored, caption: 'infostand.button.ignore', action: 'ignore' },
            { visible: userData.isIgnored, caption: 'infostand.button.unignore', action: 'unignore' },
            { visible: true, caption: 'infostand.button.report', action: 'report' },
            { visible: canModerate, caption: 'infostand.link.moderate', action: 'moderate' },
            { visible: isAmbassador, caption: 'infostand.link.ambassador', action: 'ambassador' },
            { visible: ownUserData && ownUserData.carryItem > 0, caption: 'avatar.widget.pass_hand_item', action: 'pass_hand_item' },
        ],
        1: [
            { visible: userData.canBeKicked, caption: 'infostand.button.kick', action: 'kick' },
            { visible: userData.canBeMuted, caption: 'infostand.button.mute', action: 'mute' },
            { visible: userData.canBeBanned, caption: 'infostand.button.ban', action: 'ban' },
            { visible: canGiveRights, caption: 'infostand.button.giverights', action: 'give_rights' },
            { visible: canRemoveRights, caption: 'infostand.button.removerights', action: 'remove_rights' },
            { visible: true, caption: 'generic.back', action: 'back' },
        ],
        2: [
            { visible: true, caption: 'infostand.button.ban_hour', action: 'ban_hour' },
            { visible: true, caption: 'infostand.button.ban_day', action: 'ban_day' },
            { visible: true, caption: 'infostand.button.perm_ban', action: 'perm_ban' },
            { visible: true, caption: 'generic.back', action: 'moderate' },
        ],
        3: [
            { visible: true, caption: 'infostand.button.mute_2min', action: 'mute_2min' },
            { visible: true, caption: 'infostand.button.mute_5min', action: 'mute_5min' },
            { visible: true, caption: 'infostand.button.mute_10min', action: 'mute_10min' },
            { visible: true, caption: 'generic.back', action: 'moderate' },
        ],
        4: [
            { visible: true, caption: 'infostand.button.alert', action: 'ambassador_alert' },
            { visible: true, caption: 'infostand.button.kick', action: 'ambassador_kick' },
            { visible: true, caption: 'infostand.button.mute', action: 'ambassador_mute' },
            { visible: true, caption: 'generic.back', action: 'back' },
        ],
        5: [
            { visible: true, caption: 'infostand.button.mute_2min', action: 'ambassador_mute_2min' },
            { visible: true, caption: 'infostand.button.mute_10min', action: 'ambassador_mute_10min' },
            { visible: true, caption: 'infostand.button.mute_18hour', action: 'ambassador_mute_18hr' },
            { visible: true, caption: 'generic.back', action: 'ambassador' },
        ],
    };

    return (
        <Bubble
            variant="0"
            tintColor="#6e6b67"
            layout={{ flexDirection: 'column' }}
        >
            {!collapsed && (
                <Box layout={{ minWidth: 120, maxWidth: 120, flexDirection: 'column', marginLeft: 1, marginRight: 1 }}>
                    <Box layout={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', minHeight: 24, maxHeight: 24 }}>
                        <Text
                            text={userData.name}
                            textStyle="text-style-u-bold"
                            textOptions={{ fontSize: 11, fill: '#ffffff' }}
                        />
                    </Box>
                    <Box layout={{ flexDirection: 'column', width: '100%', gap: 1 }}>
                        {MODE_BUTTONS[mode].map(({ visible, caption, action }) => (
                            visible
                                ? (
                                        <Button
                                            key={action}
                                            variant="300"
                                            tintColor="#2d2a27"
                                            textColor="#ffffff"
                                            onPress={() => processAction(action)}
                                            layout={{ minHeight: 25, maxHeight: 25, width: '100%' }}
                                        >
                                            {t(caption)}
                                        </Button>
                                    )
                                : null
                        ))}
                    </Box>
                </Box>
            )}
            <Box
                eventMode="static"
                cursor="pointer"
                onPointerTap={() => setCollapsed(!collapsed)}
                layout={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', minHeight: 18, maxHeight: 18, padding: 8, width: '100%' }}
            >
                <NitroIcon
                    icon={!collapsed ? 'icon-context-menu-arrow-down' : 'icon-context-menu-arrow-up'}
                    layout={{}}
                />
            </Box>
        </Bubble>
    );
};

import { ISimpleRoomObjectData, RoomControllerLevelEnum } from '@nitrodevco/nitro-api';
import { useState } from 'react';

import { ambassadorAlert, banUser, giveRights, ignoreUser, kickUser, muteUser, openProfile, passCarryItem, RELATIONSHIP_BOBBA, RELATIONSHIP_HEART, RELATIONSHIP_NONE, RELATIONSHIP_SMILE, replenishRespect, respectUser, sendFriendRequest, setRelationship, startTrading, takeRights, unignoreUser, unmuteUser, whisperUser } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useOwnRoomObjectId, useRoomStore } from '#base/context/room';
import { useConfigValue, useTranslation } from '#base/context/system';
import { useOwnIsAmbassador, useUserStore } from '#base/context/user';
import { useRoomUserData } from '#base/hooks';
import { Box, Bubble, Button, ContainerButton, LayoutImage, NitroIcon, ThemeImage, ThemeText } from '#base/theme';

export interface InfoBubbleAvatarViewProps {
    objectData: ISimpleRoomObjectData;
    onClose: () => void;
}

/** `AvatarMenuView` modes. */
const MODE_ACTIONS = 1;
const MODE_MODERATE = 2;
const MODE_BAN = 4;
const MODE_MUTE = 5;
const MODE_RELATIONSHIP = 6;
const MODE_AMBASSADOR = 7;

/** A carried item id at or above this is not something that can be handed on. */
const MAX_CARRY_ITEM = 999999;

const RELATIONSHIP_ICONS: Record<number, string> = {
    [RELATIONSHIP_HEART]: 'relationship_status_heart.png',
    [RELATIONSHIP_SMILE]: 'relationship_status_smile.png',
    [RELATIONSHIP_BOBBA]: 'relationship_status_bobba.png',
};

type MenuButton = {
    key: string;
    caption: string;
    visible: boolean;
    /** Keeps the menu up after the press; everything else closes it, as Flash did. */
    staysOpen?: boolean;
    onPress: () => void;
};

/**
 * The menu over another user - `AvatarMenuView`, on the `avatar_menu_widget` layout. The name
 * opens their profile; the buttons act on them through the same actions the infostand uses, and
 * the moderation, ban, mute, relationship and ambassador sets are sub-pages of the one menu.
 */
export const InfoBubbleAvatarView = ({ objectData, onClose }: InfoBubbleAvatarViewProps) => {
    const { objectId } = objectData;
    const info = useRoomUserData(objectId);
    const ownInfo = useRoomUserData(useOwnRoomObjectId());
    const [ mode, setMode ] = useState(MODE_ACTIONS);
    const [ collapsed, setCollapsed ] = useState(false);
    const respectLeft = useUserStore(x => x.respectLeft);
    const respectReplenishesLeft = useUserStore(x => x.respectReplenishesLeft ?? 0);
    const accountSafetyLocked = useUserStore(x => x.accountSafetyLocked);
    const isAmbassador = useOwnIsAmbassador();
    const isPlayingGame = useRoomStore(x => x.isPlayingGame);
    const citizenshipTrack = useConfigValue<boolean>('talent.track.citizenship.enabled') ?? false;
    // `AvatarMenuView`: the config flag, and not while the room's configuration items block hand item control.
    const isHanditemControlBlocked = useRoomStore(x => x.isHanditemControlBlocked);
    const handItemGiveEnabled = (useConfigValue<boolean>('handitem.give.enabled') ?? true) && !isHanditemControlBlocked;
    const relationshipsEnabled = useConfigValue<boolean>('relationship.status.enabled') ?? true;
    const replenishCost = useConfigValue<number>('respect.replenish_cost_duckets') ?? 50;
    const t = useTranslation();
    const { send } = useWebSocketContext();

    if (!info || isPlayingGame) return null;

    const { webId, isBlocked } = info;
    const canGiveRights = info.amIOwner && (info.targetControllerLevel < RoomControllerLevelEnum.Guest);
    const canRemoveRights = info.amIOwner && (info.targetControllerLevel === RoomControllerLevelEnum.Guest);
    const canModerate = info.canBeKicked || info.canBeBanned || info.canBeMuted || canGiveRights || canRemoveRights;
    const ownCarryItem = ownInfo?.carryItem ?? 0;

    const action = (key: string, caption: string, visible: boolean, onPress: () => void, staysOpen = false): MenuButton => ({ key, caption, visible, onPress, staysOpen });
    const toMode = (next: number) => () => setMode(next);

    const buttons: Record<number, MenuButton[]> = {
        [MODE_ACTIONS]: [
            action('open_profile', t('infostand.button.open_profile'), isBlocked, () => openProfile(send, webId)),
            action('friend', t('infostand.button.friend'), info.canBeAskedAsFriend && !isBlocked, () => sendFriendRequest(send, webId, info.name)),
            action('trade', t('infostand.button.trade'), citizenshipTrack || (!accountSafetyLocked && info.canTrade && !isBlocked), () => startTrading(send, objectId)),
            action('whisper', t('infostand.button.whisper'), !isBlocked, () => whisperUser(info.name)),
            // Each respect keeps the menu up while there is another to give.
            action('respect', t('infostand.button.respect', '', { count: respectLeft.toString() }), (respectLeft > 0) && !isBlocked, () => respectUser(send, webId), respectLeft > 1),
            action('replenish_respect', t('infostand.button.replenish_respect'), (respectLeft <= 0) && (respectReplenishesLeft > 0) && !isBlocked, () => replenishRespect(send, t, replenishCost)),
            action('relationship', t('infostand.link.relationship'), relationshipsEnabled && info.isFriend && !isBlocked, toMode(MODE_RELATIONSHIP), true),
            action('unignore', t('infostand.button.unignore'), info.isIgnored && !isBlocked, () => unignoreUser(send, webId)),
            action('ignore', t('infostand.button.ignore'), !info.isIgnored && !isBlocked, () => ignoreUser(send, webId)),
            action('moderate', t('infostand.link.moderate'), canModerate, toMode(MODE_MODERATE), true),
            action('pass_handitem', t('avatar.widget.pass_hand_item'), handItemGiveEnabled && (ownCarryItem > 0) && (ownCarryItem < MAX_CARRY_ITEM), () => passCarryItem(send, webId)),
            action('ambassador', t('infostand.link.ambassador'), isAmbassador, toMode(MODE_AMBASSADOR), true),
        ],
        [MODE_MODERATE]: [
            action('kick', t('infostand.button.kick'), info.canBeKicked, () => kickUser(send, webId)),
            action('mute', t('infostand.button.mute'), info.canBeMuted, toMode(MODE_MUTE), true),
            action('ban_with_duration', t('infostand.button.ban'), info.canBeBanned, toMode(MODE_BAN), true),
            action('give_rights', t('infostand.button.giverights'), canGiveRights, () => giveRights(send, webId)),
            action('remove_rights', t('infostand.button.removerights'), canRemoveRights, () => takeRights(send, webId)),
            action('actions', t('infostand.link.actions'), true, toMode(MODE_ACTIONS), true),
        ],
        [MODE_BAN]: [
            action('ban_hour', t('infostand.button.ban_hour'), true, () => banUser(send, webId, 'RWUAM_BAN_USER_HOUR')),
            action('ban_day', t('infostand.button.ban_day'), true, () => banUser(send, webId, 'RWUAM_BAN_USER_DAY')),
            action('perm_ban', t('infostand.button.perm_ban'), true, () => banUser(send, webId, 'RWUAM_BAN_USER_PERM')),
            action('actions', t('infostand.link.actions'), true, toMode(MODE_ACTIONS), true),
        ],
        [MODE_MUTE]: [
            action('mute_2min', t('infostand.button.mute_2min'), true, () => muteUser(send, webId, 2)),
            action('mute_5min', t('infostand.button.mute_5min'), true, () => muteUser(send, webId, 5)),
            action('mute_10min', t('infostand.button.mute_10min'), true, () => muteUser(send, webId, 10)),
            action('actions', t('infostand.link.actions'), true, toMode(MODE_ACTIONS), true),
        ],
        [MODE_RELATIONSHIP]: [
            action('no_relationship', t('avatar.widget.clear_relationship'), true, () => setRelationship(send, webId, RELATIONSHIP_NONE)),
            action('actions', t('infostand.link.actions'), true, toMode(MODE_ACTIONS), true),
        ],
        [MODE_AMBASSADOR]: [
            action('ambassador_alert', t('infostand.ambassador.alert'), true, () => ambassadorAlert(send, webId)),
            action('ambassador_kick', t('infostand.button.kick'), true, () => kickUser(send, webId)),
            action('ambassador_mute_15min', t('infostand.button.mute_15min'), true, () => muteUser(send, webId, 15)),
            action('ambassador_mute_60min', t('infostand.button.mute_60min'), true, () => muteUser(send, webId, 60)),
            action('ambassador_mute_18hour', t('infostand.button.mute_18hour'), true, () => muteUser(send, webId, 1080)),
            action('ambassador_mute_36hour', t('infostand.button.mute_36hour'), true, () => muteUser(send, webId, 2160)),
            action('ambassador_mute_72hour', t('infostand.button.mute_72hour'), true, () => muteUser(send, webId, 4320)),
            action('ambassador_unmute', t('infostand.button.unmute'), true, () => unmuteUser(send, webId)),
            action('actions', t('infostand.link.actions'), true, toMode(MODE_ACTIONS), true),
        ],
    };

    const press = (button: MenuButton) => {
        button.onPress();

        if (!button.staysOpen) onClose();
    };

    const relationshipIcon = RELATIONSHIP_ICONS[info.relationshipStatus];

    return (
        <Bubble
            variant="0"
            tintColor="#6e6b67"
            layout={{ flexDirection: 'column' }}
        >
            {!collapsed && (
                <Box layout={{ minWidth: 137, maxWidth: 137, flexDirection: 'column', marginLeft: 1, marginRight: 1 }}>
                    <Box
                        cursor="pointer"
                        onPointerTap={() => {
                            openProfile(send, webId);
                            onClose();
                        }}
                        layout={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, minHeight: 24, maxHeight: 24 }}
                    >
                        {relationshipIcon && (
                            <ThemeImage
                                src={LayoutImage(relationshipIcon)}
                                layout={{ width: 16, height: 14 }}
                            />
                        )}
                        <ThemeText
                            text={isBlocked ? t('infostand.blocked_user') : info.name}
                            textStyle={isBlocked ? 'text-style-u-regular' : 'text-style-u-bold'}
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Box>
                    <Box layout={{ width: '100%', height: 1, marginBottom: 3 }} />
                    <Box layout={{ flexDirection: 'column', width: '100%', gap: 1 }}>
                        {(mode === MODE_RELATIONSHIP) && (
                            <Box layout={{ flexDirection: 'row', width: '100%', gap: 1 }}>
                                {[ RELATIONSHIP_HEART, RELATIONSHIP_SMILE, RELATIONSHIP_BOBBA ].map(relationship => (
                                    <ContainerButton
                                        key={relationship}
                                        variant="0"
                                        tintColor="#2d2a27"
                                        onPointerTap={() => {
                                            setRelationship(send, webId, relationship);
                                            onClose();
                                        }}
                                        layout={{ flex: 1, height: 25, alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <ThemeImage
                                            src={LayoutImage(RELATIONSHIP_ICONS[relationship])}
                                            layout={{ width: 16, height: 14 }}
                                        />
                                    </ContainerButton>
                                ))}
                            </Box>
                        )}
                        {buttons[mode].filter(button => button.visible).map(button => (
                            <Button
                                key={button.key}
                                variant="300"
                                tintColor="#2d2a27"
                                textColor="#ffffff"
                                onPointerTap={() => press(button)}
                                layout={{ minHeight: 25, maxHeight: 25, width: '100%' }}
                            >
                                {button.caption}
                            </Button>
                        ))}
                    </Box>
                </Box>
            )}
            <Box
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

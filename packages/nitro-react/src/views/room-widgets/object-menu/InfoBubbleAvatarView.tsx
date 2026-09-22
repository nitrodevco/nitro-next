import { ISimpleRoomObjectData, RoomControllerLevelEnum } from '@nitrodevco/nitro-api';
import { useState } from 'react';

import { ambassadorAlert, banUser, giveRights, ignoreUser, kickUser, muteUser, openClientLink, openProfile, passCarryItem, RELATIONSHIP_BOBBA, RELATIONSHIP_HEART, RELATIONSHIP_NONE, RELATIONSHIP_SMILE, replenishRespect, respectUser, sendFriendRequest, setRelationship, startTrading, takeRights, unignoreUser, unmuteUser, whisperUser } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useOwnRoomObjectId, useRoomIsPlayingGame, useRoomStore } from '#base/context/room';
import { useConfigValue, useTranslation } from '#base/context/system';
import { useOwnIsAmbassador, useUserStore } from '#base/context/user';
import { useWiredShowInspectButton } from '#base/context/wired';
import { TRADE_REASON_ROOM, TRADE_REASON_SHUTDOWN, useRoomUserData } from '#base/hooks';
import { Box, LayoutImage, Region, ThemeImage, ThemeText } from '#base/theme';

import { InfoBubbleMenuButton, MENU_MODERATION_COLOR } from './InfoBubbleMenuButton';
import { InfoBubbleMenuFrame } from './InfoBubbleMenuFrame';
import { AVATAR_MENU_GEOMETRY } from './InfoBubbleMenuGeometry';

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

/** `avatar_menu_widget`'s rows are 137 wide; the relationship grid's cells 45 by 25. */
const ROW_WIDTH = 137;
const ROW_HEIGHT = 26;
const GRID_CELL_WIDTH = 45;
const GRID_HEIGHT = 25;

/** The rows the layout tags `moderate` or `ambassador` - their labels are `0xff8133`. */
const MODERATION_ROWS = [ 'kick', 'mute', 'mute_2min', 'mute_5min', 'mute_10min', 'ban_with_duration', 'ban_hour', 'ban_day', 'perm_ban', 'give_rights', 'remove_rights', 'unignore', 'ignore', 'ambassador_alert', 'ambassador_kick', 'ambassador_mute_15min', 'ambassador_mute_60min', 'ambassador_mute_18hour', 'ambassador_mute_36hour', 'ambassador_mute_72hour', 'ambassador_unmute' ];
/** The rows carrying `arrow_right` - each opens a sub-page. */
const SUBMENU_ROWS = [ 'relationship', 'mute', 'ban_with_duration', 'moderate', 'ambassador' ];

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
 *
 * Each page lists its rows in the layout's child order (`updateButtons` only shows and hides
 * them). The layout's `blow`, `perform`, `report` and `donate_*` rows are not offered: the port
 * has no action behind them.
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
    const isPlayingGame = useRoomIsPlayingGame();
    const citizenshipTrack = useConfigValue<boolean>('talent.track.citizenship.enabled') ?? false;
    // `AvatarMenuView`: the config flag, and not while the room's configuration items block hand item control.
    const isHanditemControlBlocked = useRoomStore(x => x.isHanditemControlBlocked);
    const handItemGiveEnabled = (useConfigValue<boolean>('handitem.give.enabled') ?? true) && !isHanditemControlBlocked;
    const relationshipsEnabled = useConfigValue<boolean>('relationship.status.enabled') ?? true;
    const replenishCost = useConfigValue<number>('respect.replenish_cost_duckets') ?? 50;
    const showWiredInspect = useWiredShowInspectButton();
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
            // `RWUAM_WIRED_INSPECT`: the wired menu's inspection of this user.
            action('wired_inspect', t('infostand.button.wired_inspect'), showWiredInspect, () => openClientLink(send, `wiredmenu/open/inspection/1/${objectId}`)),
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
    const visibleButtons = buttons[mode].filter(button => button.visible);
    const showsGrid = (mode === MODE_RELATIONSHIP);
    const rowHeights = [ ...(showsGrid ? [ GRID_HEIGHT ] : []), ...visibleButtons.map(() => ROW_HEIGHT) ];
    // `updateButtons`: the trade button's tooltip says why trading is off.
    const tradeTooltip = (info.canTradeReason === TRADE_REASON_SHUTDOWN)
        ? t('infostand.button.trade.tooltip.shutdown')
        : ((info.canTradeReason === TRADE_REASON_ROOM) ? t('infostand.button.trade.tooltip.tradingroom') : undefined);

    return (
        <InfoBubbleMenuFrame
            geometry={AVATAR_MENU_GEOMETRY}
            rowHeights={rowHeights}
            collapsed={collapsed}
            onToggleCollapsed={() => setCollapsed(!collapsed)}
            header={(
                <Region
                    name="profile_link"
                    cursor="pointer"
                    onPointerTap={() => {
                        openProfile(send, webId);
                        onClose();
                    }}
                    layout={{ position: 'absolute', left: 0, top: 7, width: 143, height: 16, flexDirection: 'row', justifyContent: 'center' }}
                >
                    {/* `name`: `u_bold` at `font_size` 11, centred; a blocked user is the italic `infostand.blocked_user`. */}
                    <ThemeText
                        text={isBlocked ? t('infostand.blocked_user') : info.name}
                        textStyle="u_bold"
                        textOptions={{ fill: '#ffffff', fontSize: 11 }}
                        flashFormat={isBlocked ? { italic: true } : undefined}
                        name="name"
                        verticalAlign="top"
                    />
                    {relationshipIcon && (
                        <ThemeImage
                            name="relationship_status"
                            src={LayoutImage(`shared/${relationshipIcon}`)}
                            bitmap={{ stretchedX: false, stretchedY: false }}
                            layout={{ position: 'absolute', left: 5, top: 1, width: 16, height: 14 }}
                        />
                    )}
                </Region>
            )}
        >
            {showsGrid && (
                <Box layout={{ flexDirection: 'row', width: ROW_WIDTH, height: GRID_HEIGHT, gap: 1, flexShrink: 0 }}>
                    {[ RELATIONSHIP_HEART, RELATIONSHIP_SMILE, RELATIONSHIP_BOBBA ].map(relationship => (
                        <InfoBubbleMenuButton
                            key={relationship}
                            shape="grid"
                            width={GRID_CELL_WIDTH}
                            height={GRID_HEIGHT}
                            onPress={() => {
                                setRelationship(send, webId, relationship);
                                onClose();
                            }}
                        >
                            {/* The 49x17 `static_bitmap` over the button, its art centred and never stretched. */}
                            <ThemeImage
                                src={LayoutImage(`shared/${RELATIONSHIP_ICONS[relationship]}`)}
                                bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                                layout={{ width: GRID_CELL_WIDTH + 4, height: 17 }}
                            />
                        </InfoBubbleMenuButton>
                    ))}
                </Box>
            )}
            {visibleButtons.map(button => (
                <InfoBubbleMenuButton
                    key={button.key}
                    width={ROW_WIDTH}
                    caption={button.caption}
                    captionColor={MODERATION_ROWS.includes(button.key) ? MENU_MODERATION_COLOR : undefined}
                    arrow={SUBMENU_ROWS.includes(button.key) ? 'right' : ((button.key === 'actions') ? 'left' : undefined)}
                    tooltip={(button.key === 'trade') ? tradeTooltip : undefined}
                    adornment={(button.key === 'replenish_respect') && (
                        <ThemeImage
                            src={LayoutImage('shared/pursearea_duckets_icon.png')}
                            bitmap={{ stretchedX: false, stretchedY: false, etchingColor: 0x48000000 }}
                            dynamicRole="icon"
                            layout={{ position: 'absolute', left: 110, top: 10, width: 15, height: 15 }}
                        />
                    )}
                    onPress={() => press(button)}
                />
            ))}
        </InfoBubbleMenuFrame>
    );
};

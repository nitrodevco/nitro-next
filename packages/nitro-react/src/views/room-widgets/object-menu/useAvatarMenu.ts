import { ISimpleRoomObjectData, RoomControllerLevelEnum } from '@nitrodevco/nitro-api';
import { useState } from 'react';

import { ambassadorAlert, askForAFriend, banUser, giveRights, ignoreUser, kickUser, muteUser, openClientLink, openProfile, passCarryItem, RELATIONSHIP_BOBBA, RELATIONSHIP_HEART, RELATIONSHIP_NONE, RELATIONSHIP_SMILE, replenishRespect, respectUser, setRelationship, startTrading, takeRights, unignoreUser, unmuteUser, whisperUser } from '#base/commands';
import { reportUser } from '#base/commands/helpCommands';
import { useWebSocketContext } from '#base/context/communication';
import { useOwnRoomObjectId, useRoomIsPlayingGame, useRoomStore } from '#base/context/room';
import { useConfigValue, useTranslation } from '#base/context/system';
import { useOwnIsAmbassador, useUserStore } from '#base/context/user';
import { useWiredShowInspectButton } from '#base/context/wired';
import { TRADE_REASON_ROOM, TRADE_REASON_SHUTDOWN, useRoomUserData } from '#base/hooks';

/** `AvatarMenuView` modes. */
export const MODE_ACTIONS = 1;
export const MODE_MODERATE = 2;
export const MODE_BAN = 4;
export const MODE_MUTE = 5;
export const MODE_RELATIONSHIP = 6;
export const MODE_AMBASSADOR = 7;

/** A carried item id at or above this is not something that can be handed on. */
const MAX_CARRY_ITEM = 999999;

/** The relationship grid's statuses, in the layout's cell order. */
export const RELATIONSHIPS = [ RELATIONSHIP_HEART, RELATIONSHIP_SMILE, RELATIONSHIP_BOBBA ];

export const RELATIONSHIP_ICONS: Record<number, string> = {
    [RELATIONSHIP_HEART]: 'relationship_status_heart.png',
    [RELATIONSHIP_SMILE]: 'relationship_status_smile.png',
    [RELATIONSHIP_BOBBA]: 'relationship_status_bobba.png',
};

export type MenuButton = {
    /** The row's name in `avatar_menu_widget`'s `buttons` list. */
    key: string;
    caption: string;
    visible: boolean;
    /** Keeps the menu up after the press; everything else closes it, as Flash did. */
    staysOpen?: boolean;
    onPress: () => void;
};

/**
 * What `AvatarMenuView` shows over another user and what each button does: its modes, every row's
 * `updateButtons` condition and action, the trade button's tooltip. `undefined` while the user has
 * no data or a game is being played. `InfoBubbleAvatarView` draws it on the menu's template.
 */
export const useAvatarMenu = (objectData: ISimpleRoomObjectData, onClose: () => void) => {
    const { objectId } = objectData;
    const info = useRoomUserData(objectId);
    const ownInfo = useRoomUserData(useOwnRoomObjectId());
    const [ mode, setMode ] = useState(MODE_ACTIONS);
    const respectLeft = useUserStore(x => x.respectLeft);
    const respectReplenishesLeft = useUserStore(x => x.respectReplenishesLeft ?? 0);
    const accountSafetyLocked = useUserStore(x => x.accountSafetyLocked);
    const isAmbassador = useOwnIsAmbassador();
    const isPlayingGame = useRoomIsPlayingGame();
    const citizenshipTrack = useConfigValue<boolean>('talent.track.citizenship.enabled') ?? false;
    // `AvatarMenuView`: the config flag, and not while the room's configuration items block hand item control.
    const isHanditemControlBlocked = useRoomStore(x => x.isHanditemControlBlocked);
    const handItemGiveEnabled = (useConfigValue<boolean>('handitem.give.enabled') === true) && !isHanditemControlBlocked;
    const relationshipsEnabled = useConfigValue<boolean>('relationship.status.enabled') === true;
    const replenishCost = useConfigValue<number>('respect.replenish_cost_duckets') ?? 50;
    const showWiredInspect = useWiredShowInspectButton();
    const reportShown = useConfigValue<boolean>('infostand.report.show') === true;
    const t = useTranslation();
    const { send } = useWebSocketContext();

    if (!info || isPlayingGame) return undefined;

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
            action('friend', t('infostand.button.friend'), info.canBeAskedAsFriend && !isBlocked, () => askForAFriend(send, webId, info.name)),
            action('trade', t('infostand.button.trade'), citizenshipTrack || (!accountSafetyLocked && info.canTrade && !isBlocked), () => startTrading(send, objectId)),
            action('whisper', t('infostand.button.whisper'), !isBlocked, () => whisperUser(info.name)),
            // Each respect keeps the menu up while there is another to give.
            action('respect', t('infostand.button.respect', '', { count: respectLeft.toString() }), (respectLeft > 0) && !isBlocked, () => respectUser(send, webId), respectLeft > 1),
            action('replenish_respect', t('infostand.button.replenish_respect'), (respectLeft <= 0) && (respectReplenishesLeft > 0) && !isBlocked, () => replenishRespect(send, t, replenishCost)),
            action('relationship', t('infostand.link.relationship'), relationshipsEnabled && info.isFriend && !isBlocked, toMode(MODE_RELATIONSHIP), true),
            action('unignore', t('infostand.button.unignore'), info.isIgnored && !isBlocked, () => unignoreUser(send, webId)),
            action('ignore', t('infostand.button.ignore'), !info.isIgnored && !isBlocked, () => ignoreUser(send, webId)),
            // `RWUAM_REPORT_CFH_OTHER`: `HabboHelp.reportUser`, the report flow on this user's chat lines.
            action('report', t('infostand.button.report'), reportShown && !isBlocked, () => reportUser(webId)),
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

    /** A relationship cell's press: the status set, the menu closed. */
    const pressRelationship = (relationship: number) => {
        setRelationship(send, webId, relationship);
        onClose();
    };

    /** The name's press: their profile, the menu closed. */
    const openTheirProfile = () => {
        openProfile(send, webId);
        onClose();
    };

    // `updateButtons`: the trade button's tooltip says why trading is off.
    const tradeTooltip = (info.canTradeReason === TRADE_REASON_SHUTDOWN)
        ? t('infostand.button.trade.tooltip.shutdown')
        : ((info.canTradeReason === TRADE_REASON_ROOM) ? t('infostand.button.trade.tooltip.tradingroom') : undefined);

    return {
        info,
        mode,
        buttons: buttons[mode],
        visibleButtons: buttons[mode].filter(button => button.visible),
        showsRelationshipGrid: mode === MODE_RELATIONSHIP,
        relationshipIcon: RELATIONSHIP_ICONS[info.relationshipStatus],
        tradeTooltip,
        press,
        pressRelationship,
        openTheirProfile,
    };
};

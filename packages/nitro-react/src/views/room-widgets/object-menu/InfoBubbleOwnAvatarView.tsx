import { AvatarActionStateType, AvatarExpressionEnum, ClubLevelEnum, ISimpleRoomObjectData, PostureTypeEnum, RoomControllerLevelEnum } from '@nitrodevco/nitro-api';
import { AvatarExpressionComposer, ChangePostureComposer, DanceComposer, SignComposer } from '@nitrodevco/nitro-packets';
import { ReactNode, useState } from 'react';

import { dropCarryItem, openClientLink, openProfile } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useOwnIsDancing, useRoomSessionActions, useRoomStore } from '#base/context/room';
import { useConfigValue, useTranslation, useWindowActions } from '#base/context/system';
import { useOwnClubLevel, useUserStore } from '#base/context/user';
import { useWiredShowInspectButton } from '#base/context/wired';
import { useRoomUserData } from '#base/hooks';
import { Box, LayoutImage, TemplateBindings, TemplateWindow, ThemeImage } from '#base/theme';
import { isHandItem } from '#base/utils';

import { useButtonMenu, useMinimizedMenu } from './useButtonMenu';

export interface InfoBubbleOwnAvatarViewProps {
    objectData: ISimpleRoomObjectData;
    onClose: () => void;
}

/** `OwnAvatarMenuView` modes. */
const MODE_NORMAL = 0;
const MODE_CLUB_DANCES = 1;
const MODE_EXPRESSIONS = 3;
const MODE_SIGNS = 4;

/** Effects that put the avatar in water: nothing but a wave works there. */
const SWIMMING_EFFECTS = [ 29, 30, 185 ];
/** The horse-riding effect. */
const RIDING_EFFECT = 77;

/** The rows whose button holds an arrow `icon`. */
const ICON_ROWS = new Set([ 'expressions', 'dance_menu', 'signs', 'more', 'back' ]);

/**
 * `signs_grid`'s cells, `sign_<n>`: a cell's `button` sends sign `n` (`gridEventProc`). A picture
 * cell's `<bitmap tags="icon">` is filled by `showButtonGrid` with the room UI's bitmap of the
 * window's own name (`setImageAsset(icon, icon.name, true)`): copied unscaled into the middle of a
 * bitmap the window's own size. The bitmap window would stretch an asset set on it, so the picture
 * is drawn over the cell's button instead, centred in the 39x29 window it fills.
 */
const SIGN_CELLS = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 0, 13, 15, 14, 17, 16 ];
const SIGN_ICONS: Record<number, string> = {
    11: 'sign_icon_heart',
    12: 'sign_icon_skull',
    13: 'sign_icon_13',
    14: 'sign_icon_14',
    15: 'sign_icon_15',
    16: 'sign_icon_16',
    17: 'sign_icon_17',
};
const SIGN_PICTURES: Record<number, ReactNode> = Object.fromEntries(Object.entries(SIGN_ICONS).map(([ sign, icon ]) => [ sign, (
    <Box
        pointerTransparent
        layout={{ position: 'absolute', left: 0, top: 0, width: 39, height: 29, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
    >
        <ThemeImage
            src={LayoutImage(`habbo-room-ui-com/${icon}.png`)}
            layout={{}}
        />
    </Box>
) ]));

/** `ButtonMenuView.buttonEventProc` on `profile_link`: the name light blue under the pointer. */
const NAME_COLOR = 0xffffff;
const NAME_HOVER_COLOR = 0x91c2ff;

type MenuButton = {
    /** The row's name in `own_avatar_menu`'s `buttons` list. */
    key: string;
    visible: boolean;
    /** `showButton`'s `enabled`. */
    enabled?: boolean;
    /** A VIP expression: without VIP the row is an advert and its press opens the catalogue. */
    vip?: boolean;
    staysOpen?: boolean;
    onPress: () => void;
};

/**
 * The menu over your own avatar - `OwnAvatarMenuView`, drawn from its `own_avatar_menu` template:
 * looks, decorating, dancing, the expressions and signs sub-pages, effects and dropping what you
 * carry. `updateButtons` shows each mode's rows of `buttons`, the sign grid in the signs mode.
 */
export const InfoBubbleOwnAvatarView = ({ objectData, onClose }: InfoBubbleOwnAvatarViewProps) => {
    const info = useRoomUserData(objectData.objectId);
    const showWiredInspect = useWiredShowInspectButton();
    const isDancing = useOwnIsDancing();
    const clubLevel = useOwnClubLevel();
    const hasEffectOn = useUserStore(x => x.avatarEffects.some(effect => effect.isInUse));
    const isRoomOwner = useRoomStore(x => x.isRoomOwner);
    const hasClub = clubLevel >= ClubLevelEnum.Club;
    const hasVip = clubLevel >= ClubLevelEnum.Vip;
    const [ mode, setMode ] = useState((isDancing && hasClub) ? MODE_CLUB_DANCES : MODE_NORMAL);
    const [ nameHovered, setNameHovered ] = useState(false);
    const effectsDisabled = useConfigValue<boolean>('memenu.effects.widget.disabled') ?? false;
    // `OwnAvatarMenuView`: the config flag, and not while the room's configuration items block hand item control.
    const isHanditemControlBlocked = useRoomStore(x => x.isHanditemControlBlocked);
    const handItemDropEnabled = (useConfigValue<boolean>('handitem.drop.enabled') === true) && !isHanditemControlBlocked;
    const expressionsMenuEnabled = useConfigValue<boolean>('avatar.expressions_menu.enabled') === true;
    const signsEnabled = useConfigValue<boolean>('avatar.signs.enabled') === true;
    const sittingEnabled = useConfigValue<boolean>('avatar.sitting.enabled') === true;
    const expression67Enabled = useConfigValue<boolean>('avatar.expression.67.enabled') ?? false;
    const { showButton, button } = useButtonMenu();
    const { minimizedView, bindings: minimizeBindings } = useMinimizedMenu();
    const t = useTranslation();
    const { send } = useWebSocketContext();
    const { showWindow, toggleWindow } = useWindowActions();
    const { setIsDecorating } = useRoomSessionActions();

    if (!info) return null;
    if (minimizedView) return minimizedView;

    const isSwimming = SWIMMING_EFFECTS.includes(info.effectId);
    const isRiding = info.effectId === RIDING_EFFECT;
    const canUseVipExpressions = !hasEffectOn && !isSwimming && hasVip;

    const expression = (type: AvatarExpressionEnum) => () => send(new AvatarExpressionComposer({ expressionType: type }));
    const dance = (style: number) => () => send(new DanceComposer({ danceType: style }));
    const toMode = (next: number) => () => setMode(next);

    const buttons: Record<number, MenuButton[]> = {
        [MODE_NORMAL]: [
            // Decorating is a club feature, and only where you may move furniture.
            { key: 'decorate', visible: hasClub && ((info.myControllerLevel >= RoomControllerLevelEnum.Guest) || isRoomOwner), onPress: () => setIsDecorating(true) },
            { key: 'change_looks', visible: true, onPress: () => showWindow('avatar_editor') },
            { key: 'wave', visible: !expressionsMenuEnabled, onPress: expression(AvatarExpressionEnum.Wave) },
            { key: 'expressions', visible: expressionsMenuEnabled, staysOpen: true, onPress: toMode(MODE_EXPRESSIONS) },
            { key: 'dance_menu', visible: hasClub && !isRiding, enabled: !hasEffectOn, staysOpen: true, onPress: toMode(MODE_CLUB_DANCES) },
            { key: 'dance', visible: !hasClub && !isDancing && !isRiding, enabled: !hasEffectOn, onPress: dance(1) },
            { key: 'dance_stop', visible: !hasClub && isDancing && !isRiding, onPress: dance(0) },
            { key: 'signs', visible: signsEnabled, staysOpen: true, onPress: toMode(MODE_SIGNS) },
            { key: 'handitem', visible: handItemDropEnabled && isHandItem(info.carryItem), onPress: () => dropCarryItem(send) },
            { key: 'effects', visible: !effectsDisabled && !isRiding, onPress: () => toggleWindow('avatar_effects') },
            { key: 'wired_inspect', visible: showWiredInspect, onPress: () => openClientLink(send, `wiredmenu/open/inspection/1/${objectData.objectId}`) },
        ],
        [MODE_CLUB_DANCES]: [
            { key: 'dance_stop', visible: true, enabled: isDancing, onPress: dance(0) },
            { key: 'dance_1', visible: true, onPress: dance(1) },
            { key: 'dance_2', visible: true, onPress: dance(2) },
            { key: 'dance_3', visible: true, onPress: dance(3) },
            { key: 'dance_4', visible: true, onPress: dance(4) },
            { key: 'back', visible: true, staysOpen: true, onPress: toMode(MODE_NORMAL) },
        ],
        [MODE_EXPRESSIONS]: [
            { key: 'sit', visible: sittingEnabled && !isSwimming && !isRiding && (info.posture === String(AvatarActionStateType.Stand)), onPress: () => send(new ChangePostureComposer({ postureType: PostureTypeEnum.Sit })) },
            { key: 'stand', visible: sittingEnabled && !isSwimming && !isRiding && info.canStandUp, onPress: () => send(new ChangePostureComposer({ postureType: PostureTypeEnum.Stand })) },
            { key: 'wave', visible: true, enabled: !isSwimming, onPress: expression(AvatarExpressionEnum.Wave) },
            { key: 'blow', visible: true, enabled: canUseVipExpressions, vip: true, onPress: expression(AvatarExpressionEnum.Blow) },
            { key: '67', visible: expression67Enabled, enabled: canUseVipExpressions, vip: true, onPress: expression(AvatarExpressionEnum.Expression67) },
            { key: 'laugh', visible: true, enabled: canUseVipExpressions, vip: true, onPress: expression(AvatarExpressionEnum.Laugh) },
            { key: 'idle', visible: true, onPress: expression(AvatarExpressionEnum.Idle) },
            { key: 'back', visible: true, staysOpen: true, onPress: toMode(MODE_NORMAL) },
        ],
        [MODE_SIGNS]: [
            { key: 'back', visible: true, staysOpen: true, onPress: toMode(MODE_NORMAL) },
        ],
    };

    const press = (row: MenuButton) => {
        // `OwnAvatarMenuView.buttonEventProc`: a VIP button pressed without VIP is an advert for it.
        if (row.vip && !hasVip) {
            showWindow('catalog');
            onClose();

            return;
        }

        row.onPress();

        if (!row.staysOpen) onClose();
    };

    const openOwnProfile = () => {
        openProfile(send, info.webId);
        onClose();
    };

    const visibleButtons = buttons[mode].filter(row => row.visible);
    const showsSigns = (mode === MODE_SIGNS);
    const bindings: TemplateBindings = {
        ...minimizeBindings,
        profile_link: {
            tooltip: t('infostand.profile.link.tooltip', 'Click to view profile'),
            onPointerTap: openOwnProfile,
            onPointerOver: () => setNameHovered(true),
            onPointerOut: () => setNameHovered(false),
        },
        name: { caption: info.name, setCaptionAfterBuild: true, color: nameHovered ? NAME_HOVER_COLOR : NAME_COLOR },
        buttons: { show: [ ...visibleButtons.map(row => row.key), ...(showsSigns ? [ 'signs_grid' ] : []) ] },
    };

    for (const row of visibleButtons) {
        showButton(bindings, row.key, () => press(row), {
            enabled: row.enabled,
            vipAdvert: row.vip && !hasVip,
            hasIcon: ICON_ROWS.has(row.key),
        });
    }

    if (showsSigns) {
        for (const sign of SIGN_CELLS) {
            bindings[`sign_${sign}/button`] = {
                ...button(`sign_${sign}/button`, () => {
                    send(new SignComposer({ signType: sign }));
                    onClose();
                }),
                children: SIGN_PICTURES[sign],
            };

            const icon = SIGN_ICONS[sign];

            if (icon) bindings[`sign_${sign}/button/${icon}`] = { visible: false };
        }
    }

    return (
        <TemplateWindow
            id="habbo-room-ui-com/own_avatar_menu"
            bindings={bindings}
        />
    );
};

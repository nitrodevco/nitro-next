import { AvatarActionStateType, AvatarExpressionEnum, ClubLevelEnum, ISimpleRoomObjectData, PostureTypeEnum, RoomControllerLevelEnum } from '@nitrodevco/nitro-api';
import { AvatarExpressionComposer, ChangePostureComposer, DanceComposer, SignComposer } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { dropCarryItem, openClientLink, openProfile } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useOwnIsDancing, useRoomSessionActions, useRoomStore } from '#base/context/room';
import { useConfigValue, useTranslation, useWindowActions } from '#base/context/system';
import { useOwnClubLevel, useUserStore } from '#base/context/user';
import { useWiredShowInspectButton } from '#base/context/wired';
import { useRoomUserData } from '#base/hooks';
import { Box, Bubble, LayoutImage, ThemeImage, ThemeText } from '#base/theme';

import { InfoBubbleMenuButton } from './InfoBubbleMenuButton';
import { InfoBubbleMinimize } from './InfoBubbleMinimize';

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
const MAX_CARRY_ITEM = 999999;

/**
 * `signs_grid`, in the layout's own order: numbers, then the picture signs. A picture cell is a
 * `<bitmap tags="icon">` that `ButtonMenuView.showButtonGrid` fills by the window's own name
 * (`sign_icon_heart`, `sign_icon_skull`, `sign_icon_13` ... `sign_icon_17`) out of the room UI's
 * asset library - library bitmaps, not icon-set styles.
 */
const SIGN_BUTTONS: { key: number; icon?: string; label?: string }[] = [
    { key: 1, label: '1' }, { key: 2, label: '2' }, { key: 3, label: '3' },
    { key: 4, label: '4' }, { key: 5, label: '5' }, { key: 6, label: '6' },
    { key: 7, label: '7' }, { key: 8, label: '8' }, { key: 9, label: '9' },
    { key: 10, label: '10' }, { key: 11, icon: LayoutImage('room-ui/sign_icon_heart.png') }, { key: 12, icon: LayoutImage('room-ui/sign_icon_skull.png') },
    { key: 0, label: '0' }, { key: 13, icon: LayoutImage('room-ui/sign_icon_13.png') }, { key: 15, icon: LayoutImage('room-ui/sign_icon_15.png') },
    { key: 14, icon: LayoutImage('room-ui/sign_icon_14.png') }, { key: 17, icon: LayoutImage('room-ui/sign_icon_17.png') }, { key: 16, icon: LayoutImage('room-ui/sign_icon_16.png') },
];

type MenuButton = {
    key: string;
    caption: string;
    visible: boolean;
    enabled?: boolean;
    /** Needs VIP: without it the press opens the club offer instead. */
    vip?: boolean;
    staysOpen?: boolean;
    onPress: () => void;
};

/**
 * The menu over your own avatar - `OwnAvatarMenuView`, on the `own_avatar_menu` layout: looks,
 * decorating, dancing, the expressions and signs sub-pages, effects and dropping what you carry.
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
    const [ collapsed, setCollapsed ] = useState(false);
    const effectsDisabled = useConfigValue<boolean>('memenu.effects.widget.disabled') ?? false;
    // `OwnAvatarMenuView`: the config flag, and not while the room's configuration items block hand item control.
    const isHanditemControlBlocked = useRoomStore(x => x.isHanditemControlBlocked);
    const handItemDropEnabled = (useConfigValue<boolean>('handitem.drop.enabled') ?? true) && !isHanditemControlBlocked;
    const expressionsMenuEnabled = useConfigValue<boolean>('avatar.expressions_menu.enabled') ?? true;
    const signsEnabled = useConfigValue<boolean>('avatar.signs.enabled') ?? true;
    const sittingEnabled = useConfigValue<boolean>('avatar.sitting.enabled') ?? true;
    const expression67Enabled = useConfigValue<boolean>('avatar.expression.67.enabled') ?? false;
    const t = useTranslation();
    const { send } = useWebSocketContext();
    const { showWindow, toggleWindow } = useWindowActions();
    const { setIsDecorating } = useRoomSessionActions();

    if (!info) return null;

    const isSwimming = SWIMMING_EFFECTS.includes(info.effectId);
    const isRiding = info.effectId === RIDING_EFFECT;
    const canUseVipExpressions = !hasEffectOn && !isSwimming && hasVip;

    const expression = (type: AvatarExpressionEnum) => () => send(new AvatarExpressionComposer({ expressionType: type }));
    const dance = (style: number) => () => send(new DanceComposer({ danceType: style }));
    const toMode = (next: number) => () => setMode(next);

    const buttons: Record<number, MenuButton[]> = {
        [MODE_NORMAL]: [
            // Decorating is a club feature, and only where you may move furniture.
            { key: 'decorate', caption: t('widget.avatar.decorate'), visible: hasClub && ((info.myControllerLevel >= RoomControllerLevelEnum.Guest) || isRoomOwner), onPress: () => setIsDecorating(true) },
            { key: 'change_looks', caption: t('widget.memenu.myclothes'), visible: true, onPress: () => showWindow('avatar_editor') },
            { key: 'wave', caption: t('widget.memenu.wave'), visible: !expressionsMenuEnabled, onPress: expression(AvatarExpressionEnum.Wave) },
            { key: 'expressions', caption: t('infostand.link.expressions'), visible: expressionsMenuEnabled, staysOpen: true, onPress: toMode(MODE_EXPRESSIONS) },
            { key: 'dance_menu', caption: t('widget.memenu.dance'), visible: hasClub && !isRiding, enabled: !hasEffectOn, staysOpen: true, onPress: toMode(MODE_CLUB_DANCES) },
            { key: 'dance', caption: t('widget.memenu.dance'), visible: !hasClub && !isDancing && !isRiding, enabled: !hasEffectOn, onPress: dance(1) },
            { key: 'dance_stop', caption: t('widget.memenu.dance.stop'), visible: !hasClub && isDancing && !isRiding, onPress: dance(0) },
            { key: 'signs', caption: t('infostand.show.signs'), visible: signsEnabled, staysOpen: true, onPress: toMode(MODE_SIGNS) },
            { key: 'handitem', caption: t('avatar.widget.drop_hand_item'), visible: handItemDropEnabled && (info.carryItem > 0) && (info.carryItem < MAX_CARRY_ITEM), onPress: () => dropCarryItem(send) },
            { key: 'effects', caption: t('widget.memenu.effects'), visible: !effectsDisabled && !isRiding, onPress: () => toggleWindow('avatar_effects') },
            { key: 'wired_inspect', caption: t('infostand.button.wired_inspect'), visible: showWiredInspect, onPress: () => openClientLink(send, `wiredmenu/open/inspection/1/${objectData.objectId}`) },
        ],
        [MODE_CLUB_DANCES]: [
            { key: 'dance_stop', caption: t('widget.memenu.dance.stop'), visible: true, enabled: isDancing, onPress: dance(0) },
            { key: 'dance_1', caption: t('widget.memenu.dance1'), visible: true, onPress: dance(1) },
            { key: 'dance_2', caption: t('widget.memenu.dance2'), visible: true, onPress: dance(2) },
            { key: 'dance_3', caption: t('widget.memenu.dance3'), visible: true, onPress: dance(3) },
            { key: 'dance_4', caption: t('widget.memenu.dance4'), visible: true, onPress: dance(4) },
            { key: 'back', caption: t('generic.back'), visible: true, staysOpen: true, onPress: toMode(MODE_NORMAL) },
        ],
        [MODE_EXPRESSIONS]: [
            { key: 'sit', caption: t('widget.memenu.sit'), visible: sittingEnabled && !isSwimming && !isRiding && (info.posture === String(AvatarActionStateType.Stand)), onPress: () => send(new ChangePostureComposer({ postureType: PostureTypeEnum.Sit })) },
            { key: 'stand', caption: t('widget.memenu.stand'), visible: sittingEnabled && !isSwimming && !isRiding && info.canStandUp, onPress: () => send(new ChangePostureComposer({ postureType: PostureTypeEnum.Stand })) },
            { key: 'wave', caption: t('widget.memenu.wave'), visible: true, enabled: !isSwimming, onPress: expression(AvatarExpressionEnum.Wave) },
            { key: 'blow', caption: t('widget.memenu.blow'), visible: true, enabled: canUseVipExpressions || !hasVip, vip: true, onPress: expression(AvatarExpressionEnum.Blow) },
            { key: 'laugh', caption: t('widget.memenu.laugh'), visible: true, enabled: canUseVipExpressions || !hasVip, vip: true, onPress: expression(AvatarExpressionEnum.Laugh) },
            { key: 'idle', caption: t('widget.memenu.idle'), visible: true, onPress: expression(AvatarExpressionEnum.Idle) },
            { key: '67', caption: t('widget.memenu.expression_67'), visible: expression67Enabled, enabled: canUseVipExpressions || !hasVip, vip: true, onPress: expression(AvatarExpressionEnum.Expression67) },
            { key: 'back', caption: t('generic.back'), visible: true, staysOpen: true, onPress: toMode(MODE_NORMAL) },
        ],
        [MODE_SIGNS]: [
            { key: 'back', caption: t('generic.back'), visible: true, staysOpen: true, onPress: toMode(MODE_NORMAL) },
        ],
    };

    const press = (button: MenuButton) => {
        if (button.enabled === false) return;

        // `OwnAvatarMenuView.buttonEventProc`: a VIP button pressed without VIP is an advert for it.
        if (button.vip && !hasVip) {
            showWindow('catalog');
            onClose();

            return;
        }

        button.onPress();

        if (!button.staysOpen) onClose();
    };

    return (
        <Bubble
            variant="0"
            tintColor="#6e6b67"
            layout={{ flexDirection: 'column' }}
        >
            {!collapsed && (
                <Box layout={{ minWidth: 110, maxWidth: 110, flexDirection: 'column', marginLeft: 1, marginRight: 1 }}>
                    <Box
                        cursor="pointer"
                        onPointerTap={() => {
                            openProfile(send, info.webId);
                            onClose();
                        }}
                        layout={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', minHeight: 24, maxHeight: 24 }}
                    >
                        <ThemeText
                            text={info.name}
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Box>
                    <Box layout={{ flexDirection: 'column', width: '100%', gap: 1 }}>
                        {(mode === MODE_SIGNS) && (
                            <Box layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 1, width: '100%' }}>
                                {SIGN_BUTTONS.map(({ key, icon, label }) => (
                                    <InfoBubbleMenuButton
                                        key={key}
                                        shape="grid"
                                        width={34}
                                        height={25}
                                        caption={label}
                                        onPress={() => {
                                            send(new SignComposer({ signType: key }));
                                            onClose();
                                        }}
                                    >
                                        {icon && (
                                            <ThemeImage
                                                src={icon}
                                                layout={{}}
                                            />
                                        )}
                                    </InfoBubbleMenuButton>
                                ))}
                            </Box>
                        )}
                        {buttons[mode].filter(button => button.visible).map(button => (
                            <InfoBubbleMenuButton
                                key={button.key}
                                caption={button.caption}
                                disabled={button.enabled === false}
                                onPress={() => press(button)}
                            />
                        ))}
                    </Box>
                </Box>
            )}
            <InfoBubbleMinimize
                collapsed={collapsed}
                onToggle={() => setCollapsed(!collapsed)}
            />
        </Bubble>
    );
};

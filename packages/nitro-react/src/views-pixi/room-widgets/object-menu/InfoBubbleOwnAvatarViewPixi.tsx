import { ISimpleRoomObjectData } from '@nitrodevco/nitro-api';
import { AvatarActionStateType, AvatarExpressionEnum, PostureTypeEnum } from '@nitrodevco/nitro-api';
import { AvatarExpressionComposer, ChangePostureComposer, DanceComposer, DropCarryItemComposer, SignComposer } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { useOwnHasClub, useOwnIsDancing, useRoomCanDecorate, useTranslation, useWebSocketContext } from '#base/context';
import { useRoomUserData } from '#base/hooks';
import { Box, Bubble, Button, NitroIcon, Text } from '#base/theme-pixi';

export interface InfoBubbleOwnAvatarViewPixiProps {
    objectData: ISimpleRoomObjectData;
    onClose: () => void;
}

const MODE_NORMAL = 0;
const MODE_CLUB_DANCES = 1;
const MODE_EXPRESSIONS = 3;
const MODE_SIGNS = 4;

const SIGN_BUTTONS: { key: string; action: string; icon?: string; label?: string }[] = [
    { key: '1', action: 'sign_1', label: '1' },
    { key: '2', action: 'sign_2', label: '2' },
    { key: '3', action: 'sign_3', label: '3' },
    { key: '4', action: 'sign_4', label: '4' },
    { key: '5', action: 'sign_5', label: '5' },
    { key: '6', action: 'sign_6', label: '6' },
    { key: '7', action: 'sign_7', label: '7' },
    { key: '8', action: 'sign_8', label: '8' },
    { key: '9', action: 'sign_9', label: '9' },
    { key: '10', action: 'sign_10', label: '10' },
    { key: '11', action: 'sign_11', icon: 'icon-sign-heart' },
    { key: '12', action: 'sign_12', icon: 'icon-sign-skull' },
    { key: '0', action: 'sign_0', label: '0' },
    { key: '13', action: 'sign_13', icon: 'icon-sign-exclamation' },
    { key: '15', action: 'sign_15', icon: 'icon-sign-smile' },
    { key: '14', action: 'sign_14', icon: 'icon-sign-soccer' },
    { key: '17', action: 'sign_17', icon: 'icon-sign-yellow' },
    { key: '16', action: 'sign_16', icon: 'icon-sign-red' },
];

/** Pixi port of views/room-widgets/object-menu/InfoBubbleOwnAvatarView.tsx. */
export const InfoBubbleOwnAvatarViewPixi = ({ objectData, onClose }: InfoBubbleOwnAvatarViewPixiProps) => {
    const { objectId } = objectData;
    const userData = useRoomUserData(objectId);
    const isOwnDancing = useOwnIsDancing();
    const hasHabboClub = useOwnHasClub();
    const canDecorate = useRoomCanDecorate();
    const [mode, setMode] = useState<number>((isOwnDancing && hasHabboClub) ? MODE_CLUB_DANCES : MODE_NORMAL);
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const t = useTranslation();
    const { send } = useWebSocketContext();

    if (!userData) return null;

    const isRidingHorse = userData.effectId === 77;

    const processAction = (action: string) => {
        let hideMenu = true;

        if (action?.length) {
            if (action.startsWith('sign_')) {
                send(new SignComposer({ signType: parseInt(action.split('_')[1]) ?? 0 }));
            } else {
                switch (action) {
                    case 'expressions': {
                        hideMenu = false;
                        setMode(MODE_EXPRESSIONS);
                        break;
                    }
                    case 'sit': send(new ChangePostureComposer({ postureType: PostureTypeEnum.Sit })); break;
                    case 'stand': send(new ChangePostureComposer({ postureType: PostureTypeEnum.Stand })); break;
                    case 'wave': send(new AvatarExpressionComposer({ expressionType: AvatarExpressionEnum.Wave })); break;
                    case 'blow': if (hasHabboClub) send(new AvatarExpressionComposer({ expressionType: AvatarExpressionEnum.Blow })); break;
                    case 'laugh': if (hasHabboClub) send(new AvatarExpressionComposer({ expressionType: AvatarExpressionEnum.Laugh })); break;
                    case 'idle': if (hasHabboClub) send(new AvatarExpressionComposer({ expressionType: AvatarExpressionEnum.Idle })); break;
                    case 'dance_menu': {
                        hideMenu = false;
                        setMode(MODE_CLUB_DANCES);
                        break;
                    }
                    case 'dance': send(new DanceComposer({ danceType: 1 })); break;
                    case 'dance_stop': send(new DanceComposer({ danceType: 0 })); break;
                    case 'dance_1':
                    case 'dance_2':
                    case 'dance_3':
                    case 'dance_4': {
                        send(new DanceComposer({ danceType: parseInt(action.split('_')[1]) ?? 0 }));
                        break;
                    }
                    case 'signs': {
                        hideMenu = false;
                        setMode(MODE_SIGNS);
                        break;
                    }
                    case 'back': {
                        hideMenu = false;
                        setMode(MODE_NORMAL);
                        break;
                    }
                    case 'drop_hand_item': send(new DropCarryItemComposer({})); break;
                }
            }
        }

        if (hideMenu && onClose) onClose();
    };

    const MODE_BUTTONS: Record<number, { visible: unknown; caption: string; action: () => void }[]> = {
        0: [
            { visible: canDecorate, caption: 'widget.avatar.decorate', action: () => undefined },
            { visible: true, caption: 'widget.memenu.myclothes', action: () => undefined },
            { visible: hasHabboClub && !isRidingHorse, caption: 'widget.memenu.dance', action: () => processAction('dance_menu') },
            { visible: !isOwnDancing && !hasHabboClub && !isRidingHorse, caption: 'widget.avatar.dance', action: () => processAction('dance') },
            { visible: isOwnDancing && !hasHabboClub && !isRidingHorse, caption: 'widget.memenu.dance.stop', action: () => processAction('dance_stop') },
            { visible: userData.effectId !== 29 && userData.effectId !== 30 && userData.effectId !== 185, caption: 'infostand.link.expressions', action: () => processAction('expressions') },
            { visible: true, caption: 'infostand.show.signs', action: () => processAction('signs') },
            { visible: userData.carryItem > 0, caption: 'avatar.widget.drop_hand_item', action: () => processAction('drop_hand_item') },
        ],
        1: [
            { visible: isOwnDancing, caption: 'widget.memenu.dance.stop', action: () => processAction('dance_stop') },
            { visible: true, caption: 'widget.memenu.dance1', action: () => processAction('dance_1') },
            { visible: true, caption: 'widget.memenu.dance2', action: () => processAction('dance_2') },
            { visible: true, caption: 'widget.memenu.dance3', action: () => processAction('dance_3') },
            { visible: true, caption: 'widget.memenu.dance4', action: () => processAction('dance_4') },
            { visible: true, caption: 'generic.back', action: () => processAction('back') },
        ],
        3: [
            { visible: userData.posture === AvatarActionStateType.Stand, caption: 'widget.memenu.sit', action: () => processAction('sit') },
            { visible: userData.canStandUp, caption: 'widget.memenu.stand', action: () => processAction('stand') },
            { visible: true, caption: 'widget.memenu.wave', action: () => processAction('wave') },
            { visible: true, caption: 'widget.memenu.laugh', action: () => processAction('laugh') },
            { visible: true, caption: 'widget.memenu.blow', action: () => processAction('blow') },
            { visible: true, caption: 'widget.memenu.idle', action: () => processAction('idle') },
            { visible: true, caption: 'generic.back', action: () => processAction('back') },
        ],
        4: [
            { visible: true, caption: 'generic.back', action: () => processAction('back') },
        ],
    };

    return (
        <Bubble
            variant="0"
            tintColor="#6e6b67"
            layout={{ flexDirection: 'column' }}
        >
            {!collapsed && (
                <Box layout={{ minWidth: 100, maxWidth: 100, flexDirection: 'column', marginLeft: 1, marginRight: 1 }}>
                    <Box layout={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', minHeight: 24, maxHeight: 24 }}>
                        <Text
                            text={userData.name}
                            textStyle="text-style-u-bold"
                            textOptions={{ fontSize: 11, fill: '#ffffff' }}
                        />
                    </Box>
                    <Box layout={{ flexDirection: 'column', width: '100%', gap: 1 }}>
                        {mode === MODE_SIGNS && (
                            <Box layout={{ flexDirection: 'column', gap: 1 }}>
                                {[0, 1, 2, 3, 4, 5].map(row => (
                                    <Box
                                        key={row}
                                        layout={{ flexDirection: 'row', justifyContent: 'space-evenly', gap: 1 }}
                                    >
                                        {SIGN_BUTTONS.slice(row * 3, row * 3 + 3).map(({ key, action, icon, label }) => (
                                            <Button
                                                key={key}
                                                variant="300"
                                                tintColor="#2d2a27"
                                                textColor="#ffffff"
                                                onPress={() => processAction(action)}
                                                layout={{ minHeight: 25, maxHeight: 25, width: '100%' }}
                                            >
                                                {icon
                                                    ? (
                                                        <NitroIcon
                                                            icon={icon as 'icon-sign-heart'}
                                                            layout={{}}
                                                        />
                                                    )
                                                    : label}
                                            </Button>
                                        ))}
                                    </Box>
                                ))}
                            </Box>
                        )}
                        {(MODE_BUTTONS[mode] ?? []).map(({ visible, caption, action }) => (
                            visible
                                ? (
                                    <Button
                                        key={caption}
                                        variant="300"
                                        tintColor="#2d2a27"
                                        textColor="#ffffff"
                                        onPress={action}
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
                    icon={!collapsed ? 'icon-tri-arrow-down' : 'icon-tri-arrow-up'}
                    layout={{}}
                />
            </Box>
        </Bubble>
    );
};

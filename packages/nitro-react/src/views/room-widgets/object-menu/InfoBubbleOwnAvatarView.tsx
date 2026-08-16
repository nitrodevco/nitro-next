import { AvatarActionStateType, AvatarExpressionEnum, ISimpleRoomObjectData, PostureTypeEnum } from "@nitrodevco/nitro-api";
import { AvatarExpressionComposer, ChangePostureComposer, DanceComposer, DropCarryItemComposer, SignComposer } from "@nitrodevco/nitro-packets";
import { useState } from "react";

import { useOwnHasClub, useOwnIsDancing, useRoomCanDecorate, useTranslation, useWebSocketContext } from "#base/context";
import { useRoomUserData } from "#base/hooks";
import { Bubble, Button, NitroIcon } from "#base/theme";

interface InfoBubbleOwnAvatarViewProps {
    objectData: ISimpleRoomObjectData;
    onClose: () => void;
}

const MODE_NORMAL = 0;
const MODE_CLUB_DANCES = 1;
const MODE_NAME_CHANGE = 2;
const MODE_EXPRESSIONS = 3;
const MODE_SIGNS = 4;

export const InfoBubbleOwnAvatarView = (props: InfoBubbleOwnAvatarViewProps) => {
    const { objectData, onClose } = props;
    const { objectId, category } = objectData;
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
    }

    const MODE_BUTTONS = {
        0: [
            {
                visible: canDecorate,
                caption: 'widget.avatar.decorate',
                action: undefined
            },
            {
                visible: true,
                caption: 'widget.memenu.myclothes',
                action: undefined
            },
            {
                visible: hasHabboClub && !isRidingHorse,
                caption: 'widget.memenu.dance',
                action: () => processAction('dance_menu')
            },
            {
                visible: !isOwnDancing && !hasHabboClub && !isRidingHorse,
                caption: 'widget.avatar.dance',
                action: () => processAction('dance')
            },
            {
                visible: isOwnDancing && !hasHabboClub && !isRidingHorse,
                caption: 'widget.memenu.dance.stop',
                action: () => processAction('dance_stop')
            },
            {
                visible: userData.effectId !== 29 && userData.effectId !== 30 && userData.effectId !== 185,
                caption: 'infostand.link.expressions',
                action: () => processAction('expressions')
            },
            {
                visible: true,
                caption: 'infostand.show.signs',
                action: () => processAction('signs')
            },
            {
                visible: userData.carryItem > 0,
                caption: 'avatar.widget.drop_hand_item',
                action: () => processAction('drop_hand_item')
            }
        ],
        1: [
            {
                visible: isOwnDancing,
                caption: 'widget.memenu.dance.stop',
                action: () => processAction('dance_stop')
            },
            {
                visible: true,
                caption: 'widget.memenu.dance1',
                action: () => processAction('dance_1')
            },
            {
                visible: true,
                caption: 'widget.memenu.dance2',
                action: () => processAction('dance_2')
            },
            {
                visible: true,
                caption: 'widget.memenu.dance3',
                action: () => processAction('dance_3')
            },
            {
                visible: true,
                caption: 'widget.memenu.dance4',
                action: () => processAction('dance_4')
            },
            {
                visible: true,
                caption: 'generic.back',
                action: () => processAction('back')
            }
        ],
        3: [
            {
                visible: userData.posture === AvatarActionStateType.Stand,
                caption: 'widget.memenu.sit',
                action: () => processAction('sit')
            },
            {
                visible: userData.canStandUp,
                caption: 'widget.memenu.stand',
                action: () => processAction('stand')
            },
            {
                visible: true,
                caption: 'widget.memenu.wave',
                action: () => processAction('wave')
            },
            {
                visible: true,
                caption: 'widget.memenu.laugh',
                action: () => processAction('laugh')
            },
            {
                visible: true,
                caption: 'widget.memenu.blow',
                action: () => processAction('blow')
            },
            {
                visible: true,
                caption: 'widget.memenu.idle',
                action: () => processAction('idle')
            },
            {
                visible: true,
                caption: 'generic.back',
                action: () => processAction('back')
            }
        ],
        4: [
            {
                visible: true,
                caption: 'generic.back',
                action: () => processAction('back')
            }
        ]
    }

    return (
        <Bubble variant="0" tintColor="#6e6b67">
            {!collapsed && <div className="min-w-25 max-w-25 flex flex-col mx-px overflow-hidden">
                <div className="flex items-center justify-center min-h-6 max-h-6">
                    <span className="text-style-u-bold font-[11px] text-white">{userData.name}</span>
                </div>
                <div className="flex flex-col w-full overflow-hidden gap-px border-y border-black">
                    {mode === MODE_SIGNS && <>
                        <div className="flex justify-evenly gap-px">
                            <Button variant="300" tintColor="#2d2a27" className="min-h-6.25 max-h-6.25 w-full text-white text-[11px]" onClick={() => processAction('sign_1')}>1</Button>
                            <Button variant="300" tintColor="#2d2a27" className="min-h-6.25 max-h-6.25 w-full text-white text-[11px]" onClick={() => processAction('sign_2')}>2</Button>
                            <Button variant="300" tintColor="#2d2a27" className="min-h-6.25 max-h-6.25 w-full text-white text-[11px]" onClick={() => processAction('sign_3')}>3</Button>
                        </div>
                        <div className="flex justify-evenly gap-px">
                            <Button variant="300" tintColor="#2d2a27" className="min-h-6.25 max-h-6.25 w-full text-white text-[11px]" onClick={() => processAction('sign_4')}>4</Button>
                            <Button variant="300" tintColor="#2d2a27" className="min-h-6.25 max-h-6.25 w-full text-white text-[11px]" onClick={() => processAction('sign_5')}>5</Button>
                            <Button variant="300" tintColor="#2d2a27" className="min-h-6.25 max-h-6.25 w-full text-white text-[11px]" onClick={() => processAction('sign_6')}>6</Button>
                        </div>
                        <div className="flex justify-evenly gap-px">
                            <Button variant="300" tintColor="#2d2a27" className="min-h-6.25 max-h-6.25 w-full text-white text-[11px]" onClick={() => processAction('sign_7')}>7</Button>
                            <Button variant="300" tintColor="#2d2a27" className="min-h-6.25 max-h-6.25 w-full text-white text-[11px]" onClick={() => processAction('sign_8')}>8</Button>
                            <Button variant="300" tintColor="#2d2a27" className="min-h-6.25 max-h-6.25 w-full text-white text-[11px]" onClick={() => processAction('sign_9')}>9</Button>
                        </div>
                        <div className="flex justify-evenly gap-px">
                            <Button variant="300" tintColor="#2d2a27" className="min-h-6.25 max-h-6.25 w-full text-white text-[11px]" onClick={() => processAction('sign_10')}>10</Button>
                            <Button variant="300" tintColor="#2d2a27" className="min-h-6.25 max-h-6.25 w-full text-white text-[11px]" onClick={() => processAction('sign_11')}>
                                <NitroIcon icon="icon-sign-heart" />
                            </Button>
                            <Button variant="300" tintColor="#2d2a27" className="min-h-6.25 max-h-6.25 w-full text-white text-[11px]" onClick={() => processAction('sign_12')}>
                                <NitroIcon icon="icon-sign-skull" />
                            </Button>
                        </div>
                        <div className="flex justify-evenly gap-px">
                            <Button variant="300" tintColor="#2d2a27" className="min-h-6.25 max-h-6.25 w-full text-white text-[11px]" onClick={() => processAction('sign_0')}>0</Button>
                            <Button variant="300" tintColor="#2d2a27" className="min-h-6.25 max-h-6.25 w-full text-white text-[11px]" onClick={() => processAction('sign_13')}>
                                <NitroIcon icon="icon-sign-exclamation" />
                            </Button>
                            <Button variant="300" tintColor="#2d2a27" className="min-h-6.25 max-h-6.25 w-full text-white text-[11px]" onClick={() => processAction('sign_15')}>
                                <NitroIcon icon="icon-sign-smile" />
                            </Button>
                        </div>
                        <div className="flex justify-evenly gap-px">
                            <Button variant="300" tintColor="#2d2a27" className="min-h-6.25 max-h-6.25 w-full text-white text-[11px]" onClick={() => processAction('sign_14')}>
                                <NitroIcon icon="icon-sign-soccer" />
                            </Button>
                            <Button variant="300" tintColor="#2d2a27" className="min-h-6.25 max-h-6.25 w-full text-white text-[11px]" onClick={() => processAction('sign_17')}>
                                <NitroIcon icon="icon-sign-yellow" />
                            </Button>
                            <Button variant="300" tintColor="#2d2a27" className="min-h-6.25 max-h-6.25 w-full text-white text-[11px]" onClick={() => processAction('sign_16')}>
                                <NitroIcon icon="icon-sign-red" />
                            </Button>
                        </div>
                    </>}
                    {MODE_BUTTONS[mode].map(({ visible, caption, action }) =>
                        visible ? <Button key={caption} variant="300" tintColor="#2d2a27" className="min-h-6.25 max-h-6.25 text-white text-[11px] w-full" onClick={action}>{t(caption)}</Button> : null)}
                </div>
            </div>}
            <div className="flex items-center justify-center min-h-4.5 max-h-4.5 p-2 w-full" onClick={() => setCollapsed(!collapsed)}>
                <NitroIcon className="cursor-pointer" icon={!collapsed ? 'icon-context-menu-arrow-down' : 'icon-context-menu-arrow-up'} />
            </div>
        </Bubble>
    );
}
import { AvatarActionStateType, AvatarExpressionEnum, ISimpleRoomObjectData, PostureTypeEnum } from "@nitrodevco/nitro-api";
import { AvatarExpressionComposer, ChangePostureComposer, DanceComposer, DropCarryItemComposer, SignComposer } from "@nitrodevco/nitro-shared";
import { useState } from "react";

import { NitroIcon } from "#base/components";
import { useOwnHasClub, useOwnIsDancing, useRoomCanDecorate, useWebSocketContext } from "#base/context";
import { useRoomUserData } from "#base/hooks";
import { useLocalizationStore } from "#base/stores";
import { cn } from "#base/utils";

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
    const getLocalizationValue = useLocalizationStore(x => x.getLocalizationValue);
    const { send } = useWebSocketContext();

    if (!userData) return null;

    const isRidingHorse = userData.effectId === 77;
    const canUseExpressions = userData.effectId !== 29 && userData.effectId !== 30 && userData.effectId !== 185;

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

    return (
        <div className={cn('contextmenu-container', collapsed && 'menu-collapsed')}>
            {!collapsed && <>
                <div className="flex items-center justify-center menu-header">
                    <p>{userData.name}</p>
                </div>
                <div className="menu-content">
                    {mode === MODE_NORMAL && <>
                        {canDecorate && <div className="flex items-center justify-center menu-item">
                            {getLocalizationValue('widget.avatar.decorate')}
                        </div>}
                        <div className="flex items-center justify-center underline menu-item">
                            {getLocalizationValue('widget.memenu.myclothes')}
                        </div>
                        {hasHabboClub && !isRidingHorse && <div className="flex items-center justify-center menu-item" onClick={() => processAction('dance_menu')}>
                            {getLocalizationValue('widget.memenu.dance')}
                        </div>}
                        {!isOwnDancing && !hasHabboClub && !isRidingHorse && <div className="flex items-center justify-center menu-item" onClick={() => processAction('dance')}>
                            {getLocalizationValue('widget.memenu.dance')}
                        </div>}
                        {isOwnDancing && !hasHabboClub && !isRidingHorse && <div className="flex items-center justify-center menu-item" onClick={() => processAction('dance_stop')}>
                            {getLocalizationValue('widget.memenu.dance.stop')}
                        </div>}
                        <div className="flex items-center justify-center menu-item" onClick={() => processAction('expressions')}>
                            {getLocalizationValue('infostand.link.expressions')}
                        </div>
                        <div className="flex items-center justify-center menu-item" onClick={() => processAction('signs')}>
                            {getLocalizationValue('infostand.show.signs')}
                        </div>
                        {userData.carryItem > 0 && <div className="flex items-center justify-center menu-item" onClick={() => processAction('drop_hand_item')}>
                            {getLocalizationValue('avatar.widget.drop_hand_item')}
                        </div>}
                    </>}
                    {mode === MODE_CLUB_DANCES && <>
                        {isOwnDancing && <div className="flex items-center justify-center menu-item" onClick={() => processAction('dance_stop')}>
                            {getLocalizationValue('widget.memenu.dance.stop')}
                        </div>}
                        <div className="flex items-center justify-center menu-item" onClick={() => processAction('dance_1')}>
                            {getLocalizationValue('widget.memenu.dance1')}
                        </div>
                        <div className="flex items-center justify-center menu-item" onClick={() => processAction('dance_2')}>
                            {getLocalizationValue('widget.memenu.dance2')}
                        </div>
                        <div className="flex items-center justify-center menu-item" onClick={() => processAction('dance_3')}>
                            {getLocalizationValue('widget.memenu.dance3')}
                        </div>
                        <div className="flex items-center justify-center menu-item" onClick={() => processAction('dance_4')}>
                            {getLocalizationValue('widget.memenu.dance4')}
                        </div>
                        <div className="flex items-center justify-center menu-item" onClick={() => processAction('back')}>
                            {getLocalizationValue('generic.back')}
                        </div>
                    </>}
                    {mode === MODE_EXPRESSIONS && <>
                        {(userData.posture === AvatarActionStateType.Stand) && <div className="flex items-center justify-center menu-item" onClick={() => processAction('sit')}>
                            {getLocalizationValue('widget.memenu.sit')}
                        </div>}
                        {userData.canStandUp && <div className="flex items-center justify-center menu-item" onClick={() => processAction('stand')}>
                            {getLocalizationValue('widget.memenu.stand')}
                        </div>}
                        {canUseExpressions && <div className="flex items-center justify-center menu-item" onClick={() => processAction('wave')}>
                            {getLocalizationValue('widget.memenu.wave')}
                        </div>}
                        {canUseExpressions && <div className="flex items-center justify-center menu-item" onClick={() => processAction('laugh')}>
                            {getLocalizationValue('widget.memenu.laugh')}
                        </div>}
                        {canUseExpressions && <div className="flex items-center justify-center menu-item" onClick={() => processAction('blow')}>
                            {getLocalizationValue('widget.memenu.blow')}
                        </div>}
                        <div className="flex items-center justify-center menu-item" onClick={() => processAction('idle')}>
                            {getLocalizationValue('widget.memenu.idle')}
                        </div>
                        <div className="flex items-center justify-center menu-item" onClick={() => processAction('back')}>
                            {getLocalizationValue('generic.back')}
                        </div>
                    </>}
                    {mode === MODE_SIGNS && <>
                        <div className="flex justify-evenly menu-list-split-3">
                            <div className="flex items-center justify-center w-full menu-item" onClick={() => processAction('sign_1')}>1</div>
                            <div className="flex items-center justify-center w-full menu-item" onClick={() => processAction('sign_2')}>2</div>
                            <div className="flex items-center justify-center w-full menu-item" onClick={() => processAction('sign_3')}>3</div>
                        </div>
                        <div className="flex justify-evenly menu-list-split-3">
                            <div className="flex items-center justify-center w-full menu-item" onClick={() => processAction('sign_4')}>4</div>
                            <div className="flex items-center justify-center w-full menu-item" onClick={() => processAction('sign_5')}>5</div>
                            <div className="flex items-center justify-center w-full menu-item" onClick={() => processAction('sign_6')}>6</div>
                        </div>
                        <div className="flex justify-evenly menu-list-split-3">
                            <div className="flex items-center justify-center w-full menu-item" onClick={() => processAction('sign_7')}>7</div>
                            <div className="flex items-center justify-center w-full menu-item" onClick={() => processAction('sign_8')}>8</div>
                            <div className="flex items-center justify-center w-full menu-item" onClick={() => processAction('sign_9')}>9</div>
                        </div>
                        <div className="flex justify-evenly menu-list-split-3">
                            <div className="flex items-center justify-center w-full menu-item" onClick={() => processAction('sign_10')}>10</div>
                            <div className="flex items-center justify-center w-full menu-item" onClick={() => processAction('sign_11')}>
                                <NitroIcon icon="icon-sign-heart" />
                            </div>
                            <div className="flex items-center justify-center w-full menu-item" onClick={() => processAction('sign_12')}>
                                <NitroIcon icon="icon-sign-skull" />
                            </div>
                        </div>
                        <div className="flex justify-evenly menu-list-split-3">
                            <div className="flex items-center justify-center w-full menu-item" onClick={() => processAction('sign_0')}>0</div>
                            <div className="flex items-center justify-center w-full menu-item" onClick={() => processAction('sign_13')}><NitroIcon icon="icon-sign-exclamation" /></div>
                            <div className="flex items-center justify-center w-full menu-item" onClick={() => processAction('sign_15')}><NitroIcon icon="icon-sign-smile" /></div>
                        </div>
                        <div className="flex justify-evenly menu-list-split-3">
                            <div className="flex items-center justify-center w-full menu-item" onClick={() => processAction('sign_14')}><NitroIcon icon="icon-sign-soccer" /></div>
                            <div className="flex items-center justify-center w-full menu-item" onClick={() => processAction('sign_17')}><NitroIcon icon="icon-sign-yellow" /></div>
                            <div className="flex items-center justify-center w-full menu-item" onClick={() => processAction('sign_16')}><NitroIcon icon="icon-sign-red" /></div>
                        </div>
                        <div className="flex items-center justify-center menu-item" onClick={() => processAction('back')}>
                            {getLocalizationValue('generic.back')}
                        </div>
                    </>}
                </div>
            </>}
            <div className="flex items-center justify-center menu-bottom" onClick={() => setCollapsed(!collapsed)}>
                <NitroIcon cursor="pointer" icon={!collapsed ? 'icon-context-menu-arrow-down' : 'icon-context-menu-arrow-up'} />
            </div>
        </div>
    );
}
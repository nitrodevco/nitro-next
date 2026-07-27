import { ISimpleRoomObjectData, RoomControllerLevelEnum } from "@nitrodevco/nitro-api";
import { AmbassadorAlertComposer, AssignRightsComposer, BanUserWithDurationComposer, IgnoreUserComposer, KickUserComposer, MuteUserComposer, RemoveRightsComposer, SetRelationshipStatusComposer, UnignoreUserComposer } from "@nitrodevco/nitro-shared";
import { useState } from "react";

import { NitroIcon } from "#base/components";
import { useOwnIsAmbassador, useOwnRoomObjectId, useRoomPermissionsSelector, useRoomSelector, useRoomSettingsSelector, useWebSocketContext } from "#base/context";
import { useOwnRespectData } from "#base/context/user/selectors/useOwnRespectData";
import { useRoomUserData } from "#base/hooks";
import { useLocalizationStore } from "#base/stores";
import { cn } from "#base/utils";

interface InfoBubbleAvatarViewProps {
    objectData: ISimpleRoomObjectData;
    onClose: () => void;
}

const MODE_NORMAL = 0;
const MODE_MODERATE = 1;
const MODE_MODERATE_BAN = 2;
const MODE_MODERATE_MUTE = 3;
const MODE_AMBASSADOR = 4;
const MODE_AMBASSADOR_MUTE = 5;
const MODE_RELATIONSHIP = 6;

export const InfoBubbleAvatarView = (props: InfoBubbleAvatarViewProps) => {
    const { objectData, onClose } = props;
    const { objectId, category } = objectData;
    const room = useRoomSelector();
    const ownObjectId = useOwnRoomObjectId();
    const userData = useRoomUserData(objectId);
    const ownUserData = useRoomUserData(ownObjectId);
    const [mode, setMode] = useState<number>(MODE_NORMAL);
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const { isRoomOwner } = useRoomPermissionsSelector();
    const { isGuildRoom } = useRoomSettingsSelector();
    const { respectLeft } = useOwnRespectData();
    const isAmbassador = useOwnIsAmbassador();
    const getLocalizationValue = useLocalizationStore(x => x.getLocalizationValue);
    const getLocalizationValueParams = useLocalizationStore(x => x.getLocalizationValueParams);
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
                send(new RemoveRightsComposer({ userIds: [userData.webId] }));
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
                send(new SetRelationshipStatusComposer({ userId: userData.webId, relationshipType: 1 }));
                break;
            case 'rship_smile':
                send(new SetRelationshipStatusComposer({ userId: userData.webId, relationshipType: 2 }));
                break;
            case 'rship_bobba':
                send(new SetRelationshipStatusComposer({ userId: userData.webId, relationshipType: 3 }));
                break;
            case 'rship_none':
                send(new SetRelationshipStatusComposer({ userId: userData.webId, relationshipType: 0 }));
                break;

        }

        if (hideMenu && onClose) onClose();
    }

    const canRequestFriend = true;
    const canGiveRights = isRoomOwner && userData.controllerLevel < RoomControllerLevelEnum.Guest && !isGuildRoom;
    const canRemoveRights = isRoomOwner && userData.controllerLevel === RoomControllerLevelEnum.Guest && !isGuildRoom;
    const canModerate = userData.canBeKicked || userData.canBeBanned || userData.canBeMuted || canGiveRights || canRemoveRights;

    return (
        <div className={cn('contextmenu-container', 'w-30', collapsed && 'menu-collapsed')}>
            {!collapsed && <>
                <div className="flex items-center justify-center menu-header">
                    <p>{userData.name}</p>
                </div>
                <div className="menu-content">
                    {mode === MODE_NORMAL && <>
                        {canRequestFriend && <div className="flex items-center justify-center menu-item" onClick={() => processAction('friend')}>
                            {getLocalizationValue('infostand.button.friend')}
                        </div>}
                        <div className="flex items-center justify-center menu-item" onClick={() => processAction('trade')}>
                            {getLocalizationValue('infostand.button.trade')}
                        </div>
                        <div className="flex items-center justify-center menu-item" onClick={() => processAction('whisper')}>
                            {getLocalizationValue('infostand.button.whisper')}
                        </div>
                        {respectLeft > 0 && <div className="flex items-center justify-center menu-item" onClick={() => processAction('whisper')}>
                            {getLocalizationValueParams('infostand.button.respect', ['count'], [respectLeft.toString()])}
                        </div>}
                        {!canRequestFriend && <div className="flex items-center justify-center menu-item" onClick={() => processAction('relationship')}>
                            {getLocalizationValue('infostand.link.relationship')}
                        </div>}
                        {!userData.isIgnored && <div className="flex items-center justify-center menu-item" onClick={() => processAction('ignore')}>
                            {getLocalizationValue('infostand.button.ignore')}
                        </div>}
                        {userData.isIgnored && <div className="flex items-center justify-center menu-item" onClick={() => processAction('unignore')}>
                            {getLocalizationValue('infostand.button.unignore')}
                        </div>}
                        <div className="flex items-center justify-center menu-item" onClick={() => processAction('report')}>
                            {getLocalizationValue('infostand.button.report')}
                        </div>
                        {canModerate && <div className="flex items-center justify-center menu-item" onClick={() => processAction('moderate')}>
                            {getLocalizationValue('infostand.link.moderate')}
                        </div>}
                        {isAmbassador && <div className="flex items-center justify-center menu-item" onClick={() => processAction('ambassador')}>
                            {getLocalizationValue('infostand.link.ambassador')}
                        </div>}
                        {ownUserData && ownUserData.carryItem > 0 && <div className="flex items-center justify-center menu-item" onClick={() => processAction('pass_hand_item')}>
                            {getLocalizationValue('avatar.widget.pass_hand_item')}
                        </div>}
                    </>}
                    {mode === MODE_MODERATE && <>
                        {userData.canBeKicked && <div className="flex items-center justify-center menu-item" onClick={() => processAction('kick')}>
                            {getLocalizationValue('infostand.button.kick')}
                        </div>}
                        {userData.canBeMuted && <div className="flex items-center justify-center menu-item" onClick={() => processAction('mute')}>
                            {getLocalizationValue('infostand.button.mute')}
                        </div>}
                        {userData.canBeBanned && <div className="flex items-center justify-center menu-item" onClick={() => processAction('ban')}>
                            {getLocalizationValue('infostand.button.ban')}
                        </div>}
                        {canGiveRights && <div className="flex items-center justify-center menu-item" onClick={() => processAction('give_rights')}>
                            {getLocalizationValue('infostand.button.giverights')}
                        </div>}
                        {canRemoveRights && <div className="flex items-center justify-center menu-item" onClick={() => processAction('remove_rights')}>
                            {getLocalizationValue('infostand.button.removerights')}
                        </div>}
                        <div className="flex items-center justify-center menu-item" onClick={() => processAction('back')}>
                            {getLocalizationValue('generic.back')}
                        </div>
                    </>}
                    {mode === MODE_MODERATE_BAN && <>
                        <div className="flex items-center justify-center menu-item" onClick={() => processAction('ban_hour')}>
                            {getLocalizationValue('infostand.button.ban_hour')}
                        </div>
                        <div className="flex items-center justify-center menu-item" onClick={() => processAction('ban_day')}>
                            {getLocalizationValue('infostand.button.ban_day')}
                        </div>
                        <div className="flex items-center justify-center menu-item" onClick={() => processAction('perm_ban')}>
                            {getLocalizationValue('infostand.button.perm_ban')}
                        </div>
                        <div className="flex items-center justify-center menu-item" onClick={() => processAction('moderate')}>
                            {getLocalizationValue('generic.back')}
                        </div>
                    </>}
                    {mode === MODE_MODERATE_MUTE && <>
                        <div className="flex items-center justify-center menu-item" onClick={() => processAction('mute_2min')}>
                            {getLocalizationValue('infostand.button.mute_2min')}
                        </div>
                        <div className="flex items-center justify-center menu-item" onClick={() => processAction('mute_5min')}>
                            {getLocalizationValue('infostand.button.mute_5min')}
                        </div>
                        <div className="flex items-center justify-center menu-item" onClick={() => processAction('mute_10min')}>
                            {getLocalizationValue('infostand.button.mute_10min')}
                        </div>
                        <div className="flex items-center justify-center menu-item" onClick={() => processAction('moderate')}>
                            {getLocalizationValue('generic.back')}
                        </div>
                    </>}
                    {mode === MODE_AMBASSADOR && <>
                        <div className="flex items-center justify-center menu-item" onClick={() => processAction('ambassador_alert')}>
                            {getLocalizationValue('infostand.button.alert')}
                        </div>
                        <div className="flex items-center justify-center menu-item" onClick={() => processAction('ambassador_kick')}>
                            {getLocalizationValue('infostand.button.kick')}
                        </div>
                        <div className="flex items-center justify-center menu-item" onClick={() => processAction('ambassador_mute')}>
                            {getLocalizationValue('infostand.button.mute')}
                        </div>
                        <div className="flex items-center justify-center menu-item" onClick={() => processAction('back')}>
                            {getLocalizationValue('generic.back')}
                        </div>
                    </>}
                    {mode === MODE_AMBASSADOR_MUTE && <>
                        <div className="flex items-center justify-center menu-item" onClick={() => processAction('ambassador_mute_2min')}>
                            {getLocalizationValue('infostand.button.mute_2min')}
                        </div>
                        <div className="flex items-center justify-center menu-item" onClick={() => processAction('ambassador_mute_10min')}>
                            {getLocalizationValue('infostand.button.mute_10min')}
                        </div>
                        <div className="flex items-center justify-center menu-item" onClick={() => processAction('ambassador_mute_60min')}>
                            {getLocalizationValue('infostand.button.mute_60min')}
                        </div>
                        <div className="flex items-center justify-center menu-item" onClick={() => processAction('ambassador_mute_18hr')}>
                            {getLocalizationValue('infostand.button.mute_18hour')}
                        </div>
                        <div className="flex items-center justify-center menu-item" onClick={() => processAction('ambassador')}>
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
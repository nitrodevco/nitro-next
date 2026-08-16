import { ISimpleRoomObjectData, RoomControllerLevelEnum } from "@nitrodevco/nitro-api";
import { AmbassadorAlertComposer, AssignRightsComposer, BanUserWithDurationComposer, IgnoreUserComposer, KickUserComposer, MuteUserComposer, RemoveRightsComposer, SetRelationshipStatusComposer, UnignoreUserComposer } from "@nitrodevco/nitro-packets";
import { useState } from "react";

import { useOwnIsAmbassador, useOwnRespectData, useOwnRoomObjectId, useRoomPermissionsSelector, useRoomSelector, useRoomSettingsSelector, useTranslation, useWebSocketContext } from "#base/context";
import { useRoomUserData } from "#base/hooks";
import { Bubble, Button, NitroIcon } from "#base/theme";

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
    }

    const canRequestFriend = true;
    const canGiveRights = isRoomOwner && userData.controllerLevel < RoomControllerLevelEnum.Guest && !isGuildRoom;
    const canRemoveRights = isRoomOwner && userData.controllerLevel === RoomControllerLevelEnum.Guest && !isGuildRoom;
    const canModerate = userData.canBeKicked || userData.canBeBanned || userData.canBeMuted || canGiveRights || canRemoveRights;


    const MODE_BUTTONS = {
        0: [
            {
                visible: canRequestFriend,
                caption: 'infostand.button.friend',
                action: 'friend'
            },
            {
                visible: true,
                caption: 'infostand.button.trade',
                action: 'trade'
            },
            {
                visible: true,
                caption: 'infostand.button.whisper',
                action: 'whisper'
            },
            {
                visible: respectLeft > 0,
                caption: t('infostand.button.respect', '', { 'count': respectLeft.toString() }),
                action: 'respect'
            },
            {
                visible: !canRequestFriend,
                caption: 'infostand.link.relationship',
                action: 'relationship'
            },
            {
                visible: !userData.isIgnored,
                caption: 'infostand.button.ignore',
                action: 'ignore'
            },
            {
                visible: userData.isIgnored,
                caption: 'infostand.button.unignore',
                action: 'unignore'
            },
            {
                visible: true,
                caption: 'infostand.button.report',
                action: 'report'
            },
            {
                visible: canModerate,
                caption: 'infostand.link.moderate',
                action: 'moderate'
            },
            {
                visible: isAmbassador,
                caption: 'infostand.link.ambassador',
                action: 'ambassador'
            },
            {
                visible: ownUserData && ownUserData.carryItem > 0,
                caption: 'avatar.widget.pass_hand_item',
                action: 'pass_hand_item'
            }
        ],
        1: [
            {
                visible: userData.canBeKicked,
                caption: 'infostand.button.kick',
                action: 'kick'
            },
            {
                visible: userData.canBeMuted,
                caption: 'infostand.button.mute',
                action: 'mute'
            },
            {
                visible: userData.canBeBanned,
                caption: 'infostand.button.ban',
                action: 'ban'
            },
            {
                visible: canGiveRights,
                caption: 'infostand.button.giverights',
                action: 'give_rights'
            },
            {
                visible: canRemoveRights,
                caption: 'infostand.button.removerights',
                action: 'remove_rights'
            },
            {
                visible: true,
                caption: 'generic.back',
                action: 'back'
            }
        ],
        2: [
            {
                visible: true,
                caption: 'infostand.button.ban_hour',
                action: 'ban_hour'
            },
            {
                visible: true,
                caption: 'infostand.button.ban_day',
                action: 'ban_day'
            },
            {
                visible: true,
                caption: 'infostand.button.perm_ban',
                action: 'perm_ban'
            },
            {
                visible: true,
                caption: 'generic.back',
                action: 'moderate'
            }
        ],
        3: [
            {
                visible: true,
                caption: 'infostand.button.mute_2min',
                action: 'mute_2min'
            },
            {
                visible: true,
                caption: 'infostand.button.mute_5min',
                action: 'mute_5min'
            },
            {
                visible: true,
                caption: 'infostand.button.mute_10min',
                action: 'mute_10min'
            },
            {
                visible: true,
                caption: 'generic.back',
                action: 'moderate'
            }
        ],
        4: [
            {
                visible: true,
                caption: 'infostand.button.alert',
                action: 'ambassador_alert'
            },
            {
                visible: true,
                caption: 'infostand.button.kick',
                action: 'ambassador_kick'
            },
            {
                visible: true,
                caption: 'infostand.button.mute',
                action: 'ambassador_mute'
            },
            {
                visible: true,
                caption: 'generic.back',
                action: 'back'
            }
        ],
        5: [
            {
                visible: true,
                caption: 'infostand.button.mute_2min',
                action: 'ambassador_mute_2min'
            },
            {
                visible: true,
                caption: 'infostand.button.mute_10min',
                action: 'ambassador_mute_10min'
            },
            {
                visible: true,
                caption: 'infostand.button.mute_18hour',
                action: 'ambassador_mute_18hr'
            },
            {
                visible: true,
                caption: 'generic.back',
                action: 'ambassador'
            }
        ],
    };

    return (
        <Bubble variant="0" tintColor="#6e6b67">
            {!collapsed && <div className="min-w-30 max-w-30 flex flex-col mx-px overflow-hidden">
                <div className="flex items-center justify-center min-h-6 max-h-6">
                    <span className="text-style-u-bold font-[11px] text-white">{userData.name}</span>
                </div>
                <div className="flex flex-col w-full overflow-hidden gap-px border-y border-black">
                    {MODE_BUTTONS[mode].map(({ visible, caption, action }) =>
                        visible ? <Button key={action} variant="300" tintColor="#2d2a27" className="min-h-6.25 max-h-6.25 text-white text-[11px] w-full" onClick={() => processAction(action)}>{t(caption)}</Button> : null)}
                </div>
            </div>}
            <div className="flex items-center justify-center min-h-4.5 max-h-4.5 p-2 w-full" onClick={() => setCollapsed(!collapsed)}>
                <NitroIcon className="cursor-pointer" icon={!collapsed ? 'icon-context-menu-arrow-down' : 'icon-context-menu-arrow-up'} />
            </div>
        </Bubble>
    );
}
import { GetGuildEditInfoComposer, GetHabboGroupDetailsComposer, JoinHabboGroupComposer } from '@nitrodevco/nitro-packets';
import { useState } from 'react';
import { createPortal } from 'react-dom';

import { useConfigValue, useNavigatorActions, useNavigatorSelectors, useTranslation, useWebSocketContext } from '#base/context';
import { ButtonThick } from '#base/theme';

/*
 * GroupRoomInfoCtrl — group_room_info (195x119 expanded / 195x25 contracted),
 * docked as the "room_group_info" toolbar extension in group rooms. Backgrounds:
 * guilds/group_bg.png expanded, Events/event_bg_contracted.png contracted (both
 * from image.library.url). Title click toggles; the info region opens the group
 * details; join/request-membership (JoinHabboGroup) and manage (owner) share the
 * same 175x29 button slot at (10,79).
 */
export const NavigatorGroupRoomInfoView = () => {
    const { currentRoom, groupDetails, groupRoomInfoExpanded } = useNavigatorSelectors();
    const { setGroupRoomInfoExpanded } = useNavigatorActions();
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const enabled = useConfigValue<boolean>('groupRoomInfo.enabled') ?? false;
    const imageLibraryUrl = useConfigValue<string>('image.library.url') ?? '';
    const badgeUrl = useConfigValue<string>('group.badge.url') ?? '';
    const [joinDisabled, setJoinDisabled] = useState(false);

    const target = document.getElementById('toolbar-extensions');
    const groupId = currentRoom?.groupId ?? 0;
    const details = groupId > 0 ? groupDetails[groupId] : undefined;

    if (!enabled || !target || !details || !details.isGuild) return null;

    const expanded = groupRoomInfoExpanded;
    /* HabboGroupDetailsData — joiningAllowed: not a member of an open group (type 0/4);
       requestMembershipAllowed: exclusive group (type 1) */
    const joiningAllowed = details.status === 0 && (details.type === 0 || details.type === 4);
    const requestAllowed = details.status === 0 && details.type === 1;

    const join = () => {
        setJoinDisabled(true);
        send(new JoinHabboGroupComposer({ groupId: details.groupId }));
    };

    return createPortal(
        <div className="relative pointer-events-auto" style={{ width: 195, height: expanded ? 119 : 25 }}>
            <img
                alt=""
                className="absolute inset-0 pixel-art"
                src={`${imageLibraryUrl}${expanded ? 'guilds/group_bg.png' : 'Events/event_bg_contracted.png'}`}
                onError={event => { event.currentTarget.style.display = 'none'; }} />
            {/* title_region (0,0) 195x25 — toggles expanded */}
            <div className="absolute cursor-pointer" style={{ left: 0, top: 0, width: 195, height: 25 }} onClick={() => setGroupRoomInfoExpanded(!expanded)}>
                <img
                    alt=""
                    className="absolute pixel-art"
                    src={`${imageLibraryUrl}guilds/group_base_icon.png`}
                    style={{ left: 5, top: 3, width: 21, height: 16 }}
                    onError={event => { event.currentTarget.style.display = 'none'; }} />
                <span className="absolute font-ubuntu text-[11px] font-bold text-white truncate" style={{ left: 30, top: 4, width: 156 }}>
                    {t('group.homeroominfo.title')}
                </span>
            </div>
            {expanded && (
                <>
                    {/* info_region (0,28) 195x47 — opens the group details */}
                    <div
                        className="absolute cursor-pointer"
                        style={{ left: 0, top: 28, width: 195, height: 47 }}
                        onClick={() => send(new GetHabboGroupDetailsComposer({ groupId: details.groupId, open: true }))}>
                        {badgeUrl !== '' && (
                            <img
                                alt=""
                                className="absolute pixel-art"
                                src={badgeUrl.replace('%badgedata%', details.badgeCode)}
                                style={{ left: 12, top: 4, width: 39, height: 39 }}
                                onError={event => { event.currentTarget.style.display = 'none'; }} />
                        )}
                        <span className="absolute text-style-regular break-words overflow-hidden" style={{ left: 59, top: 0, width: 125, height: 47 }}>
                            {details.groupName}
                        </span>
                    </div>
                    {/* join / request membership / manage — one 175x29 slot at (10,79) */}
                    {details.isOwner && (
                        <ButtonThick
                            className="absolute flex items-center justify-center"
                            style={{ left: 10, top: 79, width: 175, height: 29 }}
                            variant="3"
                            onClick={() => send(new GetGuildEditInfoComposer({ groupId: details.groupId }))}>
                            {t('group.manage')}
                        </ButtonThick>
                    )}
                    {!details.isOwner && (joiningAllowed || requestAllowed) && (
                        <ButtonThick
                            aria-disabled={joinDisabled || undefined}
                            className={`absolute flex items-center justify-center ${joinDisabled ? 'opacity-40 pointer-events-none' : ''}`}
                            style={{ left: 10, top: 79, width: 175, height: 29 }}
                            variant="3"
                            onClick={join}>
                            {t(joiningAllowed ? 'group.join' : 'group.requestmembership')}
                        </ButtonThick>
                    )}
                </>
            )}
        </div>,
        target
    );
}

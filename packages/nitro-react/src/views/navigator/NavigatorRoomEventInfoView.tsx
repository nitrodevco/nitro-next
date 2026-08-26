import { createPortal } from 'react-dom';

import { useConfigValue, useNavigatorActions, useNavigatorSelectors, useTranslation } from '#base/context';
import { createLinkEvent } from '#base/hooks';

/*
 * RoomEventInfoCtrl — iro_event_info ("Event info", 195x135, contracted 195x25),
 * attached as the "room_event_info" toolbar extension. Backgrounds load from
 * ${image.library.url}Events/event_bg_{visitor,owner,contracted}.png. Visibility:
 *   canModify = owner || eventMod (security >= 5) || roomControllerLevel == 1
 *   nothing renders unless an event runs or canModify;
 *   get_event shows only while no event runs and canModify -> catalog room ads;
 *   clicking the background toggles expanded while an event runs;
 *   modify/extend links show expanded for canModify (extend also needs canExtend()).
 */
export const NavigatorRoomEventInfoView = () => {
    const { roomEventData, roomEventInfoExpanded, currentRoom, currentRoomIsOwner, securityLevel, roomControllerLevel } = useNavigatorSelectors();
    const { setRoomEventInfoExpanded, toggleRoomEventEditor } = useNavigatorActions();
    const t = useTranslation();
    const enabled = useConfigValue<boolean>('eventinfo.enabled') ?? false;
    const imageLibraryUrl = useConfigValue<string>('image.library.url') ?? '';
    const limitTotalTime = useConfigValue<boolean>('roomad.limit_total_time') ?? false;
    const adDurationMinutes = useConfigValue<number>('room_ad.duration.minutes') ?? 120;
    const adMaxTotalMinutes = useConfigValue<number>('room_ad.maximum_total_time.minutes') ?? 10080;

    const target = document.getElementById('toolbar-extensions');

    if (!enabled || !currentRoom || !target) return null;

    const hasEvent = !!roomEventData;
    const canModify = currentRoomIsOwner || securityLevel >= 5 || roomControllerLevel === 1;

    if (!hasEvent && !canModify) return null;

    const expanded = roomEventInfoExpanded && hasEvent;
    /* canExtend — without the total-time limit always; else expiry + duration must fit the cap */
    const canExtend = !limitTotalTime
        || (roomEventData!.minutesUntilEnd + adDurationMinutes) < adMaxTotalMinutes;
    const showGetEvent = !hasEvent && canModify;
    const showModify = expanded && hasEvent && canModify;
    const background = expanded
        ? (currentRoomIsOwner ? 'event_bg_owner' : 'event_bg_visitor')
        : 'event_bg_contracted';

    /* onGetEventClick — with an event the bg click toggles; without, the catalog opens */
    const backgroundClick = () => {
        if (hasEvent) setRoomEventInfoExpanded(!roomEventInfoExpanded);
        else if (showGetEvent) createLinkEvent('catalog/open/room_ad');
    };

    return createPortal(
        <div
            className="relative pointer-events-auto cursor-pointer"
            style={{ width: 195, height: expanded ? 135 : 25 }}
            onClick={backgroundClick}>
            <img
                alt=""
                className="absolute inset-0 pixel-art"
                src={`${imageLibraryUrl}Events/${background}.png`}
                onError={event => { event.currentTarget.style.display = 'none'; }} />
            <img
                alt=""
                className="absolute pixel-art"
                src={`${imageLibraryUrl}Events/event_icon.png`}
                style={{ left: 5, top: 2, width: 16, height: 19 }}
                onError={event => { event.currentTarget.style.display = 'none'; }} />
            {hasEvent && (
                <span className="absolute font-ubuntu text-[11px] font-bold text-white truncate" style={{ left: 26, top: 4, width: 160 }}>
                    {roomEventData.eventName}
                </span>
            )}
            {showGetEvent && (
                <span className="absolute font-ubuntu text-[11px] text-white underline whitespace-nowrap" style={{ left: 31, top: 4 }}>
                    {t('roomad.get.event')}
                </span>
            )}
            {expanded && (
                <span className="absolute text-style-regular break-words overflow-hidden" style={{ left: 10, top: 27, width: 175, height: 80 }}>
                    {roomEventData.eventDescription}
                </span>
            )}
            {expanded && hasEvent && !canModify && (
                <span className="absolute text-style-regular whitespace-nowrap" style={{ left: 17, top: 108 }}>{t('navigator.eventinprogress')}</span>
            )}
            {showModify && (
                <span
                    className="absolute text-style-regular underline cursor-pointer whitespace-nowrap"
                    style={{ left: 5, top: 111 }}
                    onClick={event => { event.stopPropagation(); toggleRoomEventEditor(); }}>
                    {t('navigator.roominfo.editevent')}
                </span>
            )}
            {showModify && canExtend && (
                <span
                    className="absolute text-style-regular underline cursor-pointer whitespace-nowrap"
                    style={{ left: 88, top: 111 }}
                    onClick={event => { event.stopPropagation(); createLinkEvent('catalog/open/room_ad'); }}>
                    {t('roomad.extend.event')}
                </span>
            )}
        </div>,
        target
    );
}

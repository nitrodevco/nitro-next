import { AddFavouriteRoomComposer, DeleteFavouriteRoomComposer, GetExtendedProfileComposer, GetHabboGroupDetailsComposer, GetRoomSettingsComposer, UpdateHomeRoomComposer } from '@nitrodevco/nitro-packets';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { useConfigValue, useNavigatorActions, useNavigatorSelectors, useTranslation, useUserContext, useWebSocketContext } from '#base/context';
import { useNavigatorSearch } from '#base/hooks';
import { Border, Bubble, NitroIcon, useTooltip } from '#base/theme';

/** RoomTradingLevelEnum.getLocalizationKey */
const TRADE_MODE_KEYS: Record<number, string> = {
    0: 'trading.mode.not.allowed',
    1: 'trading.mode.controller',
    2: 'trading.mode.free'
};

/** the popup auto-hides 4000ms after opening once the mouse is off it (NavigatorView.update) */
const POPUP_GRACE_MS = 4000;

/**
 * RoomInfoPopup — a bubble style="7" (left pointer), layout room_info_popup_bubble
 * 374x350, shown at the info region's right edge, vertically centred on it.
 */
export const NavigatorRoomInfoPopupView = () => {
    const { roomInfoPopup, favoriteRoomIds, homeRoomId, groupDetails, perks } = useNavigatorSelectors();
    const { hideRoomInfoPopup, setRoomFavorite, setHomeRoomId, requestRoomSettings } = useNavigatorActions();
    const { performSearch } = useNavigatorSearch();
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const tooltip = useTooltip();
    const reportEnabled = useConfigValue<boolean>('room.report.enabled') ?? false;
    const rankingEnabled = useConfigValue<boolean>('room.ranking.enabled') ?? false;
    const thumbnailUrlBase = useConfigValue<string>('navigator.thumbnail.url_base') ?? '';
    const imageLibraryUrl = useConfigValue<string>('image.library.url') ?? '';
    const officialThumbnailsInAmazon = useConfigValue<boolean>('new.navigator.official.room.thumbnails.in.amazon') ?? false;
    /* settings_container.visible = ownerName == sessionData.userName */
    const ownUserName = useUserContext(x => x.name);
    const hoveredRef = useRef(false);
    const expiredRef = useRef(false);

    const room = roomInfoPopup?.room;

    /* fetch the group details the AS3 pre-fetches on open when not cached */
    useEffect(() => {
        if (!room || room.groupId <= 0 || groupDetails[room.groupId]) return;

        send(new GetHabboGroupDetailsComposer({ groupId: room.groupId, open: false }));
         
    }, [room]);

    /* §_-wA§ = 4000 on open; update() hides once expired and the mouse is outside */
    useEffect(() => {
        if (!roomInfoPopup) return;

        expiredRef.current = false;

        const timer = window.setTimeout(() => {
            expiredRef.current = true;

            if (!hoveredRef.current) hideRoomInfoPopup();
        }, POPUP_GRACE_MS);

        return () => window.clearTimeout(timer);
         
    }, [roomInfoPopup]);

    if (!roomInfoPopup || !room) return null;

    const isFavorite = favoriteRoomIds.includes(room.roomId);
    const isHome = homeRoomId === room.roomId;
    const hasGroup = room.groupBadge !== '';
    const hasEvent = room.adExpiresIn > 0;
    const details = hasGroup ? groupDetails[room.groupId] : undefined;

    /*
     * populate() sets newnavigator_default_room first and only fetches the real
     * thumbnail when the NAVIGATOR_ROOM_THUMBNAIL_CAMERA perk is allowed
     */
    const thumbnailAllowed = perks.some(x => x.code === 'NAVIGATOR_ROOM_THUMBNAIL_CAMERA' && x.isAllowed);
    const thumbnailUrl = room.officialRoomPicRef?.length && !officialThumbnailsInAmazon
        ? imageLibraryUrl + room.officialRoomPicRef
        : `${thumbnailUrlBase}${room.roomId}.png`;

    const toggleFavorite = () => {
        send(isFavorite
            ? new DeleteFavouriteRoomComposer({ roomId: room.roomId })
            : new AddFavouriteRoomComposer({ roomId: room.roomId }));

        setRoomFavorite(room.roomId, !isFavorite);
    };

    const makeHome = () => {
        if (isHome) return;

        send(new UpdateHomeRoomComposer({ roomId: room.roomId }));
        setHomeRoomId(room.roomId);
    };

    const openOwnerProfile = () => {
        send(new GetExtendedProfileComposer({ userId: room.ownerId }));
        hideRoomInfoPopup();
    };

    const openGroupInfo = () => {
        send(new GetHabboGroupDetailsComposer({ groupId: room.groupId, open: true }));
        hideRoomInfoPopup();
    };

    /* performTagSearch — performSearch("hotel_view", "tag:" + tag) */
    const searchTag = (tag: string) => {
        performSearch('hotel_view', `tag:${tag}`);
        hideRoomInfoPopup();
    };

    const eventExpiry = friendlyTime(t, room.adExpiresIn * 60);

    return createPortal(
        <div
            className="fixed z-[9000] -translate-y-1/2"
            style={{ left: roomInfoPopup.x, top: roomInfoPopup.y }}
            onPointerEnter={() => { hoveredRef.current = true; }}
            onPointerLeave={() => {
                hoveredRef.current = false;

                if (expiredRef.current) hideRoomInfoPopup();
            }}>
            <Bubble className="w-93.5 p-2.75" pointer="left" variant="7">
                {/* the bubble layout has no caption label — the window caption is never drawn */}
                <div className="flex flex-col w-full gap-0.75">
                    {/* header — border style 2 (colorless) 345x125: thumbnail 112 + name/desc */}
                    <Border className="flex shrink-0 h-31.25 p-1.5 gap-0" variant="2">
                        {/* room_thumbnail_container 112x112, black, thumbnail 110x110 at (1,1) */}
                        <div className="relative shrink-0 w-28 h-28 bg-black">
                            <div className="absolute inset-px flex items-center justify-center overflow-hidden">
                                <NitroIcon className="absolute" icon="icon-nav-default-room" />
                                {thumbnailAllowed && (
                                    <img
                                        alt=""
                                        className="relative max-w-full max-h-full pixel-art"
                                        src={thumbnailUrl}
                                        onError={event => { event.currentTarget.style.display = 'none'; }} />
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col flex-1 min-w-0 pl-1.5">
                            {/* room_name 214x33 u_bold · room_desc 214x80 default (Volter 9) */}
                            <span className="shrink-0 max-h-8.25 text-style-u-bold break-words line-clamp-2">{room.name}</span>
                            <span className="flex-1 min-h-0 text-style-regular break-words overflow-hidden">{room.description}</span>
                        </div>
                    </Border>
                    {/* room_group_owner_container — owner at x=5, group at x=175 */}
                    {(room.showOwner || hasGroup) && (
                        <div className="flex shrink-0 h-7.5 items-center">
                            {room.showOwner && (
                                <div
                                    className="flex items-center gap-1 w-42.5 cursor-pointer"
                                    onClick={openOwnerProfile}>
                                    <NitroIcon icon="icon-nav-friendlist-eye" />
                                    <span className="truncate text-style-u-bold">{room.ownerName}</span>
                                </div>
                            )}
                            {hasGroup && (
                                <div
                                    className="flex items-center gap-1 flex-1 min-w-0 cursor-pointer"
                                    {...tooltip(t('navigator.tooltip.groupinfo.owner'))}
                                    onClick={openGroupInfo}>
                                    <NitroIcon icon="icon-nav-room-group" />
                                    <span className="truncate text-style-u-bold">{room.groupName}</span>
                                </div>
                            )}
                        </div>
                    )}
                    {/* newMid — properties itemlist left, action rows right */}
                    <div className="flex shrink-0">
                        <div className="flex flex-col flex-1 min-w-0">
                            <PropertyRow name={t('navigator.roompopup.property.trading')} value={t(TRADE_MODE_KEYS[room.tradeType] ?? '', '')} />
                            {rankingEnabled && <PropertyRow name={t('navigator.roompopup.property.ranking')} value={`${room.ranking}`} />}
                            <PropertyRow name={t('navigator.roompopup.property.max_users')} value={`${room.playersMax}`} />
                        </div>
                        {/* midBottom_itemlist — 170 wide, 20px rows */}
                        <div className="flex flex-col shrink-0 w-42.5">
                            <div className="flex items-center h-5 gap-1 cursor-pointer" onClick={toggleFavorite}>
                                <NitroIcon className="shrink-0" icon={isFavorite ? 'icon-nav-fav-yes' : 'icon-nav-fav-no'} />
                                <span className="truncate text-style-regular">{t('navigator.room.popup.room.info.favorite')}</span>
                            </div>
                            <div className="flex items-center h-5 gap-1 cursor-pointer" onClick={makeHome}>
                                <NitroIcon className="shrink-0" icon={isHome ? 'icon-nav-home-yes' : 'icon-nav-home-no'} />
                                <span className="truncate text-style-regular">{t('navigator.room.popup.room.info.home')}</span>
                            </div>
                            {/* RoomSettingsCtrl.startRoomSettingsEditFromNavigator(flatId, habboGroupId) */}
                            {room.ownerName === ownUserName && (
                                <div
                                    className="flex items-center h-5 gap-1 cursor-pointer"
                                    onClick={() => {
                                        requestRoomSettings(room.roomId, room.groupId > 0 ? room.groupId : 0);
                                        send(new GetRoomSettingsComposer({ roomId: room.roomId }));
                                        hideRoomInfoPopup();
                                    }}>
                                    <NitroIcon className="shrink-0" icon="icon-nav-room-settings" />
                                    <span className="truncate text-style-regular">{t('navigator.room.popup.info.room.settings')}</span>
                                </div>
                            )}
                            {/* TODO: opens habboHelp.reportRoom in the SWF — help UI not built yet */}
                            {reportEnabled && room.ownerName !== ownUserName && (
                                <div className="flex items-center h-5 gap-1 cursor-pointer" onClick={hideRoomInfoPopup}>
                                    <NitroIcon className="shrink-0" icon="icon-nav-report-room" />
                                    <span className="truncate text-style-regular">{t('navigator.room.popup.report.room')}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* tag_and_group_info — orange #tag chips (tag_xml: 0xf1a700 bg, u_small
                        white); the row's right edge holds group_mode_admin (owner/admin crown,
                        x=279), group_mode_size (grouptype icon, x=299) and group_mode_furnish
                        (decorate icon, x=318) filled from the cached group details */}
                    {(room.tags.length > 0 || details) && (
                        <div className="flex shrink-0 items-center h-5.75 gap-1">
                            {room.tags.map(tag => (
                                <div
                                    key={tag}
                                    className="flex items-center h-4.75 px-0.75 bg-[#F1A700] cursor-pointer"
                                    onClick={() => searchTag(tag)}>
                                    <span className="text-style-u-small text-white">#{tag}</span>
                                </div>
                            ))}
                            {details && (
                                <div className="flex items-center gap-0.5 ml-auto">
                                    {details.isOwner && <NitroIcon icon="icon-nav-group-owner" />}
                                    {!details.isOwner && details.isAdmin && <NitroIcon icon="icon-nav-group-admin" />}
                                    <img
                                        alt=""
                                        className="pixel-art"
                                        src={`${imageLibraryUrl}guilds/grouptype_icon_${details.type}.png`}
                                        onError={event => { event.currentTarget.style.display = 'none'; }} />
                                    {details.membersCanDecorate && (
                                        <img
                                            alt=""
                                            className="pixel-art"
                                            src={`${imageLibraryUrl}guilds/group_decorate_icon.png`}
                                            onError={event => { event.currentTarget.style.display = 'none'; }} />
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                    {/* event_info — border style 3 tinted 0x0f1a700, event icon + white bold text */}
                    {hasEvent && (
                        <Border className="flex shrink-0 p-0.75 gap-1.5" tintColor="#F1A700" variant="3">
                            <NitroIcon className="shrink-0" icon="icon-nav-event" />
                            <div className="flex flex-col flex-1 min-w-0">
                                <span className="truncate text-style-u-bold text-white">{t('navigator.eventsettings.name')}: {room.adName}</span>
                                <span className="text-style-u-bold text-white break-words line-clamp-2">
                                    {t('navigator.eventsettings.desc')}: {room.adDescription}
                                    {'\n'}{t('roomad.event.expiration_time')}{eventExpiry}
                                </span>
                            </div>
                        </Border>
                    )}
                </div>
            </Bubble>
        </div>,
        document.body
    );
};

const PropertyRow = ({ name, value }: { name: string; value: string }) => (
    /* property_xml — property_name u_regular bold, 70 wide; property_value u_regular at x=70 */
    <div className="flex items-center h-5">
        <span className="shrink-0 w-17.5 text-style-u-bold">{name}</span>
        <span className="truncate text-style-u-regular">{value}</span>
    </div>
);

/** FriendlyTime.getFriendlyTime(seconds) — threshold factor 3, largest unit wins */
const friendlyTime = (t: (key: string, fallback?: string, replacements?: Record<string, string>) => string, seconds: number) => {
    const units: [string, number][] = [
        ['friendlytime.years', 31536000],
        ['friendlytime.months', 2592000],
        ['friendlytime.days', 86400],
        ['friendlytime.hours', 3600],
        ['friendlytime.minutes', 60]
    ];

    for (const [key, size] of units) {
        if (seconds > 3 * size) return t(key, `${Math.round(seconds / size)}`, { amount: `${Math.round(seconds / size)}` });
    }

    return t('friendlytime.seconds', `${Math.round(seconds)}`, { amount: `${Math.round(seconds)}` });
};

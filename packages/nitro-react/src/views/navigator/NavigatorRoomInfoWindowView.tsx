import { AddFavouriteRoomComposer, DeleteFavouriteRoomComposer, GetCustomRoomFilterComposer, GetExtendedProfileComposer, GetHabboGroupDetailsComposer, GetRoomSettingsComposer, MuteAllInRoomComposer, RemoveOwnRoomRightsRoomComposer, ToggleStaffPickComposer, UpdateHomeRoomComposer } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { useConfigValue, useNavigatorActions, useNavigatorSelectors, useTranslation, useWebSocketContext } from '#base/context';
import { useNavigatorSearch } from '#base/hooks';
import { Button, Frame, NitroIcon, useTooltip } from '#base/theme';

/*
 * RoomInfoViewCtrl — iro_room_details_framed ("roominfo", 236 wide, height fitted to
 * the content column + 45). The content stacks [room_details, guild_info, embed_info,
 * buttons_cont] with 3px spacing; room_details stacks name, owner, rating, ranking,
 * a 10px padding, tags, description and the thumbnail with no spacing. The top-right
 * icon strip is remove_rights (163) / home (185) / favourite (206). Buttons are
 * 220x29 style 3, except the report row: a 218x55 illumina container_button with the
 * panic icon and an il_heading_1 label.
 */
export const NavigatorRoomInfoWindowView = () => {
    const {
        roomInfoWindowOpen, currentRoom, currentRoomIsOwner, currentRoomStaffPick,
        currentRoomCanMute, currentRoomAllMuted, currentRoomRating, currentRoomCanRate,
        favoriteRoomIds, favouritesLimit, homeRoomId, securityLevel, roomControllerLevel, roomIsOwn, perks
    } = useNavigatorSelectors();
    const { closeRoomInfoWindow, setRoomFavorite, setHomeRoomId, setCurrentRoomStaffPick, requestRoomSettings, openRoomFilter, showAlert } = useNavigatorActions();
    const { send } = useWebSocketContext();
    const { performSearch } = useNavigatorSearch();
    const t = useTranslation();
    const tooltip = useTooltip();
    const filterEnabled = useConfigValue<boolean>('room.custom.filter.enabled') ?? false;
    const reportEnabled = useConfigValue<boolean>('room.report.enabled') ?? false;
    const rankingEnabled = useConfigValue<boolean>('room.ranking.enabled') ?? false;
    const muteAllEnabled = useConfigValue<boolean>('room_moderation.mute_all.enabled') ?? false;
    const embedEnabled = useConfigValue<boolean>('embed.showInRoomInfo') ?? false;
    const thumbnailUrlBase = useConfigValue<string>('navigator.thumbnail.url_base') ?? '';
    const imageLibraryUrl = useConfigValue<string>('image.library.url') ?? '';
    const userHash = useConfigValue<string>('user.hash') ?? '';
    const badgeUrl = useConfigValue<string>('group.badge.url') ?? '';
    const officialThumbnailsInAmazon = useConfigValue<boolean>('new.navigator.official.room.thumbnails.in.amazon') ?? false;
    const [embedExpanded, setEmbedExpanded] = useState(false);

    if (!roomInfoWindowOpen || !currentRoom) return null;

    const room = currentRoom;
    /* NavigatorData.canEditRoomSettings — owner or hasSecurity(MODERATOR) */
    const canEditSettings = currentRoomIsOwner || securityLevel >= 5;
    const roomPicker = securityLevel >= 7;
    const isHome = homeRoomId === room.roomId;
    const isFavourite = favoriteRoomIds.includes(room.roomId);
    /* hasRoomRightsButIsNotOwner — controller level exactly rights, not owner */
    const hasRightsNotOwner = roomControllerLevel === 1 && !roomIsOwn;
    const thumbnailAllowed = perks.some(x => x.code === 'NAVIGATOR_ROOM_THUMBNAIL_CAMERA' && x.isAllowed);
    const thumbnailUrl = room.officialRoomPicRef?.length && !officialThumbnailsInAmazon
        ? imageLibraryUrl + room.officialRoomPicRef
        : `${thumbnailUrlBase}${room.roomId}.png`;
    const embedSrc = t('navigator.embed.src', '', { roomType: 'private', embedCode: userHash, roomId: `${room.roomId}` });

    /* onAddFavouriteClick — the favourites-full alert lives here */
    const addFavourite = () => {
        if (favoriteRoomIds.length >= favouritesLimit) {
            showAlert(t('navigator.favouritesfull.title'), t('navigator.favouritesfull.body'));

            return;
        }

        send(new AddFavouriteRoomComposer({ roomId: room.roomId }));
        setRoomFavorite(room.roomId, true);
    };

    const removeFavourite = () => {
        send(new DeleteFavouriteRoomComposer({ roomId: room.roomId }));
        setRoomFavorite(room.roomId, false);
    };

    const makeHome = () => {
        send(new UpdateHomeRoomComposer({ roomId: room.roomId }));
        setHomeRoomId(room.roomId);
    };

    const openSettings = () => {
        requestRoomSettings(room.roomId, room.groupId > 0 ? room.groupId : 0);
        send(new GetRoomSettingsComposer({ roomId: room.roomId }));
        closeRoomInfoWindow();
    };

    const openFilter = () => {
        send(new GetCustomRoomFilterComposer({ roomId: room.roomId }));
        openRoomFilter();
        closeRoomInfoWindow();
    };

    /* onStaffPick — flips the caption optimistically and sends the current state */
    const toggleStaffPick = () => {
        send(new ToggleStaffPickComposer({ roomId: room.roomId, isStaffPicked: currentRoomStaffPick }));
        setCurrentRoomStaffPick(!currentRoomStaffPick);
    };

    return (
        <Frame
            caption={t('navigator.roomsettings.roominfo')}
            className="inset-0 m-auto w-59 h-fit"
            contentClassName="flex flex-col gap-0.75 px-0.75 pb-1.5"
            id="navigator-room-info-window"
            resizeDirection="none"
            variant="3"
            onClose={closeRoomInfoWindow}>
            {/* room_details — 230 wide */}
            <div className="relative w-57.5">
                {/* icon strip: remove_rights (163,1) · home (185,1) · favourite (206,1) */}
                <div className="absolute" style={{ left: 163, top: 1 }}>
                    {hasRightsNotOwner && (
                        <NitroIcon
                            className="cursor-pointer"
                            icon="icon-roominfo-remove-rights"
                            {...tooltip(t('navigator.roominfo.removerights.tooltip'))}
                            onClick={() => send(new RemoveOwnRoomRightsRoomComposer({ roomId: room.roomId }))} />
                    )}
                </div>
                <div className="absolute" style={{ left: 185, top: 1 }}>
                    {isHome
                        ? <NitroIcon icon="icon-roominfo-home" />
                        : (
                            <NitroIcon
                                className="cursor-pointer"
                                icon="icon-roominfo-make-home"
                                {...tooltip(t('navigator.roominfo.makehome.tooltip'))}
                                onClick={makeHome} />
                        )}
                </div>
                {!currentRoomIsOwner && (
                    <div className="absolute" style={{ left: 206, top: 1 }}>
                        <NitroIcon
                            className="cursor-pointer"
                            icon={isFavourite ? 'icon-roominfo-favourite' : 'icon-roominfo-make-favourite'}
                            {...tooltip(t(isFavourite ? 'navigator.favourite.tooltip' : 'navigator.makefavourite.tooltip'))}
                            onClick={isFavourite ? removeFavourite : addFavourite} />
                    </div>
                )}
                {/* room_name (5,3) 153 wide, u_bold */}
                <div className="pl-1.25 pt-0.75 pr-19 min-h-5">
                    <span className="text-style-u-bold break-words">{room.name}</span>
                </div>
                {/* owner_name_cont — "Owner:" u_bold #777777 (5), eye (50), name u_regular (67) */}
                {room.showOwner && room.ownerId > 0 && (
                    <div
                        className="relative h-4 cursor-pointer"
                        {...tooltip(t('infostand.profile.link.tooltip'))}
                        onClick={() => send(new GetExtendedProfileComposer({ userId: room.ownerId }))}>
                        <span className="absolute text-style-u-bold text-[#777777] whitespace-nowrap" style={{ left: 5, top: 0 }}>{t('navigator.roomownercaption')}</span>
                        <NitroIcon className="absolute icon-nav-friendlist-eye" icon="icon-nav-friendlist-eye" style={{ left: 50, top: 3 }} />
                        <span className="absolute text-style-u-regular whitespace-nowrap" style={{ left: 67, top: 0 }}>{room.ownerName}</span>
                    </div>
                )}
                {/* rating_cont — caption u_bold #777777, value u_regular at 70, thumb after (+5) */}
                <div className="relative h-4" style={{ paddingLeft: 5 }}>
                    <span className="absolute text-style-u-bold text-[#777777] whitespace-nowrap" style={{ left: 5, top: 0 }}>{t('navigator.roomrating')}</span>
                    <span className="absolute text-style-u-regular" style={{ left: 75, top: 0 }}>{currentRoomRating}</span>
                    {currentRoomCanRate && (
                        <NitroIcon className="absolute" icon="icon-roominfo-thumb-up" style={{ left: 100, top: 0 }} {...tooltip(t('navigator.rateroom'))} />
                    )}
                </div>
                {rankingEnabled && room.ranking > 0 && (
                    <div className="relative h-4">
                        <span className="absolute text-style-u-bold text-[#777777] whitespace-nowrap" style={{ left: 5, top: 0 }}>{t('navigator.roomranking')}</span>
                        <span className="absolute text-style-u-regular" style={{ left: 75, top: 0 }}>{room.ranking}</span>
                    </div>
                )}
                {/* padding_cont — 10px */}
                <div className="h-2.5" />
                {/* tags — TagRenderer/iro_tag: u_small #0E3139 text links, click searches */}
                {room.tags.length > 0 && (
                    <div className="flex items-center gap-1.5 px-1.25 py-0.5">
                        {room.tags.map(tag => (
                            <span
                                key={tag}
                                className="text-style-u-small text-[#0E3139] cursor-pointer"
                                onClick={() => { performSearch('hotel_view', `tag:${tag}`); closeRoomInfoWindow(); }}>
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}
                {/* room_desc — u_regular, only when set */}
                {room.description !== '' && (
                    <div className="px-1.25 py-0.5">
                        <span className="text-style-u-regular break-words">{room.description}</span>
                    </div>
                )}
                {/* thumbnail_container 227x114: black 112x112 box at x57, camera at (144,89) */}
                {thumbnailAllowed && (
                    <div className="relative h-28.5">
                        <div className="absolute bg-black" style={{ left: 57, top: 1, width: 112, height: 112 }}>
                            <div className="absolute flex items-center justify-center overflow-hidden" style={{ left: 1, top: 1, width: 110, height: 110 }}>
                                <NitroIcon className="absolute" icon="icon-nav-default-room" />
                                <img
                                    alt=""
                                    className="relative max-w-none pixel-art"
                                    src={thumbnailUrl}
                                    onError={event => { event.currentTarget.style.display = 'none'; }} />
                            </div>
                        </div>
                        {canEditSettings && (
                            <div
                                className="absolute cursor-pointer"
                                style={{ left: 144, top: 89 }}
                                {...tooltip(t('tooltip.navigator.room.info.add.thumbnail'))}>
                                <NitroIcon icon="icon-roominfo-camera" />
                            </div>
                        )}
                    </div>
                )}
            </div>
            {/* guild_info — 230x49: badge 39x39 + ${navigator.guildbase} with groupName */}
            {room.groupId > 0 && room.groupBadge !== '' && (
                <div
                    className="relative w-57.5 h-12.25 cursor-pointer"
                    style={{ paddingLeft: 11 }}
                    onClick={() => send(new GetHabboGroupDetailsComposer({ groupId: room.groupId, open: true }))}>
                    {badgeUrl !== ''
                        ? (
                            <img
                                alt=""
                                className="absolute pixel-art"
                                src={badgeUrl.replace('%badgedata%', room.groupBadge)}
                                style={{ left: 11, top: 5, width: 39, height: 39 }}
                                onError={event => { event.currentTarget.style.display = 'none'; }} />
                        )
                        : <NitroIcon className="absolute" icon="icon-nav-room-group" style={{ left: 11, top: 12 }} />}
                    <span className="absolute text-style-u-regular underline break-words" style={{ left: 45, top: 1, width: 170 }}>
                        {t('navigator.guildbase', undefined, { groupName: room.groupName })}
                    </span>
                </div>
            )}
            {/* embed_info — weblink icon + underlined caption; expands to info + src */}
            {embedEnabled && (
                <div className="relative w-57.5">
                    <div className="flex items-center gap-2 cursor-pointer" style={{ paddingLeft: 11, paddingTop: 3 }} onClick={() => setEmbedExpanded(x => !x)}>
                        <NitroIcon icon="icon-roomtools-weblink" />
                        <span className="text-style-u-regular underline">{t('navigator.embed.caption')}</span>
                    </div>
                    {embedExpanded && (
                        <div style={{ paddingLeft: 9, paddingRight: 5 }}>
                            <span className="block mt-0.5 text-style-u-small break-words">{t('navigator.embed.info')}</span>
                            <input
                                readOnly
                                className="mt-0.5 w-52 h-3.75 px-1 bg-white border border-black text-style-u-regular"
                                type="text"
                                value={embedSrc}
                                onFocus={event => event.currentTarget.select()} />
                        </div>
                    )}
                </div>
            )}
            {/* buttons_cont — 220x29 style-3 buttons, 3px spacing; report is illumina 218x55 */}
            <div className="flex flex-col gap-0.75 self-center w-55">
                {canEditSettings && (
                    <Button className="w-55 h-7.25" variant="3" onClick={openSettings}>{t('navigator.roomsettings')}</Button>
                )}
                {canEditSettings && filterEnabled && (
                    <Button className="w-55 h-7.25" variant="3" onClick={openFilter}>{t('navigator.roomsettings.roomfilter')}</Button>
                )}
                {roomControllerLevel >= 1 && (
                    <Button className="w-55 h-7.25" variant="3">{t('open.floor.plan.editor')}</Button>
                )}
                {roomPicker && (
                    <Button className="w-55 h-7.25" variant="3" onClick={toggleStaffPick}>
                        {t(currentRoomStaffPick ? 'navigator.staffpicks.unpick' : 'navigator.staffpicks.pick')}
                    </Button>
                )}
                {reportEnabled && (
                    <Button
                        className="relative w-54.5 flex items-center"
                        style={{ height: 55, minHeight: 0 }}
                        variant="101"
                        onClick={closeRoomInfoWindow}>
                        <NitroIcon className="absolute" icon="icon-roominfo-panic" style={{ left: 11, top: 16 }} />
                        <span className="absolute text-style-il-heading-1 whitespace-nowrap" style={{ left: 56, top: 18 }}>{t('create.room.report')}</span>
                    </Button>
                )}
                {currentRoomCanMute && muteAllEnabled && (
                    <Button className="w-55 h-7.25" variant="3" onClick={() => send(new MuteAllInRoomComposer({}))}>
                        {t(currentRoomAllMuted ? 'navigator.muteall_on' : 'navigator.muteall_off')}
                    </Button>
                )}
            </div>
        </Frame>
    );
}

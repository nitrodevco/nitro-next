import { AddFavouriteRoomComposer, DeleteFavouriteRoomComposer, GetCustomRoomFilterComposer, GetExtendedProfileComposer, GetRoomSettingsComposer, MuteAllInRoomComposer, RemoveOwnRoomRightsRoomComposer, ToggleStaffPickComposer, UpdateHomeRoomComposer } from '@nitrodevco/nitro-packets';

import { useConfigValue, useNavigatorActions, useNavigatorSelectors, useTranslation, useWebSocketContext } from '#base/context';
import { Button, Frame, NitroIcon, useTooltip } from '#base/theme';

/*
 * RoomInfoViewCtrl — iro_room_details_framed ("roominfo", 236 wide, height fitted to
 * content), toggled by the toolbar room-info icon while inside a room. The window is
 * a column: room details (name, owner, rating, ranking, tags, description, thumbnail)
 * followed by the button column (settings, filter, floor plan, staff pick, report,
 * mute all), every button 220x29 and only rendered when its gate passes.
 */
export const NavigatorRoomInfoWindowView = () => {
    const {
        roomInfoWindowOpen, currentRoom, currentRoomIsOwner, currentRoomStaffPick,
        currentRoomCanMute, currentRoomAllMuted, currentRoomRating, currentRoomCanRate,
        favoriteRoomIds, favouritesLimit, homeRoomId, securityLevel, roomControllerLevel, roomIsOwn, perks
    } = useNavigatorSelectors();
    const { closeRoomInfoWindow, setRoomFavorite, setHomeRoomId, setCurrentRoomStaffPick, requestRoomSettings, openRoomFilter, showAlert } = useNavigatorActions();
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const tooltip = useTooltip();
    const filterEnabled = useConfigValue<boolean>('room.custom.filter.enabled') ?? false;
    const reportEnabled = useConfigValue<boolean>('room.report.enabled') ?? false;
    const rankingEnabled = useConfigValue<boolean>('room.ranking.enabled') ?? false;
    const muteAllEnabled = useConfigValue<boolean>('room_moderation.mute_all.enabled') ?? false;
    const thumbnailUrlBase = useConfigValue<string>('navigator.thumbnail.url_base') ?? '';
    const imageLibraryUrl = useConfigValue<string>('image.library.url') ?? '';
    const officialThumbnailsInAmazon = useConfigValue<boolean>('new.navigator.official.room.thumbnails.in.amazon') ?? false;

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

    /* onAddFavouriteClick — the limit alert lives here, not in the popup */
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
        if (isHome) return;

        send(new UpdateHomeRoomComposer({ roomId: room.roomId }));
        setHomeRoomId(room.roomId);
    };

    const removeRights = () => send(new RemoveOwnRoomRightsRoomComposer({ roomId: room.roomId }));

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
            className="inset-0 m-auto w-59 max-h-102.75"
            contentClassName="relative flex flex-col"
            id="navigator-room-info-window"
            resizeDirection="none"
            variant="3"
            onClose={closeRoomInfoWindow}>
            {/* room_details */}
            <div className="flex flex-col px-1.25 pt-0.75">
                <div className="flex items-start">
                    {/* room_name (5,3) 153 wide; icon strip right: remove_rights / home / favourite */}
                    <span className="flex-1 min-w-0 text-style-u-bold break-words">{room.name}</span>
                    <div className="flex shrink-0 items-center gap-0.75 pt-0.5">
                        {hasRightsNotOwner && (
                            <NitroIcon
                                className="cursor-pointer"
                                icon="icon-nav-room-settings"
                                {...tooltip(t('navigator.roominfo.removerights.tooltip'))}
                                onClick={removeRights} />
                        )}
                        <NitroIcon
                            className={isHome ? undefined : 'cursor-pointer opacity-60'}
                            icon={isHome ? 'icon-nav-home-yes' : 'icon-nav-home-no'}
                            {...tooltip(t('navigator.roominfo.makehome.tooltip'))}
                            onClick={makeHome} />
                        {!currentRoomIsOwner && (
                            <NitroIcon
                                className="cursor-pointer"
                                icon={isFavourite ? 'icon-nav-fav-yes' : 'icon-nav-fav-no'}
                                {...tooltip(t(isFavourite ? 'navigator.favourite.tooltip' : 'navigator.makefavourite.tooltip'))}
                                onClick={isFavourite ? removeFavourite : addFavourite} />
                        )}
                    </div>
                </div>
                {/* owner_name_cont */}
                {room.showOwner && room.ownerId > 0 && (
                    <div className="flex items-center gap-1 h-4">
                        <span className="text-style-regular">{t('navigator.roomownercaption')}</span>
                        <NitroIcon
                            className="cursor-pointer"
                            icon="icon-nav-friendlist-eye"
                            onClick={() => send(new GetExtendedProfileComposer({ userId: room.ownerId }))} />
                        <span className="truncate text-style-regular">{room.ownerName}</span>
                    </div>
                )}
                {/* rating_cont — display only; RateFlat is sent by the room tools widget */}
                <div className="flex items-center gap-1 h-4">
                    <span className="text-style-regular">{t('navigator.roomrating')}</span>
                    <span className="text-style-regular">{currentRoomRating}</span>
                    {currentRoomCanRate && <NitroIcon icon="icon-accept-check" />}
                </div>
                {rankingEnabled && room.ranking > 0 && (
                    <div className="flex items-center gap-1 h-4">
                        <span className="text-style-regular">{t('navigator.roomranking')}</span>
                        <span className="text-style-regular">{room.ranking}</span>
                    </div>
                )}
                {/* tags */}
                {room.tags.length > 0 && (
                    <div className="flex items-center gap-1 py-0.5">
                        {room.tags.map(tag => (
                            <div key={tag} className="flex items-center h-4.75 px-0.75 bg-[#F1A700]">
                                <span className="text-style-u-small text-white">#{tag}</span>
                            </div>
                        ))}
                    </div>
                )}
                {room.description !== '' && <span className="text-style-regular break-words py-0.5">{room.description}</span>}
                {/* thumbnail_container — hidden entirely without the camera perk */}
                {thumbnailAllowed && (
                    <div className="relative self-center my-1 w-28 h-28 bg-black">
                        <div className="absolute inset-px flex items-center justify-center overflow-hidden">
                            <img
                                alt=""
                                className="max-w-full max-h-full pixel-art"
                                src={thumbnailUrl}
                                onError={event => { event.currentTarget.style.display = 'none'; }} />
                        </div>
                    </div>
                )}
            </div>
            {/* buttons_cont — 220x29 buttons stacked with 3px spacing */}
            <div className="flex flex-col gap-0.75 px-1.25 py-1.5">
                {canEditSettings && (
                    <Button className="w-55 h-7.25" variant="3" onClick={openSettings}>{t('navigator.roomsettings')}</Button>
                )}
                {canEditSettings && filterEnabled && (
                    <Button className="w-55 h-7.25" variant="3" onClick={openFilter}>{t('navigator.roomsettings.roomfilter')}</Button>
                )}
                {roomControllerLevel >= 1 && (
                    <Button className="w-55 h-7.25" variant="3" onClick={() => createFloorPlanEvent()}>{t('open.floor.plan.editor')}</Button>
                )}
                {roomPicker && (
                    <Button className="w-55 h-7.25" variant="3" onClick={toggleStaffPick}>
                        {t(currentRoomStaffPick ? 'navigator.staffpicks.unpick' : 'navigator.staffpicks.pick')}
                    </Button>
                )}
                {reportEnabled && (
                    <Button className="w-55 h-7.25" variant="3" onClick={closeRoomInfoWindow}>{t('create.room.report')}</Button>
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

/* windowManager.displayFloorPlanEditor — no editor exists yet, the link is inert */
const createFloorPlanEvent = () => { /* floor plan editor pending */ };

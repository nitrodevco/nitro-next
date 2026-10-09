import { RoomControllerLevelEnum } from '@nitrodevco/nitro-api';
import { AddFavouriteRoomComposer, DeleteFavouriteRoomComposer, GetExtendedProfileComposer, MuteAllInRoomComposer, RateFlatComposer, RemoveOwnRoomRightsRoomComposer, ToggleStaffPickComposer, UpdateHomeRoomComposer } from '@nitrodevco/nitro-packets';

import { canManageRaidProtection, openClientLink, openGroupInfo, openRoomFilter, searchRoomTag } from '#base/commands';
import { reportRoom } from '#base/commands/helpCommands';
import { useWebSocketContext } from '#base/context/communication';
import { useNavigatorActions, useNavigatorStore } from '#base/context/navigator';
import { useRaidProtectionStore } from '#base/context/raid-protection';
import { useOwnControllerLevel } from '#base/context/room';
import { useConfigValue, useHomeRoomId, useIsWindowVisible, useTranslation, useWindowActions } from '#base/context/system';
import { ClientGates, PerkCodes, useClientGate, useOwnPerkAllowed } from '#base/context/user';
import { RoomInfoView } from '#base/views/room-widgets/room-info/RoomInfoView';

/** `RateFlatMessageComposer(1)` - a like only ever adds one. */
const LIKE_POINTS = 1;

/**
 * The room info panel the tool column's settings button opens - `RoomInfoViewCtrl`. Flash kept it
 * in the navigator; here it sits with the room, because it is only ever opened from the room and
 * needs the room's own controller level to decide what to offer.
 *
 * The gates are `RoomInfoViewCtrl.refreshButtons` and `refreshRoomDetails`, reading
 * `NavigatorData`: `canEditRoomSettings` is the owner or staff from `hasSecurity(5)` - rights
 * alone are not enough - and `roomPicker` is `UserRightsMessage.securityLevel >= 7`.
 */
export const RoomInfoWidget = () => {
    const isVisible = useIsWindowVisible('room_info');
    const enteredRoom = useNavigatorStore(x => x.enteredRoom);
    const currentRoomRating = useNavigatorStore(x => x.currentRoomRating);
    const canRateCurrentRoom = useNavigatorStore(x => x.canRateCurrentRoom);
    const favouriteRoomIds = useNavigatorStore(x => x.favouriteRoomIds);
    const homeRoomId = useHomeRoomId();
    const { showWindow, hideWindow } = useWindowActions();
    const controllerLevel = useOwnControllerLevel();
    const isAnyRoomController = useClientGate(ClientGates.AnyRoomController);
    /* `NavigatorData.roomPicker`, set by `IncomingMessages.onUserRights` at `securityLevel >= 7`. */
    const canStaffPick = useClientGate(ClientGates.StaffPick);
    const thumbnailUrlBase = useConfigValue<string>('navigator.thumbnail.url_base') ?? '';
    const imageLibraryUrl = useConfigValue<string>('image.library.url') ?? '';
    // `RoomInfoViewCtrl.layoutButtons`: the mute-all button needs the hotel's flag as well as the right.
    const muteAllEnabled = useConfigValue<boolean>('room_moderation.mute_all.enabled') === true;
    // `RoomInfoViewCtrl.refreshButtons`: the word filter button needs the hotel's flag as well.
    const roomFilterEnabled = useConfigValue<boolean>('room.custom.filter.enabled') === true;
    const { send } = useWebSocketContext();
    const { setRoomRating, setRoomFavourite, updateEnteredRoom } = useNavigatorActions();
    // `onRaidProtectionStateChanged`: the button follows the capabilities as they come and go.
    const raidCapabilities = useRaidProtectionStore(x => x.capabilities);
    const raidProtectionEnabled = useConfigValue<boolean>('raid.protection.enabled') === true;
    const showEmbed = useConfigValue<boolean>('embed.showInRoomInfo') === true;
    const roomReportEnabled = useConfigValue<boolean>('room.report.enabled') === true;
    const groupBadgeUrl = useConfigValue<string>('badge.asset.group.url') ?? '';
    const userHash = useConfigValue<string>('user.hash') ?? '';
    const thumbnailCameraAllowed = useOwnPerkAllowed(PerkCodes.NavigatorRoomThumbnailCamera);
    const t = useTranslation();

    if (!isVisible || !enteredRoom) return null;

    const { info: currentRoomInfo, isOwner, isStaffPicked, canMute, allInRoomMuted } = enteredRoom;
    const { roomId } = currentRoomInfo;
    const isFavourite = favouriteRoomIds.includes(roomId);
    /* `NavigatorData.canEditRoomSettings` - the room's owner, or staff from `hasSecurity(5)`. */
    const canEditRoomSettings = isOwner || isAnyRoomController;

    const thumbnailUrl = currentRoomInfo.officialRoomPicRef.length
        ? `${imageLibraryUrl}${currentRoomInfo.officialRoomPicRef}`
        : (thumbnailUrlBase.length ? `${thumbnailUrlBase}${roomId}.png` : '');

    return (
        <RoomInfoView
            roomName={currentRoomInfo.name}
            description={currentRoomInfo.description}
            ownerName={currentRoomInfo.ownerName}
            showOwner={currentRoomInfo.showOwner}
            tags={currentRoomInfo.tags}
            rating={currentRoomRating}
            ranking={currentRoomInfo.ranking}
            thumbnailUrl={thumbnailUrl}
            showThumbnail={thumbnailCameraAllowed}
            canAddThumbnail={thumbnailCameraAllowed && canEditRoomSettings}
            // `onAddRoomThumbnail`: the camera's link, then `close()`.
            onAddThumbnail={() => {
                openClientLink(send, 'roomThumbnailCamera/open');
                hideWindow('room_info');
            }}
            showEmbed={showEmbed}
            groupId={currentRoomInfo.groupId}
            groupName={currentRoomInfo.groupName}
            groupBadgeUrl={currentRoomInfo.groupBadge.length ? groupBadgeUrl.replace('%badgedata%', currentRoomInfo.groupBadge) : ''}
            // `GuildInfoCtrl.onGuildInfo`.
            onGroupInfo={() => openGroupInfo(send, currentRoomInfo.groupId)}
            // `getEmbedData`: a guest room's `roomType`, the user's hash and the room id.
            embedSrc={t('navigator.embed.src', '', { roomType: 'private', embedCode: userHash, roomId: String(roomId) })}
            isHome={homeRoomId === roomId}
            isFavourite={isFavourite}
            // Your own rooms are never favourited, so neither button belongs on them.
            canFavourite={!isOwner}
            canRate={canRateCurrentRoom}
            canEditRoomSettings={canEditRoomSettings}
            canEditRoomFilter={canEditRoomSettings && roomFilterEnabled}
            canStaffPick={canStaffPick}
            isStaffPicked={isStaffPicked}
            canMuteAll={canMute && muteAllEnabled}
            allInRoomMuted={allInRoomMuted}
            // `RoomInfoViewCtrl.refreshButtons`: the floor plan editor needs rights in the room, not ownership.
            canEditFloorPlan={Number(controllerLevel) >= Number(RoomControllerLevelEnum.Guest)}
            // `HabboNavigator.hasRoomRightsButIsNotOwner`: exactly the rights you were given.
            canManageRaidProtection={raidProtectionEnabled && raidCapabilities.includes(roomId) && canManageRaidProtection(roomId)}
            canReport={roomReportEnabled}
            canRemoveRights={!isOwner && (Number(controllerLevel) === Number(RoomControllerLevelEnum.Guest))}
            onOpenOwnerProfile={() => send(new GetExtendedProfileComposer({ userId: currentRoomInfo.ownerId }))}
            onSelectTag={tag => searchRoomTag(send, tag)}
            onRate={() => {
                send(new RateFlatComposer({ points: LIKE_POINTS }));
                // The server does not answer a like, so the button is retired here.
                setRoomRating(currentRoomRating + LIKE_POINTS, false);
            }}
            onToggleFavourite={() => {
                send(isFavourite
                    ? new DeleteFavouriteRoomComposer({ roomId })
                    : new AddFavouriteRoomComposer({ roomId }));

                // `FavouriteChangedMessage` confirms it; this keeps the button honest meanwhile.
                setRoomFavourite(roomId, !isFavourite);
            }}
            onMakeHome={() => send(new UpdateHomeRoomComposer({ roomId }))}
            onRemoveRights={() => send(new RemoveOwnRoomRightsRoomComposer({ roomId }))}
            // `startRoomSettingsEdit`: always the room you are in, even over a navigator-opened one.
            onRoomSettings={() => showWindow('room_settings', {})}
            // `onRaidProtectionSettingsClick`: the link, then `close()`.
            onRaidProtection={() => {
                openClientLink(send, `navigator/raidprotection/${roomId}`);
                hideWindow('room_info');
            }}
            // `onRoomFilterButtonClick`: `startRoomFilterEdit(enteredGuestRoom.flatId)`, then `close()`.
            onRoomFilter={() => {
                openRoomFilter(send, roomId);
                hideWindow('room_info');
            }}
            // `onRoomReport`: `habboHelp.reportRoom`, then `close()`.
            onReport={() => {
                reportRoom(roomId, currentRoomInfo.name);
                hideWindow('room_info');
            }}
            onFloorPlanEditor={() => showWindow('floor_plan_editor')}
            onToggleStaffPick={() => {
                send(new ToggleStaffPickComposer({ roomId, isStaffPicked: !isStaffPicked }));
                updateEnteredRoom(roomId, { isStaffPicked: !isStaffPicked });
            }}
            // `RoomInfoViewCtrl.onMuteAllClick` only asks; `MuteAllInRoomMessage` sets the flag the caption follows.
            onMuteAll={() => send(new MuteAllInRoomComposer({}))}
            onClose={() => hideWindow('room_info')}
        />
    );
};

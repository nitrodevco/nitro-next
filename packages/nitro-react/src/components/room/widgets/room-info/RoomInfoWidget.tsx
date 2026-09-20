import { RoomControllerLevelEnum, SecurityLevelEnum } from '@nitrodevco/nitro-api';
import { AddFavouriteRoomComposer, DeleteFavouriteRoomComposer, GetExtendedProfileComposer, MuteAllInRoomComposer, RateFlatComposer, RemoveOwnRoomRightsRoomComposer, ToggleStaffPickComposer, UpdateHomeRoomComposer } from '@nitrodevco/nitro-packets';

import { searchRoomTag } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useNavigatorActions, useNavigatorStore } from '#base/context/navigator';
import { useOwnControllerLevel } from '#base/context/room';
import { useConfigValue, useHomeRoomId, useIsWindowVisible, useWindowActions } from '#base/context/system';
import { useOwnSecurityLevel } from '#base/context/user';
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
    const securityLevel = useOwnSecurityLevel();
    const thumbnailUrlBase = useConfigValue<string>('navigator.thumbnail.url_base') ?? '';
    const imageLibraryUrl = useConfigValue<string>('image.library.url') ?? '';
    // `RoomInfoViewCtrl.layoutButtons`: the mute-all button needs the hotel's flag as well as the right.
    const muteAllEnabled = useConfigValue<boolean>('room_moderation.mute_all.enabled') === true;
    const { send } = useWebSocketContext();
    const { setRoomRating, setRoomFavourite, updateEnteredRoom } = useNavigatorActions();

    if (!isVisible || !enteredRoom) return null;

    const { info: currentRoomInfo, isOwner, isStaffPicked, canMute, allInRoomMuted } = enteredRoom;
    const { roomId } = currentRoomInfo;
    const isFavourite = favouriteRoomIds.includes(roomId);
    /* `NavigatorData.canEditRoomSettings` - the room's owner, or staff from `hasSecurity(5)`. */
    const canEditRoomSettings = isOwner || (Number(securityLevel) >= Number(SecurityLevelEnum.Moderator));
    /* `NavigatorData.roomPicker`, set by `IncomingMessages.onUserRights` at `securityLevel >= 7`. */
    const canStaffPick = Number(securityLevel) >= Number(SecurityLevelEnum.Community);

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
            isHome={homeRoomId === roomId}
            isFavourite={isFavourite}
            // Your own rooms are never favourited, so neither button belongs on them.
            canFavourite={!isOwner}
            canRate={canRateCurrentRoom}
            canEditRoomSettings={canEditRoomSettings}
            canStaffPick={canStaffPick}
            isStaffPicked={isStaffPicked}
            canMuteAll={canMute && muteAllEnabled}
            allInRoomMuted={allInRoomMuted}
            // `HabboNavigator.hasRoomRightsButIsNotOwner`: exactly the rights you were given.
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
            onRoomSettings={() => showWindow('room_settings')}
            onToggleStaffPick={() => {
                send(new ToggleStaffPickComposer({ roomId, isStaffPicked: !isStaffPicked }));
                updateEnteredRoom(roomId, { isStaffPicked: !isStaffPicked });
            }}
            onMuteAll={() => {
                send(new MuteAllInRoomComposer({}));
                updateEnteredRoom(roomId, { allInRoomMuted: !allInRoomMuted });
            }}
            onClose={() => hideWindow('room_info')}
        />
    );
};

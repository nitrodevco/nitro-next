import { NoobnessLevelEnum, RoomDoorModeEnum } from '@nitrodevco/nitro-api';
import { CantConnectMessage, CantConnectReason, DoorbellMessage, FavouriteChangedMessage, FavouritesMessage, FlatAccessDeniedMessage, FlatAccessibleMessage, FollowFriendComposer, GenericErrorMessage, GetGuestRoomComposer, GetGuestRoomResultMessage, GetUserEventCatsComposer, GetUserFlatCatsComposer, NavigatorCollapsedCategoriesMessage, NavigatorMetadataMessage, NavigatorSavedSearchesMessage, NavigatorSearchResultBlocksMessage, NavigatorSettingsMessage, NewNavigatorInitComposer, NewNavigatorPreferencesMessage, PerkAllowancesMessage, QuitComposer, RoomEntryInfoMessage, RoomForwardMessage, RoomRatingMessage, UserEventCatsMessage, UserFlatCatsMessage, UserObjectMessage } from '@nitrodevco/nitro-packets';

import { forwardToRoom, goToHomeRoom, goToRoom } from '#base/commands';
import { WebSocketConnection } from '#base/context/communication';
import { navigatorStore } from '#base/context/navigator';
import { systemStore } from '#base/context/system';
import { userStore } from '#base/context/user';
import { GetLaunchParameter } from '#base/utils';

import { on, subscribeAll } from '../packetSubscriptions';

/** `GenericErrorMessage.errorCode` the server answers a wrong room password with. */
const PASSWORD_REJECTED_ERROR_CODE = -100002;

/** `forward.type` launch parameter values the navigator acts on; 0 is set when `friend.id` is present, -1 when nothing is. */
const FORWARD_TYPE_NONE = -1;
const FORWARD_TYPE_FRIEND = 0;
const FORWARD_TYPE_GUEST_ROOM = 2;

/**
 * The navigator's packets - Flash's `IncomingMessages`/`NavigatorMessageHandler`. Registered once
 * for the life of the connection, so every listener reads the stores through `getState()` at the
 * moment the packet arrives: a batch of packets is dispatched without React rendering in between,
 * and anything captured at render time would be a packet behind.
 *
 * Returns the unsubscribe.
 */
export const registerNavigatorHandlers = ({ send, subscribe }: WebSocketConnection) => {
    const navigator = () => navigatorStore.getState();
    // HabboNavigator.data.settingsReceived: only the first NavigatorSettings decides where to start.
    let settingsReceived = false;

    return subscribeAll(subscribe, [
        on(UserObjectMessage, () => {
            send(new GetUserFlatCatsComposer({}));
            send(new GetUserEventCatsComposer({}));
            send(new NewNavigatorInitComposer({}));
        }),

        on(NavigatorMetadataMessage, (data) => {
            navigator().setTopLevelContexts(data.topLevelContexts);

            // the SWF opens on the first context in the list
            navigator().setTopLevelContext(data.topLevelContexts[0]);
        }),

        // quick links come from NavigatorSavedSearchesMessage — the topLevelContexts
        // in NavigatorMetadataMessage arrive with an empty quickLinks array
        on(NavigatorSavedSearchesMessage, data => navigator().setSavedSearches(data.savedSearches)),

        // CategoryElementFactory removes both toggle buttons unless
        // sessionData.isPerkAllowed("NAVIGATOR_ROOM_THUMBNAIL_CAMERA")
        on(PerkAllowancesMessage, data => navigator().setPerks(data.perks)),

        /*
         * HabboNewNavigator.onPreferences -> NavigatorView.setInitialWindowDimensions(
         *   windowX, windowY, windowHeight, leftPaneHidden, resultsMode):
         *     setLeftPaneVisibility(!leftPaneHidden)
         *     window.x = windowX; window.y = windowY; window.height = windowHeight
         * resultsMode is passed but unused there.
         */
        on(NewNavigatorPreferencesMessage, (data) => {
            navigator().setLeftPaneHidden(data.leftPaneHidden);

            navigator().setPreferences({
                windowX: data.windowX,
                windowY: data.windowY,
                windowWidth: data.windowWidth,
                windowHeight: data.windowHeight,
                resultsMode: data.resultsMode,
            });
        }),

        on(UserFlatCatsMessage, data => navigator().setFlatCategories(data.nodes)),

        on(UserEventCatsMessage, data => navigator().setEventCategories(data.eventCategories)),

        on(NavigatorSearchResultBlocksMessage, data => navigator().setSearchResult(data.searchResult)),

        on(NavigatorCollapsedCategoriesMessage, (data) => {
            navigator().setCollapsedCategories((data as { collapsedCategories?: string[] }).collapsedCategories ?? []);
        }),

        /*
         * IncomingMessages.onNavigatorSettings: remember the home room; only the first settings
         * decide where the client starts, from the launch parameters and the server's
         * `roomIdToEnter`:
         * - `friend.id`: follow that friend (forward type 0, so nothing below runs).
         * - `forward.type` 2 + `forward.id`: room forward to that guest room.
         * - no forward parameter: enter `roomIdToEnter` directly when it is set - or, when it is
         *   the home room, through goToHomeRoom(), opening the navigator instead if that fails.
         * (Flash also skips all of this in room viewer mode, which has no equivalent here.)
         */
        on(NavigatorSettingsMessage, (data) => {
            const firstSettings = !settingsReceived;

            systemStore.getState().setHomeRoomId(data.homeRoomId);
            settingsReceived = true;

            if (!firstSettings) return;

            let forwardType = FORWARD_TYPE_NONE;
            let forwardId = -1;
            let shouldOpenNavigator = false;

            const friendId = GetLaunchParameter('friend.id');

            if (friendId !== undefined) {
                forwardType = FORWARD_TYPE_FRIEND;

                send(new FollowFriendComposer({ playerId: parseInt(friendId) }));
            }

            const forwardTypeParameter = GetLaunchParameter('forward.type');
            const forwardIdParameter = GetLaunchParameter('forward.id');

            if (forwardTypeParameter !== undefined && forwardIdParameter !== undefined) {
                forwardType = parseInt(forwardTypeParameter);
                forwardId = parseInt(forwardIdParameter);
            }

            if (forwardType === FORWARD_TYPE_GUEST_ROOM) forwardToRoom(send, forwardId);
            else if (forwardType === FORWARD_TYPE_NONE && data.roomIdToEnter > 0) {
                if (data.roomIdToEnter !== data.homeRoomId) goToRoom(send, data.roomIdToEnter);
                // the store already holds the home room id this message just set
                else if (!goToHomeRoom(send)) shouldOpenNavigator = true;
            }

            if (shouldOpenNavigator) systemStore.getState().showWindow('navigator');
        }),

        // forwardToRoom(send, ): ask for the room info first; GetGuestRoomResult(roomForward) decides how to enter
        on(RoomForwardMessage, data => forwardToRoom(send, data.roomId)),

        // onRoomEnter(): we are inside the room (server-side entry, home room, teleport...) - fetch its info
        on(RoomEntryInfoMessage, (data) => {
            navigator().setRoomEntryDialog(undefined);
            navigator().setAlert(undefined);

            send(new GetGuestRoomComposer({
                roomId: data.roomId,
                enterRoom: true,
                roomForward: false,
            }));
        }),

        /*
         * NavigatorMessageHandler.onRoomInfo:
         * - enterRoom: we are already in the room, keep its info.
         * - roomForward: we asked to enter. If the server is opening the connection itself the
         *   session starts without sending anything (goToRoom with skipOpc); a doorbell room shows
         *   the doorbell, a password room the password input (owners and group members skip both);
         *   otherwise open the flat connection.
         * - neither: plain room info (the room info popup).
         */
        on(GetGuestRoomResultMessage, (data) => {
            const room = data.roomInfo;
            const { name: ownUserName, isAmbassador, noobnessLevel } = userStore.getState();
            const isOwner = !!ownUserName.length && room.ownerName === ownUserName;

            // Whichever result names a room, the room tools' history takes the name from it.
            navigator().renameRoomVisit(room.roomId, room.name);

            if (data.enterRoom) {
                navigator().setEnteredRoom({
                    info: room,
                    isOwner,
                    isStaffPicked: data.staffPick,
                    canMute: data.canMute,
                    allInRoomMuted: data.allInRoomMuted,
                });
                navigator().recordRoomVisit(room.roomId, room.name);

                return;
            }

            // Plain room info (the room info popup) changes nothing here.
            if (!data.roomForward) return;

            if (data.openingConnection) {
                goToRoom(send, room.roomId, '', true);

                return;
            }

            if (room.doorMode === RoomDoorModeEnum.Locked && !data.isGroupMember && !isOwner) {
                navigator().setRoomEntryDialog({ room, mode: 'doorbell' });

                return;
            }

            if (room.doorMode === RoomDoorModeEnum.Password && !isOwner && !data.isGroupMember) {
                navigator().setRoomEntryDialog({ room, mode: 'password' });

                return;
            }

            // Flash also lets anyone holding room-controller rights somewhere through; that flag is not tracked here.
            if (room.doorMode === RoomDoorModeEnum.NoobLobby && !isAmbassador && Number(noobnessLevel) !== Number(NoobnessLevelEnum.RealNoob)) return;

            goToRoom(send, room.roomId);
        }),

        on(RoomRatingMessage, (data) => {
            navigator().setRoomRating(data.rating, data.canRate);
        }),

        // An empty username is our own ring being acknowledged (a name is someone ringing at a room we own).
        on(DoorbellMessage, (data) => {
            if (data.username.length) return;

            navigator().setRoomEntryDialogMode('doorbell_waiting');
        }),

        on(FlatAccessibleMessage, (data) => {
            if (data.username.length) return;

            navigator().setRoomEntryDialog(undefined);
        }),

        // Nobody answered (or the owner said no); the room handler disposes the pending session, which puts the hotel view back.
        on(FlatAccessDeniedMessage, (data) => {
            if (data.username.length) return;

            navigator().setRoomEntryDialogMode('doorbell_no_answer');
        }),

        on(GenericErrorMessage, (data) => {
            switch (data.errorCode) {
                case PASSWORD_REJECTED_ERROR_CODE:
                    navigator().setRoomEntryDialogMode('password_retry');
                    break;
                case 4009:
                    navigator().setAlert({ titleKey: 'generic.alert.title', messageKey: 'navigator.alert.need.to.be.vip' });
                    break;
                case 4010:
                    navigator().setAlert({ titleKey: 'generic.alert.title', messageKey: 'navigator.alert.invalid_room_name' });
                    break;
                case 4011:
                    navigator().setAlert({ titleKey: 'generic.alert.title', messageKey: 'navigator.alert.cannot_perm_ban' });
                    break;
                case 4013:
                    navigator().setAlert({ titleKey: 'generic.alert.title', messageKey: 'navigator.alert.room_in_maintenance' });
                    break;
                case -100005:
                    navigator().setAlert({ titleKey: 'generic.alert.title', messageKey: 'notification.nft_token_required' });
                    break;
            }
        }),

        on(FavouritesMessage, (data) => {
            navigator().setFavouriteRooms(data.favouriteRoomIds, data.limit);
        }),

        on(FavouriteChangedMessage, (data) => {
            navigator().setRoomFavourite(data.roomId, data.added);
        }),

        /*
         * onCantConnect: explain why and quit the pending session; Flash then fires the toolbar's
         * reception click, whose landing-view handler disposes the session (the room handler does
         * that on this same message, which puts the hotel view back).
         */
        on(CantConnectMessage, (data) => {
            switch (data.reason) {
                case CantConnectReason.RoomFull:
                    navigator().setAlert({ titleKey: 'navigator.guestroomfull.title', messageKey: 'navigator.guestroomfull.text' });
                    break;
                case CantConnectReason.QueueError:
                    navigator().setAlert({ titleKey: 'room.queue.error.title', messageKey: `room.queue.error.${data.parameter}` });
                    break;
                case CantConnectReason.Banned:
                    navigator().setAlert({ titleKey: 'navigator.banned.title', messageKey: 'navigator.banned.text' });
                    break;
                case CantConnectReason.Blocked:
                    navigator().setAlert({ titleKey: 'navigator.blocked.title', messageKey: 'navigator.blocked.text' });
                    break;
                default:
                    navigator().setAlert({ titleKey: 'room.queue.error.title', messageKey: 'room.queue.error.title' });
                    break;
            }

            navigator().setRoomEntryDialog(undefined);

            send(new QuitComposer({}));
        }),
    ]);
};

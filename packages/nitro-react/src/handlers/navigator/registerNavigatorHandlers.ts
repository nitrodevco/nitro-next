import { NoobnessLevelEnum, RoomDoorModeEnum } from '@nitrodevco/nitro-api';
import { CantConnectMessage, CantConnectReason, CloseConnectionMessage, ConvertedRoomIdMessage, DoorbellMessage, FavouriteChangedMessage, FavouritesMessage, FlatAccessDeniedMessage, FlatAccessibleMessage, FlatCreatedMessage, FollowFriendComposer, GenericErrorMessage, GetGuestRoomComposer, GetGuestRoomResultMessage, GetUserEventCatsComposer, GetUserFlatCatsComposer, MuteAllInRoomMessage, NavigatorCollapsedCategoriesMessage, NavigatorLiftedRoomsMessage, NavigatorMetadataMessage, NavigatorSavedSearchesMessage, NavigatorSearchResultBlocksMessage, NavigatorSettingsMessage, NewNavigatorInitComposer, NewNavigatorPreferencesMessage, QuitComposer, RoomAdErrorEventMessage, RoomEntryInfoMessage, RoomEventCancelMessage, RoomEventMessage, RoomFilterSettingsMessage, RoomForwardMessage, RoomInfoUpdatedMessage, RoomRatingMessage, ShowEnforceRoomCategoryDialogMessage, UserEventCatsMessage, UserFlatCatsMessage, UserObjectMessage } from '@nitrodevco/nitro-packets';

import { confirmAskForward, forwardToRoom, goToHomeRoom, goToRoom, reportRoom, trackEventLog } from '#base/commands';
import { WebSocketConnection } from '#base/context/communication';
import { navigatorStore } from '#base/context/navigator';
import { configInteger, systemStore } from '#base/context/system';
import { userStore } from '#base/context/user';
import { configReader, GetLaunchParameter, isRoomEventExtendable, ROOM_AD_DURATION_MINUTES_DEFAULT, ROOM_AD_MAXIMUM_TOTAL_MINUTES_DEFAULT } from '#base/utils';

import { on, subscribeAll } from '../packetSubscriptions';

/** `GenericErrorMessage.errorCode` the server answers a wrong room password with. */
const PASSWORD_REJECTED_ERROR_CODE = -100002;

/** `forward.type` launch parameter values the navigator acts on; 0 is set when `friend.id` is present, -1 when nothing is. */
const FORWARD_TYPE_NONE = -1;
const FORWARD_TYPE_FRIEND = 0;
const FORWARD_TYPE_GUEST_ROOM = 2;

/**
 * The navigator's packets - Flash's `IncomingMessages`/`NavigatorMessageHandler`, the legacy
 * navigator's room event and category enforcement included (Flash installs both navigators, and
 * only the legacy one listens for `ShowEnforceRoomCategoryDialogMessage`). Registered once
 * for the life of the connection, so every listener reads the stores through `getState()` at the
 * moment the packet arrives: a batch of packets is dispatched without React rendering in between,
 * and anything captured at render time would be a packet behind.
 *
 * Returns the unsubscribe.
 */
export const registerNavigatorHandlers = ({ send, subscribe }: WebSocketConnection) => {
    const navigator = () => navigatorStore.getState();
    /** `IncomingMessages.forwardToRoom`: a forward the server asked for, and its `trackNavigationDataPoint`. */
    const forwardFromServer = (roomId: number) => {
        forwardToRoom(send, roomId);
        trackEventLog(send, 'Navigation', 'Room Forward', 'go.roomforward', '', roomId);
    };
    /** `RoomFilterCtrl.close` on a room enter or exit: the window hides, keeping its words, and edits no room. */
    const closeRoomFilterForRoomChange = () => {
        navigator().setRoomFilterFlatId(0);
        systemStore.getState().hideWindow('room_filter');
    };
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

        /*
         * HabboNewNavigator.onPreferences -> NavigatorView.setInitialWindowDimensions(windowX,
         * windowY, windowHeight, leftPaneHidden, resultsMode). The preferences come at login,
         * before the window exists, so they are kept for `createMainWindow` - which opens with the
         * left pane hidden and shows it when the flag is set. The flag is named `leftPaneHidden`
         * but carries what `sendWindowPreferences` sent, `left_pane.visible`. resultsMode is unused.
         */
        on(NewNavigatorPreferencesMessage, (data) => {
            navigator().setLeftPaneHidden(!data.leftPaneHidden);

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

        on(NavigatorSearchResultBlocksMessage, data => navigator().receiveSearchResult(data.searchResult)),

        // IncomingMessages.onRoomInfoUpdated: a room's settings changed - ask for its info again, which the GetGuestRoomResult listener below takes in.
        on(RoomInfoUpdatedMessage, data => send(new GetGuestRoomComposer({ roomId: data.roomId, enterRoom: false, roomForward: false }))),

        /*
         * NewIncomingMessages.onMuteAllEvent: the server's answer to the room info panel's mute-all
         * button - the entered room's `allInRoomMuted`, which the button's caption then follows.
         */
        on(MuteAllInRoomMessage, (data) => {
            const entered = navigator().enteredRoom;

            if (entered) navigator().updateEnteredRoom(entered.info.roomId, { allInRoomMuted: data.allMuted });
        }),

        /*
         * IncomingMessages.onFlatCreated: straight into the room just made
         * (`goToRoom(flatId, true)`), then `goToMainView` hides the room creation window and
         * `closeNavigator` the navigator. Flash also remembers the id as `createdFlatId` so the
         * first entry skips the room-entry ad; the port shows no such ad.
         */
        on(FlatCreatedMessage, (data) => {
            goToRoom(send, data.roomId);

            const { hideWindow } = systemStore.getState();

            hideWindow('navigator_room_create');
            hideWindow('navigator');
        }),

        on(NavigatorLiftedRoomsMessage, data => navigator().setLiftedRooms(data.liftedRooms)),

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

            if (forwardType === FORWARD_TYPE_GUEST_ROOM) forwardFromServer(forwardId);
            else if (forwardType === FORWARD_TYPE_NONE && data.roomIdToEnter > 0) {
                if (data.roomIdToEnter !== data.homeRoomId) goToRoom(send, data.roomIdToEnter);
                // the store already holds the home room id this message just set
                else if (!goToHomeRoom(send)) shouldOpenNavigator = true;
            }

            if (shouldOpenNavigator) systemStore.getState().showWindow('navigator');
        }),

        // forwardToRoom(send, ): ask for the room info first; GetGuestRoomResult(roomForward) decides how to enter
        on(RoomForwardMessage, data => forwardFromServer(data.roomId)),

        // `IncomingMessages.onConvertedRoomId`: the room a global id names - reported (`habboHelp.reportRoom`) or forwarded to.
        on(ConvertedRoomIdMessage, (data) => {
            const { webRoomReport, webRoomReportedName } = navigator();

            if (webRoomReport) reportRoom(data.convertedId, webRoomReportedName ?? '');
            else forwardFromServer(data.convertedId);
        }),

        // onRoomEnter(): we are inside the room (server-side entry, home room, teleport...) - fetch its info
        on(RoomEntryInfoMessage, (data) => {
            navigator().setRoomEntryDialog(undefined);
            navigator().setAlert(undefined);
            // `NavigatorData.onRoomEnter`'s room and owner flag, and `roomEventViewCtrl.close`.
            navigator().setCurrentRoom(data.roomId, data.isOwner);
            navigator().setRoomEventSettingsVisible(false);
            closeRoomFilterForRoomChange();

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

                // A group's room starts with the event card folded, so it does not crowd the group's banner.
                if (room.groupId > 0) navigator().setRoomEventInfoExpanded(false);

                return;
            }

            // Plain room info (RoomInfoUpdated's refetch) replaces the entered room's info and staff
            // pick, as `IncomingMessages.onRoomInfo` does, so a new owner or name shows without
            // re-entering; the owner flag stays the one the entry gave (`currentRoomOwner`). Flash
            // takes any room here; another room's info (a room link) leaves ours alone.
            if (!data.roomForward) {
                const entered = navigator().enteredRoom;

                if (entered && (entered.info.roomId === room.roomId)) navigator().setEnteredRoom({
                    ...entered,
                    info: room,
                    isStaffPicked: data.staffPick,
                });

                // `NewIncomingMessages.onRoomInfo` -> `HabboNewNavigator.onRoomInfo`: the room an ask_forward link asked about.
                confirmAskForward(send, room.roomId, room.name);

                return;
            }

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

        // `onRoomEventEvent`: an event whose owner is nobody is no event.
        on(RoomEventMessage, (data) => {
            if (data.data.ownerAvatarId <= 0) {
                navigator().setRoomEventData(undefined);

                return;
            }

            const { config } = systemStore.getState();
            const { configBoolean } = configReader(config);
            const extendable = isRoomEventExtendable(
                data.data,
                Date.now(),
                configBoolean('roomad.limit_total_time'),
                configInteger('room_ad.duration.minutes', ROOM_AD_DURATION_MINUTES_DEFAULT),
                configInteger('room_ad.maximum_total_time.minutes', ROOM_AD_MAXIMUM_TOTAL_MINUTES_DEFAULT),
            );

            navigator().setRoomEventData(data.data, extendable);
        }),

        on(RoomEventCancelMessage, () => navigator().setRoomEventData(undefined)),

        // `RoomEventViewCtrl.onRoomAdError`.
        on(RoomAdErrorEventMessage, data => navigator().setRoomAdError(data.errorCode, data.filteredText)),

        // The legacy navigator's `onEnforceRoomCategorySelection` -> `EnforceCategoryCtrl.show`.
        on(ShowEnforceRoomCategoryDialogMessage, data => navigator().setEnforceCategorySelectionType(data.selectionType)),

        /*
         * `onRoomExit` -> `NavigatorData.onRoomExit`: the room's event goes, and the event card
         * (`roomEventInfoCtrl.close`) and its settings (`roomEventViewCtrl.close`) with it.
         */
        // `IncomingMessages.onRoomExit`: `data.onRoomExit()` and the room's windows closed.
        on(CloseConnectionMessage, () => {
            navigator().exitCurrentRoom();
            navigator().setRoomEventData(undefined);
            navigator().setRoomEventSettingsVisible(false);
            closeRoomFilterForRoomChange();
        }),

        // `IncomingMessages.onRoomFilterSettings` -> `RoomFilterCtrl.onRoomFilterSettings`.
        on(RoomFilterSettingsMessage, data => navigator().mergeRoomFilterWords(data.badWords)),
    ]);
};

import { NoobnessLevelEnum, RoomDoorModeEnum } from '@nitrodevco/nitro-api';
import { CantConnectMessage, CantConnectReason, DoorbellMessage, FavouriteChangedMessage, FlatAccessDeniedMessage, FlatAccessibleMessage, FlatCreatedMessage, FollowFriendComposer, GenericErrorMessage, GetGuestRoomComposer, GetGuestRoomResultMessage, GetUserEventCatsComposer, GetUserFlatCatsComposer, NavigatorCollapsedCategoriesMessage, NavigatorMetadataMessage, NavigatorSavedSearchesMessage, NavigatorSearchResultBlocksMessage, NavigatorSettingsMessage, NewNavigatorInitComposer, NewNavigatorPreferencesMessage, PerkAllowancesMessage, QuitComposer, RoomEntryInfoMessage, RoomForwardMessage, RoomRatingMessage, UserEventCatsMessage, UserFlatCatsMessage, UserObjectMessage, UserRightsMessage } from '@nitrodevco/nitro-packets';
import { useRef } from 'react';

import { useNavigatorActions, useOwnIsAmbassador, useOwnUserInfo, useSystemActions, useUserContext, useWebSocketContext } from '#base/context';
import { useForwardToRoom, useGoToHomeRoom, useGoToRoom, useMessageListener, useNavigatorVisibility } from '#base/hooks';
import { GetLaunchParameter } from '#base/utils';

/** `GenericErrorMessage.errorCode` the server answers a wrong room password with. */
const PASSWORD_REJECTED_ERROR_CODE = -100002;

/** `forward.type` launch parameter values the navigator acts on; 0 is set when `friend.id` is present, -1 when nothing is. */
const FORWARD_TYPE_NONE = -1;
const FORWARD_TYPE_FRIEND = 0;
const FORWARD_TYPE_GUEST_ROOM = 2;

export const useNavigatorHandler = () => {
    const { send } = useWebSocketContext();
    const { setHomeRoomId } = useSystemActions();
    const {
        setTopLevelContexts, setTopLevelContext, setFlatCategories, setEventCategories,
        setSearchResult, setCollapsedCategories, setCurrentRoom, setSavedSearches, setPerks, setPreferences, setLeftPaneHidden,
        setRoomEntryDialog, setRoomEntryDialogMode, setAlert,
    } = useNavigatorActions();
    const { name: ownUserName } = useOwnUserInfo();
    const isAmbassador = useOwnIsAmbassador();
    const noobnessLevel: NoobnessLevelEnum = useUserContext(x => x.noobnessLevel);
    // HabboNavigator.data.settingsReceived: only the first NavigatorSettings decides where to start.
    const settingsReceivedRef = useRef(false);

    const goToRoom = useGoToRoom();
    const goToHomeRoom = useGoToHomeRoom();
    const forwardToRoom = useForwardToRoom();
    const { isWindowVisible: isNavigatorOpen, show: openNavigator } = useNavigatorVisibility();

    useMessageListener(UserObjectMessage, () => {
        send(new GetUserFlatCatsComposer({}));
        send(new GetUserEventCatsComposer({}));
        send(new NewNavigatorInitComposer({}));
    });

    useMessageListener(NavigatorMetadataMessage, (data) => {
        setTopLevelContexts(data.topLevelContexts);

        // the SWF opens on the first context in the list
        setTopLevelContext(data.topLevelContexts[0]);
    });

    // quick links come from NavigatorSavedSearchesMessage — the topLevelContexts
    // in NavigatorMetadataMessage arrive with an empty quickLinks array
    useMessageListener(NavigatorSavedSearchesMessage, data => setSavedSearches(data.savedSearches));

    // CategoryElementFactory removes both toggle buttons unless
    // sessionData.isPerkAllowed("NAVIGATOR_ROOM_THUMBNAIL_CAMERA")
    useMessageListener(PerkAllowancesMessage, data => setPerks(data.perks));

    /*
     * HabboNewNavigator.onPreferences -> NavigatorView.setInitialWindowDimensions(
     *   windowX, windowY, windowHeight, leftPaneHidden, resultsMode):
     *     setLeftPaneVisibility(!leftPaneHidden)
     *     window.x = windowX; window.y = windowY; window.height = windowHeight
     * resultsMode is passed but unused there.
     */
    useMessageListener(NewNavigatorPreferencesMessage, (data) => {
        setLeftPaneHidden(data.leftPaneHidden);

        setPreferences({
            windowX: data.windowX,
            windowY: data.windowY,
            windowWidth: data.windowWidth,
            windowHeight: data.windowHeight,
            resultsMode: data.resultsMode,
        });
    });

    useMessageListener(UserFlatCatsMessage, data => setFlatCategories(data.nodes));

    useMessageListener(UserEventCatsMessage, data => setEventCategories(data.eventCategories));

    useMessageListener(NavigatorSearchResultBlocksMessage, data => setSearchResult(data.searchResult));

    useMessageListener(NavigatorCollapsedCategoriesMessage, (data) => {
        setCollapsedCategories((data as { collapsedCategories?: string[] }).collapsedCategories ?? []);
    });

    useMessageListener(UserRightsMessage, () => {
        // eventMod > securityLevel >= SecurityLevel.MODERATOR
        // roomPicker > securityLevel >= SecurityLevel.COMMUNITY
    });

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
    useMessageListener(NavigatorSettingsMessage, (data) => {
        const firstSettings = !settingsReceivedRef.current;

        setHomeRoomId(data.homeRoomId);
        settingsReceivedRef.current = true;

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

        if (forwardType === FORWARD_TYPE_GUEST_ROOM) forwardToRoom(forwardId);
        else if (forwardType === FORWARD_TYPE_NONE && data.roomIdToEnter > 0) {
            if (data.roomIdToEnter !== data.homeRoomId) goToRoom(data.roomIdToEnter);
            // the home room id is read from the store, which this message has just set but React has not re-rendered yet
            else if (!goToHomeRoom(data.homeRoomId)) shouldOpenNavigator = true;
        }

        if (shouldOpenNavigator && !isNavigatorOpen) openNavigator();
    });

    // forwardToRoom(): ask for the room info first; GetGuestRoomResult(roomForward) decides how to enter
    useMessageListener(RoomForwardMessage, data => forwardToRoom(data.roomId));

    // onRoomEnter(): we are inside the room (server-side entry, home room, teleport...) - fetch its info
    useMessageListener(RoomEntryInfoMessage, (data) => {
        setRoomEntryDialog(undefined);
        setAlert(undefined);

        send(new GetGuestRoomComposer({
            roomId: data.roomId,
            enterRoom: true,
            roomForward: false,
        }));
    });

    /*
     * NavigatorMessageHandler.onRoomInfo:
     * - enterRoom: we are already in the room, keep its info.
     * - roomForward: we asked to enter. If the server is opening the connection itself the
     *   session starts without sending anything (goToRoom with skipOpc); a doorbell room shows
     *   the doorbell, a password room the password input (owners and group members skip both);
     *   otherwise open the flat connection.
     * - neither: plain room info (the room info popup).
     */
    useMessageListener(GetGuestRoomResultMessage, (data) => {
        const room = data.roomInfo;
        const isOwner = !!ownUserName.length && room.ownerName === ownUserName;

        if (data.enterRoom) {
            setCurrentRoom(room, isOwner);

            return;
        }

        if (!data.roomForward) {
            setCurrentRoom(room, isOwner);

            return;
        }

        if (data.openingConnection) {
            goToRoom(room.roomId, '', true);

            return;
        }

        if (room.doorMode === RoomDoorModeEnum.Locked && !data.isGroupMember && !isOwner) {
            setRoomEntryDialog({ room, mode: 'doorbell' });

            return;
        }

        if (room.doorMode === RoomDoorModeEnum.Password && !isOwner && !data.isGroupMember) {
            setRoomEntryDialog({ room, mode: 'password' });

            return;
        }

        // Flash also lets anyone holding room-controller rights somewhere through; that flag is not tracked here.
        if (room.doorMode === RoomDoorModeEnum.NoobLobby && !isAmbassador && noobnessLevel !== NoobnessLevelEnum.RealNoob) return;

        goToRoom(room.roomId);
    });

    useMessageListener(RoomRatingMessage, () => {
        // currentRoomRating data.rating / canRate data.canRate
    });

    // An empty username is our own ring being acknowledged (a name is someone ringing at a room we own).
    useMessageListener(DoorbellMessage, (data) => {
        if (data.username.length) return;

        setRoomEntryDialogMode('doorbell_waiting');
    });

    useMessageListener(FlatAccessibleMessage, (data) => {
        if (data.username.length) return;

        setRoomEntryDialog(undefined);
    });

    // Nobody answered (or the owner said no); the room handler disposes the pending session, which puts the hotel view back.
    useMessageListener(FlatAccessDeniedMessage, (data) => {
        if (data.username.length) return;

        setRoomEntryDialogMode('doorbell_no_answer');
    });

    useMessageListener(GenericErrorMessage, (data) => {
        switch (data.errorCode) {
            case PASSWORD_REJECTED_ERROR_CODE:
                setRoomEntryDialogMode('password_retry');
                break;
            case 4009:
                setAlert({ titleKey: 'generic.alert.title', messageKey: 'navigator.alert.need.to.be.vip' });
                break;
            case 4010:
                setAlert({ titleKey: 'generic.alert.title', messageKey: 'navigator.alert.invalid_room_name' });
                break;
            case 4011:
                setAlert({ titleKey: 'generic.alert.title', messageKey: 'navigator.alert.cannot_perm_ban' });
                break;
            case 4013:
                setAlert({ titleKey: 'generic.alert.title', messageKey: 'navigator.alert.room_in_maintenance' });
                break;
            case -100005:
                setAlert({ titleKey: 'generic.alert.title', messageKey: 'notification.nft_token_required' });
                break;
        }
    });

    useMessageListener(FlatCreatedMessage, () => {
        //
    });

    useMessageListener(FavouriteChangedMessage, () => {
    });

    /*
     * onCantConnect: explain why and quit the pending session; Flash then fires the toolbar's
     * reception click, whose landing-view handler disposes the session (the room handler does
     * that on this same message, which puts the hotel view back).
     */
    useMessageListener(CantConnectMessage, (data) => {
        switch (data.reason) {
            case CantConnectReason.RoomFull:
                setAlert({ titleKey: 'navigator.guestroomfull.title', messageKey: 'navigator.guestroomfull.text' });
                break;
            case CantConnectReason.QueueError:
                setAlert({ titleKey: 'room.queue.error.title', messageKey: `room.queue.error.${data.parameter}` });
                break;
            case CantConnectReason.Banned:
                setAlert({ titleKey: 'navigator.banned.title', messageKey: 'navigator.banned.text' });
                break;
            case CantConnectReason.Blocked:
                setAlert({ titleKey: 'navigator.blocked.title', messageKey: 'navigator.blocked.text' });
                break;
            default:
                setAlert({ titleKey: 'room.queue.error.title', messageKey: 'room.queue.error.title' });
                break;
        }

        setRoomEntryDialog(undefined);

        send(new QuitComposer({}));
    });
};

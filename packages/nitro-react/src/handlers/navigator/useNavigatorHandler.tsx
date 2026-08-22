import { ClubLevelEnum, RoomControllerLevelEnum } from "@nitrodevco/nitro-api";
import { BannedUsersFromRoomEventMessage, CanCreateRoomEventMessage, CanCreateRoomMessage, CantConnectMessage, CloseConnectionMessage, DoorbellMessage, FavouriteChangedMessage, FavouritesMessage, FlatAccessDeniedMessage, FlatAccessibleMessage, FlatControllerAddedEventMessage, FlatControllerRemovedEventMessage, FlatControllersEventMessage, FlatCreatedMessage, FollowFriendComposer, GenericErrorMessage, GetGuestRoomComposer, GetGuestRoomResultMessage, GetHabboGroupDetailsComposer, GetUserEventCatsComposer, GetUserFlatCatsComposer, HabboGroupDetailsMessage, MuteAllInRoomEventMessage, NavigatorCollapsedCategoriesMessage, NavigatorMetadataMessage, NavigatorSavedSearchesMessage, NavigatorSearchResultBlocksMessage, NavigatorSettingsMessage, NewNavigatorInitComposer, NewNavigatorPreferencesMessage, NoOwnedRoomsAlertMessage, OpenFlatConnectionComposer, PerkAllowancesMessage, QuitComposer, RoomAdErrorEventMessage, RoomEntryInfoMessage, RoomEventCancelMessage, RoomEventMessage, RoomFilterSettingsMessage, RoomForwardMessage, RoomRatingMessage, RoomSettingsDataEventMessage, RoomSettingsSaveErrorEventMessage, ShowEnforceRoomCategoryDialogEventMessage, UserEventCatsMessage, UserFlatCatsMessage, UserObjectMessage, UserRightsMessage, UserUnbannedFromRoomEventMessage, YouAreControllerMessage, YouAreNotControllerMessage, YouAreOwnerMessage } from "@nitrodevco/nitro-packets";
import { useRef } from "react";

import { useConfigValue, useNavigatorActions, useNavigatorContext, useOwnClubLevel, useTranslation, useUserContext, useWebSocketContext } from "#base/context";
import { useMessageListener,useNavigatorVisibility  } from "#base/hooks";

export const useNavigatorHandler = () => {
    const { send } = useWebSocketContext();
    const {
        setTopLevelContexts, setTopLevelContext, setFlatCategories, setEventCategories,
        applySearchResult, setCollapsedCategories, setCurrentRoom, setIsSearching, setSavedSearches, setPerks, setPreferences, setLeftPaneHidden,
        setFavoriteRoomIds, setRoomFavorite, setHomeRoomId, setGroupDetails,
        showCreateRoom, hideCreateRoom, showAlert,
        showDoorbell, showDoorbellWaiting, showDoorbellNoAnswer, hideDoorbellWindow,
        showPasswordPrompt, showPasswordRetry,
        setPendingForwardRoomId, showForwardConfirm,
        applyRoomSettings, setRoomSettingsSaveError, setFlatControllers, addFlatController,
        removeFlatController, setBannedUsers, removeBannedUser,
        setCurrentRoomExtras, setCurrentRoomAllMuted, setCurrentRoomRating, setFavouritesLimit,
        setSecurityLevel, setRoomControllerLevel, setRoomIsOwn, closeRoomInfoWindow,
        closeRoomFilter, closeRoomSettings, mergeRoomFilterWords,
        setRoomEventData, setRoomEventInfoExpanded, toggleRoomEventEditor, closeRoomEventEditor, setRoomAdError,
        showEnforceCategory, setGroupRoomInfoExpanded
    } = useNavigatorActions();
    const { hideNavigator, showNavigator } = useNavigatorVisibility();
    const clubLevel = useOwnClubLevel();
    const t = useTranslation();
    const userId = useUserContext(x => x.userId);
    const userName = useUserContext(x => x.name);
    const pendingForwardRoomId = useNavigatorContext(x => x.pendingForwardRoomId);
    /* NavigatorData.settingsReceived — the login forwarding only runs on the first packet */
    const settingsReceivedRef = useRef(false);
    const followFriendId = useConfigValue<string>('friend.id') ?? '';
    const forwardTypeConfig = useConfigValue<string>('forward.type') ?? '';
    const forwardIdConfig = useConfigValue<string>('forward.id') ?? '';
    const groupRoomInfoEnabled = useConfigValue<boolean>('groupRoomInfo.enabled') ?? false;

    useMessageListener(UserObjectMessage, () => {
        send(new GetUserFlatCatsComposer({}));
        send(new GetUserEventCatsComposer({}));
        send(new NewNavigatorInitComposer({}));
    });

    useMessageListener(NavigatorMetadataMessage, data => {
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
    useMessageListener(NewNavigatorPreferencesMessage, data => {
        setLeftPaneHidden(data.leftPaneHidden);

        setPreferences({
            windowX: data.windowX,
            windowY: data.windowY,
            windowWidth: data.windowWidth,
            windowHeight: data.windowHeight,
            resultsMode: data.resultsMode
        });
    });

    useMessageListener(UserFlatCatsMessage, data => setFlatCategories(data.nodes));

    useMessageListener(UserEventCatsMessage, data => setEventCategories(data.eventCategories));

    /*
     * HabboNewNavigator.onSearchResult — caches the container, records the context
     * history entry, auto-selects the matching top tab and re-derives the filter input
     */
    useMessageListener(NavigatorSearchResultBlocksMessage, data => applySearchResult(data.searchResult));

    useMessageListener(NavigatorCollapsedCategoriesMessage, data => setCollapsedCategories(data.collapsedCategories));

    /* eventMod = securityLevel >= 5, roomPicker = securityLevel >= 7 */
    useMessageListener(UserRightsMessage, data => setSecurityLevel(data.securityLevel));

    useMessageListener(RoomForwardMessage, data => {
        send(new GetGuestRoomComposer({
            roomId: data.roomId,
            enterRoom: false,
            roomForward: true
        }));
    });

    useMessageListener(RoomEntryInfoMessage, data => {
        send(new GetGuestRoomComposer({
            roomId: data.roomId,
            enterRoom: true,
            roomForward: false
        }));
    });

    /*
     * IncomingMessages.onRoomInfo — the roomForward branch is the room-entry decision
     * point: openingConnection means the server already runs the entry (skipOpc, no
     * OpenFlatConnection is sent); door mode 1/2 raise the doorbell/password dialogs
     * for non-owners outside the group; door mode 4 aborts silently unless the session
     * is ambassador/real-noob/any-room-controller (flags we do not track — abort);
     * anything else opens the connection with an empty password.
     */
    useMessageListener(GetGuestRoomResultMessage, data => {
        if (data.enterRoom || !data.roomForward) {
            // ownership per RoomPopupCtrl: sessionData.userId == roomData.ownerId
            setCurrentRoom(data.roomInfo, data.roomInfo?.ownerId === userId);

            /* onRoomInfo enterRoom — staffPick / canMute / allInRoomMuted for the roominfo view */
            if (data.enterRoom) {
                setCurrentRoomExtras(data.staffPick, data.canMute, data.allInRoomMuted);

                /* group rooms contract the event info widget on entry */
                if (data.roomInfo.groupId > 0) setRoomEventInfoExpanded(false);

                /* GroupRoomInfoCtrl.onRoomInfo — fetch the details for the group box */
                if (groupRoomInfoEnabled && data.roomInfo.groupId > 0) {
                    setGroupRoomInfoExpanded(true);
                    send(new GetHabboGroupDetailsComposer({ groupId: data.roomInfo.groupId, open: false }));
                }
            }

            /*
             * HabboNewNavigator.onRoomInfo — an ask_forward link stored the room id and
             * requested this data; matching id raises the forward-confirmation dialog
             */
            if (!data.enterRoom && pendingForwardRoomId !== -1 && data.roomInfo?.roomId === pendingForwardRoomId) {
                setPendingForwardRoomId(-1);
                showForwardConfirm(data.roomInfo.roomId, data.roomInfo.name);
            }

            return;
        }

        const room = data.roomInfo;

        if (data.openingConnection) return;

        if (room.doorMode === 1 && !data.isGroupMember && userName !== room.ownerName) {
            showDoorbell(room);
        } else if (room.doorMode === 2 && userName !== room.ownerName && !data.isGroupMember) {
            showPasswordPrompt(room);
        } else {
            if (room.doorMode === 4) return;

            send(new OpenFlatConnectionComposer({ roomId: room.roomId, password: '', unknown1: -1 }));
        }
    });

    /* onRoomRating — the roominfo view shows the score and the thumb when canRate */
    useMessageListener(RoomRatingMessage, data => setCurrentRoomRating(data.rating, data.canRate));

    /* onMuteAllEvent — flips the muteall button caption */
    useMessageListener(MuteAllInRoomEventMessage, data => setCurrentRoomAllMuted(data.allMuted));

    /* RoomFilterCtrl.onRoomFilterSettings — merge into the persistent word list */
    useMessageListener(RoomFilterSettingsMessage, data => mergeRoomFilterWords(data.badWords));

    /* sessionData mirror for hasRoomRightsButIsNotOwner / floor-plan gating */
    useMessageListener(YouAreControllerMessage, data => setRoomControllerLevel(data.controllerLevel));

    useMessageListener(YouAreNotControllerMessage, () => setRoomControllerLevel(RoomControllerLevelEnum.None));

    useMessageListener(YouAreOwnerMessage, () => setRoomIsOwn(true));

    /* onRoomExit — the in-room windows close with the room */
    useMessageListener(CloseConnectionMessage, () => {
        setRoomIsOwn(false);
        setRoomControllerLevel(RoomControllerLevelEnum.None);
        closeRoomInfoWindow();
        closeRoomFilter();
        closeRoomSettings();
        closeRoomEventEditor();
    });

    /* onRoomEventEvent — an ownerAvatarId of -1 clears the running event */
    useMessageListener(RoomEventMessage, data => setRoomEventData(data.data.ownerAvatarId > 0 ? data.data : undefined));

    useMessageListener(RoomEventCancelMessage, () => setRoomEventData(undefined));

    /*
     * onCanCreateRoomEventEvent — a positive answer opens the event editor, a
     * negative one alerts navigator.cannotcreateevent.error.<code>
     */
    useMessageListener(CanCreateRoomEventMessage, data => {
        if (data.canCreateEvent) toggleRoomEventEditor();
        else showAlert(t('navigator.cannotcreateevent.title'), t(`navigator.cannotcreateevent.error.${data.errorCode}`));
    });

    useMessageListener(RoomAdErrorEventMessage, data => setRoomAdError({ errorCode: data.errorCode, filteredText: data.filteredText }));

    /* onEnforceRoomCategorySelection — a modal the user cannot dismiss without choosing */
    useMessageListener(ShowEnforceRoomCategoryDialogEventMessage, data => showEnforceCategory(data.selectionType));

    /* onDoorbell — an empty username is the ack for our own ring: waiting state */
    useMessageListener(DoorbellMessage, data => {
        if (!data.username || !data.username.length) showDoorbellWaiting();
    });

    /* onDoorOpened — the door opened for us; the room entry packets follow */
    useMessageListener(FlatAccessibleMessage, data => {
        if (!data.username || !data.username.length) hideDoorbellWindow();
    });

    /* onFlatAccessDenied — nobody answered / the owner declined */
    useMessageListener(FlatAccessDeniedMessage, data => {
        if (!data.username || !data.username.length) showDoorbellNoAnswer();
    });

    /*
     * IncomingMessages.onError — -100002 re-opens the password input with
     * ${navigator.password.retryinfo}; the 40xx codes alert via windowManager.alert
     * (nav_simple_alert stands in until a generic alert window exists).
     */
    useMessageListener(GenericErrorMessage, data => {
        switch (data.errorCode) {
            case -100002:
                showPasswordRetry();
                break;
            case 4009:
                showAlert(t('generic.alert.title'), t('navigator.alert.need.to.be.vip'));
                break;
            case 4010:
                showAlert(t('generic.alert.title'), t('navigator.alert.invalid_room_name'));
                break;
            case 4011:
                showAlert(t('generic.alert.title'), t('navigator.alert.cannot_perm_ban'));
                break;
            case 4013:
                showAlert(t('generic.alert.title'), t('navigator.alert.room_in_maintenance'));
                break;
            case -100005:
                showAlert(t('generic.alert.title'), t('notification.nft_token_required'));
                break;
        }
    });

    /*
     * FlatCreatedMessage — the created room is entered straight away and the navigator
     * closes, matching the enterRoom path (OpenFlatConnectionMessageComposer).
     */
    useMessageListener(FlatCreatedMessage, data => {
        send(new OpenFlatConnectionComposer({ roomId: data.roomId, password: '', unknown1: -1 }));

        hideCreateRoom();
        hideNavigator();
    });

    /*
     * IncomingMessages.onCanCreateRoom:
     *   resultCode == 0 -> roomCreateViewCtrl.show()
     *   else            -> registerParameter("navigator.createroom.limitreached",
     *                        "limit", roomLimit) and alert
     *                        "${navigator.createroom.error}" / limitreached,
     *                        via ClubPromoAlertView instead of SimpleAlertView
     *                        when the user has no VIP.
     */
    useMessageListener(CanCreateRoomMessage, data => {
        if (data.resultCode === 0) {
            showCreateRoom();

            return;
        }

        const message = t('navigator.createroom.limitreached', undefined, { limit: String(data.roomLimit) });

        /* SimpleAlertView for VIPs, ClubPromoAlertView (nav_promo_alert) otherwise */
        if (clubLevel >= ClubLevelEnum.Vip) showAlert(t('navigator.createroom.error'), message);
        else showAlert(t('navigator.createroom.error'), message, t('navigator.createroom.vippromo'));
    });

    useMessageListener(FavouritesMessage, data => {
        setFavoriteRoomIds(data.favoriteRoomIds);
        setFavouritesLimit(data.limit);
    });

    useMessageListener(FavouriteChangedMessage, data => setRoomFavorite(data.roomId, data.added));

    /*
     * IncomingMessages.onNavigatorSettings — home room id always; the first packet also
     * runs the login forwarding: a friend.id property follows that friend (and blocks
     * auto-entry), forward.type 2 forwards to forward.id via the GetGuestRoom flow, and
     * with no forward properties roomIdToEnter is entered directly (goToRoom sends
     * OpenFlatConnection). A home room of 0 with nothing to enter opens the navigator.
     */
    useMessageListener(NavigatorSettingsMessage, data => {
        setHomeRoomId(data.homeRoomId);

        if (settingsReceivedRef.current) return;

        settingsReceivedRef.current = true;

        let forwardType = -1;

        if (followFriendId !== '') {
            forwardType = 0;

            send(new FollowFriendComposer({ playerId: parseInt(followFriendId) }));
        }

        if (forwardTypeConfig !== '' && forwardIdConfig !== '') forwardType = parseInt(forwardTypeConfig);

        if (forwardType === 2) {
            send(new GetGuestRoomComposer({ roomId: parseInt(forwardIdConfig), enterRoom: false, roomForward: true }));
        } else if (forwardType === -1 && data.roomIdToEnter > 0) {
            if (data.roomIdToEnter !== data.homeRoomId) {
                send(new OpenFlatConnectionComposer({ roomId: data.roomIdToEnter, password: '', unknown1: -1 }));
            } else if (data.homeRoomId >= 1) {
                send(new OpenFlatConnectionComposer({ roomId: data.homeRoomId, password: '', unknown1: -1 }));
            } else {
                showNavigator();
            }
        }
    });

    /* onNoOwnedRoomsAlert — startRoomCreation() opens the create-room dialog */
    useMessageListener(NoOwnedRoomsAlertMessage, () => showCreateRoom());

    /* RoomSettingsCtrl.onRoomSettings — only the requested room opens the editor */
    useMessageListener(RoomSettingsDataEventMessage, data => applyRoomSettings(data.data));

    useMessageListener(RoomSettingsSaveErrorEventMessage, data => setRoomSettingsSaveError(data.roomId, data.errorCode, data.info));

    useMessageListener(FlatControllersEventMessage, data => setFlatControllers(data.roomId, data.controllers));

    useMessageListener(FlatControllerAddedEventMessage, data => addFlatController(data.roomId, { userId: data.userId, userName: data.userName }));

    useMessageListener(FlatControllerRemovedEventMessage, data => removeFlatController(data.roomId, data.userId));

    useMessageListener(BannedUsersFromRoomEventMessage, data => setBannedUsers(data.roomId, data.bannedUsers));

    useMessageListener(UserUnbannedFromRoomEventMessage, data => removeBannedUser(data.roomId, data.userId));

    useMessageListener(HabboGroupDetailsMessage, data => setGroupDetails(data.data));

    /*
     * IncomingMessages.onCantConnect — alert per reason (the switch is on reason - 1),
     * cancel the pending entry (§_-11Y§, id 3061) and bounce to hotel view; the room
     * disposal half of the bounce lives in useRoomDirectoryHandler.
     */
    useMessageListener(CantConnectMessage, data => {
        setIsSearching(false);

        switch (data.reason) {
            case 1:
                showAlert(t('navigator.guestroomfull.title'), t('navigator.guestroomfull.text'));
                break;
            case 3:
                showAlert(t('room.queue.error.title'), t(`room.queue.error.${data.parameter}`));
                break;
            case 4:
                showAlert(t('navigator.banned.title'), t('navigator.banned.text'));
                break;
            case 5:
                showAlert(t('navigator.blocked.title'), t('navigator.blocked.text'));
                break;
            default:
                showAlert(t('room.queue.error.title'), t('room.queue.error.title'));
        }

        send(new QuitComposer({}));
    });
}

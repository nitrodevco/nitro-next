import { ClubLevelEnum } from "@nitrodevco/nitro-api";
import { CanCreateRoomMessage, CantConnectMessage, DoorbellMessage, FavouriteChangedMessage, FavouritesMessage, FlatAccessDeniedMessage, FlatAccessibleMessage, FlatCreatedMessage, GenericErrorMessage, GetGuestRoomComposer, GetGuestRoomResultMessage, GetUserEventCatsComposer, GetUserFlatCatsComposer, HabboGroupDetailsMessage, NavigatorCollapsedCategoriesMessage, NavigatorMetadataMessage, NavigatorSavedSearchesMessage, NavigatorSearchResultBlocksMessage, NavigatorSettingsMessage, NewNavigatorInitComposer, NewNavigatorPreferencesMessage, OpenFlatConnectionComposer, PerkAllowancesMessage, QuitComposer, RoomEntryInfoMessage, RoomForwardMessage, RoomRatingMessage, UserEventCatsMessage, UserFlatCatsMessage, UserObjectMessage, UserRightsMessage } from "@nitrodevco/nitro-packets";

import { useNavigatorActions, useOwnClubLevel, useTranslation, useUserContext, useWebSocketContext } from "#base/context";
import { useMessageListener,useNavigatorVisibility  } from "#base/hooks";

export const useNavigatorHandler = () => {
    const { send } = useWebSocketContext();
    const {
        setTopLevelContexts, setTopLevelContext, setFlatCategories, setEventCategories,
        applySearchResult, setCollapsedCategories, setCurrentRoom, setIsSearching, setSavedSearches, setPerks, setPreferences, setLeftPaneHidden,
        setFavoriteRoomIds, setRoomFavorite, setHomeRoomId, setGroupDetails,
        showCreateRoom, hideCreateRoom, showAlert,
        showDoorbell, showDoorbellWaiting, showDoorbellNoAnswer, hideDoorbellWindow,
        showPasswordPrompt, showPasswordRetry
    } = useNavigatorActions();
    const { hideNavigator } = useNavigatorVisibility();
    const clubLevel = useOwnClubLevel();
    const t = useTranslation();
    const userId = useUserContext(x => x.userId);
    const userName = useUserContext(x => x.name);

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

    useMessageListener(UserRightsMessage, () => {
        // eventMod > securityLevel >= SecurityLevel.MODERATOR
        // roomPicker > securityLevel >= SecurityLevel.COMMUNITY
    });

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

    useMessageListener(RoomRatingMessage, () => {
        // currentRoomRating data.rating / canRate data.canRate
    });

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

        // TODO: ClubPromoAlertView has its own layout (roc_vip_promo link -> catalog club
        // page); until the catalog opener exists both variants use nav_simple_alert and
        // the promo line is appended for non-VIP users.
        showAlert(
            t('navigator.createroom.error'),
            clubLevel >= ClubLevelEnum.Vip ? message : `${message}\n${t('navigator.createroom.vippromo')}`
        );
    });

    useMessageListener(FavouritesMessage, data => setFavoriteRoomIds(data.favoriteRoomIds));

    useMessageListener(FavouriteChangedMessage, data => setRoomFavorite(data.roomId, data.added));

    useMessageListener(NavigatorSettingsMessage, data => setHomeRoomId(data.homeRoomId));

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

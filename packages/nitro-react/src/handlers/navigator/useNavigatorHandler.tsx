import { ClubLevelEnum } from "@nitrodevco/nitro-api";
import { CanCreateRoomMessage, CantConnectMessage, DoorbellMessage, FavouriteChangedMessage, FavouritesMessage, FlatAccessDeniedMessage, FlatAccessibleMessage, FlatCreatedMessage, GetGuestRoomComposer, GetGuestRoomResultMessage, GetUserEventCatsComposer, GetUserFlatCatsComposer, HabboGroupDetailsMessage, NavigatorCollapsedCategoriesMessage, NavigatorMetadataMessage, NavigatorSavedSearchesMessage, NavigatorSearchResultBlocksMessage, NavigatorSettingsMessage, NewNavigatorInitComposer, NewNavigatorPreferencesMessage, OpenFlatConnectionComposer, PerkAllowancesMessage, RoomEntryInfoMessage, RoomForwardMessage, RoomRatingMessage, UserEventCatsMessage, UserFlatCatsMessage, UserObjectMessage, UserRightsMessage } from "@nitrodevco/nitro-packets";

import { useNavigatorActions, useOwnClubLevel, useTranslation, useUserContext, useWebSocketContext } from "#base/context";
import { useMessageListener,useNavigatorVisibility  } from "#base/hooks";

export const useNavigatorHandler = () => {
    const { send } = useWebSocketContext();
    const {
        setTopLevelContexts, setTopLevelContext, setFlatCategories, setEventCategories,
        setSearchResult, setCollapsedCategories, setCurrentRoom, setIsSearching, setSavedSearches, setPerks, setPreferences, setLeftPaneHidden, pushSearchContext,
        setFavoriteRoomIds, setRoomFavorite, setHomeRoomId, setGroupDetails,
        showCreateRoom, hideCreateRoom, showAlert
    } = useNavigatorActions();
    const { hideNavigator } = useNavigatorVisibility();
    const clubLevel = useOwnClubLevel();
    const t = useTranslation();
    const userId = useUserContext(x => x.userId);

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

    useMessageListener(NavigatorSearchResultBlocksMessage, data => {
        setSearchResult(data.searchResult);

        // HabboNewNavigator.onSearchResults records the search in the context history
        pushSearchContext({
            searchCode: data.searchResult.searchCodeOriginal,
            filter: data.searchResult.filteringData
        });
    });

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

    useMessageListener(GetGuestRoomResultMessage, data => {
        // ownership per RoomPopupCtrl: sessionData.userId == roomData.ownerId
        if (data.enterRoom || !data.roomForward) setCurrentRoom(data.roomInfo, data.roomInfo?.ownerId === userId);
    });

    useMessageListener(RoomRatingMessage, () => {
        // currentRoomRating data.rating / canRate data.canRate
    });

    useMessageListener(DoorbellMessage, data => {
        if (!data.username || !data.username.length) {
            // door state: waiting
        }
    });

    useMessageListener(FlatAccessibleMessage, data => {
        if (!data.username || !data.username.length) {
            // door state: accepted
        }
    });

    useMessageListener(FlatAccessDeniedMessage, data => {
        if (!data.username || !data.username.length) {
            // door state: no answer
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

    useMessageListener(CantConnectMessage, () => {
        setIsSearching(false);
    });
}

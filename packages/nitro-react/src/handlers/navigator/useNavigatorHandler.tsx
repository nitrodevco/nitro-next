import { CantConnectMessage, DoorbellMessage, FavouriteChangedMessage, FlatAccessDeniedMessage, FlatAccessibleMessage, FlatCreatedMessage, GetGuestRoomComposer, GetGuestRoomResultMessage, GetUserEventCatsComposer, GetUserFlatCatsComposer, NavigatorCollapsedCategoriesMessage, NavigatorMetadataMessage, NavigatorSavedSearchesMessage, NavigatorSearchResultBlocksMessage, NewNavigatorInitComposer, NewNavigatorPreferencesMessage, PerkAllowancesMessage, RoomEntryInfoMessage, RoomForwardMessage, RoomRatingMessage, UserEventCatsMessage, UserFlatCatsMessage, UserObjectMessage, UserRightsMessage } from "@nitrodevco/nitro-packets";

import { useNavigatorActions, useWebSocketContext } from "#base/context";
import { useMessageListener } from "#base/hooks";

export const useNavigatorHandler = () => {
    const { send } = useWebSocketContext();
    const {
        setTopLevelContexts, setTopLevelContext, setFlatCategories, setEventCategories,
        setSearchResult, setCollapsedCategories, setCurrentRoom, setIsSearching, setSavedSearches, setPerks, setPreferences, setLeftPaneHidden
    } = useNavigatorActions();

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

    useMessageListener(NavigatorSearchResultBlocksMessage, data => setSearchResult(data.searchResult));

    useMessageListener(NavigatorCollapsedCategoriesMessage, data => {
        setCollapsedCategories((data as { collapsedCategories?: string[] }).collapsedCategories ?? []);
    });

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
        if (data.enterRoom || !data.roomForward) setCurrentRoom(data.roomInfo, data.roomInfo?.ownerName?.length > 0);
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

    useMessageListener(FlatCreatedMessage, () => {
        //
    });

    useMessageListener(FavouriteChangedMessage, () => {
    });

    useMessageListener(CantConnectMessage, () => {
        setIsSearching(false);
    });
}

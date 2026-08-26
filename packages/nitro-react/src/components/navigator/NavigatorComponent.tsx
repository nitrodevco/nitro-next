import { ForwardToSomeRoomComposer, GetGuestRoomComposer, OpenFlatConnectionComposer } from '@nitrodevco/nitro-packets';

import { useNavigatorActions, useNavigatorContext, useNavigatorSelectors, useWebSocketContext } from '#base/context';
import { useNavigatorHandler } from '#base/handlers';
import { useLinkEventTracker, useNavigatorSearch, useNavigatorVisibility } from '#base/hooks';
import { NavigatorCreateRoomView, NavigatorDoorbellView, NavigatorEnforceCategoryView, NavigatorForwardConfirmView, NavigatorGroupRoomInfoView, NavigatorPasswordView, NavigatorRoomEventEditorView, NavigatorRoomEventInfoView, NavigatorRoomFilterView, NavigatorRoomInfoWindowView, NavigatorRoomSettingsView, NavigatorSimpleAlertView, NavigatorView } from '#base/views/navigator';

export const NavigatorComponent = () => {
    const { isNavigatorVisible } = useNavigatorVisibility();
    const { createRoomOpen } = useNavigatorSelectors();
    const { setPendingForwardRoomId, toggleRoomInfoWindow } = useNavigatorActions();
    const { performSearch } = useNavigatorSearch();
    const { send } = useWebSocketContext();
    const homeRoomId = useNavigatorContext(x => x.homeRoomId);

    // handler lives inside the provider so it can write to the navigator store
    useNavigatorHandler();

    /*
     * HabboNewNavigator.linkReceived, linkPattern "navigator/":
     *   goto/home        -> goToHomeRoom (direct OpenFlatConnection)
     *   goto/<int>       -> goToPrivateRoom (GetGuestRoom roomForward flow)
     *   goto/<name>      -> ForwardToSomeRoomMessageComposer(name)
     *   search|tag/<txt> -> performSearch("hotel_view", txt) — no tag: prefix here
     *   tab/<name>       -> performSearch(name), "me" mapped to "myworld_view"
     *   ask_forward/<id> -> remember the id and request the room data; the
     *                       GetGuestRoomResult handler raises the confirm dialog
     *   report           -> habboHelp flow, not built yet
     */
    useLinkEventTracker('navigator/', url => {
        const parts = url.split('/');

        if (parts.length < 2) return;

        switch (parts[1]) {
            case 'goto':
                if (parts.length <= 2) break;

                if (parts[2] === 'home') {
                    if (homeRoomId >= 1) send(new OpenFlatConnectionComposer({ roomId: homeRoomId, password: '', unknown1: -1 }));
                } else if (parseInt(parts[2]) > 0) {
                    send(new GetGuestRoomComposer({ roomId: parseInt(parts[2]), enterRoom: false, roomForward: true }));
                } else {
                    send(new ForwardToSomeRoomComposer({ forwardData: parts[2] }));
                }
                break;
            case 'search':
            case 'tag':
                if (parts.length > 2) performSearch('hotel_view', parts[2]);
                break;
            case 'tab':
                if (parts.length > 2) performSearch(parts[2] === 'me' ? 'myworld_view' : parts[2]);
                break;
            case 'roominfo':
                /* HTIE_ICON_ROOMINFO — the toolbar room-info icon toggles RoomInfoViewCtrl */
                toggleRoomInfoWindow();
                break;
            case 'ask_forward':
                if (parts.length > 2) {
                    setPendingForwardRoomId(parseInt(parts[2]));
                    send(new GetGuestRoomComposer({ roomId: parseInt(parts[2]), enterRoom: false, roomForward: false }));
                }
                break;
        }
    });

    return (
        <>
            {isNavigatorVisible && <NavigatorView />}
            {/*
              * roc_create_room is its own desktop window (Util.getLocationRelativeTo
              * centres it on the desktop) — it must be a SIBLING of the navigator
              * frame: nesting it inside would position and clip it within the frame
              */}
            {createRoomOpen && <NavigatorCreateRoomView />}
            <NavigatorDoorbellView />
            <NavigatorPasswordView />
            <NavigatorForwardConfirmView />
            <NavigatorRoomSettingsView />
            <NavigatorRoomInfoWindowView />
            <NavigatorRoomFilterView />
            {/* extension order: room_group_info attaches before event info */}
            <NavigatorGroupRoomInfoView />
            <NavigatorRoomEventInfoView />
            <NavigatorRoomEventEditorView />
            <NavigatorEnforceCategoryView />
            <NavigatorSimpleAlertView />
        </>
    );
}

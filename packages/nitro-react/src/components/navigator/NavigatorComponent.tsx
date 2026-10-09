import { RoomQueueWidget } from '#base/components';
import { useNavigatorStore } from '#base/context/navigator';
import { useNavigatorSearchCodeRequest, useNavigatorWindowPreferencesSync, useWindowVisibility } from '#base/hooks';
import { NavigatorEnforceCategoryView } from '#base/views/navigator/NavigatorEnforceCategoryView';
import { NavigatorRoomCreateView } from '#base/views/navigator/NavigatorRoomCreateView';
import { NavigatorRoomEntryDialogs } from '#base/views/navigator/NavigatorRoomEntryDialogs';
import { NavigatorRoomEventSettingsView } from '#base/views/navigator/NavigatorRoomEventSettingsView';
import { NavigatorRoomFilterView } from '#base/views/navigator/NavigatorRoomFilterView';
import { NavigatorView } from '#base/views/navigator/NavigatorView';
import { RaidProtectionSettingsView } from '#base/views/navigator/RaidProtectionSettingsView';

export const NavigatorComponent = () => {
    const { isWindowVisible } = useWindowVisibility('navigator');
    const { isWindowVisible: isRoomCreateVisible } = useWindowVisibility('navigator_room_create');
    const roomEventSettingsVisible = useNavigatorStore(x => x.roomEventSettingsVisible);
    const enforcingCategory = useNavigatorStore(x => x.enforceCategorySelectionType !== undefined);
    const { isWindowVisible: isRoomFilterVisible } = useWindowVisibility('room_filter');
    // `RoomFilterCtrl.refreshWindow` shows nothing outside a room.
    const inRoom = useNavigatorStore(x => !!x.enteredRoom);

    // A `navigator/tab/<name>` link travels as this window's parameter; act on it here.
    useNavigatorSearchCodeRequest();
    // `NavigatorView.update` keeps sending the window's preferences while the window is hidden.
    useNavigatorWindowPreferencesSync();

    return (
        <>
            {isWindowVisible && <NavigatorView />}
            {/* `RoomCreateViewCtrl` is a window of its own: it stays when the navigator closes. */}
            {isRoomCreateVisible && <NavigatorRoomCreateView />}
            {/* doorbell / password / cant-connect popups outlive the navigator window */}
            <NavigatorRoomEntryDialogs />
            {/* `RoomEventViewCtrl`, `EnforceCategoryCtrl` and `RoomFilterCtrl` are windows of their own too. */}
            {roomEventSettingsVisible && <NavigatorRoomEventSettingsView />}
            {enforcingCategory && <NavigatorEnforceCategoryView />}
            {/* `RaidProtectionSettingsView`: built once, so it keeps its place between shows; it draws only while shown. */}
            <RaidProtectionSettingsView />
            {isRoomFilterVisible && inRoom && <NavigatorRoomFilterView />}
            {/* The queue into a full room is up before the room exists, so it lives out here too. */}
            <RoomQueueWidget />
        </>
    );
};

import { RoomQueueWidget } from '#base/components';
import { useNavigatorSearchCodeRequest, useNavigatorVisibility } from '#base/hooks';
import { NavigatorRoomEntryDialogs } from '#base/views/navigator/NavigatorRoomEntryDialogs';
import { NavigatorView } from '#base/views/navigator/NavigatorView';

export const NavigatorComponent = () => {
    const { isWindowVisible } = useNavigatorVisibility();

    // A `navigator/tab/<name>` link travels as this window's parameter; act on it here.
    useNavigatorSearchCodeRequest();

    return (
        <>
            {isWindowVisible && <NavigatorView />}
            {/* doorbell / password / cant-connect popups outlive the navigator window */}
            <NavigatorRoomEntryDialogs />
            {/* The queue into a full room is up before the room exists, so it lives out here too. */}
            <RoomQueueWidget />
        </>
    );
};

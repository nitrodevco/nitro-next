import { RoomQueueWidget } from '#base/components';
import { useNavigatorVisibility } from '#base/hooks';
import { NavigatorRoomEntryDialogs } from '#base/views/navigator/NavigatorRoomEntryDialogs';
import { NavigatorView } from '#base/views/navigator/NavigatorView';

export const NavigatorComponent = () => {
    const { isWindowVisible } = useNavigatorVisibility();

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

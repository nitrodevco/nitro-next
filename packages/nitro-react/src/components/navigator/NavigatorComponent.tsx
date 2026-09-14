import { useNavigatorHandler } from '#base/handlers';
import { useNavigatorVisibility } from '#base/hooks';
import { NavigatorRoomEntryDialogs } from '#base/views/navigator/NavigatorRoomEntryDialogs';
import { NavigatorView } from '#base/views/navigator/NavigatorView';

export const NavigatorComponent = () => {
    const { isWindowVisible } = useNavigatorVisibility();

    // handler lives inside the provider so it can write to the navigator store
    useNavigatorHandler();

    return (
        <>
            {isWindowVisible && <NavigatorView />}
            {/* doorbell / password / cant-connect popups outlive the navigator window */}
            <NavigatorRoomEntryDialogs />
        </>
    );
};

import { useNavigatorSelectors } from '#base/context';
import { useNavigatorHandler } from '#base/handlers';
import { useNavigatorVisibility } from '#base/hooks';
import { NavigatorCreateRoomView, NavigatorDoorbellView, NavigatorPasswordView, NavigatorSimpleAlertView, NavigatorView } from '#base/views/navigator';

export const NavigatorComponent = () => {
    const { isNavigatorVisible } = useNavigatorVisibility();
    const { createRoomOpen } = useNavigatorSelectors();

    // handler lives inside the provider so it can write to the navigator store
    useNavigatorHandler();

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
            <NavigatorSimpleAlertView />
        </>
    );
}

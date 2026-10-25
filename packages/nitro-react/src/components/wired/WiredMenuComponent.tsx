/**
 * Mounts the wired menu (`WiredMenuController`) and the windows it owns. The menu is the
 * `wired_menu` window - the toolbar icon toggles it, a `wiredmenu/...` link opens it - and it is
 * only shown with the menu enabled (`wired.menu.enabled`) and the read permission (`showView`).
 * The error info, room log and variable management windows open from what the server sends and
 * live in the wired store; the value bubbles of "highlight holders" are drawn over the room.
 */
import { showWiredErrorInfo } from '#base/commands';
import { useIsWindowVisible } from '#base/context/system';
import { useWiredHasReadPermission, useWiredMenuEnabled, useWiredStore } from '#base/context/wired';
import { WiredErrorInfoView } from '#base/views/wired-menu/WiredErrorInfoView';
import { WiredMenuView } from '#base/views/wired-menu/WiredMenuView';
import { WiredRoomLogsView } from '#base/views/wired-menu/WiredRoomLogsView';
import { WiredVariableHolderBubbles } from '#base/views/wired-menu/WiredVariableHolderBubbles';
import { WiredVariableHolderView } from '#base/views/wired-menu/WiredVariableHolderView';
import { WiredVariableOwnersView } from '#base/views/wired-menu/WiredVariableOwnersView';

export const WiredMenuComponent = () => {
    const isVisible = useIsWindowVisible('wired_menu');
    const menuEnabled = useWiredMenuEnabled();
    const hasReadPermission = useWiredHasReadPermission();
    const errorInfo = useWiredStore(x => x.monitorErrorInfo);
    const roomLogsVisible = useWiredStore(x => x.roomLogsVisible);
    const roomLogsPage = useWiredStore(x => x.roomLogsPage);
    const roomLogsPageRequested = useWiredStore(x => x.roomLogsPageRequested);
    const ownersVisible = useWiredStore(x => x.variableOwnersVisible);
    const ownersPage = useWiredStore(x => x.variableOwnersPage);
    const ownersVariable = useWiredStore(x => x.variableOwnersVariable);
    const holderVisible = useWiredStore(x => x.variableHolderVisible);
    const holder = useWiredStore(x => x.variableHolder);

    return (
        <>
            <WiredVariableHolderBubbles />
            {isVisible && menuEnabled && hasReadPermission && <WiredMenuView />}
            {errorInfo && (
                <WiredErrorInfoView
                    error={errorInfo}
                    onClose={() => showWiredErrorInfo(undefined)}
                />
            )}
            {roomLogsVisible && roomLogsPage && (
                <WiredRoomLogsView
                    page={roomLogsPage}
                    pageRequested={roomLogsPageRequested}
                />
            )}
            {ownersVisible && ownersPage && ownersVariable && (
                <WiredVariableOwnersView
                    page={ownersPage}
                    variable={ownersVariable}
                />
            )}
            {holderVisible && holder && (
                <WiredVariableHolderView holder={holder} />
            )}
        </>
    );
};

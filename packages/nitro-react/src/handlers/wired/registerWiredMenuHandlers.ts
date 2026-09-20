/**
 * The wired menu's packets - `WiredMenuController` and the listeners its tabs add
 * (`WiredMenuSettingsTab`, `WiredMenuMonitorTab`, `WiredMenuInspectionTab`, `WiredMenuOverviewTab`,
 * `WiredMenuChestsTab`), plus the room log and variable management controllers it owns.
 *
 * The view is disposed when the room goes (`REE_DISPOSED`) and when `WiredPermissions` takes the
 * read permission away; the room's change is watched here, the store itself is reset by
 * `bridgeWiredRoomLifecycle`. `WiredPermissions` and `AccountPreferences` are stored by
 * `registerWiredPermissionsHandlers`; this only reacts to them.
 *
 * What the reference server (turbo-cloud) sends of these: the settings, stats, error logs,
 * variables for an object and variable holders. It never sends `WiredMenuError`, the room logs,
 * the transaction logs or anything of the variable management windows.
 */
import { WiredAllVariableHoldersMessage, WiredErrorLogsMessage, WiredMenuErrorMessage, WiredPermissionsEventMessage, WiredRoomLogsMessage, WiredRoomSettingsMessage, WiredRoomStatsMessage, WiredSetUserPermanentVariableResultMessage, WiredTransactionLogListMessage, WiredUserPermanentVariablesMessage, WiredUserVariablesListMessage, WiredVariablesForObjectMessage, YouAreControllerMessage } from '@nitrodevco/nitro-packets';

import { disposeWiredMenu, onWiredAllVariableHolders, onWiredChestsTransactionLogs, onWiredInspectionMenuError, onWiredMenuError, onWiredRoomLogs, onWiredSetUserPermanentVariableResult, onWiredUserPermanentVariables, onWiredVariableOwnersPage, onWiredVariablesForObject, onWiredYouAreController } from '#base/commands';
import { WebSocketConnection } from '#base/context/communication';
import { roomStore } from '#base/context/room';
import { wiredStore } from '#base/context/wired';

import { on, subscribeAll } from '../packetSubscriptions';

export const registerWiredMenuHandlers = ({ send, subscribe }: WebSocketConnection) => {
    const { patchWiredMenu } = wiredStore.getState();

    // `REE_DISPOSED`: the view goes with the room. The state is reset by the room lifecycle bridge.
    const unsubscribeRoom = roomStore.subscribe((state, previous) => {
        if (previous.room && (state.room !== previous.room)) disposeWiredMenu();
    });

    const unsubscribePackets = subscribeAll(subscribe, [
        // `onWiredPermissions`: without the read permission the view is disposed.
        on(WiredPermissionsEventMessage, (data) => {
            if (!data.canRead) disposeWiredMenu();
        }),

        on(YouAreControllerMessage, () => onWiredYouAreController()),

        on(WiredMenuErrorMessage, (data) => {
            onWiredMenuError(data.errorCode);
            onWiredInspectionMenuError(data.errorCode);
        }),

        // `WiredMenuSettingsTab.onWiredSettings`.
        on(WiredRoomSettingsMessage, data => patchWiredMenu({ settingsModifyMask: data.modifyPermissionMask, settingsReadMask: data.readPermissionMask, settingsTimezone: data.timezone })),

        // `WiredMenuMonitorTab.onRoomStatsEvent` / `onErrorLogsEvent`.
        on(WiredRoomStatsMessage, data => patchWiredMenu({ monitorStats: data.roomStats })),

        on(WiredErrorLogsMessage, data => patchWiredMenu({ monitorErrors: data.errors })),

        on(WiredVariablesForObjectMessage, data => onWiredVariablesForObject(send, data.data)),

        on(WiredAllVariableHoldersMessage, data => onWiredAllVariableHolders(data.variableInfoAndHolders)),

        on(WiredTransactionLogListMessage, data => onWiredChestsTransactionLogs(data.logs)),

        on(WiredRoomLogsMessage, data => onWiredRoomLogs(data.page)),

        on(WiredUserVariablesListMessage, data => onWiredVariableOwnersPage(send, data.page)),

        on(WiredUserPermanentVariablesMessage, data => onWiredUserPermanentVariables(send, data.list)),

        on(WiredSetUserPermanentVariableResultMessage, data => onWiredSetUserPermanentVariableResult(data.success)),
    ]);

    return () => {
        unsubscribeRoom();
        unsubscribePackets();
    };
};

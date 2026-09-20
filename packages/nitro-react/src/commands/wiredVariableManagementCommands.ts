/**
 * The variable management windows - `VariableManagementOverviewController` /
 * `VariableManagementOverviewView` (who holds a permanent user variable) and
 * `VariableManagementDetailController` / `VariableManagementDetailView` (what one user, pet or bot
 * holds, editable). Both controllers wait for the variables synchronizer before they show
 * anything, since a page only names its variables by id. The state is `WiredVariableManagementSlice`.
 *
 * The reference server (turbo-cloud) implements none of these packets.
 */
import type { IWiredUserPermanentVariablesList, IWiredUserVariablesPage, IWiredVariable } from '@nitrodevco/nitro-packets';
import { WiredGetUserPermanentVariablesComposer, WiredGetVariableOwnersPageComposer, WiredSetObjectVariableValueOperation, WiredSetUserPermanentVariableComposer } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { notificationStore } from '#base/context/notifications';
import { getRoom } from '#base/context/room';
import { getWiredHasWritePermission, WIRED_VARIABLE_MANAGEMENT_PAGE_SIZE, WiredStore, wiredStore } from '#base/context/wired';
import { addToVariablePickerHistory, getIntFromString, WIRED_INT_MIN } from '#base/wired';

import { getAllWiredVariables, getCachedWiredVariableById } from './wiredSynchronizerCommands';

type Send = WebSocketConnection['send'];

const patch: WiredStore['patchWiredVariableManagement'] = changes => wiredStore.getState().patchWiredVariableManagement(changes);

/* ------------------------------------------------------------------ overview */

/** `VariableManagementOverviewController.onGetPage` -> `initializeData`: a page for a variable the synchronizer does not know is dropped. */
export const onWiredVariableOwnersPage = (send: Send, page: IWiredUserVariablesPage) => {
    if (page.amount !== WIRED_VARIABLE_MANAGEMENT_PAGE_SIZE) return;

    getAllWiredVariables(send, () => {
        const variable = getCachedWiredVariableById(page.variableId);

        if (!variable) return;

        patch({ variableOwnersPage: page, variableOwnersVariable: variable, variableOwnersVisible: true });
    });
};

/** `VariableManagementOverviewView.requestPageWithFilters`. */
export const requestWiredVariableOwnersPage = (send: Send, page: number, sortType: number, userTypeFilter: number) => {
    const current = wiredStore.getState().variableOwnersPage;

    if (!current) return;

    send(new WiredGetVariableOwnersPageComposer({ variableId: current.variableId, page, pageSize: WIRED_VARIABLE_MANAGEMENT_PAGE_SIZE, sortType, userTypeFilter }));
};

export const closeWiredVariableOwners = () => patch({ variableOwnersVisible: false });

/** `VariableManagementOverviewTableObject.onClickManage` - one holder's variables, in the detail window. */
export const openWiredVariableHolder = (send: Send, entityType: number, entityId: number) => send(new WiredGetUserPermanentVariablesComposer({ entityType, entityId }));

/* ------------------------------------------------------------------ detail */

/** `VariableManagementDetailController.onGetData` -> `initializeData` -> `displayNewData`. */
export const onWiredUserPermanentVariables = (send: Send, list: IWiredUserPermanentVariablesList) => {
    getAllWiredVariables(send, variables => patch({
        variableHolder: list,
        variableHolderVariablesById: Object.fromEntries(variables.map(variable => [ variable.variableId, variable ])),
        variableHolderVisible: true,
        variableHolderLoading: false,
    }));
};

/** `onGetResult` - only a failure is told. */
export const onWiredSetUserPermanentVariableResult = (success: boolean) => {
    if (!success) notificationStore.getState().addNotification('${wiredmenu.variable_management_detail.notification.modification_failed}', 'wired');
};

export const closeWiredVariableHolder = () => patch({ variableHolderVisible: false, variableHolderCreateBubble: false });

/** `onRefreshClick`. */
export const refreshWiredVariableHolder = (send: Send) => {
    const holder = wiredStore.getState().variableHolder;

    if (!holder) return;

    send(new WiredGetUserPermanentVariablesComposer({ entityType: holder.entityType, entityId: holder.entityId }));
    patch({ variableHolderLoading: true });
};

const sendChange = (send: Send, variableId: string, value: number, operation: WiredSetObjectVariableValueOperation) => {
    const holder = wiredStore.getState().variableHolder;

    if (!holder) return;

    send(new WiredSetUserPermanentVariableComposer({ entityType: holder.entityType, entityId: holder.entityId, variableId, value, operation }));
    patch({ variableHolderLoading: true });
};

/** `onCellEdit`. */
export const setWiredHolderVariableValue = (send: Send, variable: IWiredVariable, text: string) => {
    if (!getWiredHasWritePermission() || !variable.hasValue || !variable.canWriteValue) return;

    const value = getIntFromString(text, WIRED_INT_MIN, true);

    if (value !== WIRED_INT_MIN) sendChange(send, variable.variableId, value, WiredSetObjectVariableValueOperation.SetValue);
};

export const selectWiredHolderVariable = (variableId: string | null) => patch({ variableHolderSelectedId: variableId });

/** `onDeleteVariableClicked`. */
export const deleteWiredHolderVariable = (send: Send) => {
    const { variableHolder, variableHolderSelectedId, variableHolderVariablesById } = wiredStore.getState();
    const variable = (variableHolderSelectedId === null) ? undefined : variableHolderVariablesById[variableHolderSelectedId];

    if (!variableHolder || !variable || !getWiredHasWritePermission() || !variable.canCreateAndDelete) return;

    sendChange(send, variable.variableId, 0, WiredSetObjectVariableValueOperation.Delete);
};

/** `onAddVariableClicked`. */
export const toggleWiredHolderCreateBubble = (send: Send) => {
    if (wiredStore.getState().variableHolderCreateBubble) {
        patch({ variableHolderCreateBubble: false });

        return;
    }

    getAllWiredVariables(send, variables => patch({ variableHolderCreateVariables: variables, variableHolderCreateBubble: true }), true);
};

export const closeWiredHolderCreateBubble = () => patch({ variableHolderCreateBubble: false });

/** `onCreateVariableClicked`. */
export const createWiredHolderVariable = (send: Send, variable: IWiredVariable, valueText: string) => {
    if (!wiredStore.getState().variableHolder) return;

    // `NewVariablePicker.finalize`.
    addToVariablePickerHistory(getRoom()?.roomId ?? 0, variable);

    sendChange(send, variable.variableId, variable.hasValue ? getIntFromString(valueText, 0) : 0, WiredSetObjectVariableValueOperation.Create);
    patch({ variableHolderCreateBubble: false });
};

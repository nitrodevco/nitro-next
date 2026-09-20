/**
 * The wired menu's inspection tab - `WiredMenuInspectionTab`, with the parts of its
 * `VariableHolderPreviewer` and `VariableHoldersHighlighter` that are not drawing. What is
 * inspected is picked in the room (`WiredMenuController.furniSelected` / `userSelected`) or by a
 * `wiredmenu/open/inspection/<source>/<id>` link; the tab asks for the object's variable values,
 * waits for the synchronizer to know every variable they belong to, and then shows them, polling
 * every 500 ms while it is viewed. The state is `WiredMenuInspectionSlice`.
 *
 * The reference server (turbo-cloud) always sends `configuredInWireds` empty, so "highlight
 * wireds" stays disabled against it, and it never sends `WiredMenuError`.
 */
import { RoomObjectCategoryEnum } from '@nitrodevco/nitro-api';
import type { IWiredObjectInspectionData, IWiredVariable } from '@nitrodevco/nitro-packets';
import { VariableExtraSourceTypes, WiredGetVariablesForObjectComposer, WiredSetObjectVariableValueComposer, WiredSetObjectVariableValueOperation } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { getRoom } from '#base/context/room';
import { getWiredHasWritePermission, WIRED_INSPECTION_STATE_AWAITING_VARIABLES, WIRED_INSPECTION_STATE_DISPLAYING, WIRED_INSPECTION_STATE_FETCHING, WIRED_INSPECTION_STATE_NOTHING, WIRED_MENU_ERROR_INSPECTION_FAILED, WIRED_MENU_TAB_INSPECTION, WiredInspectionPreview, WiredStore, wiredStore, WiredVariableValueRow } from '#base/context/wired';
import { addToVariablePickerHistory, getIntFromString, sortVariables, WIRED_INT_MIN } from '#base/wired';

import { getAllWiredVariables } from './wiredSynchronizerCommands';

type Send = WebSocketConnection['send'];

/** `WiredInputSourcePicker._-Y2L` (furni) and `USER_SOURCE`. */
const FURNI_SOURCE = 0;
const USER_SOURCE = 1;

/** `WiredMenuInspectionTab.POLL_VARIABLES_MS`. */
const POLL_VARIABLES_MS = 500;

const patch: WiredStore['patchWiredInspection'] = changes => wiredStore.getState().patchWiredInspection(changes);

/** `isViewing` of this tab. */
const isViewing = (): boolean => {
    const { menuViewing, menuActiveTab } = wiredStore.getState();

    return menuViewing && (menuActiveTab === WIRED_MENU_TAB_INSPECTION);
};

/** `getObjectIdForType` - the user's room index, the furni's id (negative for a wall item), or 0 for the globals. */
const getObjectIdForType = (data: IWiredObjectInspectionData): number => {
    if (Number(data.type) === USER_SOURCE) return data.userIndex ?? 0;
    if (Number(data.type) === FURNI_SOURCE) return data.objectId ?? 0;

    return 0;
};

/** The rows of the variable values table (see `WiredVariableValueRow`). */
export const getWiredInspectionRows = (data: IWiredObjectInspectionData | null, variablesById: Record<string, IWiredVariable>): WiredVariableValueRow[] => {
    if (!data) return [];

    const variables: IWiredVariable[] = [];

    for (const variableId of data.variableValues.keys()) {
        const variable = variablesById[variableId];

        if (variable) variables.push(variable);
    }

    return sortVariables(variables)
        .filter(variable => !variable.isInvisible)
        .map(variable => ({ variable, value: data.variableValues.get(variable.variableId) ?? 0 }));
};

/** `requestVariablesForObject`. */
const requestVariablesForObject = (send: Send, sourceType: number, objectId: number) => {
    patch({ inspectionRequestedAt: performance.now() });

    send(new WiredGetVariablesForObjectComposer({ sourceType, objectId }));
};

/** `maybePollNewVariables` - only while displaying; `keepState` false puts the loading view up again. */
const maybePollNewVariables = (send: Send, keepState: boolean = true) => {
    const { inspectionState, inspectionData } = wiredStore.getState();

    if ((inspectionState !== WIRED_INSPECTION_STATE_DISPLAYING) || !inspectionData) return;

    if (!keepState) patch({ inspectionState: WIRED_INSPECTION_STATE_FETCHING });

    requestVariablesForObject(send, Number(inspectionData.type), getObjectIdForType(inspectionData));
};

/** `VariableHoldersHighlighter.clear` for this tab's highlighter, and `_highlightingForFurni` back to none. */
export const clearWiredInspectionHighlights = () => {
    const { inspectionHighlightedWireds } = wiredStore.getState();
    const highLighter = getRoom()?.objectHighLighter;

    for (const wiredId of inspectionHighlightedWireds) highLighter?.unhighlightVariableHolderFurni(wiredId);

    patch({ inspectionHighlightedWireds: [], inspectionHighlightingFor: -1 });
};

/** `onDataChanged`. */
const onDataChanged = (previous: IWiredObjectInspectionData | null, next: IWiredObjectInspectionData | null) => {
    const { inspectionHighlightingFor } = wiredStore.getState();

    if (!next) clearWiredInspectionHighlights();

    if (next && (inspectionHighlightingFor !== -1) && ((Number(next.type) !== FURNI_SOURCE) || (next.objectId !== inspectionHighlightingFor))) clearWiredInspectionHighlights();

    if (!previous || !next || (Number(previous.type) !== Number(next.type)) || (previous.objectId !== next.objectId) || (previous.userIndex !== next.userIndex)) patch({ inspectionCreateBubble: false });
};

/** `updateTableUI` - the rows are only replaced while displaying, and cleared with nothing inspected. */
const updateTableUI = () => {
    const { inspectionState, inspectionData, inspectionVariablesById, inspectionShownObjectId, inspectionShownType } = wiredStore.getState();

    if (inspectionState === WIRED_INSPECTION_STATE_NOTHING) {
        patch({ inspectionRows: [], inspectionSelectedId: null });

        return;
    }

    if ((inspectionState !== WIRED_INSPECTION_STATE_DISPLAYING) || !inspectionData) return;

    const objectId = getObjectIdForType(inspectionData);

    patch({
        inspectionRows: getWiredInspectionRows(inspectionData, inspectionVariablesById),
        inspectionHighlightChanges: (objectId === inspectionShownObjectId) && (Number(inspectionData.type) === inspectionShownType),
        inspectionShownObjectId: objectId,
        inspectionShownType: Number(inspectionData.type),
    });
};

/** `updatePreviewUI` - what `VariableHolderPreviewer` shows. */
const updatePreviewUI = () => {
    const { inspectionType, inspectionState, inspectionData, inspectionPreview } = wiredStore.getState();

    let preview: WiredInspectionPreview = inspectionPreview;

    if (inspectionType === Number(VariableExtraSourceTypes.GLOBAL_SOURCE)) preview = { kind: 'global' };
    else if ((inspectionType !== FURNI_SOURCE) && (inspectionType !== USER_SOURCE)) preview = { kind: 'none' };
    else if (inspectionState === WIRED_INSPECTION_STATE_NOTHING) preview = { kind: (inspectionType === FURNI_SOURCE) ? 'furni_instructions' : 'user_instructions' };
    else if ((inspectionState === WIRED_INSPECTION_STATE_DISPLAYING) && inspectionData) {
        preview = (inspectionType === FURNI_SOURCE) ? { kind: 'furni', objectId: inspectionData.objectId ?? 0 } : { kind: 'user', userIndex: inspectionData.userIndex ?? 0 };
    }

    patch({ inspectionPreview: preview });
};

/** `clearDataAndState`. */
const clearDataAndState = () => {
    const previous = wiredStore.getState().inspectionData;

    patch({ inspectionState: WIRED_INSPECTION_STATE_NOTHING, inspectionData: null });
    onDataChanged(previous, null);
    updateTableUI();
};

/**
 * `onAllVariables` - the synchronizer's answer. The variables are kept whatever the state; the
 * table only follows when the tab was waiting for them. A module-level function, so that asking
 * twice before the answer queues one callback.
 */
const onInspectionVariables = (variables: IWiredVariable[]) => {
    patch({ inspectionVariablesById: Object.fromEntries(variables.map(variable => [ variable.variableId, variable ])) });

    if (wiredStore.getState().inspectionState !== WIRED_INSPECTION_STATE_AWAITING_VARIABLES) return;

    patch({ inspectionState: WIRED_INSPECTION_STATE_DISPLAYING });
    updateTableUI();
    updatePreviewUI();
};

/** `WiredMenuInspectionTab.startViewing`. */
export const startViewingWiredInspection = (send: Send) => maybePollNewVariables(send, false);

/** `WiredMenuInspectionTab.stopViewing`. */
export const stopViewingWiredInspection = () => {
    clearWiredInspectionHighlights();
    patch({ inspectionCreateBubble: false });
};

/** `WiredMenuInspectionTab.update`. */
export const pollWiredInspection = (send: Send) => {
    const { inspectionRequestedAt, inspectionState } = wiredStore.getState();
    const isDataReady = (inspectionState === WIRED_INSPECTION_STATE_NOTHING) || (inspectionState === WIRED_INSPECTION_STATE_DISPLAYING);

    if ((inspectionRequestedAt < (performance.now() - POLL_VARIABLES_MS)) && isDataReady) maybePollNewVariables(send);
};

/** `onWiredVariablesForObject` - an answer for another source type than the selected one is dropped. */
export const onWiredVariablesForObject = (send: Send, data: IWiredObjectInspectionData) => {
    const { menuInitialized, inspectionState, inspectionType, inspectionData, inspectionVariablesById } = wiredStore.getState();

    if (!menuInitialized) return;
    if ((inspectionState !== WIRED_INSPECTION_STATE_FETCHING) && (inspectionState !== WIRED_INSPECTION_STATE_DISPLAYING)) return;
    if (Number(data.type) !== inspectionType) return;

    patch({ inspectionData: data });
    onDataChanged(inspectionData, data);
    patch({ inspectionState: WIRED_INSPECTION_STATE_AWAITING_VARIABLES });

    // `allVariablesAvailable`: a variable the tab has never seen means the cache has to be refreshed.
    const allVariablesAvailable = [ ...data.variableValues.keys() ].every(variableId => !!inspectionVariablesById[variableId]);

    getAllWiredVariables(send, onInspectionVariables, !allVariablesAvailable);
};

/** `onWiredMenuError` - a failed inspection takes a fetch that is still out back to nothing. */
export const onWiredInspectionMenuError = (errorCode: number) => {
    const { menuInitialized, inspectionState } = wiredStore.getState();

    if (!menuInitialized || (errorCode !== WIRED_MENU_ERROR_INSPECTION_FAILED) || (inspectionState === WIRED_INSPECTION_STATE_DISPLAYING)) return;

    clearDataAndState();
    updatePreviewUI();
};

/** `onSelectVariableType` - a click on the type picker. The globals need no object and are fetched at once. */
export const selectWiredInspectionType = (send: Send, sourceType: number) => {
    if (wiredStore.getState().inspectionType === sourceType) return;

    patch({ inspectionType: sourceType });
    clearDataAndState();

    if (sourceType === Number(VariableExtraSourceTypes.GLOBAL_SOURCE)) {
        patch({ inspectionState: WIRED_INSPECTION_STATE_FETCHING });
        requestVariablesForObject(send, sourceType, 0);
    }

    updatePreviewUI();
};

/**
 * `inspectFurni` / `inspectUser`. A selection in the room does nothing to a pinned inspection
 * that is showing; `forced` (a link) pins it, switching the type picker over if it has to.
 */
const inspect = (send: Send, sourceType: number, id: number, forced: boolean) => {
    if (!isViewing()) return;

    const { inspectionPinned, inspectionState, inspectionType } = wiredStore.getState();

    if (inspectionPinned && (inspectionState === WIRED_INSPECTION_STATE_DISPLAYING) && !forced) return;

    if (forced) patch({ inspectionPinned: true });

    if (inspectionType !== sourceType) {
        if (!forced) return;

        // `selectedType = ...` goes around `onSelectVariableType`: nothing is cleared.
        patch({ inspectionType: sourceType });
        updatePreviewUI();
    }

    const { inspectionData } = wiredStore.getState();

    if (inspectionData && (Number(inspectionData.type) === sourceType) && (((sourceType === FURNI_SOURCE) ? inspectionData.objectId : inspectionData.userIndex) === id)) return;

    patch({ inspectionState: WIRED_INSPECTION_STATE_FETCHING });
    requestVariablesForObject(send, sourceType, id);
};

/** `inspectFurni` - `stuffId` is negative for a wall item. */
export const inspectWiredFurni = (send: Send, stuffId: number, forced: boolean = false) => inspect(send, FURNI_SOURCE, stuffId, forced);

/** `inspectUser` - by room index. */
export const inspectWiredUser = (send: Send, roomIndex: number, forced: boolean = false) => inspect(send, USER_SOURCE, roomIndex, forced);

/** `WiredMenuController.furniSelected` - the menu is built and on the inspection tab. */
export const wiredMenuFurniSelected = (send: Send, stuffId: number) => {
    const { menuInitialized, menuActiveTab } = wiredStore.getState();

    if (menuInitialized && (menuActiveTab === WIRED_MENU_TAB_INSPECTION)) inspectWiredFurni(send, stuffId);
};

/** `WiredMenuController.userSelected`. */
export const wiredMenuUserSelected = (send: Send, roomIndex: number) => {
    const { menuInitialized, menuActiveTab } = wiredStore.getState();

    if (menuInitialized && (menuActiveTab === WIRED_MENU_TAB_INSPECTION)) inspectWiredUser(send, roomIndex);
};

/** The pin checkbox. */
export const setWiredInspectionPinned = (inspectionPinned: boolean) => patch({ inspectionPinned });

/**
 * `onHighlightWiredsClicked` - lights up the wired boxes the inspected furni is configured in, or
 * puts them out when they are lit. A box that is not in the room is skipped, as
 * `VariableHoldersHighlighter.highlightObject` does.
 */
export const toggleWiredInspectionHighlights = () => {
    const { inspectionHighlightingFor, inspectionData } = wiredStore.getState();

    clearWiredInspectionHighlights();

    if ((inspectionHighlightingFor !== -1) || !inspectionData || !inspectionData.configuredInWireds.length) return;

    const room = getRoom();
    const lit: number[] = [];

    for (const wiredId of inspectionData.configuredInWireds) {
        const category = (wiredId < 0) ? RoomObjectCategoryEnum.Wall : RoomObjectCategoryEnum.Floor;

        if (!room?.getRoomObject(Math.abs(wiredId), category)) continue;

        room.objectHighLighter.highlightVariableHolderFurni(wiredId);
        lit.push(wiredId);
    }

    patch({ inspectionHighlightedWireds: lit, inspectionHighlightingFor: inspectionData.objectId ?? -1 });
};

/**
 * The table's selection - `TableView.trySelect` and `onRowSelected`. When the selected row leaves
 * the table because it was deleted, the row that took its index is selected instead.
 */
export const selectWiredInspectionRow = (variableId: string | null) => {
    const { inspectionDeleteIndex, inspectionRows } = wiredStore.getState();

    if ((variableId === null) && (inspectionDeleteIndex !== -1)) {
        patch({ inspectionSelectedId: inspectionRows[inspectionDeleteIndex]?.variable.variableId ?? null, inspectionDeleteIndex: -1 });

        return;
    }

    patch({ inspectionSelectedId: variableId });
};

/** `onCellEdit` - a value cell was edited; anything that is not a number is ignored. */
export const setWiredInspectedValue = (send: Send, variable: IWiredVariable, text: string) => {
    const { inspectionData } = wiredStore.getState();

    if (!inspectionData || !getWiredHasWritePermission() || !variable.hasValue || !variable.canWriteValue) return;

    const value = getIntFromString(text, WIRED_INT_MIN, true);

    if (value === WIRED_INT_MIN) return;

    send(new WiredSetObjectVariableValueComposer({ variableTarget: variable.variableTarget, objectId: getObjectIdForType(inspectionData), variableId: variable.variableId, value, operation: WiredSetObjectVariableValueOperation.SetValue }));
};

/** `onDeleteVariableClicked`. */
export const deleteWiredInspectedVariable = (send: Send) => {
    const { inspectionData, inspectionSelectedId, inspectionRows } = wiredStore.getState();

    if (!inspectionData) return;

    const index = inspectionRows.findIndex(row => row.variable.variableId === inspectionSelectedId);
    const variable = inspectionRows[index]?.variable;

    if (!variable || !getWiredHasWritePermission() || !variable.canCreateAndDelete) return;

    patch({ inspectionDeleteIndex: index });

    send(new WiredSetObjectVariableValueComposer({ variableTarget: variable.variableTarget, objectId: getObjectIdForType(inspectionData), variableId: variable.variableId, value: 0, operation: WiredSetObjectVariableValueOperation.Delete }));
};

/** `onAddVariableClicked` - the bubble closes, or opens once the room's variables are fresh (`initializeCreateVariableBubble`). */
export const toggleWiredInspectionCreateBubble = (send: Send) => {
    if (wiredStore.getState().inspectionCreateBubble) {
        patch({ inspectionCreateBubble: false });

        return;
    }

    getAllWiredVariables(send, variables => patch({ inspectionCreateVariables: variables, inspectionCreateBubble: true }), true);
};

/** `windowProcedure` - a click anywhere but the bubble and the add button closes it. */
export const closeWiredInspectionCreateBubble = () => patch({ inspectionCreateBubble: false });

/** `onCreateVariableClicked` - the variable is given to the object, with the typed value when it has one. */
export const createWiredInspectedVariable = (send: Send, variable: IWiredVariable, valueText: string) => {
    const { inspectionData } = wiredStore.getState();

    if (!inspectionData) return;

    const value = variable.hasValue ? getIntFromString(valueText, 0) : 0;

    // `NewVariablePicker.finalize`: the variable goes into the picker's "recent" history.
    addToVariablePickerHistory(getRoom()?.roomId ?? 0, variable);

    send(new WiredSetObjectVariableValueComposer({ variableTarget: variable.variableTarget, objectId: getObjectIdForType(inspectionData), variableId: variable.variableId, value, operation: WiredSetObjectVariableValueOperation.Create }));

    patch({ inspectionCreateBubble: false });
};
